"use client";

import { Drawer } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReactNode } from "react";

const MiniDrawerWidth = 72;
const FullDrawerWidth = 240;

// Custom styled drawer
const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: open ? FullDrawerWidth : MiniDrawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.standard,
  }),
  "& .MuiDrawer-paper": {
    width: open ? FullDrawerWidth : MiniDrawerWidth,
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
  },
}));

export default function HorizontalDashboard({
  drawer,
  drawerWidth,
  mobileOpen,
  handleDrawerToggle,
}: {
  drawer: ReactNode;
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}) {
  return (
    <>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        disableScrollLock={true}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop drawer */}
      <StyledDrawer
        variant="permanent"
        open={mobileOpen}
        sx={{
          display: { xs: "none", sm: "block" },
        }}
      >
        {drawer}
      </StyledDrawer>
    </>
  );
}
