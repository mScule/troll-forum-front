import { createBrowserRouter } from "react-router-dom";

import Root from "../routes/Root";
import Error from "../routes/Error";
import Profile from "../routes/Profile";

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
  }
]);
