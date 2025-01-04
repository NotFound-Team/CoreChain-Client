import { Avatar, Tabs } from "antd";
import UserProfileDetailsPage from "./Details";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

  const items = [
    {
      key: "1",
      label: <NavLink to="details">Details</NavLink>, // Điều hướng đến /profile/details
      children: <UserProfileDetailsPage />,
    },
    {
      key: "2",
      label: "Activity",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Security",
      children: "Content of Tab Pane 3",
    },
  ];

  // Lấy key của tab dựa trên đường dẫn hiện tại
  // Cắt bỏ phần /manager/profile/ từ đường dẫn và lấy phần còn lại
  const activeKey = location.pathname.split("/").pop() || "1"; // Nếu không có phần con thì mặc định là "1"

  const onTabChange = (key) => {
    switch (key) {
      case "1":
        navigate("details");
        break;
      case "2":
        // navigate("activity");
        break;
      case "3":
        // navigate("security");
        break;
      default:
        navigate("details");
    }
  };

  return (
    <>
      <div className="shadow-xl rounded-2xl">
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-full inline-block rounded-2xl py-6 px-4">
          <Avatar size={80} icon={<UserOutlined />} />
          <div className="text-white font-medium">
            Name: <span className="font-light">Jack97</span>
          </div>
          <div className="text-white font-medium">
            Position: <span className="font-light">Leader</span>
          </div>
        </div>
      </div>
      <Tabs activeKey={activeKey} items={items} onChange={onTabChange} />
      <Outlet />
    </>
  );
};

export default Profile;
