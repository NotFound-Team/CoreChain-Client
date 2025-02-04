import { createContext, useContext, useEffect, useState } from "react";
import fetchApi from "../services/fetchApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const checkAuth = async () => {
    try {
      const res = await fetchApi("/auth/isAuthenticated");
      if (res?.data?.data?.isAuthenticated) {
        setUser({
          userId: res.data.data.user.userId,
          role: res.data.data.user.role,
        });
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
