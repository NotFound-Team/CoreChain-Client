import { Menu } from "antd";
import {
  CalendarOutlined,
  DashboardOutlined,
  FormOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import { GiArchiveRegister } from "react-icons/gi";
import { FaRegUser, FaSignInAlt } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const MenuSider = () => {
  const items = [
    {
      key: "dashboard",
      label: <NavLink to="/manager">Dashboard</NavLink>,
      icon: <DashboardOutlined />,
    },
    {
      key: "task",
      label: "Task",
      icon: <FormOutlined />,
    },
    {
      key: "TeamWork",
      label: <NavLink to="/manager/team-work">TeamWork</NavLink>,
      icon: <TeamOutlined />,
    },
    {
      key: "ListTask",
      label: <NavLink to="/manager/list-task">List Task</NavLink>,
      icon: <CalendarOutlined />,
    },
    {
      key: "grp",
      label: <h4 className="font-bold">ACCOUNT PAGES</h4>,
      type: "group",
      children: [
        {
          key: "accountProfile",
          label: <NavLink to="/manager/profile/details">Profile</NavLink>,
          icon: <FaRegUser />,
          children: [
            {
              key: "details",
              label: <NavLink to="/manager/profile/details">Details</NavLink>,
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
