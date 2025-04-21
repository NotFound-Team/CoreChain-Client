"use client";

// -- MUI --
import { useTheme, alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

// -- dayjs --
import dayjs from "dayjs";

// -- gsap --
import gsap from "gsap";

// -- React --
import React, { useEffect, useRef } from "react";

// -- React-icon --
import { FaRegEdit } from "react-icons/fa";
import { WiDayCloudy, WiDaySunny, WiNightClear } from "react-icons/wi";

export default function DashboardClient({ data }) {
  const theme = useTheme();
  const iconRef = useRef(null);

  // Animation configuration
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (iconRef.current) {
        gsap.to(iconRef.current, {
          rotation: 8,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          duration: 1,
          transformOrigin: "center center",
        });
      }
    });
    return () => ctx.revert();
  }, []);

  // Style configurations
  const statsBoxStyle = {
    p: 3,
    borderRadius: 2,
    boxShadow: theme.shadows[2],
    height: "100%",
    transition: "transform 0.2s",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      transform: "translateY(-4px)",
    },
    "&:before": {
      content: '""',
      position: "absolute",
      right: -20,
      top: -20,
      width: 60,
      height: 60,
      bgcolor: alpha(theme.palette.common.white, 0.3),
      borderRadius: "50%",
    },
  };

  const tableHeaderStyle = {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    "& th": {
      py: 1.5,
      fontSize: "0.875rem",
    },
  };

  const tableRowStyle = {
    transition: "background-color 0.2s ease",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  };

  const tableCellStyle = {
    padding: theme.spacing(1.5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
      "&:first-of-type": { paddingLeft: theme.spacing(1.5) },
      "&:last-child": { paddingRight: theme.spacing(1.5) },
    },
  };

  // Loading state
  if (!data) {
    return (
      <Grid container spacing={3}>
        {[...Array(3)].map((_, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Skeleton variant="rounded" height={160} sx={{ borderRadius: 2 }} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Skeleton variant="rounded" height={400} sx={{ borderRadius: 2 }} />
        </Grid>
      </Grid>
    );
  }

  // Time-based greeting
  const date = dayjs().format("dddd, DD MMMM YYYY");
  const hour = dayjs().hour();
  const { label, icon } = (() => {
    if (hour >= 5 && hour < 12)
      return {
        label: "morning",
        icon: <WiDaySunny size={40} color="#fbc02d" />,
      };
    if (hour >= 12 && hour < 18)
      return {
        label: "afternoon",
        icon: <WiDayCloudy size={40} color="#ffca28" />,
      };
    return {
      label: "evening",
      icon: <WiNightClear size={40} color="#90caf9" />,
    };
  })();

  const { projects, tasks, users } = data;

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
          variant="h4"
          fontWeight="bold"
          gutterBottom
        >
          Good {label} <span ref={iconRef}>{icon}</span>
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {date}
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              ...statsBoxStyle,
              background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${alpha(
                theme.palette.primary.main,
                0.2
              )} 100%)`,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Total Projects
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Active projects in the system
            </Typography>
            <Typography variant="h3" fontWeight="bold">
              {projects?.data?.projects.length || 0}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              ...statsBoxStyle,
              background: `linear-gradient(135deg, ${theme.palette.secondary.light} 0%, ${alpha(
                theme.palette.secondary.main,
                0.2
              )} 100%)`,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Total Tasks
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Tasks across all projects
            </Typography>
            <Typography variant="h3" fontWeight="bold">
              {tasks?.data?.result.length || 0}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              ...statsBoxStyle,
              background: `linear-gradient(135deg, ${theme.palette.info.light} 0%, ${alpha(
                theme.palette.info.main,
                0.2
              )} 100%)`,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Total Users
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Registered system users
            </Typography>
            <Typography variant="h3" fontWeight="bold">
              {users?.data?.result.length || 0}
            </Typography>
          </Box>
        </Grid>

        {/* Projects Table */}
        <Grid item xs={12}>
          <Box
            sx={{
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: theme.shadows[2],
              p: 3,
              overflow: "hidden",
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Recent Projects
            </Typography>

            <Box
              sx={{
                overflowX: "auto",
                "&::-webkit-scrollbar": { height: 6 },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 3,
                },
              }}
            >
              <table style={{ width: "100%", minWidth: 600 }}>
                <thead style={tableHeaderStyle}>
                  <tr>
                    <th style={{ ...tableCellStyle, textAlign: "left", width: "35%" }}>Project Name</th>
                    <th style={{ ...tableCellStyle, textAlign: "left", width: "20%" }}>Start Date</th>
                    <th style={{ ...tableCellStyle, textAlign: "center", width: "25%" }}>Status</th>
                    <th style={{ ...tableCellStyle, textAlign: "center", width: "20%" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects?.data?.projects.map((project) => (
                    <tr key={project._id} style={tableRowStyle}>
                      <td style={tableCellStyle}>
                        <Typography fontWeight="500">{project.name}</Typography>
                      </td>
                      <td style={tableCellStyle}>{dayjs(project.createdAt).format("DD MMM, YYYY")}</td>
                      <td style={{ ...tableCellStyle, textAlign: "center" }}>
                        <Chip
                          label={["Not Started", "In Progress", "Completed"][project.status - 1]}
                          sx={{
                            borderRadius: 1,
                            minWidth: 100,
                            fontWeight: 600,
                            letterSpacing: 0.5,
                            textTransform: "uppercase",
                            fontSize: "0.75rem",
                            color: [
                              theme.palette.text.secondary,
                              theme.palette.common.white,
                              theme.palette.common.white,
                            ][project.status - 1],
                            bgcolor: [
                              alpha(theme.palette.text.secondary, 0.1),
                              theme.palette.primary.main,
                              theme.palette.success.main,
                            ][project.status - 1],
                          }}
                        />
                      </td>
                      <td style={{ ...tableCellStyle, textAlign: "center" }}>
                        <Tooltip title="Edit project">
                          <IconButton
                            color="primary"
                            aria-label="Edit project"
                            size="small"
                            sx={{
                              transition: "transform 0.2s",
                              "&:hover": { transform: "scale(1.1)" },
                            }}
                          >
                            <FaRegEdit />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
