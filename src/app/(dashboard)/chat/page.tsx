"use client";

// -- React-icon --
import { LuMessageCircleMore } from "react-icons/lu";

export default function ChatPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-y-2 h-full text-gray-500 text-4xl">
      <LuMessageCircleMore />
      <span className="text-xl">Select a conversation to start...</span>
    </div>
  );
}
