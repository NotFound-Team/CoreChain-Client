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
import { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { UserOutlined } from "@ant-design/icons";
import fetchApi from "../../../services/fetchApi";
const { Option } = Select;

const CreateProject = ({ managerList }) => {
  const [form] = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState("");
  const [dataPost, setDataPost] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlSubmit = (e) => {
    if (!date) {
      message.error("Please select a deadline.");
      return;
    }
    e.deadline = date;
    setDataPost({
      ...e,
    });
  };
  useEffect(() => {
    if (dataPost) {
      const projectPost = async () => {
        try {
          await fetchApi("/auth/admin/project", "POST", { data: dataPost });
          message.open({
            type: "success",
            content: "Create success!",
          });
          setIsModalOpen(false);
          form.resetFields();
          setDataPost(null);
        } catch (error) {
          message.open({
            type: "error",
            content: `${error}`,
          });
        }
      };
      projectPost();
    }
  }, [form, dataPost]);

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
          onFinish={handlSubmit}
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
                onChange={(date, dateString) => {
                  setDate(dateString);
                }}
              />
            </Space>
          </Form.Item>
          <Form.Item label="Chose Manager" name="managerId">
            <Select allowClear style={{ width: "100%" }}>
              {managerList.map((item) => (
                <Option value={item._id} key={item._id}>
                  <Avatar size={16} icon={<UserOutlined />} ti />{" "}
                  {item.fullName}
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
