"use client";

import { useParams } from "next/navigation";
import Conversation from "./conversation";
import ConversationInfo from "./conversationInfo";

export default function Index() {
  const params = useParams();
  const chatId = typeof params.chatId === "string" ? params.chatId : undefined;

  if (!chatId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-screen flex">
      <Conversation chatId={chatId} />
      <ConversationInfo chatId={chatId} />
    </div>
  );
}
