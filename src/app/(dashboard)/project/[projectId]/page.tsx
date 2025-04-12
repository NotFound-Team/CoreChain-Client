"use client";

// -- MUI --
import {
  Box,
  Typography,
  Avatar,
  AvatarGroup,
  Chip,
  Container,
  Grid,
  Paper,
  Grow,
  Fade,
  LinearProgress,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers";

// -- React --
import { useEffect, useState } from "react";

// -- components
import TaskManager from "./TaskManager";

// -- utils --
import fetchApi from "@/utils/fetchApi";

// -- Configs --
import { CONFIG_API } from "@/configs/api";

// -- Next --
import { useParams } from "next/navigation";

// -- Types --
import { TProject } from "@/types/project";

// -- dayjs --
import dayjs from "dayjs";

const ProjectDetail = () => {
  const theme = useTheme();
  const params = useParams<{ projectId: string }>();
  const [projects, setProjects] = useState<TProject>();
  // const [tasks, setTasks] = useState([
  //   {
  //     id: 1,
  //     title: "Thiết kế UI/UX",
  //     description: "Thiết kế giao diện người dùng và trải nghiệm",
  //     startDate: new Date("2024-03-01"),
  //     endDate: new Date("2024-03-10"),
  //     assignees: ["/static/images/avatar/1.jpg", "/static/images/avatar/2.jpg"],
  //     status: "In Progress",
  //     progress: 75,
  //   },
  // ]);

  // Project timeline calculations
  const projectStart = projects?.startDate;
  const projectEnd = projects?.endDate;

  useEffect(() => {
    const dataProjectDetail = async () => {
      const response = await fetchApi(`${CONFIG_API.PROJECT}/${params.projectId}`);
      if (response && response.statusCode === 200) {
        setProjects(response.data);
      }
    };
    dataProjectDetail();
  }, [params.projectId]);

  console.log(projects);

  return (
    <Grow in={true} timeout={500}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Paper
            elevation={3}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: theme.shadows[4],
            }}
          >
            {/* Hero Section */}
            <Box
              sx={{
                height: 300,
                background: `url(https://www.shutterstock.com/image-vector/this-cat-pixel-art-colorful-260nw-2346901397.jpg) center/cover`,
                position: "relative",
              }}
            >
              <IconButton
                onClick={() => window.history.back()}
                sx={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  zIndex: 1,
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                  },
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </IconButton>
              {/* Timeline Section */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: 3,
                  background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Fade in={true} timeout={3000}>
                    <Typography
                      variant="h3"
                      component="h1"
                      sx={{
                        color: "white",
                        fontWeight: 700,
                      }}
                    >
                      {projects?.name}
                    </Typography>
                  </Fade>

                  <Box sx={{ color: "white", textAlign: "right" }}>
                    <Typography variant="body2">
                      {dayjs(projectStart).format("DD/MM/YYYY")} - {dayjs(projectEnd).format("DD/MM/YYYY")}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={projects?.progress}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        mt: 1,
                        width: 200,
                      }}
                    />
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {projects?.progress}% Completed
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Main Content */}
            <Box sx={{ p: 4 }}>
              <Grid container spacing={4}>
                {/* Project Info Section */}
                <Grid item xs={12} md={8}>
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                      Project Overview
                    </Typography>
                    <Typography
                      variant="body1"
                      paragraph
                      sx={{
                        color: "text.secondary",
                        lineHeight: 1.7,
                        fontSize: "1.1rem",
                      }}
                    >
                      {projects?.description}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 4 }} />

                  {/* Key Features */}
                  {/* <Box>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                      Key Features
                    </Typography>
                    <Grid container spacing={3}>
                      {[
                        {
                          title: "AI Monitoring",
                          description: "Real-time habitat tracking using machine learning",
                          icon: "🌐",
                        },
                        {
                          title: "Data Analytics",
                          description: "Advanced population trend analysis",
                          icon: "📊",
                        },
                        {
                          title: "Mobile App",
                          description: "Citizen science participation platform",
                          icon: "📱",
                        },
                        {
                          title: "3D Mapping",
                          description: "Interactive habitat visualization",
                          icon: "🗺️",
                        },
                      ].map((feature, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <Paper
                            elevation={2}
                            sx={{
                              p: 3,
                              height: "100%",
                              borderRadius: 3,
                              transition: "transform 0.2s",
                              "&:hover": { transform: "translateY(-5px)" },
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                              <Typography variant="h4" sx={{ mr: 2 }}>
                                {feature.icon}
                              </Typography>
                              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {feature.title}
                              </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              {feature.description}
                            </Typography>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Box> */}
                </Grid>

                {/* Team & Tech Section */}
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      position: "sticky",
                      top: 20,
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                  >
                    <Paper
                      elevation={2}
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        background: theme.palette.background.paper,
                      }}
                    >
                      <Typography
                        variant="h5"
                        gutterBottom
                        sx={{ fontWeight: 700, display: "flex", alignItems: "center" }}
                      >
                        👥 Development Team
                      </Typography>
                      <AvatarGroup max={6} sx={{ justifyContent: "center", mb: 3 }}>
                        {projects?.teamMembers.map((member, index) => (
                          <Tooltip key={index} title={`Member ${index + 1}`}>
                            <Avatar
                              src={"/static/images/avatar/1.jpg"}
                              sx={{
                                width: 56,
                                height: 56,
                                border: "2px solid #fff",
                                "&:hover": { transform: "scale(1.1)" },
                                transition: "transform 0.2s",
                              }}
                            />
                          </Tooltip>
                        ))}
                      </AvatarGroup>

                      <Typography
                        variant="h5"
                        gutterBottom
                        sx={{ fontWeight: 700, mt: 3, display: "flex", alignItems: "center" }}
                      >
                        🛠️ Tech Stack
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          "& .MuiChip-root": {
                            borderRadius: 2,
                            fontWeight: 500,
                            px: 1.5,
                            py: 1,
                          },
                        }}
                      >
                        {[
                          { label: "React", color: "primary" },
                          { label: "Node.js", color: "secondary" },
                          { label: "Python", color: "warning" },
                          { label: "TensorFlow", color: "success" },
                          { label: "MongoDB", color: "info" },
                          { label: "AWS", color: "error" },
                        ].map((tech, index) => (
                          <Chip
                            key={index}
                            label={tech.label}
                            color={tech.color as "primary" | "secondary" | "warning" | "success" | "info" | "error"}
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Paper>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />

              {/* Task Management Section */}
              {/* <TaskManager /> */}
              
            </Box>
          </Paper>
        </LocalizationProvider>
      </Container>
    </Grow>
  );
};

export default ProjectDetail;
