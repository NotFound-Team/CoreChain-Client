import { Navigate } from "react-router-dom";
import checkAuth from "../services/checkAuth";
import { useEffect, useState } from "react";

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
        return <div>Loading...</div>;
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
