import {
  Avatar,
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Select,
  Space,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { UserOutlined } from "@ant-design/icons";
import fetchApi from "../../../services/fetchApi";
import dayjs from "dayjs";
const { Option } = Select;

const CreateProject = ({ managerList, onAddProject }) => {
  const [form] = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (values) => {
    if (!date) {
      message.error("Please select a deadline.");
      return;
    }
    const newProject = { ...values, deadline: date };

    try {
      const response = await fetchApi("/auth/admin/project", "POST", {
        data: newProject,
      });
      message.success("Create success!");

      onAddProject(response.status);

      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      message.error(`${error}`);
    }
  };

  return (
    <>
      <Button type="primary" icon={<IoAddCircleOutline />} onClick={showModal}>
        Create Project
      </Button>
      <Modal
        title="Create Project"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          name="create-project"
          form={form}
          onFinish={handleSubmit}
        >
          <Form.Item label="Project Name" name="projectName">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>
          <Form.Item label="Deadline" name="deadline">
            <Space direction="vertical" size={12}>
              <DatePicker
                format="DD-MM-YYYY"
                onChange={(date) => {
                  setDate(dayjs(date).format("YYYY-MM-DDTHH:mm:ss"));
                }}
              />
            </Space>
          </Form.Item>
          <Form.Item label="Chose Manager" name="managerId">
            <Select allowClear style={{ width: "100%" }}>
              {managerList.map((item) => (
                <Option value={item._id} key={item._id}>
                  <Avatar size={16} icon={<UserOutlined />} /> {item.fullName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateProject;
