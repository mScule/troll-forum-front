import { useState, useContext } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import Container from "@mui/material/Container";

import TopBar from "./components/TopBar";

import ThemeSelectorContext from "./contexts/ThemeSelector";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const { theme } = useContext(ThemeSelectorContext);

  return (
    <ThemeProvider theme={theme}>
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
