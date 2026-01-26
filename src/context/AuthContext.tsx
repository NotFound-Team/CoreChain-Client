"use client";

// -- react --
import { createContext, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";

// -- next --
import { usePathname, useRouter } from "next/navigation";

// -- Type --
import { UserLogin, User, AuthContextType } from "@/types/auth";

// -- utils --
import fetchApi from "@/utils/fetchApi";

// -- configs --
import { BASE_URL, CONFIG_API } from "@/configs/api";

import Cookies from "js-cookie";
import FallbackSpinner from "@/components/fall-back";

import { jwtDecode, JwtPayload } from "jwt-decode";
import axios from "axios";
import useFcmToken from "@/hooks/useFcmToken";
import { updateFcmToken } from "@/services/user.service";
import { PUBLIC_ROUTES } from "@/configs/route";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type MyJwtPayload = JwtPayload & { exp: number };

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();

  const hasCheckedAuth = useRef(false);

  const { fcmToken } = useFcmToken();

  useEffect(() => {
    if (hasCheckedAuth.current) return;
    hasCheckedAuth.current = true;

    const checkAndFetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsInitializing(false);
        if (!PUBLIC_ROUTES.includes(pathname)) {
          router.push("/login");
        }
        return;
      }

      try {
        const decoded = jwtDecode<MyJwtPayload>(token);

        // Token hết hạn
        if (decoded.exp < Date.now() / 1000 - 1) {
          localStorage.removeItem("token");
          localStorage.removeItem("projects");
          localStorage.removeItem("list-conversation");
          setIsInitializing(false);
          router.push("/login");
          return;
        }

        // Token còn hạn - fetch user data
        const response = await fetchApi(CONFIG_API.AUTH.ACCOUNT, "GET");
        console.log("ACCOUNT", response);
        if (response.statusCode === 200 && response.data) {
          const newUser = { ...response.data.user, token };
          setUser(newUser);
        } else {
          throw new Error("User data not found");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        localStorage.removeItem("token");
        Cookies.remove("token");
        if (pathname !== "/") {
          router.push("/login");
        }
      } finally {
        setIsInitializing(false);
      }
    };

    checkAndFetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    if (!user || !fcmToken) return;
    if (user.fcmToken === fcmToken) return;

    const updateIsFcmToken = async () => {
      try {
        await updateFcmToken({ fcmToken, id: user._id });

        // Update local user state
        setUser((prev) => (prev ? { ...prev, fcmToken } : prev));
      } catch (error) {
        console.error("Failed to update FCM token:", error);
      }
    };

    updateIsFcmToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id, fcmToken]);

  // Memoized login function
  const login = useCallback(async ({ username, password }: UserLogin) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}${CONFIG_API.AUTH.LOGIN}`,
        { username, password },
        {
          withCredentials: true,
        },
      );

      if (response) {
        const { user, access_token } = response.data.data;
        const newUser = { ...user, access_token };
        localStorage.setItem("token", access_token);
        setUser(newUser);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Login failed:", error.message || error);
        throw error;
      } else {
        console.error("Unknown error occurred");
        throw new Error("Unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Memoized logout function
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("projects");
    localStorage.removeItem("list-conversation");
    Cookies.remove("token");
    setUser(null);
    router.push("/login");
  }, [router]);

  const contextValue = useMemo(
    () => ({
      user,
      loading,
      isInitializing,
      setLoading,
      setUser,
      login,
      logout,
    }),
    [user, loading, isInitializing, login, logout],
  );

  if (isInitializing) {
    return <FallbackSpinner />;
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
