import React, { Suspense } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import LayoutDefault from "../layout/LayoutDefault";
import PrivateRoute from "./PrivateRoute"; // Import PrivateRoute
// import { useAuth } from "../context/AuthContext";

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
const ProjectDetailsAdmin = React.lazy(() =>
  import("../page/Admin/project-list/detailProject.jsx")
);
const forgotPassword = React.lazy(() =>
  import("../page/forgot-password/index.jsx")
);
const phoneForgotPassword = React.lazy(() =>
  import("../page/forgot-password/phoneForgotPassword.jsx")
);
const emailForgotPassword = React.lazy(() =>
  import("../page/forgot-password/emailForgotPassword.jsx")
);
const detailProject = React.lazy(() =>
  import("../page/Project/detailProject.jsx")
);
const NotFound = React.lazy(() => import("../page/NotFound"));
// Admin
const productList = React.lazy(() =>
  import("../page/Admin/project-list/index.jsx")
);
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
    path: "/forgot-password",
    element: LazyLoad(forgotPassword),
    children: [
      {
        path: "phone",
        element: LazyLoad(phoneForgotPassword),
      },
      {
        path: "email",
        element: LazyLoad(emailForgotPassword),
      },
    ],
  },

  // ** Quản lý (Chỉ cho role: manager, admin)
  {
    path: "/manager",
    element: (
      <PrivateRoute roles={["manager", "admin"]}>
        {LazyLoad(Manager)}
      </PrivateRoute>
    ),
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

  // ** User (Chỉ cho role: user, manager, admin)
  {
    path: "/user",
    element: (
      <PrivateRoute roles={["user", "manager", "admin"]}>
        {LazyLoad(User)}
      </PrivateRoute>
    ),
  },

  // ** Admin (Chỉ cho role: admin)
  {
    path: "/admin",
    element: <PrivateRoute roles={["admin"]}>{LazyLoad(Admin)}</PrivateRoute>,
    children: [
      { path: "/admin", element: LazyLoad(Dashboard) },
      {
        path: "project",
        element: LazyLoad(productList),
        children: [
          {
            path: "details/:id",
            element: LazyLoad(ProjectDetailsAdmin),
          },
        ],
      },
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
    ],
  },

  // ** Trang 404
  {
    path: "*",
    element: LazyLoad(NotFound),
  },
];
