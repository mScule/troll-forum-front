import { createBrowserRouter } from "react-router-dom";

import Root from "../routes/Root";
import Error from "../routes/Error";
import Profile, { loader as profileLoader } from "../routes/Profile";
import Register from "../routes/Register";
import Login from "../routes/Login";
import PageWrapper from "../components/PageWrapper";
import Post from "../routes/Post";
import PostId, { loader as postIdLoader } from "../routes/PostId";
import CommentId, { loader as commentIdLoader } from "../routes/CommentId";
import PostContainer from "../components/PostContainer";
import Search, { loader as searchLoader } from "../routes/Search";

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
        element: <PostContainer />,
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
            title="🪪❌"
            message="It seems that there's no user with given id."
          />
        ),
      },
      {
        path: "/comment/:commentId",
        loader: commentIdLoader,
        element: <CommentId />,
        errorElement: (
          <Error
            title="🗯️❌"
            message="It seems that there's no comment with given id."
          />
        ),
      },
      {
        path: "/post",
        element: <Post />,
      },
      {
        path: "/post/:postId",
        loader: postIdLoader,
        element: <PostId />,
        errorElement: (
          <Error
            title="🗞️❌"
            message="It seems that there's no post with given id."
          />
        ),
      },
      {
        path: "/search/:searchValue",
        loader: searchLoader,
        element: <Search />,
      },
    ],
  },
]);
