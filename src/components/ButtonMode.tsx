"use client";

// -- Mui --
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

// -- React icon --
import { MdDarkMode, MdLightMode } from "react-icons/md";

// -- Hooks --
import { useThemeMode } from "@/hooks/useThemeMode";

import useTheme from "@mui/material/styles/useTheme";

export default function ButtonMode() {
  const { mode, toggleTheme } = useThemeMode();
  const theme = useTheme();
  
  return (
    <Tooltip title={mode === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}>
      <IconButton
        onClick={toggleTheme}
        sx={{
          width: 44,
          height: 44,
          borderRadius: 2,
          backgroundColor: theme.palette.action.hover,
          color: theme.palette.text.primary,
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            transform: "scale(1.05)",
          },
        }}
      >
        {mode === "light" ? <MdDarkMode size={22} /> : <MdLightMode size={22} />}
      </IconButton>
    </Tooltip>
  );
}

