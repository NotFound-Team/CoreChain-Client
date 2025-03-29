"use client";

// -- Components --
import ButtonMode from "@/components/ButtonMode";

// -- Context --
import { AuthProvider } from "@/context/AuthContext";

// -- MUI --
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

// -- Next --
import Link from "next/link";

// -- React --
import React, { useState } from "react";

// -- React-icon
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { IoIosChatbubbles } from "react-icons/io";

// -- React-icon --
import { MdMenu, MdDashboard, MdSettings, MdExitToApp } from "react-icons/md";

const drawerWidth = 240;
const appBarHeight = 64;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Item section drawer
  const listItem = [
    {
      title: "Dashboard",
      icon: <MdDashboard size={24} />,
      href: "/dashboard",
    },
    {
      title: "Chat",
      icon: <IoIosChatbubbles size={24} />,
      href: "/chat",
    },
    {
      title: "Settings",
      icon: <MdSettings size={24} />,
      href: "/setting",
    },
    {
      title: "Logout",
      icon: <MdExitToApp size={24} />,
      href: "/logout",
    },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {listItem.map((item) => (
          <Link href={item.href} key={item.title}>
            <ListItem
              sx={{
                "&:hover": {
                  backgroundColor: "#ddd",
                  transition: "background-color 0.5s",
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <html>
      <body>
        <AuthProvider>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />

            {/* vertical */}
            <Box sx={{ height: appBarHeight }}>
              <AppBar
                position="fixed"
                sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}
              >
                <Toolbar>
                  {mobileOpen ? (
                    <IconButton
                      color="inherit"
                      edge="start"
                      onClick={handleDrawerToggle}
                      sx={{ display: { sm: "block", xs: "none" } }}
                    >
                      <AiOutlineMenuFold size={24} />
                    </IconButton>
                  ) : (
                    <IconButton
                      color="inherit"
                      edge="start"
                      onClick={handleDrawerToggle}
                      sx={{ display: { sm: "block", xs: "none" } }}
                    >
                      <AiOutlineMenuUnfold size={24} />
                    </IconButton>
                  )}
                  <IconButton
                    color="inherit"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ display: { sm: "none" } }}
                  >
                    <MdMenu size={24} />
                  </IconButton>
                  <Typography variant="h6" noWrap>
                    Dashboard
                  </Typography>
                  <ButtonMode />
                </Toolbar>
              </AppBar>
            </Box>

            {/* Horizontal mobile */}
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              sx={{ display: { xs: "block", sm: "none" }, "& .MuiDrawer-paper": { width: drawerWidth } }}
            >
              {drawer}
            </Drawer>

            {/* Horizontal default web */}
            <Box sx={{ width: { xs: 0, sm: drawerWidth } }}>
              <Drawer
                variant="permanent"
                sx={{ display: { xs: "none", sm: "block" }, "& .MuiDrawer-paper": { width: drawerWidth } }}
                open={mobileOpen}
                onClose={handleDrawerToggle}
              >
                {drawer}
              </Drawer>
            </Box>

            <Box sx={{ flex: 1, paddingLeft: 3, paddingRight: 3, marginTop: 10 }}>
              <main className="w-full h-full flex flex-col">{children}</main>
            </Box>
          </Box>
        </AuthProvider>
      </body>
    </html>
  );
}
