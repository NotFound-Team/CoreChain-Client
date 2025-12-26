"use client";

// -- MUI --
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Grow from "@mui/material/Grow";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Fade from "@mui/material/Fade";
import { useTheme } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { GiCancel } from "react-icons/gi";

// -- React --
import React, { useEffect, useState } from "react";

// -- components
import TaskManager from "./TaskManager";

// -- utils --
import fetchApi from "@/utils/fetchApi";

// -- Configs --
import { CONFIG_API } from "@/configs/api";

// -- Next --
import { useParams, useRouter } from "next/navigation";

// -- Types --
import { TProject } from "@/types/project";

// -- dayjs --
import dayjs from "dayjs";

// -- React-icon --
import { MdCheckCircleOutline, MdFolderDelete } from "react-icons/md";
import { Can } from "@/context/casl/AbilityContext";
import {
  Alert,
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { useSnackbar } from "@/hooks/useSnackbar";
import FallbackSpinner from "@/components/fall-back";
import { IoPeopleSharp, IoPersonAddSharp } from "react-icons/io5";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

const ProjectDetail = () => {
  const theme = useTheme();
  const params = useParams<{ projectId: string }>();
  const [loading, setLoading] = useState(false);
  const [addMembers, setAddMembers] = useState(false);
  const [employeesForDepartment, setEmployeesForDepartment] = useState<{ name: string; id: string }[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<{ name: string; id: string }[]>([]);
  const [projects, setProjects] = useState<TProject>();
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const router = useRouter();
  const { Toast, showToast } = useSnackbar();

  // Project timeline calculations
  const projectStart = projects?.startDate;
  const projectEnd = projects?.endDate;

  // console.log("PROJECT", projects);

  // Delete project
  const handleDeleteProject = async () => {
    try {
      setLoading(true);
      const response = await fetchApi(`${CONFIG_API.PROJECT}/${params.projectId}`, "DELETE");
      if (response.statusCode === 200) {
        router.push("/project");
        showToast("Delete project successfully!", "success");
      }
    } catch (error) {
      console.error(error);
      showToast("An error occurred please try again", "error");
    } finally {
      setOpenConfirmDelete(false);
      setLoading(false);
    }
  };

  const fetchProjectDetail = async () => {
    try {
      const response = await fetchApi(`${CONFIG_API.PROJECT}/${params.projectId}`);
      // console.log(response);
      if (response && response.statusCode === 200) {
        setProjects(response.data);
        fetchDepartment(response.data.department);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchDepartment = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetchApi(`${CONFIG_API.DEPARTMENT}/${id}`, "GET");
      if (response.statusCode === 200) {
        // const manager = await fetchApi(`${CONFIG_API.USER.INDEX}/${response.data?.manager}`);
        // response.data.manager = manager.data.name;

        const employeeOptions = await Promise.all(
          response.data.employees.map(async (employee: string) => {
            const employeeInfo = await fetchApi(`${CONFIG_API.USER.INDEX}/${employee}`);
            return {
              id: employeeInfo?.data._id,
              name: employeeInfo?.data.name ?? "Unknown",
            };
          })
        );
        response.data.employees = employeeOptions;
        setEmployeesForDepartment(response.data.employees);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showToast("Failed to fetch department details", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectDetail();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.projectId]);

  if (loading) {
    return <FallbackSpinner />;
  }

  return (
    <Can I="get" a="projects/:id">
      <Toast />
      <Grow in={true} timeout={500}>
        <Container maxWidth="xl" sx={{ py: 4 }}>
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

                <Can I="delete" a="projects/:id">
                  <Tooltip title="Delete project">
                    <IconButton
                      color="error"
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        zIndex: 1,
                        background: theme.palette.error.light + "20",
                        "&:hover": { background: theme.palette.error.light + "40" },
                      }}
                      onClick={() => setOpenConfirmDelete(true)}
                    >
                      <MdFolderDelete />
                    </IconButton>
                  </Tooltip>
                </Can>
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
                        value={projects?.progress ?? 0}
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
                    <Box>
                      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
                        Files
                      </Typography>
                      <Grid container spacing={3}>
                        {projects?.attachments.map((item) => (
                          <Grid item key={item} md={6} xs={6}>
                            <a href={item} target="_blank">
                              Download
                            </a>
                            <Divider />
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
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
                      <Box sx={{ mb: 3 }}>
                        {!addMembers ? (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              flexWrap: "wrap",
                              transition: "all 0.3s ease",
                              p: 1,
                              borderRadius: 1,
                              "&:hover": { bgcolor: "action.hover" },
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <Tooltip title="Add members">
                                <IconButton
                                  color="primary"
                                  sx={{
                                    bgcolor: "primary.light",
                                    color: "primary.contrastText",
                                    "&:hover": { bgcolor: "primary.main" },
                                  }}
                                  onClick={() => setAddMembers(true)}
                                >
                                  <IoPersonAddSharp />
                                </IconButton>
                              </Tooltip>
                              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                Team Members
                              </Typography>
                            </Box>

                            <AvatarGroup
                              max={6}
                              sx={{
                                "& .MuiAvatar-root": {
                                  transition: "transform 0.2s",
                                  "&:hover": {
                                    transform: "scale(1.1)",
                                    boxShadow: 2,
                                  },
                                },
                              }}
                            >
                              {projects?.teamMembers.map((member, index) => (
                                <Tooltip key={member} title={`Member ${index + 1}`}>
                                  <Avatar
                                    src={"/images/img_avatar.png"}
                                    sx={{ width: 40, height: 40, border: "2px solid white" }}
                                  />
                                </Tooltip>
                              ))}
                            </AvatarGroup>
                          </Box>
                        ) : (
                          // Chế độ thêm thành viên
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              p: 2,
                              bgcolor: "background.paper",
                              borderRadius: 1,
                              boxShadow: 1,
                              transition: "all 0.3s ease",
                            }}
                          >
                            <Autocomplete<{ name: string; id: string }, true, false, false>
                              multiple
                              options={employeesForDepartment}
                              getOptionLabel={(option) => option.name || "N/A"}
                              value={selectedMembers}
                              onChange={(e, newValue: any) => {
                                setSelectedMembers([...newValue]);
                                console.log("Selected:", newValue);
                              }}
                              disableCloseOnSelect
                              fullWidth
                              renderOption={(props, option, { selected }) => (
                                <MenuItem
                                  {...props}
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    py: 1.5,
                                    bgcolor: selected ? "action.selected" : "inherit",
                                  }}
                                >
                                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    <Avatar src={"/images/img_avatar.png"} sx={{ width: 32, height: 32 }} />
                                    <Typography>{option.name || "N/A"}</Typography>
                                  </Box>
                                  {selected && <MdCheckCircleOutline color="primary" />}
                                </MenuItem>
                              )}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Select team members"
                                  placeholder="Search employees..."
                                  variant="outlined"
                                  size="small"
                                  InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                      <>
                                        <InputAdornment position="start">
                                          <IoPeopleSharp color="action" />
                                        </InputAdornment>
                                        {params.InputProps.startAdornment}
                                      </>
                                    ),
                                  }}
                                />
                              )}
                              sx={{ flexGrow: 1 }}
                            />

                            <Tooltip title="Cancel">
                              <IconButton
                                color="error"
                                onClick={() => setAddMembers(false)}
                                sx={{
                                  background: theme.palette.error.light + "20",
                                  "&:hover": { background: theme.palette.error.light + "40" },
                                }}
                              >
                                <GiCancel />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Save changes">
                              <IconButton
                                sx={{
                                  color: "skyblue",
                                  background: theme.palette.info.light + "20",
                                  "&:hover": { background: theme.palette.info.light + "40" },
                                }}
                              >
                                <IoIosCheckmarkCircleOutline size={24} />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        )}
                      </Box>

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
                    </Box>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 4 }} />

                {/* Task Management Section */}
                {/* <Can I="get" a="tasks"> */}
                <TaskManager />
                {/* </Can> */}
              </Box>
            </Paper>
          </LocalizationProvider>
        </Container>
      </Grow>
      <Dialog
        open={openConfirmDelete}
        onClose={() => {
          setOpenConfirmDelete(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Delete Project
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mt: 2, borderRadius: 2 }}>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this project? This action cannot be undone.
            </DialogContentText>
          </Alert>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setOpenConfirmDelete(false)}
            color="inherit"
            sx={{
              borderRadius: 2,
              px: 3,
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteProject}
            color="error"
            variant="contained"
            sx={{
              borderRadius: 2,
              px: 3,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Can>
  );
};

export default React.memo(ProjectDetail);
