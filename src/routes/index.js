import React, { Suspense } from "react";
import LayoutDefault from "../layout/LayoutDefault";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Dashboard from "../page/Dashboard";
import Profile from "../page/Profile";
import ListTask from "../page/ListTask";
import TeamWork from "../page/TeamWork";
// import Login from "../page/Login";
// import Register from "../page/Register";

const Login = React.lazy(() => import("../page/Login"));
const Register = React.lazy(() => import("../page/Register"));
const Manager = React.lazy(() => import("../page/Manager"));
const User = React.lazy(() => import("../page/User"));

const LazyLoad = (Component) => (
  <Suspense
    fallback={
      <Spin
        fullscreen
        tip="Loading..."
        indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
      />
    }
  >
    <Component />
  </Suspense>
);

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
  },
  {
    path: "/login",
    element: LazyLoad(Login),
  },
  {
    path: "/register",
    element: LazyLoad(Register),
  },
  {
    path: "/manager",
    element: LazyLoad(Manager),
    children: [
      { path: "/manager", element: <Dashboard /> },
      { path: "profile", element: <Profile /> },
      { path: "list-task", element: <ListTask /> },
      { path: "team-work", element: <TeamWork /> },
    ],
  },
  {
    path: "/user",
    element: LazyLoad(User),
  },
];
