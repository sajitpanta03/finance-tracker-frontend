import { createBrowserRouter } from "react-router-dom";
import About from "../components/About";
import Home from "../components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);

export default router;
