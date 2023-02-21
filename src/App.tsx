import { RouterProvider } from "react-router-dom";
import router from "./router";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import Container from "@mui/material/Container";

import TopBar from "./components/TopBar";

import dark from "./themes/dark";
import light from "./themes/light";

import axios from "./setup/axios";

const App = () => {
  axios.get("user").then(response => console.log(response))
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
