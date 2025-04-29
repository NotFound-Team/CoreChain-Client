"use client";

import * as React from "react";
import {
  Box,
  IconButton,
  Typography,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Autocomplete,
  SelectChangeEvent,
} from "@mui/material";
import { MdAddBox, MdCheckCircleOutline, MdOutlineGridView } from "react-icons/md";
import { LuRows3 } from "react-icons/lu";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TCreateProject, TProject, Employee } from "@/types/project";
import { CONFIG_API } from "@/configs/api";
import fetchApi from "@/utils/fetchApi";
import { useSnackbar } from "@/hooks/useSnackbar";
import Loading from "@/components/Loading";
import ProjectCardSkeleton from "@/components/ProjectCardSkeleton";
const ProjectCard = React.lazy(() => import("./ProjectCard"));

export default function ProjectList() {
  const { Toast, showToast } = useSnackbar();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [projectList, setProjectList] = React.useState<(TProject | TCreateProject)[]>([]);
  const [open, setOpen] = React.useState(false);
  const [employees, setEmployees] = React.useState<Employee[]>([]);
  const [formData, setFormData] = React.useState<TCreateProject>({
    name: "",
    description: "",
    teamMembers: [],
    department: "dshjdkjdhkdsbkdfsbskjbdskj",
    priority: 1,
    status: 1,
    tasks: [],
    revenue: 0,
    startDate: null,
    endDate: null,
  });

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

  const handleDateChange = (date: Date | null, field: string) => {
    setFormData({
      ...formData,
      [field]: date,
    });
  };

  // Send submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("formData", formData);

    try {
      setLoading(true);
      const response = await fetchApi(`${CONFIG_API.PROJECT}`, "POST", formData);
      if (response && response.statusCode === 201) {
        setProjectList((prev) => [...prev, formData]);
        showToast("Create project success!", "success");
      }
    } catch (error) {
      showToast("Error message!", "error");
      console.log("error", error);
    } finally {
      setLoading(false);
    }

    handleClose();
  };

  React.useEffect(() => {
    const cachedProjects = localStorage.getItem("projects");

    if (cachedProjects) {
      setProjectList(JSON.parse(cachedProjects));
    } else {
      const fetchProjects = async () => {
        const response = await fetchApi(`${CONFIG_API.PROJECT}`, "GET");
        if (response && response.statusCode === 200) {
          setProjectList(response.data.projects);
        }
      };
      fetchProjects();
    }
    return () => {
      setProjectList([]);
    };
  }, []);

  React.useEffect(() => {
    if (projectList.length > 0) {
      localStorage.setItem("projects", JSON.stringify(projectList));
    }
  }, [projectList]);

  React.useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetchApi(`${CONFIG_API.USER.INDEX}`, "GET");
      if (response && response.statusCode === 200) {
        setEmployees(
          response.data.result.map((item: { name: string; _id: string }) => ({
            name: item.name,
            _id: item._id,
          }))
        );
      }
    };
    fetchEmployees();
  }, []);

  console.log("PROJECT", projectList);

  return (
    <>
      <Toast />
      <Loading open={loading} message="Creating project..." />
      {loading || projectList.length === 0 ? (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 3 }}>
          {Array.from({ length: 5 }).map((_, index) => (
            <ProjectCardSkeleton key={index} index={index} />
          ))}
        </Box>
      ) : (
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
            <Typography variant="h4" sx={{ fontSize: { xs: "20px", sm: "28px", md: "32px" } }} fontWeight={700}>
              Projects
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                color="primary"
                sx={{ bgcolor: "action.selected", borderRadius: 2, "&:hover": { bgcolor: "action.hover" } }}
              >
                <MdOutlineGridView size={20} />
              </IconButton>
              <IconButton
                color="primary"
                sx={{ bgcolor: "action.selected", borderRadius: 2, "&:hover": { bgcolor: "action.hover" } }}
              >
                <LuRows3 size={20} />
              </IconButton>
              <Button
                variant="contained"
                startIcon={<MdAddBox size={20} />}
                sx={{
                  borderRadius: 2,
                  px: { xs: 2, sm: 3, md: 4 }, // padding-x responsive theo breakpoint
                  fontSize: { xs: "10px", sm: "14px", md: "16px" }, // font size responsive
                  height: { xs: 30, sm: 36, md: 42 }, // thêm luôn height nếu muốn đồng bộ
                  gap: { xs: 0.5, sm: 1 },
                }}
                onClick={handleClickOpen}
              >
                New Project
              </Button>
            </Box>
          </Box>

          {/* Form popup */}
          <Dialog open={open} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
              <DialogTitle sx={{ fontWeight: 600 }}>NEW PROJECT</DialogTitle>
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
                  <Grid item xs={12}>
                    <Autocomplete<Employee, true, false, false>
                      // value={formData.teamMembers}
                      value={formData.teamMembers}
                      onChange={(e, arrayValues) => {
                        console.log("ArrayValue", arrayValues);
                        setFormData({ ...formData, teamMembers: arrayValues });
                      }}
                      fullWidth
                      multiple
                      id="tags-standard"
                      options={employees}
                      getOptionLabel={(option) => option.name ?? "N/A"}
                      disableCloseOnSelect
                      renderOption={(props, option, { selected }) => (
                        <MenuItem value={option.id} sx={{ justifyContent: "space-between" }} {...props}>
                          {option.name ?? "N/A"}
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
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      margin="dense"
                      id="revenue"
                      name="revenue"
                      label="Revenue"
                      type="number"
                      fullWidth
                      variant="outlined"
                      value={formData.revenue}
                      onChange={handleFormChange}
                    />
                  </Grid>
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
                        value={formData.startDate}
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
                        value={formData.endDate}
                        onChange={(date) => handleDateChange(date, "endDate")}
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
          {/* Form popup */}

          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 3 }}>
            {/* <React.Suspense fallback={<Loading open={loading} message="Loading..." />}> */}
            {projectList.map((project, index) => (
              <ProjectCard key={`${project._id}-${index}`} projectItem={project} index={index} />
            ))}
            {/* </React.Suspense> */}
          </Box>
        </Box>
      )}
    </>
  );
}
