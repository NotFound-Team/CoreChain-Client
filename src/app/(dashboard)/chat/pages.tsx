"use client";

// -- Next --
import { usePathname } from "next/navigation";
import Image from "next/image";
// -- React -- 
import * as React from "react";
// -- MUI --
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

// -- React-icon
import { IoCall, IoSearch } from "react-icons/io5";
import { FaFileImage, FaMicrophone, FaPaperPlane, FaVideo } from "react-icons/fa";
import { IoMdInformationCircle, IoMdNotificationsOff } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { TbUsersGroup } from "react-icons/tb";
import { GrContactInfo } from "react-icons/gr";

export default function Chat() {
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
      
      {/* Left Sidebar */}
      <aside className="w-full sm:w-[24%] px-[25px] h-screen flex flex-col">
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

      {/* Chat Section */}
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

        <div className="flex-1 py-6 overflow-y-auto">
          <ul className="flex flex-col gap-y-4 px-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item, index) => (
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
            ))}
          </ul>
        </div>

        <div className="bg-[#ECEFFA] sticky bottom-2 left-0 right-0 py-4 px-6 z-20">
          <Paper
            component="form"
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
              placeholder="Add a comment..."
              inputProps={{ "aria-label": "Add a comment..." }}
            />

            {/* Send Button Icon */}
            <IconButton type="button" sx={{ p: "8px", color: "#4A90E2" }} aria-label="send">
              <FaPaperPlane />
            </IconButton>
          </Paper>
        </div>
      </section>

      {/* Info Sidebar */}
      <aside className="w-full sm:w-[24%] pl-4 bg-white shadow-md">
        <div className="flex flex-col items-center justify-center pb-2 gap-y-4">
          {/* Avatar */}
          <Image
            src="/images/img_avatar.png"
            alt="avatar"
            width={100}
            height={100}
            className="overflow-hidden rounded-full"
          />

          {/* User Info */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-[16px] font-bold text-[#1A1D1F]">Killan James</h3>
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

    </div>
  );
}
