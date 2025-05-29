"use client";

// -- Context --
import { SocketProvider } from "@/context/SocketContext";
// -- Next --
import { usePathname } from "next/navigation";
// -- React --
import React from "react";

import ListConversation from "./listConversation";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const arrayPathname = pathname.split("/");

  React.useEffect(() => {
    if (arrayPathname.includes("chat")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [arrayPathname]);
  return (
    <SocketProvider>
      <div className="flex">
        {/* Sidebar (Danh sách chat) */}
        <aside className="w-full sm:w-[24%] pr-[25px] pl-[20px] h-screen flex flex-col">
          <ListConversation />
        </aside>

        {/* Nội dung chat (thay đổi theo URL) */}
        <main className="flex-1">{children}</main>
      </div>
    </SocketProvider>
  );
}
