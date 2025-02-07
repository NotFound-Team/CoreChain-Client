import { Button, Form, Input } from "antd";
import { MdEmail } from "react-icons/md";

const EmailForgotPassword = () => {
  const onSubmitEmail = (e) => {
    console.log(e);
  };
  return (
    <Form onFinish={onSubmitEmail}>
      <div className="flex flex-col items-center gap-y-2">
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input prefix={<MdEmail />} />
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

export default EmailForgotPassword;
