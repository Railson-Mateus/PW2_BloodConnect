import { ThemeProvider } from "@mui/material";
import {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";

import { DarkTheme, LightTheme } from "@/themes";

interface IThemeContextData {
  themeMode: "light" | "dark";
  toggleTheme: () => void;
}

type IProps = {
  children: ReactNode;
};

export const ThemeContext = createContext({} as IThemeContextData);

export const AppThemeProvider = ({ children }: IProps) => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  const toggleTheme = useCallback(() => {
    setThemeMode((oldThemeMode) =>
      oldThemeMode === "light" ? "dark" : "light"
    );
  }, []);

  const theme = useMemo(() => {
    if (themeMode === "light") return LightTheme;

    return DarkTheme;
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
