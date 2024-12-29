import { Tabs } from "antd";
import UserProfileDetailsPage from "./Details";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";

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
  const activeKey = location.pathname.split("/").pop() || "1";  // Nếu không có phần con thì mặc định là "1"

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
      <Tabs
        activeKey={activeKey}
        items={items}
        onChange={onTabChange}
      />
      <Outlet />
    </>
  );
};

export default Profile;
