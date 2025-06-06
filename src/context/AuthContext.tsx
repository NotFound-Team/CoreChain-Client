"use client";

// -- react --
import { createContext, ReactNode, useEffect, useState } from "react";

// -- next --
import { usePathname, useRouter } from "next/navigation";

// -- Type --
import { UserLogin, User, AuthContextType } from "@/types/auth";

// -- utils --
import fetchApi from "@/utils/fetchApi";

// -- configs --
import { CONFIG_API } from "@/configs/api";

import Cookies from "js-cookie";
import FallbackSpinner from "@/components/fall-back";

import { jwtDecode, JwtPayload } from "jwt-decode";
// import axios from "axios";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type MyJwtPayload = JwtPayload & { exp: number };

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAndFetchUser = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token && pathname !== "/") {
        setLoading(false);
        router.push("/login");
        return;
      }

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const decoded = jwtDecode<MyJwtPayload>(token);

        // Token hết hạn
        if (decoded.exp < Date.now() / 1000 - 1) {
          // try {
          //   const responses = await fetchApi(`${CONFIG_API.AUTH.REFRESH}`, "GET", null, {
          //     withCredentials: true,
          //   });
          //   console.log(responses);
          //   const response = await axios.get(`${BASE_URL}${CONFIG_API.AUTH.REFRESH}`, {
          //     withCredentials: true,
          //     headers: {
          //       Authorization: `Bearer ${token}`,
          //     },
          //   });
          //   console.log(response);
          // } catch (error) {
          //   console.error("Refresh token failed:", error);
          // }

          localStorage.removeItem("token");
          localStorage.removeItem("projects");
          localStorage.removeItem("list-conversation");
          Cookies.remove("token");

          router.push("/login");
          return;
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        if (pathname !== "/") {
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }

      try {
        setLoading(true);
        // Nếu token còn hạn thì fetch user
        const response = await fetchApi(CONFIG_API.USER.ACCOUNT, "GET");

        if (response.statusCode === 200 && response.data) {
          const newUser = { ...response.data.user, token };
          setUser(newUser);
          setLoading(false);
        } else {
          throw new Error("User data not found");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        if (pathname !== "/") {
          router.push("/login");
        }
        setLoading(false);
      }
    };

    checkAndFetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, user?.token]);

  const login = async ({ username, password }: UserLogin) => {
    setLoading(true);
    try {
      const response = await fetchApi(CONFIG_API.AUTH.LOGIN, "POST", { username, password });

      if (response) {
        const { user, access_token } = response.data;
        const newUser = { ...user, access_token };
        localStorage.setItem("token", access_token);
        Cookies.set("token", access_token, { expires: 1 });
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
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    Cookies.remove("token");
    setUser(null);
    router.push("/login");
  };

  if (loading) {
    return (
      <>
        <FallbackSpinner />
      </>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, setLoading, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// export { AuthContext, AuthProvider }
