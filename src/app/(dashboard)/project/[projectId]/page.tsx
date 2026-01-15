"use client";

// ================== MUI ==================
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Grow from "@mui/material/Grow";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import Fade from "@mui/material/Fade";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Stack from "@mui/material/Stack";
import { useTheme, alpha } from "@mui/material/styles";

// ================== React & Next ==================
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

// ================== Others ==================
import dayjs from "dayjs";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers";

// ================== Icons ==================
import {
  MdOutlineDescription,
  MdInsertDriveFile,
  MdOutlinePriceChange,
  MdOutlineAttachMoney,
  MdOutlineUpdate,
  MdOutlineEventAvailable,
  MdOutlineAssignmentInd,
  MdFolderDelete,
  MdHourglassEmpty,
  MdPlayCircle,
  MdError,
  MdCheckCircle,
} from "react-icons/md";
import { GiCancel } from "react-icons/gi";
import { IoPersonAddSharp, IoArrowBack } from "react-icons/io5";
import { FaFilePdf, FaFileExcel, FaFileImage, FaFigma } from "react-icons/fa6";
import { BiTimeFive } from "react-icons/bi";

// ================== Components & Utils ==================
import TaskManager from "./TaskManager";
import FallbackSpinner from "@/components/fall-back";
import fetchApi from "@/utils/fetchApi";
import { CONFIG_API } from "@/configs/api";
import { useSnackbar } from "@/hooks/useSnackbar";
import { Can } from "@/context/casl/AbilityContext";
import { ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";

// ================== TYPES ==================
type TProject = {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  actualEndDate?: string;
  progress: number;
  attachments: string[];
  teamMembers: string[];
  department: string;
  status: number;
  priority: string;
  revenue: number;
  expenses: number;
  manager: { _id: string; name: string; email: string };
  updatedAt: string;
  updatedBy: { _id: string; email: string };
};

type TEmployeeOption = {
  id: string;
  name: string;
};

// ================== HELPERS ==================
const getFileIcon = (fileName: string) => {
  const name = fileName.toLowerCase();
  if (name.endsWith(".pdf")) return <FaFilePdf color="#F40F02" size={24} />;
  if (name.endsWith(".xlsx") || name.endsWith(".xls")) return <FaFileExcel color="#1D6F42" size={24} />;
  if (name.endsWith(".fig")) return <FaFigma color="#F24E1E" size={24} />;
  if (name.match(/\.(jpg|jpeg|png|gif)$/)) return <FaFileImage color="#B60205" size={24} />;
  return <MdInsertDriveFile color="#555" size={24} />;
};

const getStatusColor = (status: number) => {
  switch (status) {
    case 1:
      return "primary";
    case 2:
      return "success";
    case 3:
      return "warning";
    case 4:
      return "error";
    default:
      return "default";
  }
};

const STATUS_OPTIONS = [
  { value: 1, label: "Pending", color: "primary", icon: <MdHourglassEmpty /> },
  { value: 2, label: "Active", color: "success", icon: <MdPlayCircle /> },
  { value: 3, label: "Warning", color: "warning", icon: <MdError /> },
  { value: 4, label: "Closed", color: "error", icon: <MdCheckCircle /> },
];

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val || 0);
};

const WORK_IMAGES = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522071823991-b9671f43a4b6?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2000&auto=format&fit=crop",
];

