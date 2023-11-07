import { createTheme } from "@mui/material";

export const DarkTheme = createTheme({
  palette: {
    primary: {
      main: "#df4636",
      dark: "#b52b4f",
      light: "#df4636",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#202124",
      paper: "#303134",
    },
  },
});
