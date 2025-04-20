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
import { GoProject } from "react-icons/go";
import { RiUserSettingsLine } from "react-icons/ri";

// -- React-icon --
import { MdMenu, MdDashboard, MdSettings, MdExitToApp } from "react-icons/md";
import fetchApi from "@/utils/fetchApi";
import { CONFIG_API } from "@/configs/api";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useRouter } from "next/navigation";
import { FaUserShield } from "react-icons/fa";

const drawerWidth = 240;
const appBarHeight = 64;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { Toast, showToast } = useSnackbar();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    try {
      await fetchApi(`${CONFIG_API.AUTH.LOGOUT}`, "POST");
      localStorage.removeItem("token");
      localStorage.removeItem("projects");
      showToast("Logut successfully!", "success");
      router.push("/login");
    } catch (error) {
      console.log("error", error);
      showToast("Error during logout. Please try again!", "error");
    }
  };

  // Item section drawer
  const listItem = [
    {
      title: "Dashboard",
      icon: <MdDashboard size={24} />,
      href: "/dashboard",
    },
    {
      title: "Project",
      icon: <GoProject size={24} />,
      href: "/project",
    },
    {
      title: "Chat",
      icon: <IoIosChatbubbles size={24} />,
      href: "/chat",
    },
    {
      title: "Role",
      icon: <FaUserShield size={24} />,
      href: "/role",
    },
    {
      title: "Permission",
      icon: <RiUserSettingsLine size={24} />,
      href: "/permission",
    },
    {
      title: "Settings",
      icon: <MdSettings size={24} />,
      href: "/setting",
    },
  ];

  const drawer = (
    <div>
      <Toast />
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

        <ListItem
          sx={{
            "&:hover": {
              backgroundColor: "#ddd",
              transition: "background-color 0.5s",
            },
          }}
          onClick={handleLogout}
        >
          <ListItemIcon>
            <MdExitToApp size={24} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
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
