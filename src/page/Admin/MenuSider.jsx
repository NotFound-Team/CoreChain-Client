// antd
import { Menu, message } from "antd";
import {
  CalendarOutlined,
  DashboardOutlined,
  TeamOutlined,
} from "@ant-design/icons";

// react-icon
import { FaRegUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

// react-router-dom
import { NavLink, useNavigate } from "react-router-dom";
import fetchAPI from "../../services/fetchApi";

const MenuSider = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await fetchAPI("/auth/logout", "POST", {});
      console.log(response);
      if (response.status === 200) {
        message.success("Logout successfully!");
        navigate("/login");
      } else {
        message.error("Logout fail!");
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };
  const items = [
    {
      key: "dashboard",
      label: <NavLink to="/admin">Dashboard</NavLink>,
      icon: <DashboardOutlined />,
    },
    {
      key: "AllUsers",
      label: <NavLink to="/admin/all-user">All Users</NavLink>,
      icon: <TeamOutlined />,
    },
    {
      key: "TaskList",
      label: <NavLink to="/admin/project-list">Project List</NavLink>,
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
