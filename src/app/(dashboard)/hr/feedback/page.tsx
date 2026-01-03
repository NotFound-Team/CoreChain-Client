"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  Paper,
  useTheme,
  alpha,
  Chip,
  Stack,
  Grid,
  TextareaAutosize,
  InputLabel,
} from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { MdDelete, MdWork, MdVisibility } from "react-icons/md";
import { useSnackbar } from "@/hooks/useSnackbar";
import fetchApi from "@/utils/fetchApi";
import { CONFIG_API } from "@/configs/api";
import { Can } from "@/context/casl/AbilityContext";
import CustomDataGrid from "@/components/custom-data-grid";
import { GridColDef } from "@mui/x-data-grid";
import { Controller, useForm } from "react-hook-form";
import ConfirmDelete from "@/components/dialog-confirm-delete";
import { useAuth } from "@/hooks/useAuth";
import dayjs from "dayjs";
import SpinnerModal from "@/components/modal-spinner";

interface TFeedback {
  _id: string;
  sender?: string;
  encryptedEmployeeId: string;
  category: string;
  isFlagged: false;
  title: string;
  content: string;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function PositionPage() {
  const theme = useTheme();
  const [rowsFeedback, setPositions] = useState<TFeedback[]>([]);
  const [loadingFetchFeedback, setLoadingFetchFeedback] = useState(false);
  const [loadingFetchDetailsFeedback, setLoadingFetchDetailsFeedback] = useState(false);
  const [open, setOpen] = useState(false);
  const [feedbackId, setFeedbackId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { Toast, showToast } = useSnackbar();

  const { user } = useAuth();

  // rows data grid
  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", flex: 2, maxWidth: 320 },
    {
      field: "content",
      headerName: "Content",
      minWidth: 500,
    },

    {
      field: "category",
      headerName: "Category",
      flex: 1,
      maxWidth: 200,
      renderCell: (params) => {
        const value = params.value;

        return (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Chip label={value} variant="outlined" color={value ? "error" : "success"} />
          </Box>
        );
      },
    },

    {
      field: "isFlagged",
      headerName: "Flagged",
      flex: 1,
      maxWidth: 120,
      renderCell: (params) => {
        const value = params.value;

        return (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Chip label={value ? "Unreviewed" : "Reviewed"} variant="filled" color={value ? "error" : "success"} />
          </Box>
        );
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 200,
      headerAlign: "center",
      align: "center",
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Stack direction="row" spacing={1}>
              <Can I="get" a="departments/:id">
                <IconButton
                  onClick={() => {
                    setFeedbackId(String(params.id));
                    fetchDetailsFeedbacks(String(params.id));
                    setOpen(true);
                  }}
                >
                  <MdVisibility />
                </IconButton>
              </Can>
              <Can I="delete" a="departments/:id">
                <IconButton
                  onClick={() => {
                    setFeedbackId(String(params.id));
                    setDeleteDialogOpen(true);
                  }}
                >
                  <MdDelete />
                </IconButton>
              </Can>
            </Stack>
          </Box>
        );
      },
    },
  ];

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TFeedback>({
    defaultValues: { sender: "", title: "", content: "", category: "", isFlagged: false },
    mode: "onBlur",
    // resolver: yupResolver(schema),
  });

  // ** fetch
  const fetchFeedbacks = async () => {
    try {
      setLoadingFetchFeedback(true);
      const response = await fetchApi(`${CONFIG_API.FEEDBACK.INDEX}`, "GET");
      if (response.statusCode === 200) {
        setPositions(response.data.result);
      }
    } catch (error) {
      console.error("Error fetching positions:", error);
      showToast("Failed to fetch positions", "error");
    } finally {
      setLoadingFetchFeedback(false);
    }
  };

  const fetchDetailsFeedbacks = async (id: string) => {
    try {
      setLoadingFetchDetailsFeedback(true);
      const response = await fetchApi(`${CONFIG_API.FEEDBACK.DETAIL(id)}`, "GET");
      if (response.statusCode === 200) {
        reset({
          sender: response.data.sender,
          title: response.data.title,
          content: response.data.content,
          category: response.data.category,
          isFlagged: response.data.isFlagged,
          createdAt: response.data.createdAt,
        });
      }
    } catch (error) {
      console.error("Error fetching positions:", error);
      showToast("Failed to fetch positions", "error");
    } finally {
      setLoadingFetchDetailsFeedback(false);
    }
  };

  // ** handle
  const handleOpen = () => {
    setOpen(true);
    reset({
      sender: "",
      title: "",
      content: "",
      category: "",
    });
  };

  const handleClose = () => {
    setOpen(false);
    setFeedbackId(null);
    reset({
      sender: "",
      title: "",
      content: "",
      category: "",
    });
  };

