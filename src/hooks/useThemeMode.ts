"use client"

// -- React
import { useContext } from "react";

// -- Context -- 
import { ThemeContext } from "@/context/ThemeProviderWrapper";

export const useThemeMode = () => {
  return useContext(ThemeContext);
};
