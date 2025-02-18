// ** Atnd
import { Avatar, Badge, Button, Card, Col, Progress, Row, Tooltip } from "antd";
import dayjs from "dayjs";
import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const TableProject = ({ data }) => {
  console.log(data);

  return (
    <Row gutter={[20, 20]} className="h-screen">
      {data.map((item, index) => {
        const deadline = item.deadline
          ? dayjs(item.deadline).format("DD-MM-YYYY HH:mm:ss")
          : "N/A";
        const progress = item.completed ? 100 : item.progress || 50;

        return (
          <Col
            xxl={6}
            xl={6}
            lg={6}
            md={12}
            sm={24}
            xs={24}
            key={item._id || index}
          >
            <Badge.Ribbon
              text={item.completed ? "Complete" : "Working"}
              color={item.completed ? "green" : "red"}
            >
              <Card
                title={<p className="font-bold text-lg">{item.projectName}</p>}
              >
                <p className="border border-slate-600 px-2 py-1 rounded-xl w-[150px] text-center mb-4">
                  Deadline: {deadline}
                </p>
                <Progress percent={progress} size="small" />

                <div className="flex items-center justify-between mt-4">
                  <Avatar.Group>
                    <Avatar
                      size="small"
                      src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                    />
                    <Tooltip title="User K">
                      <Avatar
                        size="small"
                        style={{ backgroundColor: "#f56a00" }}
                      >
                        K
                      </Avatar>
                    </Tooltip>
                    <Tooltip title="Ant User">
                      <Avatar
                        size="small"
                        style={{ backgroundColor: "#87d068" }}
                        icon={<UserOutlined />}
                      />
                    </Tooltip>
                    <Avatar
                      size="small"
                      style={{ backgroundColor: "#1677ff" }}
                      icon={<AntDesignOutlined />}
                    />
                  </Avatar.Group>

                  <div>
                    <Link to={`/admin/project/details/${item._id}`}>
                      <Button type="default" shape="round">
                        Detail
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </Badge.Ribbon>
          </Col>
        );
      })}
    </Row>
  );
};

export default TableProject;
