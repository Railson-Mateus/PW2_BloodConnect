import { ThemeContext } from "@/context/themeContext";
import { useContext } from "react";

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
