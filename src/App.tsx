import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import Container from "@mui/material/Container";

import TopBar from "./components/TopBar";

import dark from "./themes/dark";
import light from "./themes/light";

import axios from "./setup/axios";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <ThemeProvider theme={dark}>
      <CssBaseline />
      <TopBar handleMenuButtonClick={() => setShowSideBar(!showSideBar)} />
      <Sidebar
        open={showSideBar}
        handleCloseSidebar={() => setShowSideBar(!showSideBar)}
      />
      <Container fixed sx={{ marginTop: 8 }}>
        <RouterProvider router={router} />
      </Container>
    </ThemeProvider>
  );
};

export default App;
