import { Navigate } from "react-router-dom";
import checkAuth from "../services/checkAuth";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const PrivateRoute = ({ children, roles = [] }) => {
  const [auth, setAuth] = useState({
    loading: true,
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    (async () => {
      const data = await checkAuth();
      setAuth({ loading: false, ...data });
    })();
  }, []);

  if (auth.loading) {
    return (
      <Spin
        fullscreen
        tip="Loading..."
        indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
      />
    );
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !roles.includes(auth.user?.role)) {
    return <Navigate to="*" replace />;
  }

  return children;
};

export default PrivateRoute;
