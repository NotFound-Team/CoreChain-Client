"use client";

// -- Mui --
import Button from "@mui/material/Button";

// -- React icon --
import { MdDarkMode, MdLightMode } from "react-icons/md";

// -- Hooks --
import { useThemeMode } from "@/hooks/useThemeMode";

import useTheme from "@mui/material/styles/useTheme";

export default function ButtonMode() {
  const { mode, toggleTheme } = useThemeMode();
  const theme = useTheme();
  return (
    <>
      {/* change mode */}
      <Button
        variant="contained"
        sx={{
          borderRadius: 10,
          width: 50,
          height: 50,
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          backgroundColor: theme.palette.action.disabledBackground
        }}
        onClick={toggleTheme}
      >
        {mode === "light" ? <MdDarkMode /> : <MdLightMode />}
      </Button>
    </>
  );
}
