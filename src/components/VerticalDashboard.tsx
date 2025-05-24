"use client";

// -- Components --
// import ButtonMode from "@/components/ButtonMode";

// -- MUI --
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";

// -- React-icon --
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { MdMenu } from "react-icons/md";
import { UserDropdown } from "./layout/user-dropdown";

const MiniDrawerWidth = 72;

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
  return (
    <Box sx={{ height: appBarHeight }}>
      <AppBar
        position="fixed"
        sx={{
          width: {
            xs: "100%",
            sm: `calc(100% - ${mobileOpen ? drawerWidth : MiniDrawerWidth}px)`,
          },
          ml: {
            xs: 0,
            // sm: `${mobileOpen ? MiniDrawerWidth : drawerWidth}px`,
          },
          transition: (theme) =>
            theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.standard,
            }),
        }}
      >
        <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box>
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
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ display: { sm: "none" } }}>
              <MdMenu size={24} />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0 20px" }}>
            {/* <ButtonMode /> */}
            <Box>
              <UserDropdown />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
