import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { CreateUserModalProps } from "@/types/user";
import Button from "@mui/material/Button";

const FormCreateUser: React.FC<CreateUserModalProps> = ({ data }) => {
  const {
    open,
    loading,
    roles,
    departments,
    positions,
    handleSelectChange,
    handleClose,
    handleCreateUser,
    handleChange,
    formData,
  } = data;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
        },
      }}
    >
      <form onSubmit={handleCreateUser}>
        <DialogTitle
          sx={{
            fontWeight: 700,
            fontSize: "1.5rem",
            textAlign: "center",
            pt: 2,
          }}
        >
          Create New User
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                margin="normal"
                id="name"
                name="name"
                label="Full Name"
                placeholder="Le Van A"
                fullWidth
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
                InputProps={{
                  sx: { borderRadius: 2 },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                required
                margin="normal"
                id="employeeId"
                name="employeeId"
                label="Employee ID"
                fullWidth
                variant="outlined"
                value={formData.employeeId}
                onChange={handleChange}
                InputProps={{
                  sx: { borderRadius: 2 },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                margin="normal"
                id="email"
                name="email"
                label="Email"
                type="email"
                placeholder="user@company.com"
                fullWidth
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  sx: { borderRadius: 2 },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                margin="normal"
                id="password"
                name="password"
                label="Password"
                // type="password"
                fullWidth
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  sx: { borderRadius: 2 },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  name="role"
                  value={formData.role}
                  label="Role"
                  onChange={(e) => handleSelectChange("role", e.target.value)}
                  sx={{ borderRadius: 2 }}
                  required
                >
                  {roles.map((role) => (
                    <MenuItem key={role?._id} value={role?._id}>
                      {role?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="position-label">Position</InputLabel>
                <Select
                  labelId="position-label"
                  id="position"
                  name="position"
                  value={formData.position}
                  label="Position"
                  onChange={(e) => handleSelectChange("position", e.target.value)}
                  sx={{ borderRadius: 2 }}
                  // required
                >
                  {positions.map((position) => (
                    <MenuItem key={position._id} value={position._id}>
                      {position.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="department-label">Department</InputLabel>
                <Select
                  labelId="department-label"
                  id="department"
                  name="department"
                  value={formData.department}
                  label="Department"
                  onChange={(e) => handleSelectChange("department", e.target.value)}
                  sx={{ borderRadius: 2 }}
                  // required
                >
                  {departments.map((dept) => (
                    <MenuItem key={dept._id} value={dept._id}>
                      {dept.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch name="isActive" checked={formData.isActive} onChange={handleChange} color="primary" />
                  }
                  label={
                    <Box display="flex" alignItems="center">
                      Status:
                      <Chip
                        label={formData.isActive ? "Active" : "Inactive"}
                        color={formData.isActive ? "success" : "error"}
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    </Box>
                  }
                  sx={{
                    mt: 3,
                    ml: 1,
                  }}
                />
              </Grid> */}
          </Grid>
        </DialogContent>

        <DialogActions
          sx={{
            px: 3,
            pb: 3,
            justifyContent: "space-between",
          }}
        >
          <Button
            onClick={handleClose}
            variant="outlined"
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
            disabled={loading}
            sx={{
              borderRadius: 2,
              px: 3,
              textTransform: "none",
              minWidth: 100,
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FormCreateUser;
