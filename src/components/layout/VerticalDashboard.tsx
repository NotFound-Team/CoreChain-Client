"use client";

import React, { useState } from "react";
import { AppBar, Box, IconButton, Toolbar, InputBase, alpha, styled } from "@mui/material";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { MdFullscreen, MdFullscreenExit, MdTranslate } from "react-icons/md";

import UserDropdown from "./user-dropdown";
import NotificationDropdown from "./notification-dropdown";
import MessageDropdown from "./message-dropdown";
import GreetingHeader from "./GreetingHeader";
import GlobalSearch from "./GlobalSearch";
import ActionHelper from "./ActionHelper";

const MiniDrawerWidth = 58;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function VerticalDashboard({
  drawerWidth,
  appBarHeight,
  mobileOpen,
  handleDrawerToggle,
}: {
  drawerWidth: number;
  appBarHeight: number;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <Box sx={{ height: appBarHeight }}>
      <AppBar
        position="fixed"
        sx={{
          width: {
            xs: "100%",
            sm: `calc(100% - ${mobileOpen ? drawerWidth : MiniDrawerWidth}px)`,
          },
          transition: (theme) =>
            theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.standard,
            }),
        }}
      >
        <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "block", xs: "none" } }}
            >
              {mobileOpen ? <AiOutlineMenuFold size={24} /> : <AiOutlineMenuUnfold size={24} />}
            </IconButton>

            <Box sx={{ ml: { xs: 1, md: 3 }, display: { xs: "none", sm: "block" } }}>
              <GlobalSearch />
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: "0 10px" }}>
            <GreetingHeader />
            <ActionHelper />
            <IconButton color="inherit" title="Translate">
              <MdTranslate size={22} />
            </IconButton>

            <IconButton color="inherit" onClick={toggleFullscreen} sx={{ display: { xs: "none", sm: "flex" } }}>
              {isFullscreen ? <MdFullscreenExit size={22} /> : <MdFullscreen size={22} />}
            </IconButton>
            <MessageDropdown />
            <NotificationDropdown />
            <UserDropdown />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
