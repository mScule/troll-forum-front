import { useEffect, createContext, useState, ReactNode, FC } from "react";

import axios from "../setup/axios";
import jwtDecode from "jwt-decode";

/**
 * Context for providing the user state.
 */

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
  getId: (): number | null => null,
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

  function getId(): number | null {
    const authToken = localStorage.getItem("authorization");

    if (!authToken) {
      return null;
    }

    try {
      return (jwtDecode(authToken) as { data: { id: number } }).data.id;
    } catch {
      logout();
      return null;
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
