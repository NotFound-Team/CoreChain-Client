"use client";

import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  TextField,
  Theme,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever, MdOutlineCalendarToday } from "react-icons/md";
import { TTask, TCreateTask } from "@/types/task";
import { Employee } from "@/types/project";
import { Can } from "@/context/casl/AbilityContext";
import { CONFIG_API } from "@/configs/api";
import fetchApi from "@/utils/fetchApi";
import { useSnackbar } from "@/hooks/useSnackbar";

type TaskItemProps = {
  data: { tasks: TTask; theme: Theme };
  employees: Employee[];
  handleDeleteTask: (taskId: string) => Promise<void>;
};

const TaskItem = React.memo<TaskItemProps>(({ data, employees, handleDeleteTask }) => {
  const { tasks, theme } = data;
  const { showToast, Toast } = useSnackbar();
  const params = useParams();
  const [open, setOpen] = useState(false);

  // Lấy thông tin người được giao task
  const assignee = employees.find((e) => e.id === tasks.assignedTo);

  const [formData, setFormData] = useState<TCreateTask>({
    title: tasks.title,
    description: tasks.description,
    assignedTo: tasks.assignedTo.toString(),
    projectId: `${params.projectId}`,
    priority: tasks.priority,
    status: tasks.status,
    startDate: tasks.startDate,
    dueDate: tasks.dueDate,
  });

  const getStatusColor = (status: number) => {
    switch (status) {
      case 2:
        return theme.palette.primary.main; // In Progress
      case 3:
        return theme.palette.success.main; // Completed (Xanh lá)
      default:
        return theme.palette.grey[400]; // Not Started
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetchApi(`${CONFIG_API.TASK.DETAIL(tasks._id)}`, "PATCH", formData);
      if (res) {
        showToast("Task updated successfully!", "success");
        setOpen(false);
        window.location.reload(); // Hoặc update state ở cha
      }
    } catch (error) {
      showToast("Update failed", "error");
    }
  };

  return (
    <Box>
      <Toast />
      <Paper
        elevation={0}
        sx={{
          mb: 1,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 3,
          display: "flex",
          overflow: "hidden",
          transition: "all 0.2s",
          "&:hover": {
            borderColor: theme.palette.primary.main,
            boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.08)}`,
            transform: "translateY(-2px)",
          },
        }}
      >
        {/* Status Bar Indicator */}
        <Box sx={{ width: 6, bgcolor: getStatusColor(tasks.status) }} />

        <ListItem sx={{ py: 1.5, px: 2 }}>
          <ListItemAvatar>
            <Tooltip title={assignee?.name || "Unassigned"}>
              <Avatar
                src={`https://i.pravatar.cc/150?u=${tasks.assignedTo}`}
                sx={{ width: 42, height: 42, border: `2px solid ${alpha(getStatusColor(tasks.status), 0.2)}` }}
              >
                {assignee?.name?.charAt(0)}
              </Avatar>
            </Tooltip>
          </ListItemAvatar>

          <ListItemText
            primary={
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  color: tasks.status === 3 ? "text.secondary" : "text.primary",
                  textDecoration: tasks.status === 3 ? "line-through" : "none",
                }}
              >
                {tasks.title}
              </Typography>
            }
            secondary={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 0.5 }}>
                <Typography
                  variant="caption"
                  sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "text.secondary" }}
                >
                  <MdOutlineCalendarToday size={14} />
                  {dayjs(tasks.dueDate).format("MMM DD")}
                </Typography>
                <Typography variant="caption" noWrap sx={{ maxWidth: 300 }}>
                  • {tasks.description}
                </Typography>
              </Box>
            }
          />

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Priority Chip */}
            <Chip
              label={tasks.priority === 3 ? "High" : tasks.priority === 2 ? "Medium" : "Low"}
              size="small"
              sx={{
                fontWeight: 600,
                fontSize: "0.7rem",
                bgcolor:
                  tasks.priority === 3 ? alpha(theme.palette.error.main, 0.1) : alpha(theme.palette.info.main, 0.1),
                color: tasks.priority === 3 ? theme.palette.error.main : theme.palette.info.main,
                border: "none",
              }}
            />

            {/* Status Chip */}
            <Chip
              label={tasks.status === 3 ? "Done" : tasks.status === 2 ? "In Progress" : "To Do"}
              size="small"
              variant="outlined"
              sx={{
                fontWeight: 600,
                fontSize: "0.7rem",
                borderColor: getStatusColor(tasks.status),
                color: getStatusColor(tasks.status),
              }}
            />

            <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 24, alignSelf: "center" }} />

            <Box sx={{ display: "flex" }}>
              <Can I="patch" a="tasks/:id">
                <IconButton size="small" onClick={() => setOpen(true)} sx={{ color: theme.palette.action.active }}>
                  <FaRegEdit size={18} />
                </IconButton>
              </Can>
              <Can I="delete" a="tasks/:id">
                <IconButton size="small" color="error" onClick={() => handleDeleteTask(tasks._id)}>
                  <MdDeleteForever size={20} />
                </IconButton>
              </Can>
            </Box>
          </Box>
        </ListItem>
      </Paper>

      {/* Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <form onSubmit={handleEditSubmit}>
          <DialogTitle sx={{ fontWeight: 700 }}>Edit Task</DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2} sx={{ mt: 0.5 }}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  fullWidth
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Assignee</InputLabel>
                  <Select
                    label="Assignee"
                    value={formData.assignedTo}
                    onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                  >
                    {employees.map((emp) => (
                      <MenuItem key={emp.id} value={emp.id}>
                        {emp.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    label="Priority"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: Number(e.target.value) })}
                  >
                    <MenuItem value={1}>Low</MenuItem>
                    <MenuItem value={2}>Medium</MenuItem>
                    <MenuItem value={3}>High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    label="Status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: Number(e.target.value) })}
                  >
                    <MenuItem value={1}>To Do</MenuItem>
                    <MenuItem value={2}>In Progress</MenuItem>
                    <MenuItem value={3}>Done</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid item xs={6}>
                  <DatePicker
                    label="Start Date"
                    sx={{ width: "100%" }}
                    value={dayjs(formData.startDate)}
                    onChange={(d) => setFormData({ ...formData, startDate: d ? d.toDate() : null })}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DatePicker
                    label="Due Date"
                    sx={{ width: "100%" }}
                    value={dayjs(formData.dueDate)}
                    onChange={(d) => setFormData({ ...formData, dueDate: d ? d.toDate() : null })}
                  />
                </Grid>
              </LocalizationProvider>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              Save Changes
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
});

TaskItem.displayName = "TaskItem";
export default TaskItem;
