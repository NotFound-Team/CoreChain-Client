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
  Theme,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  DialogActions,
  SelectChangeEvent,
  // Autocomplete,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import TaskItem from "./TaskItem";
import fetchApi from "@/utils/fetchApi";
import { useParams } from "next/navigation";
import { CONFIG_API } from "@/configs/api";
import { TCreateTask, TTask } from "@/types/task";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSnackbar } from "@/hooks/useSnackbar";
import dayjs from "dayjs";
import { Can } from "@/context/casl/AbilityContext";

const TaskManager = () => {
  const { Toast, showToast } = useSnackbar();
  const theme: Theme = useTheme();
  const [open, setOpen] = useState(false);
  const [listTask, setListTask] = useState<TTask[]>([]);
  const params = useParams<{ projectId: string }>();
  const [formData, setFormData] = useState<TCreateTask>({
    name: "",
    title: "",
    description: "",
    assignedTo: "67de058dbbc3c5d061a65dfe",
    projectId: `${params.projectId}`,
    priority: 1,
    status: 1,
    startDate: null,
    dueDate: null,
  });

  const handleDeleteTask = async (taskId: string) => {
    try {
      await fetchApi(`${CONFIG_API.TASK}/${taskId}`, "DELETE");
      setListTask((prev) => prev.filter((task) => task._id !== taskId));
      showToast("Deleted task successfully!", "success");
    } catch (error) {
      showToast("Error!", "error");
      console.error("error", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
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
    setFormData({
      ...formData,
      [field]: dayjs(date).toISOString(),
    });
  };

  // console.log(listTask);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(formData);
    try {
      const response = await fetchApi(`${CONFIG_API.TASK}`, "POST", formData);

      if (response && response.statusCode === 201) {
        // console.log("add task", response);
        const newData: TTask = {
          ...formData,
          _id: response.data,
          deletedAt: null, // No deletion initially
          attachments: [], // Default empty array for attachments
          createdAt: new Date(), // Set current date for creation time
          createdBy: {}, // You can replace 'system' with the actual user ID or name
          isDeleted: false, // Set to false since the task is not deleted initially
          updatedAt: new Date(),
        };
        setListTask((prev) => [...prev, newData]);
        showToast("Create task success!", "success");
      }
    } catch (error) {
      console.error("error", error);
    } finally {
      setOpen(false);
    }
  };
  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetchApi(`${CONFIG_API.TASK}?projectId=${params.projectId}`, "GET");
      if (response && response.statusCode === 200) {
        setListTask(response.data.result);
      }
    };
    fetchTask();
  }, [params]);
  return (
    <Box sx={{ mt: 6 }}>
      <Toast />
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
        <Can I="post" a="tasks">
          <Button
            variant="contained"
            startIcon={<IoMdAdd />}
            onClick={handleClickOpen}
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
        </Can>
      </Box>

      {/* Add Task Form */}
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle sx={{ fontWeight: 600 }}>ADD TASK</DialogTitle>
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
            <Button type="submit">Create</Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Task List */}
      {/* <Can I="get" a="tasks"> */}
      <List sx={{ "& .MuiListItem-root": { px: 0 } }}>
        {listTask.map((tasks) => (
          <TaskItem key={tasks._id} data={{ tasks, theme }} handleDeleteTask={handleDeleteTask} />
        ))}
      </List>
      {/* </Can> */}
    </Box>
  );
};

export default TaskManager;
