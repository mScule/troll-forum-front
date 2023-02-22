import { useEffect, createContext, useState, ReactNode, FC } from "react";

import axios from "../setup/axios";
import getUserId from "../auth/getUserId";

export const UserContext = createContext({
  id: 0,
  setId: (id: number) => {},
  isLoggedIn: false,
  setIsLoggedIn: (status: boolean) => {},
});

interface Props {
  children: ReactNode;
}

export const UserProvider: FC<Props> = ({ children }) => {
  const [id, setId] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        await axios.get("auth");
        setId(getUserId());
        setIsLoggedIn(true);
      } catch {
        setId(0);
        setIsLoggedIn(false);
      }
    })();
  }, []);

  return (
    <UserContext.Provider value={{ id, setId, isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
