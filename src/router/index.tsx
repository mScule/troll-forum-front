import { createBrowserRouter } from "react-router-dom";

import Root from "../routes/Root";
import Error from "../routes/Error";
import Profile from "../routes/Profile";
import Register from "../components/Register";

export default createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
  },
  {
    // ./components/UserProfile, yet to implement functionality to return user with the wanted id, hardcoded to userId 1
    path: "/user/:userId",
    element: <Profile/>
  },
  {
   path: "/register",
   element: <Register/>
  }


]);
