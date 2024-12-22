import { useGSAP } from "@gsap/react";
import { Button, Form, Input } from "antd";

import imgBackGround from "../../image/thumb-1920-1297452.jpg"; //https://images4.alphacoders.com/129/1297452.png
import Fly from "../../image/Lovepik_com-380197117-blue-aircraft-rocket-clip-art.gif";

import gsap from "gsap";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const formRegisterRef = useRef(null);
  const formBgRef = useRef(null);
  const flyAnimationRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      formRegisterRef.current,
      { x: -500, duration: 1.5, ease: "expo.out" },
      { x: 0, duration: 1.5, ease: "expo.out" }
    );
    gsap.fromTo(
      formBgRef.current,
      { x: 500, duration: 1.5, ease: "back.out(1.7)" },
      { x: 0, duration: 1.5, ease: "back.out(1.7)" }
    );
  }, []);

  const handleRegister = () => {
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
        <div className="flex items-center justify-center bg-white shadow-lg rounded-xl w-2/4 max-md:w-[80%]">
          <div
            ref={formBgRef}
            className="flex-1 h-[500px] flex flex-col items-center justify-center bg-orange-600 rounded-l-xl text-white z-10 max-md:hidden  "
          >
            <h3 className="text-2xl font-semibold mb-4">New Here?</h3>
            <p className="mb-4">Create an account to enjoy our services.</p>
            <Button
              type="ghost"
              size="large"
              className="bg-white text-orange-600"
            >
              <Link to="/login">Sign Up</Link>
            </Button>
          </div>
          <div ref={formRegisterRef} className="w-1/2 px-8 py-6 max-md:w-full">
            <Form layout="vertical" name="form-login" onFinish={handleRegister}>
              <h3 className="text-center font-bold mb-14 text-transparent text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 max-md:text-2xl max-md:mb-8">
                REGISTER
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
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your username",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item className="w-full mb-0">
                <Form.Item
                  className="inline-block w-1/2 max-md:w-full"
                  label="Password"
                  name="password"
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
                  // style={{ display: "inline-block", width: "calc(50% - 8px)" }}
                >
                  <Input.Password
                    visibilityToggle={{
                      visible: passwordVisible,
                      onVisibleChange: setPasswordVisible,
                    }}
                  />
                </Form.Item>
                <Form.Item
                  className="inline-block w-1/2 max-md:w-full"
                  label="Comfirm Password"
                  name="comfirmPassword!"
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
                  // style={{
                  //   display: "inline-block",
                  //   width: "calc(50% - 8px)",
                  //   marginLeft: "5px",
                  // }}
                >
                  <Input.Password
                    visibilityToggle={{
                      visible: passwordVisible,
                      onVisibleChange: setPasswordVisible,
                    }}
                  />
                </Form.Item>
              </Form.Item>

              <Form.Item>
                <Button type="primary" block htmlType="submit" size="large">
                  Register
                </Button>

                <div className="md:hidden max-md:block">
                  <Link to="/login">Login?</Link>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div
          ref={flyAnimationRef}
          className="z-10 w-[100px] h-auto translate-x-[-770px] translate-y-[400px] opacity-0 max-md:hidden"
        >
          <img className="w-full h-auto object-cover" src={Fly} alt="fly" />
        </div>
      </div>
    </>
  );
};

export default Register;
