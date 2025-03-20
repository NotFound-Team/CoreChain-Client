"use client";
// -- React --
import { createContext, useState, ReactNode, useEffect } from "react";

// -- MUI --
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";

// -- Theme --
import ThemeOptions from "@/theme/ThemeOptions";
import DefaultPalette from "@/theme/palette";

// Create Context
export const ThemeContext = createContext({
  mode: "light",
  toggleTheme: () => {},
});

export function ThemeProviderWrapper({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("light"); // Set mode

  // Envent onClick
  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("mui-mode", newMode); // Set key & value to localstorage
      return newMode;
    });
  };

  const muiTheme = ThemeOptions(DefaultPalette(mode)); // Call createThemme options

  useEffect(() => {
    const storedMode = localStorage.getItem("mui-mode") as "light" | "dark"; // Check mode when first render 
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
