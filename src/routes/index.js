import LayoutDefault from "../layout/LayoutDefault";
import Login from "../page/Login";
import Register from "../page/Register";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
]