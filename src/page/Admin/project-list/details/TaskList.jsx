import { Avatar, Badge, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";

const TaskList = () => {
  return (
    <div className="p-4">
      <ul>
        <li>
          <Badge.Ribbon text="completed" color="green">
            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-semibold text-red-700">Task name</h3>
              <p className="text-sm text-gray-600">Deadline: 2025-02-25</p>
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
      </ul>
    </div>
  );
};

export default TaskList;
