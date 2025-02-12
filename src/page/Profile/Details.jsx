import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  // Radio,
  Row,
  Select,
  Typography,
} from "antd";
import { SaveOutlined } from "@ant-design/icons";
// import { useEffect, useState } from "react";
import fetchApi from "../../services/fetchApi";
import { useOutletContext } from "react-router-dom";
import formatDate from "../../helpers/date";
import { useState } from "react";

const UserProfileDetailsPage = () => {
  const { dataUser } = useOutletContext();
  const [date, setDate] = useState("");
  // const [dataUser, setDataUser] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  const onFinish = async (e) => {
    const {
      phone,
      email,
      identifiNumber,
      status,
      company,
      subscription,
      ...filteredData
    } = e;
    filteredData.birthday = date;
    console.log(filteredData);
    try {
      const response = await fetchApi("/auth/profile", "POST", {
        data: filteredData,
      });
      if (response.status === 200) {
        message.open({
          type: "success",
          content: response.data.message,
        });
      }
    } catch (error) {
      message.open({
        type: "error",
        content: `${error}`,
      });
    }
  };

  return (
    <div className="bg-white shadow-xl py-6 px-4 rounded-2xl">
      <Form
        form={form}
        name="user-profile-details-form"
        layout="vertical"
        initialValues={{
          identifiNumber: "474e2cd2-fc79-49b8-98fe-dab443facede",
          phone: dataUser.phone || "",
          fullName: dataUser.fullName || "",
          company: "Core Chain",
          address: dataUser.address || "",
          email: dataUser.email || "",
          birthday: formatDate(dataUser.birthday),
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
              <Input readOnly={true} />
            </Form.Item>
          </Col>
          <Col sm={24} lg={12}>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Please input your phone!" }]}
            >
              <Input readOnly={true} />
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
            {/* <Form.Item
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
            </Form.Item> */}
            <Form.Item
              label="Birthday"
              name="birthday"
              // rules={[
              //   { required: true, message: "Please select your birthday!" },
              // ]}
            >
              <DatePicker
                format={"YYYY-MM-DD"}
                onChange={(date, dateString) => {
                  setDate(dateString);
                }}
              />
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
