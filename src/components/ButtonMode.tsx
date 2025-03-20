"use client";

// -- Mui --
import Button from "@mui/material/Button";

// -- React icon --
import { MdDarkMode, MdLightMode } from "react-icons/md";

// -- Hooks --
import { useThemeMode } from "@/hooks/useThemeMode";

export default function ButtonMode() {
  const { mode, toggleTheme } = useThemeMode();
  return (
    <>
      {/* change mode */}
      <Button variant="contained" onClick={toggleTheme}>
        {mode === "light" ? <MdDarkMode /> : <MdLightMode />}
      </Button>
    </>
  );
}
