import { createContext, useState, ReactNode, FC } from "react";

import dark from "../themes/dark";
import light from "../themes/light";
import { Theme } from "@mui/material";

type ThemeOption = "light" | "dark";

const getTheme = (option: ThemeOption) => (option === "light" ? light : dark);

export const ThemeSelectorContext = createContext({
  theme: light,
  setTheme: (_option: ThemeOption) => {},
});

interface Props {
  children: ReactNode;
}

const localTheme = localStorage.getItem("theme");

export const ThemeSelectorProvider: FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(
    (localTheme && localTheme === "light") || localTheme === "dark"
      ? getTheme(localTheme)
      : light
  );

  return (
    <ThemeSelectorContext.Provider
      value={{
        theme,
        setTheme: (option: ThemeOption) => {
          localStorage.setItem("theme", option);
          setTheme(getTheme(option));
        },
      }}
    >
      {children}
    </ThemeSelectorContext.Provider>
  );
};

export default ThemeSelectorContext;
