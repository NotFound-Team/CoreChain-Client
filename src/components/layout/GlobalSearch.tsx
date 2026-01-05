"use client";

import React, { useMemo, useRef, useEffect, useState } from "react";
import { Autocomplete, TextField, InputAdornment, Box, Typography, Paper, Grid, Divider } from "@mui/material";
import { MdSearch, MdOutlineWeb, MdViewQuilt, MdAdminPanelSettings, MdArrowForward } from "react-icons/md";
import { useRouter } from "next/navigation";
import { getFlattenedPages } from "@/utils/navigation";
import { NAVIGATION_ITEMS } from "@/configs/layout";
import { useAuth } from "@/hooks/useAuth";

const ADMIN_QUICK_PAGES = [
  { id: "admin-title", title: "Website Title & Logo", href: "/admin/settings/appearance", icon: MdOutlineWeb },
  { id: "admin-header", title: "Header & Footer", href: "/admin/settings/layout", icon: MdViewQuilt },
  { id: "admin-system", title: "Cấu hình Hệ thống", href: "/admin/settings/advanced", icon: MdAdminPanelSettings },
];

const GlobalSearch = () => {
  const router = useRouter();
  const {user} = useAuth()
  const inputRef = useRef<HTMLInputElement>(null);
  const userRole = user?.role.name; 

  const pages = useMemo(() => getFlattenedPages(NAVIGATION_ITEMS), []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Autocomplete
      size="small"
      options={pages}
      getOptionLabel={(option) => option.title}
      filterOptions={(options, { inputValue }) => {
        const query = inputValue.toLowerCase();
        return options.filter((item) =>
            item.title.toLowerCase().includes(query) || item.href.toLowerCase().includes(query)
        );
      }}
      onChange={(_, newValue) => {
        if (newValue) router.push(newValue.href);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          inputRef={inputRef}
          placeholder="Tìm kiếm trang ... (Ctrl + K)"
          sx={{
            width: { xs: 200, md: 350 },
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              color: "white",
              "&.Mui-focused": { backgroundColor: "white", color: "black" },
              "& fieldset": { border: "none" },
            },
          }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <MdSearch size={22} color="inherit" />
              </InputAdornment>
            ),
          }}
        />
      )}
      PaperComponent={({ children }) => (
        <Paper elevation={12} sx={{ mt: 1, borderRadius: "12px", overflow: "hidden", width: 650 }}>
          <Grid container>
            {/* BÊN TRÁI: KẾT QUẢ TÌM KIẾM TRANG CHÍNH */}
            <Grid item xs={userRole === "ADMIN" ? 7 : 12}>
              <Box sx={{ p: 1.5, bgcolor: "#f9fafb", borderBottom: "1px solid #eee" }}>
                <Typography variant="caption" fontWeight="bold" color="text.secondary">
                  KẾT QUẢ TRANG MENU
                </Typography>
              </Box>
              <Box sx={{ maxHeight: 400, overflow: "auto" }}>
                {children}
              </Box>
            </Grid>

            {/* BÊN PHẢI: ADMIN QUICK ACCESS (Chỉ hiện cho ADMIN) */}
            {userRole === "ADMIN" && (
              <Grid item xs={5} sx={{ borderLeft: "1px solid #eee", bgcolor: "#fff9f9" }}>
                <Box sx={{ p: 1.5, borderBottom: "1px solid #eee", bgcolor: "#fff1f1" }}>
                  <Typography variant="caption" fontWeight="bold" color="error.main">
                    CẤU HÌNH ADMIN
                  </Typography>
                </Box>
                <Box sx={{ p: 1 }}>
                  {ADMIN_QUICK_PAGES.map((item) => (
                    <Box
                      key={item.id}
                      onClick={() => {
                        router.push(item.href);
                      }}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        p: 1.5,
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "0.2s",
                        "&:hover": { bgcolor: "rgba(211, 47, 47, 0.08)" },
                      }}
                    >
                      <item.icon size={20} color="#d32f2f" />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body2" fontWeight="500">
                          {item.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Chỉnh sửa ngay
                        </Typography>
                      </Box>
                      <MdArrowForward size={14} color="#ccc" />
                    </Box>
                  ))}
                </Box>
              </Grid>
            )}
          </Grid>
        </Paper>
      )}
      // Render từng dòng kết quả ở bên trái
      renderOption={(props, option) => (
        <Box component="li" {...props} key={option.id} sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1 }}>
          <Box sx={{ color: "primary.main", display: "flex" }}>
            <option.icon size={20} />
          </Box>
          <Box>
            <Typography variant="body2" fontWeight="500">{option.title}</Typography>
            <Typography variant="caption" color="text.secondary">{option.href}</Typography>
          </Box>
        </Box>
      )}
    />
  );
};

export default GlobalSearch;