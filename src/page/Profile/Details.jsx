import {
  Button,
  Col,
  Form,
  Input,
  message,
  Radio,
  Row,
  Select,
  Typography,
  Spin,
} from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import fetchApi from "../../services/fetchApi";

const UserProfileDetailsPage = () => {
  const [dataUser, setDataUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    const dataGet = async () => {
      try {
        const data = await fetchApi("/users");
        setDataUser(data[0]);
        setLoading(false);
        form.setFieldsValue({
          ...data[0],
          subscription: "pro",
          status: "active",
        });
      } catch (error) {
        message.error(`Failed to fetch user data: ${error.message}`);
        setLoading(false);
      }
    };
    dataGet();
  }, [form]);

  const onFinish = (e) => {
    console.log(e);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="bg-white shadow-xl py-6 px-4 rounded-2xl">
      <Form
        form={form}
        name="user-profile-details-form"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="on"
        requiredMark={false}
      >
        <Row gutter={[16, 0]}>
          <Col sm={24} lg={24}>
            <Form.Item
              label="User ID"
              name="identifiNumber"
              rules={[{ required: true, message: "Please input your id!" }]}
            >
              <Input
                readOnly={true}
                suffix={
                  <Typography.Paragraph
                    copyable={{ text: "474e2cd2-fc79-49b8-98fe-dab443facede" }}
                    style={{ margin: 0 }}
                  />
                }
              />
            </Form.Item>
          </Col>
          <Col sm={24} lg={12}>
            <Form.Item
              label="Full name"
              name="fullName"
              rules={[
                { required: true, message: "Please input your full name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sm={24} lg={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sm={24} lg={12}>
            <Form.Item
              label="Username"
              name="userName"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sm={24} lg={12}>
            <Form.Item
              label="Company"
              name="company"
              rules={[
                { required: true, message: "Please input your company!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sm={24} lg={24}>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please input your address!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sm={24} lg={12}>
            <Form.Item
              label="Subscription"
              name="subscription"
              rules={[
                { required: true, message: "Please select your subscription!" },
              ]}
            >
              <Select
                options={[
                  { value: "free", label: "Free" },
                  { value: "pro", label: "Pro" },
                  { value: "enterprise", label: "Enterprise" },
                  { value: "custom", label: "Custom", disabled: true },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Status"
              name="status"
              rules={[
                { required: true, message: "Please select your status!" },
              ]}
            >
              <Radio.Group>
                <Radio value="active">Active</Radio>
                <Radio value="inactive">Inactive</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
            Save changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserProfileDetailsPage;
