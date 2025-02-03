// ** React
import { useEffect, useRef, useState } from "react";

// React Router Dom
import { Link, useNavigate } from "react-router-dom";

// ** Antd
import { Button, Checkbox, Form, Input, message } from "antd";

// ** Image
import imgBackGround from "../../image/thumb-1920-1297452.jpg";
import Fly from "../../image/Lovepik_com-380197117-blue-aircraft-rocket-clip-art.gif";

// ** GSAP
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import fetchApi from "../../services/fetchApi";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const formLoginRef = useRef(null);
  const formBgRef = useRef(null);
  const flyAnimationRef = useRef(null);
  const navigate = useNavigate();

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

  const handleLogin = async (e) => {
    const loginData = {
      data: {
        email: e.email,
        password: e.password,
      },
    };
    try {
      const response = await fetchApi("/auth/login", "POST", loginData);
      if (response.status === 200) {
        message.success("Login successfully!");
        setTimeout(() => {
          gsap.to(flyAnimationRef.current, {
            y: -window.innerHeight,
            opacity: 5,
            scale: 1.5,
            duration: 5,
            ease: "slow(0.7,0.7,false)",
          });
        }, 3000);
        navigate("/manager");
      } else {
        message.error("Login failed, please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      message.error("An error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    const isAuthenticated = async () => {
      try {
        const response = await fetchApi("/auth/isAuthenticated");
        console.log(response);
      } catch (error) {
        console.log("error", error);
      }
    };
    isAuthenticated();
  }, []);

  return (
    <>
      <div
        style={{ backgroundImage: `url(${imgBackGround})` }}
        className="flex items-center justify-center w-full bg-cover h-screen shadow-2xl"
      >
        <div className="flex items-center justify-center bg-white shadow-lg rounded-xl w-2/4 max-md:w-[80%]">
          <div ref={formLoginRef} className="w-1/2 p-8 max-md:w-full">
            <Form layout="vertical" name="form-login" onFinish={handleLogin}>
              <h3 className="text-center font-bold mb-16 text-transparent text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 max-md:text-3xl max-md:mb-8">
                LOGIN
              </h3>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your username",
                  },
                  {
                    type: "email",
                    message: "The input is not a valid email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
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
              >
                <Input.Password
                  visibilityToggle={{
                    visible: passwordVisible,
                    onVisibleChange: setPasswordVisible,
                  }}
                />
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked" label={null}>
                <div className="flex items-center justify-between">
                  <Checkbox>Remember me</Checkbox>
                  <div className="md:hidden max-md:block">
                    <Link to={"/register"}>Register?</Link>
                  </div>
                </div>
              </Form.Item>
              <Form.Item>
                <Button type="primary" block htmlType="submit" size="large">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>

          {/* background right */}
          <div
            ref={formBgRef}
            className="flex-1 h-[500px] flex flex-col items-center justify-center bg-orange-600 rounded-r-xl text-white max-md:hidden"
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
          className="z-10 w-[100px] h-auto translate-x-[-770px] translate-y-[400px] opacity-0 max-md:hidden"
        >
          <img className="w-full h-auto object-cover" src={Fly} alt="fly" />
        </div>
      </div>
    </>
  );
};

export default Login;
