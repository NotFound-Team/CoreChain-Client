"use client";

import { createContext, useState, ReactNode, useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import ThemeOptions from "@/theme/ThemeOptions";
import DefaultPalette from "@/theme/palette";

// Tạo Context
export const ThemeContext = createContext({
  mode: "light",
  toggleTheme: () => {},
});

export function ThemeProviderWrapper({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("mui-mode", newMode);
      return newMode;
    });
  };

  const muiTheme = ThemeOptions(DefaultPalette(mode));

  useEffect(() => {
    const storedMode = localStorage.getItem("mui-mode") as "light" | "dark";
    if (storedMode) {
      setMode(storedMode);
    }
  }, []);
  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
