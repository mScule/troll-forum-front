import { createBrowserRouter } from "react-router-dom";

import Root from "../routes/Root";
import Error from "../routes/Error";

export default createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
  },
]);
