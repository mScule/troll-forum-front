import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeSelectorProvider } from "./contexts/ThemeSelector";

/**
 * The base of the Trolf spa.
 */

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeSelectorProvider>
      <App />
    </ThemeSelectorProvider>
  </React.StrictMode>
);
