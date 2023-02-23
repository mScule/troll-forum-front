import { createBrowserRouter } from "react-router-dom";

import Root from "../routes/Root";
import Error from "../routes/Error";
import Profile, { loader as profileLoader } from "../routes/Profile";
import Register from "../routes/Register";
import Login from "../routes/Login";
import PageWrapper from "../components/PageWrapper";

export default createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: (
      <PageWrapper>
        <Error
          title="Yikes!"
          message="It seems that the page you were looking for doesn't exist ¯\_(ツ)_/¯"
        />
      </PageWrapper>
    ),
    children: [
      {
        path: "/",
        element: <p>Feed</p>,
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
        path: "/user/:userId",
        loader: profileLoader,
        element: <Profile />,
        errorElement: (
          <Error
            title="🔎👀"
            message="It seems that there's no user with given id."
          />
        ),
      },
    ],
  },
]);
