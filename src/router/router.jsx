import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Registration from "@/pages/Registration";
import Login from "@/pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Registration />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
