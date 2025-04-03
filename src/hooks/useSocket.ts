"use client"

// -- Context --
import { SocketContext } from "@/context/SocketContext";
// -- React --
import { useContext } from "react";

export const useSocket = () => {
  return useContext(SocketContext);
};
