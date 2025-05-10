"use client";

import Image from "next/image";
import { IoMdNotificationsOff } from "react-icons/io";
import { TbUsersGroup } from "react-icons/tb";
import { GrContactInfo } from "react-icons/gr";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { ConversationItem } from "@/types/chat";

export default function ConversationInfo({ chatId }: { chatId: string }) {
  const [otherInfo, setOtherInfo] = useState<ConversationItem | null>(null);
  useEffect(() => {
    const listConversationStr = localStorage.getItem("list-conversation");
    if (listConversationStr && !otherInfo) {
      const listConversation = JSON.parse(listConversationStr);
      const result = listConversation.filter((item: ConversationItem) => item.id === chatId);
      setOtherInfo(result[0]);
    }
  }, [chatId, otherInfo]);
  return (
    <aside className="w-full sm:w-[24%] pl-4 bg-white shadow-md">
      <div className="flex flex-col items-center justify-center pb-2 gap-y-4">
        {/* Avatar */}
        <Image src={otherInfo?.avatar || ""} alt="avatar" width={100} height={100} className="overflow-hidden rounded-full" />

        {/* User Info */}
        <div className="flex flex-col items-center text-center">
          <h3 className="text-[16px] font-bold text-[#1A1D1F]">{otherInfo?.name}</h3>
          <p className="text-[14px] text-[#0c663f]">Online</p>
        </div>

        {/* Action Icons */}
        <ul className="flex gap-x-3 text-2xl">
          <li className="hover:bg-gray-100 rounded-full w-[40px] h-[40px] flex items-center justify-center cursor-pointer">
            <GrContactInfo />
          </li>
          <li className="hover:bg-gray-100 rounded-full w-[40px] h-[40px] flex items-center justify-center cursor-pointer">
            <IoMdNotificationsOff />
          </li>
          <li className="hover:bg-gray-100 rounded-full w-[40px] h-[40px] flex items-center justify-center cursor-pointer">
            <TbUsersGroup />
          </li>
        </ul>

        {/* Media Section */}
        <div className="w-full">
          <h4 className="text-lg font-semibold mb-2">Image/Video</h4>
          <ul className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <li key={index} className="w-[50px] h-[50px] bg-gray-200 rounded-md"></li>
            ))}
          </ul>
          <div className="mt-2">
            <Button
              variant="contained"
              size="small"
              className="w-full"
              sx={{ backgroundColor: "#C5C6CA", color: "#000", fontWeight: 600 }}
            >
              See all
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
