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

import Cookies from "js-cookie";
import FallbackSpinner from "@/components/fall-back";

import { jwtDecode, JwtPayload } from "jwt-decode";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type MyJwtPayload = JwtPayload & { exp: number };

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
    } else {
      const decoded = jwtDecode<MyJwtPayload>(token);
      if (decoded.exp < Date.now() / 1000) {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("projects");
        window.localStorage.removeItem("list-conversation");

        router.push("/login");
      }
    }
    const fetchUser = async () => {
      try {
        const response = await fetchApi(CONFIG_API.USER.ACCOUNT, "GET", undefined, {
          withCredentials: true,
        });
        if (response.statusCode === 200 && response.data) {
          const newUser = { ...response.data.user, token };
          setUser(newUser);
        } else {
          throw new Error("User data not found");
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Failed to fetch user data:", error.message);
          router.push("/login");
        } else {
          console.error("Unknown error occurred while fetching user data");
          router.push("/login");
        }
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
        const newUser = { ...user, access_token };
        localStorage.setItem("token", access_token);
        Cookies.set("token", access_token, { expires: 1 }); // Cookie sẽ hết hạn sau 1 ngày
        setUser(newUser);
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
    Cookies.remove("token");
    setUser(null);
  };

  if (loading) {
    return (
      <>
        <FallbackSpinner />
      </>
    ); // Hoặc có thể render spinner, hoặc gì đó cho trạng thái loading
  }

  return <AuthContext.Provider value={{ user, loading, setUser, login, logout }}>{children}</AuthContext.Provider>;
};

// export { AuthContext, AuthProvider }
