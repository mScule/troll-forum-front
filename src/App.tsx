import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import NotificationProvider from "./contexts/Notification";
import router from "./router";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import ThemeSelectorContext from "./contexts/ThemeSelector";

const App = () => {
  const { theme } = useContext(ThemeSelectorContext);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <RouterProvider router={router} />
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
