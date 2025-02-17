// ** Atnd
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Popconfirm,
  Progress,
  Row,
  Switch,
  Tooltip,
} from "antd";

import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const TableProject = ({ data }) => {
  return (
    <>
      <Row gutter={[20, 20]} className="h-screen">
        {data.map((item,index) => (
          <Col xxl={6} xl={6} lg={6} md={12} sm={24} xs={24} key={item.id || index}>
            <Badge.Ribbon
              text={item.completed ? "complete" : "working"}
              color={item.completed ? "green" : "red"}
            >
              <Card
                title={
                  <div>
                    <Popconfirm
                      placement="top"
                      title={"Completed ?"}
                      description={"Are you sure it's complete?"}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Switch />
                    </Popconfirm>
                  </div>
                }
              >
                <p className="font-bold text-lg mb-6">{item.projectName}</p>
                <p className="border-[1px] border-slate-600 px-2 py-1 rounded-xl w-[150px] text-center mb-4">
                  Deadline:{item.deadline}
                </p>
                <div className="mb-4">
                  {item.completed ? (
                    <Progress percent={100} size="small" />
                  ) : (
                    <Progress percent={50} showInfo={false} />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <Avatar.Group>
                    <Avatar
                      size="small"
                      src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                    />
                    <a href="https://ant.design">
                      <Avatar
                        size="small"
                        style={{
                          backgroundColor: "#f56a00",
                        }}
                      >
                        K
                      </Avatar>
                    </a>
                    <Tooltip title="Ant User" placement="top">
                      <Avatar
                        size="small"
                        style={{
                          backgroundColor: "#87d068",
                        }}
                        icon={<UserOutlined />}
                      />
                    </Tooltip>
                    <Avatar
                      size="small"
                      style={{
                        backgroundColor: "#1677ff",
                      }}
                      icon={<AntDesignOutlined />}
                    />
                  </Avatar.Group>
                  <div>
                    <Link to={`/manager/project/details/${item._id}`}>
                      <Button type="default" shape="round">
                        Detail
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default TableProject;
