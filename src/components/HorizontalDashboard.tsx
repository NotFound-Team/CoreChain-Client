// -- React --
import { ReactNode } from "react";

// -- MUI --
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";


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
    </>
  );
}
