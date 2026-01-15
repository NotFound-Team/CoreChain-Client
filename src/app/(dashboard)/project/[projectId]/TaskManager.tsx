"use client";

import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  List,
  useTheme,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  DialogActions,
  SelectChangeEvent,
  alpha,
  Paper,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdFormatListBulleted } from "react-icons/md";
import TaskItem from "./TaskItem";
import fetchApi from "@/utils/fetchApi";
import { useParams } from "next/navigation";
import { CONFIG_API } from "@/configs/api";
import { TCreateTask, TTask } from "@/types/task";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSnackbar } from "@/hooks/useSnackbar";
import dayjs from "dayjs";
import { Can } from "@/context/casl/AbilityContext";
import { Employee } from "@/types/project";

const TaskManager = ({ employees }: { employees: Employee[] }) => {
  const { Toast, showToast } = useSnackbar();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [listTask, setListTask] = useState<TTask[]>([]);
  const params = useParams<{ projectId: string }>();

  const [formData, setFormData] = useState<TCreateTask>({
    title: "",
    description: "",
    assignedTo: "",
    projectId: `${params.projectId}`,
    priority: 1,
    status: 1,
    startDate: null,
    dueDate: null,
  });

  // ... (Giữ nguyên các hàm handleDeleteTask, handleFormChange, handleSelectChange, handleDateChange) ...
  const handleDeleteTask = async (taskId: string) => {
    try {
      await fetchApi(`${CONFIG_API.TASK}/${taskId}`, "DELETE");
      setListTask((prev) => prev.filter((task) => task._id !== taskId));
      showToast("Deleted task successfully!", "success");
    } catch (error) {
      showToast("Error!", "error");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetchApi(`${CONFIG_API.TASK.INDEX}`, "POST", formData);
      if (response && response.statusCode === 201) {
        const newData: TTask = {
          ...formData,
          _id: response.data,
          attachments: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          isDeleted: false,
          deletedAt: null,
          createdBy: {},
        };
        setListTask((prev) => [newData, ...prev]);
        showToast("Create task success!", "success");
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetchApi(`${CONFIG_API.TASK.INDEX}?projectId=${params.projectId}`, "GET");
      if (response && response.statusCode === 200) {
        setListTask(response.data.result);
      }
    };
    fetchTask();
  }, [params.projectId]);

  return (
    <Box sx={{ mt: 4 }}>
      <Toast />
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 1.5 }}>
          <MdFormatListBulleted color={theme.palette.primary.main} />
          Project Tasks
        </Typography>
        <Can I="post" a="tasks">
          <Button
            variant="contained"
            startIcon={<IoMdAdd />}
            onClick={() => setOpen(true)}
            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600, px: 3 }}
          >
            New Task
          </Button>
        </Can>
      </Box>

      {/* Task List */}
      <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {listTask.length > 0 ? (
          listTask.map((task) => (
            <TaskItem
              key={task._id}
              data={{ tasks: task, theme }}
              employees={employees}
              handleDeleteTask={handleDeleteTask}
            />
          ))
        ) : (
          <Paper
            variant="outlined"
            sx={{ p: 4, textAlign: "center", borderStyle: "dashed", bgcolor: alpha(theme.palette.grey[500], 0.02) }}
          >
            <Typography color="text.secondary">No tasks assigned to this project yet.</Typography>
          </Paper>
        )}
      </List>

      {/* Add Task Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>Create New Task</DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2.5} sx={{ mt: 0.5 }}>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Task Title"
                  name="title"
                  fullWidth
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="What needs to be done?"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  fullWidth
                  multiline
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Assign To</InputLabel>
                  <Select
                    label="Assign To"
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
          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setOpen(false)} color="inherit">
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ px: 4 }}>
              Create Task
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default TaskManager;
