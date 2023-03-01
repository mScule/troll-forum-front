import { useEffect, createContext, useState, ReactNode, FC } from "react";

import axios from "../setup/axios";
import jwtDecode from "jwt-decode";

function notInitialized() {
  throw new Error("UserContext not initialized yet");
}

export const UserContext = createContext({
  login: async (_form: { username: string; password: string }) => {
    notInitialized();
  },
  logout: () => {
    notInitialized();
  },
  getId: (): number | undefined => 0,
  getLoginStatus: (): boolean => false,
});

interface Props {
  children: ReactNode;
}

export const UserProvider: FC<Props> = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState<boolean>(false);

  async function login(form: { username: string; password: string }) {
    const authToken = (await axios.post("auth", form)).data.token;
    localStorage.setItem("authorization", authToken);
    setLoginStatus(true);
  }

  function logout() {
    localStorage.removeItem("authorization");
    setLoginStatus(false);
  }

  function getId() {
    const authToken = localStorage.getItem("authorization");

    if (!authToken) {
      throw new Error("No authorization token found");
    }

    try {
      return (jwtDecode(authToken) as { data: { id: number } }).data.id;
    } catch {
      console.error("Authorization token cannot be parsed");
      setLoginStatus(false);
    }
  }

  function getLoginStatus(): boolean {
    return loginStatus;
  }

  useEffect(() => {
    (async () => {
      try {
        await axios.get("auth");
        setLoginStatus(true);
      } catch {
        setLoginStatus(false);
      }
    })();
  }, []);

  return (
    <UserContext.Provider value={{ login, logout, getId, getLoginStatus }}>
      {children}
    </UserContext.Provider>
  );
};
