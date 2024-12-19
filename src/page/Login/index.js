import { Button, Checkbox, Form, Input } from "antd";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import imgBackGround from "../../image/thumb-1920-1297452.jpg";
import Fly from "../../image/Lovepik_com-380197117-blue-aircraft-rocket-clip-art.gif";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const formLoginRef = useRef(null);
  const formBgRef = useRef(null);
  const flyAnimationRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      formLoginRef.current,
      { x: 500, duration: 1.5, ease: "expo.out" },
      { x: 0, duration: 1.5, ease: "expo.out" }
    );
    gsap.fromTo(
      formBgRef.current,
      { x: -500, duration: 1.5, ease: "back.out(1.7)" },
      { x: 0, duration: 1.5, ease: "back.out(1.7)" }
    );
  }, []);

  const handleLogin = () => {
    gsap.to(flyAnimationRef.current, {
      y: -window.innerHeight,
      opacity: 5,
      scale: 1.5,
      duration: 5,
      ease: "slow(0.7,0.7,false)",
    });
  };

  return (
    <>
      <div
        style={{ backgroundImage: `url(${imgBackGround})` }}
        className="flex items-center justify-center w-full bg-cover h-screen shadow-2xl"
      >
        <div className="flex items-center justify-center bg-white shadow-lg rounded-xl w-2/4">
          <div ref={formLoginRef} className="w-1/2 p-8">
            <Form layout="vertical" name="form-login" onFinish={handleLogin}>
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
        <div
          ref={flyAnimationRef}
          className="z-10 w-[100px] h-auto translate-x-[-770px] translate-y-[400px] opacity-0"
        >
          <img className="w-full h-auto object-cover" src={Fly} alt="fly" />
        </div>
      </div>
    </>
  );
};

export default Login;
