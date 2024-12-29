import {
  Avatar,
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Upload,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
const { Option } = Select;

const CreateTask = () => {
  const [form] = useForm();
  const { RangePicker } = DatePicker;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlSubmit = () => {};

  const props = {
    action: "/api/upload",
    onChange({ file, fileList }) {
      console.log(file);
      console.log(fileList);
      // if (file.status !== "uploading") {
      //   console.log(file, fileList);
      // }
    },
    defaultFileList: [],
  };

  return (
    <>
      <Button
        type="primary"
        icon={<IoAddCircleOutline />}
        onClick={showModal}
      ></Button>
      <Modal
        title="Add Task"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          name="create-task"
          form={form}
          onFinish={handlSubmit}
        >
          <Form.Item label="Task name" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Date" name="data">
            <Space direction="vertical" size={12}>
              <RangePicker
                showTime={{
                  format: "HH:mm",
                }}
                format="YYYY-MM-DD HH:mm"
                onChange={(value, dateString) => {
                  console.log("Selected Time: ", value);
                  console.log("Formatted Selected Time: ", dateString);
                }}
              />
            </Space>
          </Form.Item>
          <Form.Item label="Add guest">
            <Select mode="multiple" allowClear style={{ width: "100%" }}>
              <Option value="Wifi">
                <Avatar size={16} icon={<UserOutlined />} ti /> Jack
              </Option>
            </Select>
          </Form.Item>
          <Form.Item label="Upload attachments" name="file">
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Select Files</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateTask;
