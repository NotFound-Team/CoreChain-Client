/* eslint-disable react-hooks/exhaustive-deps */
"use client";

// -- Context --
// import { AuthProvider } from "@/context/AuthContext";

// -- MUI --
import { Collapse, Tooltip, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";

// -- Next --
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// -- React --
import React, { useCallback, useEffect, useMemo, useState } from "react";

// -- React-icon
import { MdChevronRight, MdExitToApp, MdExpandMore } from "react-icons/md";

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
import { NAVIGATION_ITEMS, TNavigationItem } from "@/configs/layout";
import Image from "next/image";

const drawerWidth = 240;
const appBarHeight = 64;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { Toast, showToast } = useSnackbar();
  const theme = useTheme();
  const { user } = useAuth();
  const pathName = usePathname();

  const handleDrawerToggle = () => {
    // console.log(mobileOpen);
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = useCallback(async () => {
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
  }, []);

  // Item section drawer

  const MenuItem = ({ item, level = 0 }: { item: TNavigationItem; level?: number }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const router = useRouter();
    const pathName = usePathname();
    const theme = useTheme();

    const hasChildren = item.childrens && item.childrens.length > 0;
    const isSelected = pathName === item.href;

    const handleClick = (e: React.MouseEvent) => {
      if (hasChildren) {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
      } else {
        router.push(item.href);
      }
    };

    useEffect(() => {
      if (hasChildren && mobileOpen) {
        const childPaths = item.childrens!.map((child) => child.href);
        if (childPaths.includes(pathName)) {
          setIsExpanded(true);
        }
      }
    }, [pathName]);

    useEffect(() => {
      if (!mobileOpen) {
        setIsExpanded(false);
      }
    }, [mobileOpen]);

    const paddingLeft = 2 + level * 3;

    return (
      <Box sx={{ width: "100%", display: "block" }}>
        <Tooltip title={item.title} placement="right" arrow>
          <ListItem
            onClick={handleClick}
            sx={{
              cursor: "pointer",
              borderRadius: "12px",
              mb: 0.5,
              pl: paddingLeft,
              transition: "all 0.3s ease",
              backgroundColor: isSelected ? theme.palette.action.selected : "transparent",
              color: isSelected ? theme.palette.primary.main : "inherit",
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
                color: isSelected ? theme.palette.primary.main : "inherit",
              }}
            >
              <item.icon size={22} />
            </ListItemIcon>

            <ListItemText
              primary={item.title}
              primaryTypographyProps={{
                fontSize: "0.9rem",
                fontWeight: isSelected ? 700 : 500,
              }}
            />

            {hasChildren && mobileOpen && (isExpanded ? <MdExpandMore size={20} /> : <MdChevronRight size={20} />)}
          </ListItem>
        </Tooltip>

        {hasChildren && mobileOpen && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.childrens?.map((child, index) => (
                <MenuItem key={child.id} item={child} level={level + 1} />
              ))}
            </List>
          </Collapse>
        )}
      </Box>
    );
  };
  const drawer = useMemo(
    () => (
      <div>
        <Toast />
        <Toolbar>
          <Image src={"/images/img_avatar.png"} alt="Logo" width={100} height={100} />
        </Toolbar>
        <List>
          {NAVIGATION_ITEMS.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}

          {/* <Tooltip disableHoverListener={mobileOpen ? true : false} arrow placement="right" title="Logout">
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
          </Tooltip> */}
        </List>
      </div>
    ),
    [mobileOpen, pathName, theme]
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
            // bgcolor: theme.palette.background.default,
            bgcolor: "#F5F7FA",
            minHeight: "100vh",
          }}
        >
          <main className="w-full h-full">{children}</main>
        </Box>
      </Box>
    </AbilityProvider>
  );
}
