"use client";

import Image from "next/image";
import { IconButton, InputBase, Paper } from "@mui/material";
import { IoSearch } from "react-icons/io5";
import { usePathname } from "next/navigation";
import React from "react";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const arrayPathname = pathname.split("/");

  React.useEffect(() => {
    if (arrayPathname.includes("chat")) {
      document.body.style.overflow = "hidden";
      console.log("OK");
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [arrayPathname]);
  return (
    <div className="flex">
      {/* Sidebar (Danh sách chat) */}
      <aside className="w-full sm:w-[24%] pr-[25px] pl-[20px] h-screen flex flex-col">
        <header>
          <h1 className="text-3xl font-semibold mb-4">Messages</h1>
          <div className="mb-4">
            <Paper
              component="form"
              sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: "100%", borderRadius: 3 }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search..."
                inputProps={{ "aria-label": "search messages" }}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <IoSearch />
              </IconButton>
            </Paper>
          </div>
        </header>
        <ul className="flex flex-col gap-y-8 overflow-y-auto flex-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item, index) => (
            <li key={index} className="flex items-center justify-between">
              <div>
                <Image
                  src="/images/img_avatar.png"
                  alt="avatar"
                  width={51}
                  height={50}
                  style={{ height: "auto" }}
                  className="overflow-hidden rounded-full"
                />
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-[#1A1D1F]">Killan James</h3>
                <p className="text-[14px] text-[#258C60]">Typing...</p>
              </div>
              <div className="flex flex-col items-end mr-2">
                <div className="text-[13px] text-[#A9ABAD]">4:30 PM</div>
                <div className="text-[14px] text-white flex-center w-[16px] h-[16px] rounded-full bg-red-500">1</div>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Nội dung chat (thay đổi theo URL) */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
