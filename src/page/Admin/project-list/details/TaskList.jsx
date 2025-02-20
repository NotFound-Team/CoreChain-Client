import { Avatar, Badge, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { IoIosAdd } from "react-icons/io";
import React from "react";

const TaskList = () => {
  return (
    <div className="p-4">
      <ul>
        <li className="mb-4">
          <Badge.Ribbon text="completed" color="green">
            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-md">
              <p className="text-sm text-gray-500">
                Deadline: 2025-02-20 - 2025-02-25
              </p>
              <h3 className="text-lg font-semibold text-red-700">Task name</h3>
              <div>
                Staff:{" "}
                <Tooltip title="Ant User">
                  <Avatar
                    size="small"
                    style={{ backgroundColor: "#87d068" }}
                    icon={<UserOutlined />}
                  />
                </Tooltip>
              </div>
            </div>
          </Badge.Ribbon>
        </li>
        <li className="cursor-pointer">
          <div className="bg-red-50 border-solid border-red-500 rounded-lg p-4 shadow-md flex-center hover:bg-red-500 group transition duration-300">
            <IoIosAdd className="text-2xl group-hover:text-white transition duration-300" />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default TaskList;
