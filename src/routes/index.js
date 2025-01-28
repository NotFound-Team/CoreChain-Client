import React, { Suspense } from "react";
import LayoutDefault from "../layout/LayoutDefault";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Login = React.lazy(() => import("../page/Login"));
const Register = React.lazy(() => import("../page/Register"));
const Manager = React.lazy(() => import("../page/Manager"));
const Admin = React.lazy(() => import("../page/Admin/index"));
const User = React.lazy(() => import("../page/User"));
const Profile = React.lazy(() => import("../page/Profile"));
const Project = React.lazy(() => import("../page/Project"));
const TeamWork = React.lazy(() => import("../page/TeamWork"));
const Dashboard = React.lazy(() => import("../page/Dashboard"));
const Details = React.lazy(() => import("../page/Profile/Details"));
const detailProject = React.lazy(() => import("../page/Project/detailProject.jsx"));
const NotFound = React.lazy(() => import("../page/NotFound"));

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

  // ** manager
  {
    path: "/manager",
    element: LazyLoad(Manager),
    children: [
      { path: "/manager", element: LazyLoad(Dashboard) },
      {
        path: "profile",
        element: LazyLoad(Profile),
        children: [
          {
            path: "details",
            element: LazyLoad(Details),
          },
        ],
      },
      {
        path: "project",
        element: LazyLoad(Project),
        children: [
          {
            path: "details/:id",
            element: LazyLoad(detailProject),
          },
        ],
      },
      { path: "team-work", element: LazyLoad(TeamWork) },
    ],
  },
  // end manager
  // **user
  {
    path: "/user",
    element: LazyLoad(User),
  },
  // end user

  // ** admin
  {
    path: "/admin",
    element: LazyLoad(Admin),
  },
  // end admin
  {
    path: "*",
    element: LazyLoad(NotFound),
  },
];
