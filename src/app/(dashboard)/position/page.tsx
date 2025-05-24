"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Tooltip,
  Fade,
  useTheme,
  alpha,
} from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { MdEdit, MdDelete, MdWork } from "react-icons/md";
import { useSnackbar } from "@/hooks/useSnackbar";
import fetchApi from "@/utils/fetchApi";
import { CONFIG_API } from "@/configs/api";
import { Can } from "@/context/casl/AbilityContext";

interface Position {
  _id: string;
  title: string;
  description: string;
  level: number;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function PositionPage() {
  const theme = useTheme();
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingPosition, setEditingPosition] = useState<Position | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    level: 1,
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [positionToDelete, setPositionToDelete] = useState<string | null>(null);
  const { Toast, showToast } = useSnackbar();

  const fetchPositions = async () => {
    try {
      setLoading(true);
      const response = await fetchApi(`${CONFIG_API.POSITION}`, "GET");
      if (response.statusCode === 200) {
        setPositions(response.data.result);
      }
    } catch (error) {
      console.error("Error fetching positions:", error);
      showToast("Failed to fetch positions", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setEditingPosition(null);
    setFormData({
      title: "",
      description: "",
      level: 1,
    });
  };

  const handleClose = () => {
    setOpen(false);
    setEditingPosition(null);
    setFormData({
      title: "",
      description: "",
      level: 1,
    });
  };

  const handleEdit = (position: Position) => {
    setEditingPosition(position);
    setFormData({
      title: position.title,
      description: position.description,
      level: position.level,
    });
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    setPositionToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!positionToDelete) return;

    try {
      const response = await fetchApi(`${CONFIG_API.POSITION}/${positionToDelete}`, "DELETE");
      if (response.statusCode === 200) {
        showToast("Position deleted successfully", "success");
        fetchPositions();
      }
    } catch (error) {
      console.error("Error deleting position:", error);
      showToast("Failed to delete position", "error");
    } finally {
      setDeleteDialogOpen(false);
      setPositionToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setPositionToDelete(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPosition) {
        const response = await fetchApi(`${CONFIG_API.POSITION}/${editingPosition._id}`, "PATCH", formData);
        if (response.statusCode === 200) {
          showToast("Position updated successfully", "success");
        }
      } else {
        const response = await fetchApi(`${CONFIG_API.POSITION}`, "POST", formData);
        if (response.statusCode === 201) {
          showToast("Position created successfully", "success");
        }
      }
      handleClose();
      fetchPositions();
    } catch (error) {
      console.error("Error saving position:", error);
      showToast("Failed to save position", "error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "level" ? parseInt(value) || 1 : value,
    }));
  };

  return (
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
              Position Management
            </Typography>
          </Box>
          <Can I="post" a="positions">
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
          </Can>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Manage and organize positions within your organization
        </Typography>
      </Paper>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {positions.map((position) => (
            <Grid item xs={12} sm={6} md={4} key={position._id}>
              <Fade in={true} timeout={500}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: theme.shadows[4],
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                      <Typography
                        component="div"
                        sx={{
                          fontWeight: 600,
                          color: theme.palette.primary.main,
                        }}
                      >
                        {position.title}
                      </Typography>
                      <Box>
                        <Can I="patch" a="positions/:id">
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() => handleEdit(position)}
                              size="small"
                              sx={{
                                color: theme.palette.primary.main,
                                "&:hover": {
                                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                },
                              }}
                            >
                              <MdEdit />
                            </IconButton>
                          </Tooltip>
                        </Can>
                        <Can I="delete" a="positions/:id">
                          <Tooltip title="Delete">
                            <IconButton
                              onClick={() => handleDelete(position._id)}
                              size="small"
                              color="error"
                              sx={{
                                "&:hover": {
                                  backgroundColor: alpha(theme.palette.error.main, 0.1),
                                },
                              }}
                            >
                              <MdDelete />
                            </IconButton>
                          </Tooltip>
                        </Can>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "inline-block",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        mb: 2,
                      }}
                    >
                      Level {position.level}
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {position.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog
        open={open}
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
          <Typography sx={{ fontWeight: 600 }}>{editingPosition ? "Edit Position" : "Create Position"}</Typography>
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Title"
              type="text"
              fullWidth
              value={formData.title}
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
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              name="level"
              label="Level"
              type="number"
              fullWidth
              value={formData.level}
              onChange={handleChange}
              required
              inputProps={{ min: 1 }}
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
              {editingPosition ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        PaperProps={{
          sx: {
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Typography sx={{ fontWeight: 600 }}>Delete Position</Typography>
        </DialogTitle>
        <DialogContent>
          <Alert
            severity="warning"
            sx={{
              mt: 2,
              borderRadius: 2,
            }}
          >
            Are you sure you want to delete this position? This action cannot be undone.
          </Alert>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleCancelDelete}
            sx={{
              borderRadius: 2,
              px: 3,
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
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

      <Toast />
    </Box>
  );
}