  const handleConfirmDelete = useCallback(async () => {
    if (!feedbackId) return;
    setLoadingFetchDetailsFeedback(true);
    try {
      const response = await fetchApi(`${CONFIG_API.FEEDBACK.DETAIL(feedbackId)}`, "DELETE");
      if (response.statusCode === 200) {
        showToast("Feedback deleted successfully", "success");
        fetchFeedbacks();
      }
    } catch (_) {
      showToast("Failed to delete Feedback", "error");
    } finally {
      setDeleteDialogOpen(false);
      setFeedbackId(null);
      setLoadingFetchDetailsFeedback(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedbackId]);

  const handleCancelDelete = useCallback(() => {
    setDeleteDialogOpen(false);
    setFeedbackId(null);
  }, []);

  const onSubmit = async (data: { sender?: string; title: string; category: string; content: string }) => {
    if (data && user?._id) {
      data.sender = user._id;
    }
    setLoadingFetchDetailsFeedback(true);
    try {
      const response = await fetchApi(`${CONFIG_API.FEEDBACK.INDEX}`, "POST", data);
      if (response.statusCode === 201) {
        showToast("Feedback sent successfully", "success");
      }
      handleClose();
      fetchFeedbacks();
    } catch (_) {
      showToast("Failed to save position", "error");
    } finally {
      setLoadingFetchDetailsFeedback(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loadingFetchDetailsFeedback && <SpinnerModal />}
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
                Feedback Management
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
                Create Feedback
              </Button>
            </Can>
          </Box>
          <Typography variant="body1" color="text.secondary">
            Manage and organize feedback within your organization
          </Typography>
        </Paper>

        <Box
          sx={{
            height: "calc(100vh - 150px)",
            width: "100%",
          }}
        >
          <CustomDataGrid
            loading={loadingFetchFeedback}
            rows={loadingFetchFeedback ? [] : rowsFeedback}
            columns={columns}
            pageSizeOptions={[10, 25, 50]}
            getRowId={(row) => row._id}
            autoHeight
          />
        </Box>

        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 2,
              minWidth: !feedbackId ? "sm" : { xs: "80vw", md: "800px" },
              maxWidth: !feedbackId ? "sm" : { xs: "80vw", md: "80vw" },
              overflowX: "hidden",
            },
          }}
        >
          <Box minWidth={{ md: "800px", xs: "80vw" }} maxWidth={{ md: "80vw", xs: "80vw" }}></Box>
          <DialogTitle sx={{ pb: 1 }}>
            <Typography sx={{ fontWeight: 600 }}>{feedbackId ? "Details Feedback" : "Create Feedback"}</Typography>
          </DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid container item md={!feedbackId ? 12 : 6} xs={12}>
                  <Grid item xs={12}>
                    <Controller
                      name="title"
                      disabled={!!feedbackId}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          margin="dense"
                          label="Title"
                          type="text"
                          fullWidth
                          required
                          sx={{ mb: 2 }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="category"
                      disabled={!!feedbackId}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          margin="dense"
                          label="Category"
                          type="text"
                          fullWidth
                          required
                          sx={{ mb: 2 }}
                        />
                      )}
                    />
                  </Grid>

                  {!!feedbackId && (
                    <Grid item xs={6} md={6}>
                      <InputLabel>CreatedAt</InputLabel>
                      <Controller
                        name="createdAt"
                        disabled={!!feedbackId}
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Typography>{dayjs(value).format("DD/MM/YYYY")}</Typography>
                        )}
                      />
                    </Grid>
                  )}
                  {!!feedbackId && (
                    <Grid item xs={6} md={6}>
                      <InputLabel>Flagged</InputLabel>
                      <Controller
                        name="isFlagged"
                        disabled={!!feedbackId}
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Chip
                            label={value ? "Unreviewed" : "Reviewed"}
                            variant="filled"
                            color={value ? "error" : "success"}
                          />
                        )}
                      />
                    </Grid>
                  )}
                </Grid>
                <Grid container item md={!feedbackId ? 12 : 6} xs={12}>
                  <Grid item xs={12}>
                    <InputLabel>Content</InputLabel>
                    <Controller
                      name="content"
                      control={control}
                      disabled={!!feedbackId}
                      render={({ field }) => (
                        <TextareaAutosize
                          {...field}
                          minRows={5}
                          placeholder="..."
                          style={{ width: "100%", border: "1px solid #A8AAAE", borderRadius: "6px", padding: "10px" }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button
                variant={feedbackId ? "contained" : "outlined"}
                onClick={handleClose}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  textTransform: "none",
                }}
              >
                {feedbackId ? "Close" : "Cancel"}
              </Button>
              {!feedbackId && (
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
                  {feedbackId ? "Update" : "Create"}
                </Button>
              )}
            </DialogActions>
          </form>
        </Dialog>
        <Suspense fallback={<div>Loading...</div>}>
          <ConfirmDelete
            deleteDialogOpen={deleteDialogOpen}
            handleCancelDelete={handleCancelDelete}
            handleConfirmDelete={handleConfirmDelete}
            titleConfirmDelete="Delete Feedback"
            descriptionConfirmDelete=" Are you sure you want to delete this position? This action cannot be undone."
          />
        </Suspense>
        <Toast />
      </Box>
    </>
  );
}
