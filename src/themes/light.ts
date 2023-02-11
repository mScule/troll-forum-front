import { grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import shared from "./shared";

const light = createTheme({
  ...shared.breakpoints,
  palette: {
    mode: "light",
    ...shared.palette,
    primary: {
      light: grey[50],
      main: grey[100],
      dark: grey[200],
    },
    secondary: {
      light: grey[500],
      main: grey[800],
      dark: "black"
    },
    background: {
      default: grey[200],
      paper: grey[100],
    }
  },
});

export default light;
