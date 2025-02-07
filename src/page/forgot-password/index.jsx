import { NavLink, Outlet } from "react-router-dom";
import imgForgotPassword from "../../image/forgot-password.png";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

const ForgotPassword = () => {
  return (
    <div className="bg-[#327cd0] w-full h-screen flex items-center justify-center">
      <div className="bg-slate-100 rounded-2xl p-6 flex flex-col items-center justify-between gap-y-6 w-1/3">
        <div className="w-5/12">
          <img
            src={imgForgotPassword}
            alt="forgot-password"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="flex space-x-4">
          <NavLink
            to={"/forgot-password/phone"}
            className={({ isActive }) =>
              isActive
                ? "shadow-lg bg-white rounded-3xl px-6 py-2 flex items-center space-x-2 text-green-500"
                : "border-2 border-solid outline-gray-600 rounded-3xl px-6 py-2 flex items-center space-x-2 text-gray-600"
            }
            aria-label="Phone option"
          >
            <IoCheckmarkCircleSharp />
            <span>Phone</span>
          </NavLink>
          <NavLink
            to={"/forgot-password/email"}
            className={({ isActive }) =>
              isActive
                ? "shadow-lg bg-white rounded-3xl px-6 py-2 flex items-center space-x-2 text-green-500"
                : "border-2 border-solid outline-gray-600 rounded-3xl px-6 py-2 flex items-center space-x-2 text-gray-600"
            }
            aria-label="Email option"
            activeClassName="text-red-50"
          >
            <IoCheckmarkCircleSharp />
            <span>Email</span>
          </NavLink>
        </div>
        <div>
          <h3 className="font-bold text-xl text-center">
            Verify Your Identity
          </h3>
          <p className="text-center text-sm">
            Enter your email or phone number to receive an OTP for password
            reset.
          </p>
          <p></p>
        </div>
        <div className="w-1/2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
