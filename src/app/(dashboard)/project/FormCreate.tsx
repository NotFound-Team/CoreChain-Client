import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FaFileUpload } from "react-icons/fa";

interface FormCreateProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  formData: any;
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFormData: (data: any) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (e: any, field: string) => void;
  handleDateChange: (date: any, field: string) => void;
  department: any[];
}

// cập nhật props
export const FormCreate = ({
  open,
  handleClose,
  handleSubmit,
  formData,
  handleFormChange,
  setFormData,
  handleFileChange,
  handleSelectChange,
  handleDateChange,
  department,
}: FormCreateProps) => {
  return (
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
            <Grid item xs={6}>
              <InputLabel htmlFor="file-upload-input">Attachments</InputLabel>
              <input
                id="file-upload-input"
                multiple
                name="attachments"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload-input">
                <Button startIcon={<FaFileUpload />} size="small" variant="outlined" component="span">
                  Upload
                </Button>
              </label>
            </Grid>
            <Grid item xs={6}>
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

            {/* <MultiAutocomplete /> */}
            <Grid item xs={12}>
              {/* <Autocomplete<Employee, true, false, false>
                      // value={formData.teamMembers}
                      value={formData.teamMembers}
                      onChange={(e, arrayValues) => {
                        // console.log("ArrayValue", arrayValues);
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
                    /> */}

              <Autocomplete
                options={department}
                getOptionLabel={(option: any) => option.name}
                value={department.find((dept: { _id: string }) => dept._id === formData.department) || null}
                onChange={(event, newValue) => {
                  setFormData({
                    ...formData,
                    department: newValue?._id || "",
                    manager: newValue?.manager || "",
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} margin="normal" label="Department" size="small" required />
                )}
                fullWidth
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
  );
};
