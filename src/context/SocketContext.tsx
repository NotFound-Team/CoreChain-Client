"use client";

// -- react --
import { createContext, ReactNode, useEffect, useRef, useState } from "react";

// -- next --
import { useRouter } from "next/navigation";

// -- configs --
import { CONFIG_API } from "@/configs/api";
// hook
import { useAuth } from "@/hooks/useAuth";
// socket.io
import { io, Socket } from "socket.io-client";

export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user?.token) {
      socketRef.current?.disconnect();
      socketRef.current = null;
      setSocket(null);
      return router.push("/login");
    }

    const newSocket = io(CONFIG_API.CHAT.INDEX, {
      transports: ["websocket"],
      withCredentials: true,
      auth: { token: user.token },
    });

    socketRef.current = newSocket;
    setSocket(newSocket);

    newSocket.on("connect", () => {
      // console.log("🔌 Socket connected!");
    });

    newSocket.on("disconnect", () => {
      // console.log("❌ Socket disconnected!");
    });

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
      setSocket(null);
    };
  }, [user, router]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
