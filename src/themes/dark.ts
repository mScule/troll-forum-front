import { createTheme } from "@mui/material/styles";
import shared from "./shared";

const dark = createTheme({
  ...shared,
  palette: {
    mode: "dark",
    ...shared.palette,
  },
});

export default dark;
