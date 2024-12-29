import { Button, Col, Form, Input, Radio, Row, Select, Typography } from "antd";
import { SaveOutlined } from "@ant-design/icons";

const UserProfileDetailsPage = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <Form
      name="user-profile-details-form"
      layout="vertical"
      initialValues={{
        id: "474e2cd2-fc79-49b8-98fe-dab443facede",
        username: "kelvink96",
        firstName: "Kelvin",
        middleName: "Kiptum",
        lastName: "Kiprop",
        company: "Design Sparx",
        email: "kelvin.kiprop96@gmail.com",
        subscription: "pro",
        status: "active",
      }}
      onFinish={onFinish}
      autoComplete="on"
      requiredMark={false}
    >
      <Row gutter={[16, 0]}>
        <Col sm={24} lg={24}>
          <Form.Item
            label="User ID"
            name="id"
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
        <Col sm={24} lg={8}>
          <Form.Item
            label="First name"
            name="firstName"
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col sm={24} lg={8}>
          <Form.Item
            label="Middle name"
            name="middleName"
            rules={[
              { required: true, message: "Please input your middle name!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col sm={24} lg={8}>
          <Form.Item
            label="Last name"
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" },
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
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col sm={24} lg={12}>
          <Form.Item
            label="Company"
            name="company"
            rules={[{ required: true, message: "Please input your company!" }]}
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
            rules={[{ required: true, message: "Please select your status!" }]}
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
  );
};

export default UserProfileDetailsPage;
