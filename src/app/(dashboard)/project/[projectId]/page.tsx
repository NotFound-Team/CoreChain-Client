"use client";

import {
  Box,
  Typography,
  Button,
  Avatar,
  AvatarGroup,
  Chip,
  Container,
  Grid,
  Paper,
  Grow,
  Fade,
  LinearProgress,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  MenuItem,
  Select,
  Tooltip,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever, MdInfoOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import { format } from "date-fns";

const ProjectDetail = () => {
  const theme = useTheme();
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Thiết kế UI/UX",
      description: "Thiết kế giao diện người dùng và trải nghiệm",
      startDate: new Date("2024-03-01"),
      endDate: new Date("2024-03-10"),
      assignees: ["/static/images/avatar/1.jpg", "/static/images/avatar/2.jpg"],
      status: "In Progress",
      progress: 75,
    },
  ]);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    startDate: null,
    endDate: null,
    assignees: [],
    status: "Not Started",
  });

  // Project timeline calculations
  const projectStart = new Date("2024-01-01");
  const projectEnd = new Date("2024-12-31");
  const progress = Math.round(
    ((Date.now() - projectStart.getTime()) / (projectEnd.getTime() - projectStart.getTime())) * 100
  );

  // Task functions
  const handleAddTask = () => {
    if (newTask.title && newTask.startDate && newTask.endDate) {
      const taskProgress = calculateTaskProgress(newTask.startDate, newTask.endDate);

      setTasks([
        ...tasks,
        {
          id: Date.now(),
          ...newTask,
          assignees: [],
          progress: taskProgress,
        },
      ]);
      setNewTask({
        title: "",
        description: "",
        startDate: null,
        endDate: null,
        assignees: [],
        status: "Not Started",
      });
    }
  };

  const calculateTaskProgress = (startDate, endDate) => {
    const total = endDate - startDate;
    const elapsed = Date.now() - startDate;
    return Math.min(Math.max(Math.round((elapsed / total) * 100), 0), 100);
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

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
              // transition: "transform 0.3s ease-in-out",
              // "&:hover": { transform: "translateY(-2px)" },
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
                      Lizard Project
                    </Typography>
                  </Fade>

                  <Box sx={{ color: "white", textAlign: "right" }}>
                    <Typography variant="body2">
                      {projectStart.toLocaleDateString()} - {projectEnd.toLocaleDateString()}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        mt: 1,
                        width: 200,
                      }}
                    />
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {progress}% Completed
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
                      This comprehensive initiative focuses on the preservation and study of over 6,000 lizard species
                      across global ecosystems. Combining cutting-edge technology with ecological research, we aim to
                      create sustainable habitats and advanced monitoring systems.
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
                        {[
                          "/static/images/avatar/1.jpg",
                          "/static/images/avatar/2.jpg",
                          "/static/images/avatar/3.jpg",
                          "/static/images/avatar/4.jpg",
                          "/static/images/avatar/5.jpg",
                        ].map((src, index) => (
                          <Tooltip key={index} title={`Member ${index + 1}`}>
                            <Avatar
                              src={src}
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
                          <Chip key={index} label={tech.label} color={tech.color} variant="outlined" />
                        ))}
                      </Box>
                    </Paper>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />
              {/* Task Management Section */}
              <Box sx={{ mt: 6 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 4,
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: 700, display: "flex", alignItems: "center" }}>
                    <IoMdAdd style={{ marginRight: 12 }} />
                    Task Management
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<IoMdAdd />}
                    onClick={handleAddTask}
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    New Task
                  </Button>
                </Box>

                {/* Add Task Form */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Task Title"
                      variant="outlined"
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                      InputProps={{
                        sx: { borderRadius: 2, background: theme.palette.background.paper },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <DatePicker
                      label="Start Date"
                      value={newTask.startDate}
                      onChange={(date) => setNewTask({ ...newTask, startDate: date })}
                      sx={{
                        width: "100%",
                        "& .MuiOutlinedInput-root": { borderRadius: 2 },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <DatePicker
                      label="End Date"
                      value={newTask.endDate}
                      onChange={(date) => setNewTask({ ...newTask, endDate: date })}
                      sx={{
                        width: "100%",
                        "& .MuiOutlinedInput-root": { borderRadius: 2 },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Task Description"
                      variant="outlined"
                      multiline
                      rows={3}
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      InputProps={{
                        sx: { borderRadius: 2, background: theme.palette.background.paper },
                      }}
                    />
                  </Grid>
                </Grid>

                {/* Task List */}
                <List sx={{ "& .MuiListItem-root": { px: 0 } }}>
                  {tasks.map((task) => (
                    <Paper
                      key={task.id}
                      elevation={2}
                      sx={{
                        px: 2,
                        mb: 2,
                        background: theme.palette.background.paper,
                        borderRadius: 3,  
                        overflow: "hidden",
                        transition: "transform 0.2s",
                        "&:hover": { transform: "translateX(5px)" },
                      }}
                    >
                      <ListItem sx={{ py: 2, background: theme.palette.background.paper }}>
                        <ListItemAvatar>
                          <AvatarGroup max={3}>
                            {task.assignees.map((avatar, index) => (
                              <Tooltip key={index} title={`Assignee ${index + 1}`}>
                                <Avatar
                                  src={avatar}
                                  sx={{
                                    width: 40,
                                    height: 40,
                                    border: "2px solid #fff",
                                    "&:hover": { transform: "scale(1.1)" },
                                    transition: "transform 0.2s",
                                  }}
                                />
                              </Tooltip>
                            ))}
                          </AvatarGroup>
                        </ListItemAvatar>

                        <ListItemText
                          primary={
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {task.title}
                            </Typography>
                          }
                          secondary={
                            <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
                              {task.description}
                            </Typography>
                          }
                          sx={{ mx: 2, flex: "1 1 auto" }}
                        />

                        <Box sx={{ minWidth: 140, textAlign: "center" }}>
                          <Typography
                            variant="caption"
                            sx={{
                              display: "block",
                              color: "text.secondary",
                              mb: 0.5,
                            }}
                          >
                            {format(task.startDate, "MMM dd")} - {format(task.endDate, "MMM dd")}
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={task.progress}
                            sx={{
                              height: 8,
                              borderRadius: 3,
                              "& .MuiLinearProgress-bar": {
                                background:
                                  task.progress === 100 ? theme.palette.success.main : theme.palette.primary.main,
                              },
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              display: "block",
                              mt: 0.5,
                              color: task.progress === 100 ? theme.palette.success.main : "text.primary",
                              fontWeight: 500,
                            }}
                          >
                            {task.progress}% Complete
                          </Typography>
                        </Box>

                        <Select
                          value={task.status}
                          onChange={(e) => handleStatusChange(task.id, e.target.value)}
                          sx={{
                            ml: 2,
                            minWidth: 140,
                            "& .MuiSelect-select": { py: 1 },
                          }}
                          MenuProps={{ sx: { borderRadius: 3 } }}
                        >
                          <MenuItem value="Not Started">
                            <Chip label="Not Started" color="default" size="small" sx={{ borderRadius: 1 }} />
                          </MenuItem>
                          <MenuItem value="In Progress">
                            <Chip label="In Progress" color="primary" size="small" sx={{ borderRadius: 1 }} />
                          </MenuItem>
                          <MenuItem value="Completed">
                            <Chip label="Completed" color="success" size="small" sx={{ borderRadius: 1 }} />
                          </MenuItem>
                        </Select>

                        <Box sx={{ ml: 2, display: "flex", gap: 1 }}>
                          <Tooltip title="Edit Task">
                            <IconButton
                              sx={{
                                background: theme.palette.action.hover,
                                "&:hover": { background: theme.palette.action.selected },
                              }}
                            >
                              <FaRegEdit />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Task">
                            <IconButton
                              color="error"
                              sx={{
                                background: theme.palette.error.light + "20",
                                "&:hover": { background: theme.palette.error.light + "40" },
                              }}
                              onClick={() => handleDeleteTask(task.id)}
                            >
                              <MdDeleteForever />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </ListItem>
                    </Paper>
                  ))}
                </List>
              </Box>
            </Box>
          </Paper>
        </LocalizationProvider>
      </Container>
    </Grow>
  );
};

export default ProjectDetail;
