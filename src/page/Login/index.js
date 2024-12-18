import { Button, Checkbox, Form, Input } from "antd";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const formLoginRef = useRef(null);
  const formBgRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      formLoginRef.current,
      { x: 200, duration: 1.5, ease: "expo.out" },
      { x: 0, duration: 1.5, ease: "expo.out" }
    );
    gsap.fromTo(
      formBgRef.current,
      { x: -500, duration: 1.5, ease: "back.out(1.7)" },
      { x: 0, duration: 1.5, ease: "back.out(1.7)" }
    );
  }, []);
  return (
    <>
      <div className="bg-gray-600 h-screen flex items-center justify-center">
        <div className="flex items-center justify-center bg-white shadow-lg rounded-xl w-2/4">
          <div ref={formLoginRef} className="w-1/2 p-8">
            <Form layout="vertical" name="form-login">
              <h3 className="text-center font-bold mb-16 text-transparent text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                LOGIN
              </h3>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password!"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters!",
                  },
                ]}
              >
                <Input.Password
                  visibilityToggle={{
                    visible: passwordVisible,
                    onVisibleChange: setPasswordVisible,
                  }}
                />
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked" label={null}>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Form.Item>
                <Button type="primary" block htmlType="submit" size="large">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div
            ref={formBgRef}
            className="flex-1 h-[500px] flex flex-col items-center justify-center bg-orange-600 rounded-r-xl text-white"
          >
            <h3 className="text-2xl font-semibold mb-4">New Here?</h3>
            <p className="mb-4">Create an account to enjoy our services.</p>
            <Button
              type="ghost"
              size="large"
              className="bg-white text-orange-600"
            >
              <Link to="/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
