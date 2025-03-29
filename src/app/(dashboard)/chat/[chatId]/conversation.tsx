"use client";

import { FaFileImage, FaMicrophone, FaPaperPlane, FaVideo } from "react-icons/fa";
import { IoMdInformationCircle } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import Image from "next/image";
import { IconButton, InputBase, Paper } from "@mui/material";
import { IoCall } from "react-icons/io5";
import io, { Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";

interface Tchat {
  message: string;
}

const token = localStorage.getItem("token");

const socket = io(`${process.env.API_URL}/chat`, {
  transports: ["websocket"],
  withCredentials: true,
  auth: {
    token,
  },
});

export default function Conversation({ chatId }: { chatId: string }) {
  const [message, setMessage] = useState("");
  const [listMessages, setListMessages] = useState<Tchat[]>([]);
  const scollChat = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    console.log(socket)
    const handleMessage = (data: Tchat) => {
      console.log("Received message:", data);
      setListMessages((prev) => [...prev, data]);
    };

    socket.on("newMessage", handleMessage);

    if (scollChat.current !== null) {
      scollChat.current.scrollTop = scollChat.current.scrollHeight;
    }

    return () => {
      if (socket) {
        socket.off("newMessage", handleMessage);
        socket.disconnect();
      }
    };
  }, [chatId]);

  const sendMessage = () => {
    if (message.trim() !== "" && socket) {
      socket.emit("getMessages", { message });
      setMessage("");
    }
  };
  console.log(listMessages);

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
        <ul className="flex flex-col gap-y-4 px-2">
          {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item, index) => (
            <li key={index} className={item % 2 === 0 ? "mr-auto" : "ml-auto"}>
              <div className="flex items-center gap-x-4">
                {item % 2 === 0 && (
                  <Image
                    src="/images/img_avatar.png"
                    alt="avatar"
                    width={51}
                    height={50}
                    style={{ height: "auto" }}
                    className="overflow-hidden rounded-full"
                  />
                )}
                <div className="text-white rounded-2xl bg-[#5051F9] px-[24px] py-[8px]">Hello</div>
                {item % 2 !== 0 && (
                  <Image
                    src="/images/img_avatar.png"
                    alt="avatar"
                    width={51}
                    height={50}
                    style={{ height: "auto" }}
                    className="overflow-hidden rounded-full"
                  />
                )}
              </div>
            </li>
          ))} */}
          {listMessages.map((message, index) => (
            <li key={index} className="ml-auto">
              <div className="flex items-center gap-x-4">
                <Image
                  src="/images/img_avatar.png"
                  alt="avatar"
                  width={51}
                  height={50}
                  style={{ height: "auto" }}
                  className="overflow-hidden rounded-full"
                />
                <div className="text-white rounded-2xl bg-[#5051F9] px-[24px] py-[8px]">{message.message}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-[#ECEFFA] sticky bottom-2 left-0 right-0 py-4 px-6 z-20">
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
          {/* Microphone Icon */}
          <IconButton sx={{ p: "8px", color: "#4A90E2" }} aria-label="microphone">
            <FaMicrophone />
          </IconButton>

          {/* Image Upload Icon */}
          <IconButton sx={{ p: "8px", color: "#4A90E2" }} aria-label="image upload">
            <FaFileImage />
          </IconButton>

          {/* Emoji Icon */}
          <IconButton sx={{ p: "8px", color: "#4A90E2" }} aria-label="emoji">
            <BsEmojiSmile />
          </IconButton>

          {/* Location Icon */}
          <IconButton sx={{ p: "8px", color: "#4A90E2" }} aria-label="location">
            <FaLocationDot />
          </IconButton>

          {/* Input Field */}
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
                console.log("ENTER");
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Add a comment..."
            inputProps={{ "aria-label": "Add a comment..." }}
          />

          {/* Send Button Icon */}
          <IconButton type="button" sx={{ p: "8px", color: "#4A90E2" }} aria-label="send" onClick={sendMessage}>
            <FaPaperPlane />
          </IconButton>
        </Paper>
      </div>
    </section>
  );
}
