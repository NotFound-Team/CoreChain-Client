import { Button } from "antd";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="bg-[url('https://eproshop.vn/img/error/error.png')] bg-cover bg-center text-center h-screen w-screen flex items-center justify-center flex-col gap-y-4">
      <h2 className="text-9xl font-bold">404</h2>
      <p className="text-white">PAGE NOT FOUND</p>
      <Button type="primary">
        <Link to="/">Go to home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
