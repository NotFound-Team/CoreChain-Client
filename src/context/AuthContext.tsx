"use client";

// -- react --
import { createContext, ReactNode, useEffect, useState } from "react";

// -- next --
import { useRouter } from "next/navigation";

// -- Type --
import { UserLogin, User, AuthContextType } from "@/types/auth";

// -- utils --
import fetchApi from "@/utils/fetchApi";

// -- configs --
import { CONFIG_API } from "@/configs/api";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      router.push("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        // const userData = await fetchApi<User>("/api/auth/me", "GET");
        // setUser(userData);
        router.push("/dashboard");
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const login = async ({ username, password }: UserLogin) => {
    try {
      const response = await fetchApi(CONFIG_API.AUTH.LOGIN, "POST", { username, password });
      console.log(response.data);
      if (response) {
        const { user, access_token } = response.data;
        localStorage.setItem("token", access_token);
        setUser(user);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Data failed:", error.message || error);
        throw error;
      } else {
        console.error("Unknown error occurred");
        throw new Error("Unknown error occurred");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, loading, setUser, login, logout }}>{children}</AuthContext.Provider>;
};

// export { AuthContext, AuthProvider }
