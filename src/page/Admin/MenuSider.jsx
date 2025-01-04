// antd
import { Menu } from "antd";
import {
  CalendarOutlined,
  DashboardOutlined,
  TeamOutlined,
} from "@ant-design/icons";

// react-icon
import { GiArchiveRegister } from "react-icons/gi";
import { FaRegUser, FaSignInAlt } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

// react-router-dom
import { Link, NavLink } from "react-router-dom";

const MenuSider = () => {
  const items = [
    {
      key: "dashboard",
      label: <NavLink to="/manager">Dashboard</NavLink>,
      icon: <DashboardOutlined />,
    },
    {
      key: "AllUsers",
      label: <NavLink to="/admin">All Users</NavLink>,
      icon: <TeamOutlined />,
    },
    {
      key: "TaskList",
      label: <NavLink to="/admin/task-list">Task List</NavLink>,
      icon: <CalendarOutlined />,
    },
    {
      key: "grp",
      label: <h4 className="font-bold">ACCOUNT PAGES</h4>,
      type: "group",
      children: [
        {
          key: "accountProfile",
          label: <NavLink to="/admin/profile/details">Profile</NavLink>,
          icon: <FaRegUser />,
          children: [
            {
              key: "details",
              label: <NavLink to="/admin/profile/details">Details</NavLink>,
            },
          ],
        },
        {
          key: "signIn",
          label: <Link to="/login">Sign In</Link>,
          icon: <FaSignInAlt />,
        },
        {
          key: "signUp",
          label: <Link to="/register">Sign Up</Link>,
          icon: <GiArchiveRegister />,
        },
        {
          key: "logout",
          label: "Logout",
          icon: <IoLogOut />,
        },
      ],
    },
  ];

  return (
    <>
      <Menu mode="inline" items={items} defaultOpenKeys={["dashboard"]} />
    </>
  );
};

export default MenuSider;
