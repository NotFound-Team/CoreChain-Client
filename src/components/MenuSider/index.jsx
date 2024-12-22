import { Menu } from "antd";
import { DashboardOutlined, FormOutlined, TeamOutlined } from "@ant-design/icons";

const MenuSider = () => {

  const items = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
    {
      key: "task",
      label: "Task",
      icon: <FormOutlined />,
    },
    {
      key: "TeamWork",
      label: "TeamWork",
      icon: <TeamOutlined />,
    }
  ]

  return (
    <>
      <Menu mode="inline" items={items} defaultOpenKeys={["dashboard"]} />
    </>
  )
}

export default MenuSider;