"use client";

import { Button } from "@mui/material";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useThemeMode } from "@/hooks/useThemeMode";

export default function ButtonMode() {
  const { mode, toggleTheme } = useThemeMode();
  return (
    <>
      <Button variant="contained" onClick={toggleTheme}>
        {mode === "light" ? <MdDarkMode /> : <MdLightMode />}
      </Button>
    </>
  );
}