const ProjectDetail = () => {
  const theme = useTheme();
  const params = useParams<{ projectId: string }>();
  const router = useRouter();

  const [loadingProject, setLoadingProject] = useState(true);
  const [loadingDepartment, setLoadingDepartment] = useState(true);
  const [projects, setProjects] = useState<TProject | undefined>();
  const [employeesForDepartment, setEmployeesForDepartment] = useState<TEmployeeOption[]>([]);
  const [addMembers, setAddMembers] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<TEmployeeOption[]>([]);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [bgImage, setBgImage] = useState("");
  const [anchorElStatus, setAnchorElStatus] = useState<null | HTMLElement>(null);
  const openStatusMenu = Boolean(anchorElStatus);

  const { showToast } = useSnackbar();

  const fetchDepartment = async (id: string) => {
    try {
      setLoadingDepartment(true);
      const response = await fetchApi(`${CONFIG_API.DEPARTMENT.DETAIL(id)}`, "GET");
      if (response.statusCode === 200) {
        const employeeOptions = await Promise.all(
          response.data.employees.map(async (employee: string) => {
            const employeeInfo = await fetchApi(`${CONFIG_API.USER.DETAIL(employee)}`);
            return {
              id: employeeInfo?.data._id,
              name: employeeInfo?.data.name ?? "Unknown",
            };
          }),
        );
        setEmployeesForDepartment(employeeOptions);
      }
    } catch (error) {
      showToast("Failed to fetch department details", "error");
    } finally {
      setLoadingDepartment(false);
    }
  };

  const handleUpdateStatus = async (newStatus: number) => {
    try {
      setAnchorElStatus(null); // Đóng menu
      const response = await fetchApi(`${CONFIG_API.PROJECT.DETAIL(params.projectId)}`, "PATCH", {
        status: newStatus,
      });

      if (response.statusCode === 200) {
        setProjects((prev) => (prev ? { ...prev, status: newStatus } : prev));
        showToast("Updated status successfully!", "success");
      }
    } catch (error) {
      showToast("Failed to update status", "error");
    }
  };

  const fetchProjectDetail = async () => {
    try {
      setLoadingProject(true);
      const response = await fetchApi(`${CONFIG_API.PROJECT.DETAIL(params.projectId)}`);
      if (response && response.statusCode === 200) {
        setProjects(response.data);
        fetchDepartment(response.data.department);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoadingProject(false);
    }
  };

  const handleDeleteProject = async () => {
    try {
      setLoadingProject(true);
      const response = await fetchApi(`${CONFIG_API.PROJECT.DETAIL(params.projectId)}`, "DELETE");
      if (response.statusCode === 200) {
        router.push("/project");
        showToast("Delete project successfully!", "success");
      }
    } catch (error) {
      showToast("An error occurred please try again", "error");
    } finally {
      setOpenConfirmDelete(false);
      setLoadingProject(false);
    }
  };

  useEffect(() => {
    if (params.projectId) fetchProjectDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.projectId]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * WORK_IMAGES.length);
    setBgImage(WORK_IMAGES[randomIndex]);
  }, []);

  if (loadingProject || loadingDepartment) return <FallbackSpinner />;
  if (!projects)
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">Project not found</Alert>
      </Box>
    );

  return (
    <Can I="get" a="projects/:id">
      <Grow in={true} timeout={500}>
        <Box sx={{ py: 3, mx: "auto" }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Paper
              elevation={0}
              sx={{ borderRadius: 4, overflow: "hidden", border: `1px solid ${theme.palette.divider}` }}
            >
              {/* HERO SECTION */}
              <Box
                sx={{
                  height: 320,
                  position: "relative",
                  backgroundImage: `url('${bgImage || WORK_IMAGES[0]}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%)",
                  }}
                />

                <Box sx={{ p: 3, display: "flex", justifyContent: "space-between", position: "relative", zIndex: 2 }}>
                  <Button
                    startIcon={<IoArrowBack />}
                    onClick={() => router.back()}
                    sx={{
                      color: "white",
                      bgcolor: "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(8px)",
                      "&:hover": { bgcolor: "rgba(255,255,255,0.25)" },
                    }}
                  >
                    Back
                  </Button>
                  <Tooltip title="Delete project">
                    <IconButton
                      onClick={() => setOpenConfirmDelete(true)}
                      sx={{
                        color: "#ffcdd2",
                        bgcolor: "rgba(211,47,47,0.4)",
                        backdropFilter: "blur(8px)",
                        "&:hover": { bgcolor: "rgba(211,47,47,0.6)" },
                      }}
                    >
                      <MdFolderDelete />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Box sx={{ p: 4, position: "relative", zIndex: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
                    {/* CLICKABLE STATUS CHIP */}
                    <Tooltip title="Click to change status">
                      <Chip
                        label={STATUS_OPTIONS.find((opt) => opt.value === projects.status)?.label || "Unknown"}
                        color={getStatusColor(projects.status) as any}
                        onClick={(e) => setAnchorElStatus(e.currentTarget)}
                        size="small"
                        sx={{
                          fontWeight: 700,
                          textTransform: "uppercase",
                          cursor: "pointer",
                          "&:hover": { opacity: 0.8 },
                        }}
                      />
                    </Tooltip>

                    {/* STATUS MENU */}
                    <Menu
                      anchorEl={anchorElStatus}
                      open={openStatusMenu}
                      onClose={() => setAnchorElStatus(null)}
                      PaperProps={{ sx: { borderRadius: 2, minWidth: 180, mt: 1 } }}
                    >
                      {STATUS_OPTIONS.map((option) => (
                        <MenuItem
                          key={option.value}
                          selected={option.value === projects.status}
                          onClick={() => handleUpdateStatus(option.value)}
                        >
                          <ListItemIcon sx={{ color: theme.palette[option.color as "primary"].main }}>
                            {option.icon}
                          </ListItemIcon>
                          <ListItemText primary={option.label} />
                        </MenuItem>
                      ))}
                    </Menu>

                    <Chip
                      label={`${projects.priority} Priority`}
                      variant="outlined"
                      size="small"
                      sx={{ color: "white", borderColor: "white", fontWeight: 600 }}
                    />
                  </Stack>
                  <Typography variant="h3" sx={{ color: "white", fontWeight: 800, mb: 2 }}>
                    {projects.name}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
                    <Box sx={{ display: "flex", alignItems: "center", color: "rgba(255,255,255,0.9)", gap: 1 }}>
                      <BiTimeFive size={20} />
                      <Typography variant="subtitle1">
                        {dayjs(projects.startDate).format("MMM DD, YYYY")} —{" "}
                        {dayjs(projects.endDate).format("MMM DD, YYYY")}
                      </Typography>
                    </Box>
                    <Box sx={{ flex: 1, maxWidth: 350 }}>
                      <LinearProgress
                        variant="determinate"
                        value={projects.progress}
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          bgcolor: "rgba(255,255,255,0.2)",
                          [`& .${linearProgressClasses.bar}`]: { bgcolor: "#4caf50" },
                        }}
                      />
                      <Typography variant="caption" sx={{ color: "white", fontWeight: 600 }}>
                        {projects.progress}% Overall Progress
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* CONTENT */}
              <Box sx={{ p: 4 }}>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={8}>
                    {/* Description */}
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      gutterBottom
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <MdOutlineDescription color={theme.palette.primary.main} /> Overview
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 4, lineHeight: 1.8, fontSize: "1.05rem" }}>
                      {projects.description}
                    </Typography>

                    <Divider sx={{ my: 4 }} />

                    {/* Attachments */}
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                      Attachments
                    </Typography>
                    <Grid container spacing={2}>
                      {projects.attachments.map((file, idx) => (
                        <Grid item xs={12} sm={6} key={idx}>
                          <Card variant="outlined" sx={{ borderRadius: 2, "&:hover": { boxShadow: theme.shadows[2] } }}>
                            <CardActionArea
                              href={file}
                              target="_blank"
                              sx={{ p: 2, display: "flex", justifyContent: "flex-start", gap: 2 }}
                            >
                              {getFileIcon(file)}
                              <Typography variant="body2" noWrap fontWeight={600} color="text.primary">
                                {file.split("/").pop()}
                              </Typography>
                            </CardActionArea>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>

                    <Box sx={{ mt: 6 }}>
                      <TaskManager employees={employeesForDepartment} />
                    </Box>
                  </Grid>

                  {/* SIDEBAR */}
                  <Grid item xs={12} md={4}>
                    <Stack spacing={3}>
                      {/* MANAGER CARD */}
                      <Paper
                        variant="outlined"
                        sx={{ p: 3, borderRadius: 3, bgcolor: alpha(theme.palette.primary.main, 0.02) }}
                      >
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <MdOutlineAssignmentInd /> PROJECT MANAGER
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 48, height: 48 }}>
                            {projects.manager?.name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle1" fontWeight={700}>
                              {projects.manager?.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {projects.manager?.email}
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>

                      {/* FINANCIALS CARD */}
                      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
                        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                          Financials
                        </Typography>
                        <Stack spacing={2}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                            >
                              <MdOutlineAttachMoney /> Revenue
                            </Typography>
                            <Typography variant="body1" fontWeight={700} color="success.main">
                              {formatCurrency(projects.revenue)}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                            >
                              <MdOutlinePriceChange /> Expenses
                            </Typography>
                            <Typography variant="body1" fontWeight={700} color="error.main">
                              {formatCurrency(projects.expenses)}
                            </Typography>
                          </Box>
                          <Divider />
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Typography variant="body2" fontWeight={600}>
                              Net Profit
                            </Typography>
                            <Typography variant="body1" fontWeight={800}>
                              {formatCurrency(projects.revenue - projects.expenses)}
                            </Typography>
                          </Box>
                        </Stack>
                      </Paper>

                      {/* TEAM CARD */}
                      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                          <Typography variant="h6" fontWeight={700}>
                            Team Members
                          </Typography>
                          {!addMembers && (
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => setAddMembers(true)}
                              sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}
                            >
                              <IoPersonAddSharp />
                            </IconButton>
                          )}
                        </Box>
                        {!addMembers ? (
                          <AvatarGroup max={6} sx={{ justifyContent: "flex-end" }}>
                            {projects.teamMembers.map((mId) => {
                              const emp = employeesForDepartment.find((e) => e.id === mId);
                              return (
                                <Tooltip key={mId} title={emp?.name || "Member"}>
                                  <Avatar
                                    src={`https://i.pravatar.cc/150?u=${mId}`}
                                    sx={{ border: "2px solid white" }}
                                  />
                                </Tooltip>
                              );
                            })}
                          </AvatarGroup>
                        ) : (
                          <Fade in>
                            <Box>
                              <Autocomplete
                                multiple
                                options={employeesForDepartment}
                                getOptionLabel={(o) => o.name}
                                value={selectedMembers}
                                onChange={(_, v) => setSelectedMembers(v)}
                                renderInput={(params) => (
                                  <TextField {...params} size="small" placeholder="Add members..." />
                                )}
                              />
                              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                                <Button size="small" variant="contained" fullWidth onClick={() => setAddMembers(false)}>
                                  Save
                                </Button>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  color="error"
                                  onClick={() => setAddMembers(false)}
                                >
                                  <GiCancel />
                                </Button>
                              </Stack>
                            </Box>
                          </Fade>
                        )}
                      </Paper>

                      {/* LOG CARD */}
                      <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, bgcolor: theme.palette.grey[50] }}>
                        <Stack spacing={1.5}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <MdOutlineEventAvailable color={theme.palette.text.secondary} />
                            <Typography variant="caption" color="text.secondary">
                              Actual End Date:{" "}
                              <b>
                                {projects.actualEndDate
                                  ? dayjs(projects.actualEndDate).format("DD/MM/YYYY")
                                  : "Not finished"}
                              </b>
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <MdOutlineUpdate color={theme.palette.text.secondary} />
                            <Typography variant="caption" color="text.secondary">
                              Last updated: {dayjs(projects.updatedAt).format("HH:mm DD/MM/YYYY")} by{" "}
                              {projects.updatedBy?.email}
                            </Typography>
                          </Box>
                        </Stack>
                      </Paper>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </LocalizationProvider>
        </Box>
      </Grow>

      {/* DELETE DIALOG */}
      <Dialog open={openConfirmDelete} onClose={() => setOpenConfirmDelete(false)}>
        <DialogTitle sx={{ fontWeight: 700 }}>Delete Project?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone. Are you sure you want to delete <b>{projects.name}</b>?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenConfirmDelete(false)}>Cancel</Button>
          <Button onClick={handleDeleteProject} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Can>
  );
};

export default React.memo(ProjectDetail);
