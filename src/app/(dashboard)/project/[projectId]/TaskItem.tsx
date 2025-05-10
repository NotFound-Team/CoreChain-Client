import { CONFIG_API } from "@/configs/api";
import { useSnackbar } from "@/hooks/useSnackbar";
import { TCreateTask, TTask } from "@/types/task";
import fetchApi from "@/utils/fetchApi";
import {
  Avatar,
  AvatarGroup,
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
  SelectChangeEvent,
  TextField,
  Theme,
  Tooltip,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

type TaskItemProps = {
  data: { tasks: TTask; theme: Theme };
  handleDeleteTask: (taskId: string) => Promise<void>;
};

const TaskItem = React.memo<TaskItemProps>(({ data, handleDeleteTask }) => {
  const { Toast, showToast } = useSnackbar();
  const { tasks, theme } = data;
  const params = useParams();
  const [formData, setFormData] = useState<TCreateTask>({
    name: tasks.name || "",
    title: tasks.title || "",
    description: tasks.description || "",
    assignedTo: "",
    projectId: `${params.projectId}`,
    priority: tasks.priority || 1,
    status: tasks.status || 1,
    startDate: tasks.startDate || null,
    dueDate: tasks.dueDate || null,
  });
  const [open, setOpen] = useState(false);
  const taskStart = tasks?.startDate;
  const taskEnd = tasks?.dueDate;

  const handleClickOpen = () => {
    setOpen(true);
    setFormData({
      name: tasks.name,
      title: tasks.title,
      description: tasks.description,
      assignedTo: "",
      projectId: `${params.projectId}`,
      priority: tasks.priority,
      status: tasks.status,
      startDate: tasks.startDate,
      dueDate: tasks.dueDate,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent<number>, field: string) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const handleDateChange = (date: dayjs.Dayjs | null, field: string) => {
    console.log(formData);
    setFormData({
      ...formData,
      [field]: dayjs(date).toISOString(),
    });
  };

  const handleEditTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    try {
      const response = await fetchApi(`${CONFIG_API.TASK}/${tasks._id}`, "PATCH", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      console.log(response);
      if (response) {
        showToast("Edit task successfully!", "success");
      } else {
        showToast("Failed to edit task. Please try again.", "error");
      }
    } catch (error) {
      console.log("error", error);
      showToast("An error occurred while editing the task. Please try again.", "error");
    }
  };

  return (
    <Box>
      <Toast />
      <Paper
        key={tasks._id}
        elevation={2}
        sx={{
          pr: 2,
          mb: 2,
          background: theme.palette.background.paper,
          display: "flex",
          borderRadius: 3,
          overflow: "hidden",
          transition: "transform 0.2s",
          "&:hover": { transform: "translateX(5px)" },
        }}
      >
        <Box
          sx={{
            pl: 2,
            height: "100px",
            bgcolor: tasks.status === 1 ? "#F3F3F4" : tasks.status === 2 ? "#7367F0" : "#EA5455",
          }}
        ></Box>
        <ListItem sx={{ py: 2, background: theme.palette.background.paper }}>
          <ListItemAvatar>
            <AvatarGroup max={3}>
              <Tooltip title={`Assignee `}>
                <Avatar
                  src={"/static/images/avatar/1.jpg"}
                  sx={{
                    width: 40,
                    height: 40,
                    border: "2px solid #fff",
                    "&:hover": { transform: "scale(1.1)" },
                    transition: "transform 0.2s",
                  }}
                />
              </Tooltip>
            </AvatarGroup>
          </ListItemAvatar>

          <ListItemText
            primary={
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {tasks.title}
              </Typography>
            }
            secondary={
              <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
                {tasks.description}
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
              {dayjs(taskStart).format("DD/MM/YYYY")} - {dayjs(taskEnd).format("DD/MM/YYYY")}
            </Typography>

            <Tooltip title="Priority">
              <Box>
                {tasks.priority === 1 && <Chip label="Low" color="default" size="small" sx={{ borderRadius: 1 }} />}
                {tasks.priority === 2 && <Chip label="Medium" color="primary" size="small" sx={{ borderRadius: 1 }} />}
                {tasks.priority === 3 && <Chip label="High" color="error" size="small" sx={{ borderRadius: 1 }} />}
              </Box>
            </Tooltip>
          </Box>
          <Divider sx={{ ml: 2 }} orientation="vertical" flexItem />
          <Tooltip sx={{ ml: 2 }} title="Status">
            <Box>
              {tasks.status === 1 && <Chip label="Not Started" color="default" size="small" sx={{ borderRadius: 1 }} />}
              {tasks.status === 2 && <Chip label="In Progress" color="primary" size="small" sx={{ borderRadius: 1 }} />}
              {tasks.status === 3 && <Chip label="Completed" color="error" size="small" sx={{ borderRadius: 1 }} />}
            </Box>
          </Tooltip>

          <Divider sx={{ ml: 2 }} orientation="vertical" flexItem />

          <Box sx={{ ml: 2, display: "flex", gap: 1 }}>
            <Tooltip title="Edit Task">
              <IconButton
                sx={{
                  background: theme.palette.action.hover,
                  "&:hover": { background: theme.palette.action.selected },
                }}
                onClick={handleClickOpen}
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
                onClick={() => handleDeleteTask(tasks._id)}
              >
                <MdDeleteForever />
              </IconButton>
            </Tooltip>

            <Dialog open={open} onClose={handleClose}>
              <form onSubmit={handleEditTask}>
                <DialogTitle sx={{ fontWeight: 600 }}>EDIT TASK</DialogTitle>
                <DialogContent>
                  <Grid container spacing={2} sx={{ mb: 4 }}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        margin="dense"
                        id="name"
                        name="name"
                        label="Name"
                        fullWidth
                        variant="outlined"
                        value={formData.name}
                        onChange={handleFormChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        margin="dense"
                        id="title"
                        name="title"
                        label="Title"
                        fullWidth
                        variant="outlined"
                        value={formData.title}
                        onChange={handleFormChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        fullWidth
                        variant="outlined"
                        value={formData.description}
                        onChange={handleFormChange}
                      />
                    </Grid>

                    {/* <MultiAutocomplete /> */}
                    {/* <Grid item xs={12}>
                <Autocomplete<Employee, true, false, false>
                  // value={formData.teamMembers}
                  value={formData.teamMembers}
                  onChange={(e, arrayValues) => {
                    setFormData({ ...formData, teamMembers: arrayValues });
                  }}
                  fullWidth
                  multiple
                  id="tags-standard"
                  options={employees}
                  getOptionLabel={(option) => option.id ?? "N/A"}
                  disableCloseOnSelect
                  renderOption={(props, option, { selected }) => (
                    <MenuItem value={option.id} sx={{ justifyContent: "space-between" }} {...props}>
                      {option.id ?? "N/A"}
                      {selected ? <MdCheckCircleOutline color="info" /> : null}
                    </MenuItem>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Team Members"
                      name="teamMembers"
                      placeholder="Favorites"
                    />
                  )}
                />
              </Grid> */}

                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel id="priority-label">Priority</InputLabel>
                        <Select
                          labelId="priority-label"
                          id="priority"
                          name="priority"
                          label="Priority"
                          value={formData.priority}
                          onChange={(e) => handleSelectChange(e, "priority")}
                        >
                          <MenuItem value={1}>Low</MenuItem>
                          <MenuItem value={2}>Medium</MenuItem>
                          <MenuItem value={3}>High</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                          labelId="status-label"
                          id="status"
                          name="status"
                          label="Status"
                          value={formData.status}
                          onChange={(e) => handleSelectChange(e, "status")}
                        >
                          <MenuItem value={1}>Not Started</MenuItem>
                          <MenuItem value={2}>In Progress</MenuItem>
                          <MenuItem value={3}>Completed</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Start Date"
                          value={dayjs(formData.startDate)}
                          onChange={(date) => handleDateChange(date, "startDate")}
                          sx={{
                            width: "100%",
                            "& .MuiOutlinedInput-root": { borderRadius: 2 },
                          }}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="End Date"
                          value={dayjs(formData.dueDate)}
                          onChange={(date) => handleDateChange(date, "dueDate")}
                          sx={{
                            width: "100%",
                            "& .MuiOutlinedInput-root": { borderRadius: 2 },
                          }}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit">Edit</Button>
                </DialogActions>
              </form>
            </Dialog>
          </Box>
        </ListItem>
      </Paper>
    </Box>
  );
});

TaskItem.displayName = "TaskItem";

export default TaskItem;
