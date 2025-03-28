"use client"

// -- Context --
import { AuthContext } from "@/context/AuthContext"
// -- React
import { useContext } from "react"

export const useAuth = () => {
  return useContext(AuthContext);
}