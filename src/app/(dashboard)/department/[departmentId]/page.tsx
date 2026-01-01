"use client";

// ** React
import React, { useState, useEffect } from "react";

// ** Next
import { useRouter } from "next/navigation";

// ** Mui
import {
  Box,
  Paper,
  Typography,
  Grid,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  useTheme,
  alpha,
  Divider,
  Avatar,
} from "@mui/material";

// ** React-icon
import { MdEdit, MdArrowBack } from "react-icons/md";
import { FaCalendarAlt, FaCircle, FaSyncAlt, FaUser, FaUsers } from "react-icons/fa";

// ** Hook
import { useSnackbar } from "@/hooks/useSnackbar";

// ** Utils
import fetchApi from "@/utils/fetchApi";

// ** Config
import { CONFIG_API } from "@/configs/api";

// ** Component
import FallbackSpinner from "@/components/fall-back";
import { Can } from "@/context/casl/AbilityContext";

interface Department {
  _id: string;
  name: string;
  description: string;
  manager: string;
  employees: string[];
  budget: number;
  code: number;
  projectIds: string[];
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface DepartmentDetailPageProps {
  params: Promise<{ departmentId: string }>;
}

export default function DepartmentDetailPage({ params }: DepartmentDetailPageProps) {
  const unwrappedParams = React.use(params);
  const { departmentId } = unwrappedParams;

  // theme
  const theme = useTheme();
  // router
  const router = useRouter();
  // state
  const [department, setDepartment] = useState<Department | null>(null);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const { Toast, showToast } = useSnackbar();

  const fetchDepartment = async () => {
    try {
      setLoading(true);
      const response = await fetchApi(`${CONFIG_API.DEPARTMENT}/${departmentId}`, "GET");
      // console.log("response", response);
      if (response.statusCode === 200) {
        const manager = await fetchApi(`${CONFIG_API.USER.INDEX}/${response.data?.manager}`);
        // console.log("manager", manager);
        response.data.manager = manager.data.name;
        const employeeNames = await Promise.all(
          response.data.employees.map(async (employee: string) => {
            const employeeInfo = await fetchApi(`${CONFIG_API.USER.INDEX}/${employee}`);
            return employeeInfo?.data.name ?? "Unknown";
          })
        );
        // console.log("employeeNames", employeeNames);
        response.data.employees = employeeNames;
        // console.log("response with names", response);
        setDepartment(response.data);
        setFormData({
          name: response.data.name,
          description: response.data.description,
        });
      }
    } catch (error) {
      console.error("Error fetching department:", error);
      showToast("Failed to fetch department details", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = () => {
    setEditDialogOpen(true);
  };

  const handleClose = () => {
    setEditDialogOpen(false);
    setFormData({
      name: department?.name || "",
      description: department?.description || "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetchApi(`${CONFIG_API.DEPARTMENT}/${departmentId}`, "PATCH", formData);
      if (response.statusCode === 200) {
        showToast("Department updated successfully", "success");
        setEditDialogOpen(false);
        fetchDepartment();
      }
    } catch (error) {
      console.error("Error updating department:", error);
      showToast("Failed to update department", "error");
    }
  };

  if (loading) {
    return <FallbackSpinner />;
  }

  // console.log("department", department);

  if (!department) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Department not found</Alert>
      </Box>
    );
  }

  // console.log("department", department);

  return (
    <Can I="get" a="departments/:id">
      <Box sx={{ p: 3 }}>
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
              <Button
                startIcon={<MdArrowBack />}
                onClick={() => router.back()}
                sx={{
                  color: theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  },
                }}
              >
                Back
              </Button>
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
                Department Details
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<MdEdit />}
              onClick={handleEdit}
              sx={{
                borderRadius: 2,
                px: 3,
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
                  backgroundColor: "primary.dark",
                },
              }}
            >
              Edit Department
            </Button>
          </Box>
        </Paper>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: `0px 2px 8px ${alpha(theme.palette.common.black, 0.05)}`,
                position: "relative",
              }}
            >
              {department.isDeleted && (
                <Chip
                  label="Deleted"
                  size="small"
                  color="error"
                  sx={{
                    position: "absolute",
                    right: 16,
                    top: 16,
                    backgroundColor: alpha(theme.palette.error.main, 0.1),
                    fontWeight: 600,
                  }}
                />
              )}

              <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: "text.primary" }}>
                {department.name}
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mb: 3,
                  lineHeight: 1.6,
                  whiteSpace: "pre-wrap",
                }}
              >
                {department.description}
              </Typography>

              {/* Budget Section */}
              <Box
                sx={{
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  p: 2,
                  borderRadius: 1,
                  mb: 4,
                }}
              >
                <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 600 }}>
                  Annual Budget:
                </Typography>
                <Typography variant="h6" color="text.primary">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(department.budget)}
                </Typography>
              </Box>

              {/* Manager Section */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, display: "flex", alignItems: "center" }}>
                  <FaUser style={{ fontSize: 18, marginRight: 8, color: theme.palette.text.secondary }} />
                  Department Manager
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: alpha(theme.palette.success.main, 0.05),
                    p: 2,
                    borderRadius: 1,
                  }}
                >
                  <Avatar sx={{ width: 40, height: 40, mr: 2 }}>{department.manager[0]}</Avatar>
                  <Typography variant="body1" fontWeight={500}>
                    {department.manager}
                  </Typography>
                </Box>
              </Box>

              {/* Employees Section */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FaUsers style={{ fontSize: 18, marginRight: 8, color: theme.palette.text.secondary }} />
                  Team Members ({department?.employees.length})
                </Typography>
                <Grid container spacing={1}>
                  {department?.employees.map((employee) => (
                    <Grid item xs={12} sm={6} key={employee}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          p: 1.5,
                          borderRadius: 1,
                          "&:hover": {
                            backgroundColor: "action.hover",
                          },
                        }}
                      >
                        <FaCircle
                          style={{
                            fontSize: 8,
                            color: theme.palette.text.disabled,
                            marginRight: 16,
                          }}
                        />
                        <Typography variant="body1">{employee || ""}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* Metadata */}
              <Divider sx={{ my: 2 }} />
              <Box
                sx={{
                  display: "flex",
                  gap: 1.5,
                  flexWrap: "wrap",
                  alignItems: "center",
                  color: "text.secondary",
                }}
              >
                <Chip
                  icon={<FaCalendarAlt style={{ fontSize: 14 }} />}
                  label={`Created ${new Date(department.createdAt).toLocaleDateString()}`}
                  size="small"
                  variant="outlined"
                />
                <Chip
                  icon={<FaSyncAlt style={{ fontSize: 14 }} />}
                  label={`Updated ${new Date(department.updatedAt).toLocaleDateString()}`}
                  size="small"
                  variant="outlined"
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Dialog
          open={editDialogOpen}
          onClose={handleClose}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 2,
            },
          }}
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Edit Department
            </Typography>
          </DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Name"
                type="text"
                fullWidth
                value={formData.name}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                name="description"
                label="Description"
                type="text"
                fullWidth
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
              />
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button
                onClick={handleClose}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  textTransform: "none",
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  borderRadius: 2,
                  px: 3,
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Update
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        <Toast />
      </Box>
    </Can>
  );
}
