import { grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import shared from "./shared";

const light = createTheme({
  ...shared,
  ...shared.breakpoints,
  palette: {
    mode: "light",
    ...shared.palette,
    background: {
      default: grey[300],
      paper: grey[200]
    }
  },

  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: grey[200],
          color: grey[900]
        }
      }
    }
  }
});

export default light;
