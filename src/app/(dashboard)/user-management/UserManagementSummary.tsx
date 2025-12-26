"use client";

import { alpha, Box, Paper, Typography, useTheme } from "@mui/material";
import { MdWork } from "react-icons/md";

export const UserManagementSummary = () => {
  const theme = useTheme();
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 2,
        background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(
          theme.palette.secondary.main,
          0.1
        )})`,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <MdWork size={32} color={theme.palette.primary.main} />
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 600,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            User Management
          </Typography>
        </Box>
        {/* <Can I="post" a="positions">
        <Button
          variant="contained"
          startIcon={<FaPlus />}
          onClick={handleOpen}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1,
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
              backgroundColor: "primary.dark",
            },
          }}
        >
          Create Position
        </Button>
      </Can> */}
      </Box>
    </Paper>
  );
};
