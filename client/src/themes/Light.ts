import { createTheme } from "@mui/material";

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: "#df4636",
      dark: "#b52b4f",
      light: "#df4636",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#f7f6f3",
      paper: "#FFFFFF",
    },
  },
});
