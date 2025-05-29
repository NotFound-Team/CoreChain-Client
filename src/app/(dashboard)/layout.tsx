"use client";

// -- Context --
// import { AuthProvider } from "@/context/AuthContext";

// -- MUI --
import { Tooltip, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";

// -- Next --
import Link from "next/link";
import { useRouter } from "next/navigation";

// -- React --
import React, { useState } from "react";

// -- React-icon
import { IoIosChatbubbles } from "react-icons/io";
import { GoProject } from "react-icons/go";
import { MdDashboard, MdSettings, MdExitToApp } from "react-icons/md";
import { FaBox, FaRegUserCircle, FaUsersCog, FaUserShield } from "react-icons/fa";
import { BsBuildingFillLock } from "react-icons/bs";
import { PiBookOpenUserBold } from "react-icons/pi";

// -- Utils --
import fetchApi from "@/utils/fetchApi";

// -- Configs --
import { CONFIG_API } from "@/configs/api";

// -- Hooks --
import { useSnackbar } from "@/hooks/useSnackbar";

// -- Component --
import AbilityProvider from "@/components/AbilityProvider";
import { useAuth } from "@/hooks/useAuth";
import VerticalDashboard from "@/components/layout/VerticalDashboard";
import HorizontalDashboard from "@/components/layout/HorizontalDashboard";

const drawerWidth = 240;
const appBarHeight = 64;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { Toast, showToast } = useSnackbar();
  const theme = useTheme();
  const { user } = useAuth();

  const handleDrawerToggle = () => {
    // console.log(mobileOpen);
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
      console.error("error", error);
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
      icon: <BsBuildingFillLock size={24} />,
      href: "/permission",
    },
    {
      title: "User Manager",
      icon: <FaUsersCog size={24} />,
      href: "/user-management",
    },
    {
      title: "Position",
      icon: <PiBookOpenUserBold size={24} />,
      href: "/position",
    },
    {
      title: "Department",
      icon: <FaBox size={24} />,
      href: "/department",
    },
    {
      title: "Profile",
      icon: <FaRegUserCircle size={24} />,
      href: "/profile",
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
            <Tooltip disableHoverListener={mobileOpen ? true : false} arrow placement="right" title={item.title}>
              <ListItem
                sx={{
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                    transition: "background-color 0.5s",
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            </Tooltip>
          </Link>
        ))}

        <Tooltip disableHoverListener={mobileOpen ? true : false} arrow placement="right" title="Logout">
          <ListItem
            sx={{
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
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
        </Tooltip>
      </List>
    </div>
  );

  return (
    <AbilityProvider permissions={user?.permissions}>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <CssBaseline />

        {/* vertical */}
        <VerticalDashboard
          drawerWidth={drawerWidth}
          appBarHeight={appBarHeight}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />

        <HorizontalDashboard
          drawer={drawer}
          drawerWidth={drawerWidth}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />

        <Box
          sx={{
            flex: 1,
            paddingLeft: 3,
            paddingRight: 3,
            paddingTop: 10,
            bgcolor: theme.palette.background.paper,
            minHeight: "100vh",
          }}
        >
          <main className="w-full h-full">{children}</main>
        </Box>
      </Box>
    </AbilityProvider>
  );
}
