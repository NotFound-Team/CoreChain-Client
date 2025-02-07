import { Button, Form, Input } from "antd";
import { FaPhoneAlt } from "react-icons/fa";

const PhoneForgotPassword = () => {
  const onSubmitPhone = (e) => {
    console.log(e);
  };
  return (
    <Form onFinish={onSubmitPhone}>
      <div className="flex flex-col items-center gap-y-2">
        <Form.Item
          name="phone"
          rules={[{ required: true, message: "Please input your phone!" }]}
        >
          <Input prefix={<FaPhoneAlt />} />
        </Form.Item>
        <Form.Item>
          <Button
            className="rounded-3xl"
            type="primary"
            htmlType="submit"
            block
          >
            Send code
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default PhoneForgotPassword;
