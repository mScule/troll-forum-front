import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import { UserProvider } from "./contexts/User";
import { ThemeProvider } from "@mui/material";
import { NotificationProvider } from "./contexts/Notification";

/**
 * The component containing all of the providers.
 */

import router from "./router";
import CssBaseline from "@mui/material/CssBaseline";

import ThemeSelectorContext from "./contexts/ThemeSelector";

const App = () => {
  const { theme } = useContext(ThemeSelectorContext);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export default App;
