// antd
import { Menu, message } from "antd";
import {
  CalendarOutlined,
  DashboardOutlined,
  FormOutlined,
  TeamOutlined,
} from "@ant-design/icons";

// react-icon
import { FaRegUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

// react-router-dom
import { NavLink } from "react-router-dom";

// Service
import fetchApi from "../../services/fetchApi";

const MenuSider = () => {
  const handleLogout = async () => {
    const response = await fetchApi("/auth/logout", "DELETE");
    if (response.status === 200) {
      message.success("Logout successfully!");
    } else {
      message.error("Logout fail!");
    }
  };
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
      key: "Project",
      label: <NavLink to="/manager/project">Project</NavLink>,
      icon: <CalendarOutlined />,
    },
    {
      key: "account-page",
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
          key: "logout",
          label: <button onClick={handleLogout}>Logout</button>,
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
