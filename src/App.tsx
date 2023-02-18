import { RouterProvider } from "react-router-dom";
import router from "./router";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import Container from "@mui/material/Container";

import TopBar from "./components/TopBar";

import dark from "./themes/dark";
import light from "./themes/light";

const App = () => {
  return (
    <ThemeProvider theme={dark}>
      <CssBaseline />
      <TopBar/>
      <Container fixed>
        <RouterProvider router={router} />
      </Container>
    </ThemeProvider>
  );
};

export default App;
