"use client"

import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeProviderWrapper";

export const useThemeMode = () => {
  return useContext(ThemeContext);
};
