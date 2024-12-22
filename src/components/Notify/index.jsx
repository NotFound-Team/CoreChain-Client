import { Badge, Button, Dropdown, Space } from "antd";
import { IoMdNotificationsOutline } from "react-icons/io";

const Notify = () => {
  const items = [
    {
      label: "5rd menu item",
      key: "5",
    },
    {
      label: "6rd menu item",
      key: "6",
    },
    {
      label: "7rd menu item",
      key: "7",
    },
  ];
  return (
    <>
      <Space size="large">
        <Dropdown
          menu={{ items }}
          trigger={["click"]}
          dropdownRender={(menu) => (
            <>
              <div className="bg-white rounded-md shadow-xl p-4">
                <div className="flex gap-x-8">
                  <div className="flex-center">
                    <IoMdNotificationsOutline />
                    Notification
                  </div>
                  <div>View All</div>
                </div>
                <div className="notify__body">{menu}</div>
              </div>
            </>
          )}
        >
          <Badge dot className="text-2xl">
            <Button size="large" icon={<IoMdNotificationsOutline />}></Button>
          </Badge>
        </Dropdown>
      </Space>
    </>
  );
};

export default Notify;
