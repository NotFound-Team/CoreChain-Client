"use client";

import { useEffect, useState, ReactNode } from "react";
import { Box, Typography, keyframes } from "@mui/material";
import { WiDaySunny, WiMoonFull, WiCloudy } from "react-icons/wi";

// Tạo animation xoay bằng CSS thay vì GSAP để nhẹ hơn
const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export default function GreetingHeader() {
  const [mounted, setMounted] = useState(false);
  const [greeting, setGreeting] = useState<{
    label: string;
    icon: ReactNode;
    date: string;
  }>({
    label: "Day",
    icon: null,
    date: "",
  });

  useEffect(() => {
    setMounted(true);
    const updateGreeting = () => {
      const now = new Date();
      const hour = now.getHours();
      let label = "";
      let icon = null;

      if (hour >= 5 && hour < 12) {
        label = "Morning";
        icon = <WiDaySunny size={28} color="#FFB800" />;
      } else if (hour >= 12 && hour < 18) {
        label = "Afternoon";
        icon = <WiDaySunny size={28} color="#FF8A00" />;
      } else {
        label = "Evening";
        icon = <WiMoonFull size={24} color="#5C7CFA" />;
      }

      const dateStr = now.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });

      setGreeting({ label, icon, date: dateStr });
    };

    updateGreeting();
    const timer = setInterval(updateGreeting, 60000);
    return () => clearInterval(timer);
  }, []);

  // Tránh lỗi Hydration mismatch của Next.js
  if (!mounted) return null;

  return (
    <Box 
      sx={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "flex-end", // Căn lề phải để hợp với AppBar
        lineHeight: 1.2 
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography 
          variant="subtitle1" 
          fontWeight="700"
          sx={{ 
            display: { xs: 'none', md: 'block' }, // Ẩn chữ trên mobile để đỡ chật AppBar
            color: "text.primary" 
          }}
        >
          Good {greeting.label}
        </Typography>
        
        {/* Container cho Icon với Animation */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            animation: greeting.label !== "Evening" ? `${rotate} 10s linear infinite` : "none",
          }}
        >
          {greeting.icon}
        </Box>
      </Box>

      <Typography 
        variant="caption" 
        sx={{ 
          color: "text.secondary",
          fontWeight: 500,
          mt: -0.5 
        }}
      >
        {greeting.date}
      </Typography>
    </Box>
  );
}