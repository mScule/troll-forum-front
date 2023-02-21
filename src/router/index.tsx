import { createBrowserRouter } from "react-router-dom";

import Root from "../routes/Root";
import Error from "../routes/Error";
import Profile from "../routes/Profile";
import Register from "../routes/Register";
import Login from "../routes/Login";

export default createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    // ./components/UserProfile, yet to implement functionality to return user with the wanted id, hardcoded to userId 1
    path: "/user/:userId",
    element: <Profile />,
  },
]);
