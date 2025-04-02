"use client";

// -- react-icon --
import { FaFileImage, FaMicrophone, FaPaperPlane, FaVideo } from "react-icons/fa";
import { IoMdInformationCircle } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";

// -- next --
import Image from "next/image";

// -- mui --
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";

// --react --
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSocket } from "@/hooks/useSocket";
import { useParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Message } from "@/types/message";

export default function Conversation({ chatId }: { chatId: string }) {
  const [message, setMessage] = useState("");
  const [listMessages, setListMessages] = useState<Message[]>([]);
  const scollChat = useRef<HTMLDivElement>(null);
  const socket = useSocket();
  const { user } = useAuth();
  const params = useParams();
  const conversationId = params.chatId?.toString();

  // List message
  const renderedMessages = useMemo(() => {
    return listMessages.map((item) => (
      <li key={item._id} className={item.senderId === user?._id ? "ml-auto" : "mr-auto"}>
        <div className="flex items-center gap-x-4">
          {item.senderId !== user?._id && (
            <Image
              src="/images/img_avatar.png"
              alt="avatar"
              width={51}
              height={50}
              style={{ height: "auto" }}
              className="overflow-hidden rounded-full"
            />
          )}
          <div className="text-white rounded-2xl bg-[#5051F9] px-[24px] py-[8px]">{item.content}</div>
        </div>
      </li>
    ));
  }, [listMessages, user]);

  // Send message
  const sendMessage = useCallback(() => {
    if (message.trim() !== "" && socket) {
      socket.emit(
        "sendMessage",
        {
          conversationId,
          senderId: user?._id,
          content: message,
        },
        (ack: Message) => {
          setListMessages((prev) => [...prev, ack]);
        }
      );
      setMessage(""); // Clear message input after sending
    }
  }, [message, socket, conversationId, user]);

  // Fetch messages on component mount and subscribe to new messages
  useEffect(() => {
    socket?.emit("getMessages", { conversationId }, (data: Message[]) => {
      const reversedData = [...data].reverse();
      setListMessages(reversedData);
    });

    const handleNewMessage = (msg: Message) => {
      setListMessages((prev) => [msg, ...prev]);
      console.log("New Message", msg);
    };

    socket?.on("newMessage", handleNewMessage);

    return () => {
      if (socket) {
        socket.off("newMessage", handleNewMessage);
      }
    };
  }, [socket, conversationId]);

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (scollChat.current) {
      scollChat.current.scrollTop = scollChat.current.scrollHeight;
    }
  }, [listMessages]);

  return (
    <section className="flex-1 bg-[#F2F3F7] flex flex-col h-screen z-20">
      <div className="flex items-center justify-between shadow-md">
        <div className="flex items-center p-2 gap-x-4">
          <Image
            src="/images/img_avatar.png"
            alt="avatar"
            width={51}
            height={50}
            style={{ height: "auto" }}
            className="overflow-hidden rounded-full"
          />
          <div>
            <h3 className="text-[16px] font-bold text-[#1A1D1F]">Killan James</h3>
            <p className="text-[14px] text-[#0c663f]">Online</p>
          </div>
        </div>
        <ul className="flex-center gap-x-4 text-2xl text-[#1A91FF]">
          <li className="hover:bg-gray-50 rounded-full w-[40px] h-[40px] flex-center">
            <IoCall />
          </li>
          <li className="hover:bg-gray-50 rounded-full w-[40px] h-[40px] flex-center">
            <FaVideo />
          </li>
          <li className="hover:bg-gray-50 rounded-full w-[40px] h-[40px] flex-center">
            <IoMdInformationCircle />
          </li>
        </ul>
      </div>

      <div ref={scollChat} className="flex-1 py-6 overflow-y-auto">
        <ul className="flex flex-col gap-y-4 px-2 pb-20">{renderedMessages}</ul>
      </div>

      <div className="bg-[#ECEFFA] sticky bottom-0 left-0 right-0 py-3 px-6 z-20">
        <Paper
          component="form"
          onSubmit={(e) => e.preventDefault()}
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            borderRadius: 20,
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <IconButton sx={{ p: "8px", color: "#4A90E2" }} aria-label="microphone">
            <FaMicrophone />
          </IconButton>
          <IconButton sx={{ p: "8px", color: "#4A90E2" }} aria-label="image upload">
            <FaFileImage />
          </IconButton>
          <IconButton sx={{ p: "8px", color: "#4A90E2" }} aria-label="emoji">
            <BsEmojiSmile />
          </IconButton>
          <IconButton sx={{ p: "8px", color: "#4A90E2" }} aria-label="location">
            <FaLocationDot />
          </IconButton>

          <InputBase
            sx={{
              ml: 1,
              flex: 1,
              padding: "10px",
              borderRadius: 20,
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Add a comment..."
            inputProps={{ "aria-label": "Add a comment..." }}
          />

          <IconButton type="button" sx={{ p: "8px", color: "#4A90E2" }} aria-label="send" onClick={sendMessage}>
            <FaPaperPlane />
          </IconButton>
        </Paper>
      </div>
    </section>
  );
}
