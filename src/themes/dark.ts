import { createTheme } from "@mui/material/styles";
import shared from "./shared";

const dark = createTheme({
  ...shared.breakpoints,
  palette: {
    mode: "dark",
    ...shared.palette,
  },
});

export default dark;
