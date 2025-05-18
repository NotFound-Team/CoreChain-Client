"use client";

import CustomDataGrid from "@/components/custom-data-grid";
import { CONFIG_API } from "@/configs/api";
import fetchApi from "@/utils/fetchApi";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { MdCheckCircleOutline } from "react-icons/md";
import { MdVisibility, MdEdit, MdDelete } from "react-icons/md";
import { Avatar, AvatarGroup, IconButton, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Controller, ControllerRenderProps, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SiCodestream } from "react-icons/si";
import { useSnackbar } from "@/hooks/useSnackbar";
import FallbackSpinner from "@/components/fall-back";

interface Employee {
  _id: string;
  name: string;
  avatar?: string;
}
export const columns: GridColDef[] = [
  { field: "index", headerName: "#", width: 70 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "manager", headerName: "Manager", width: 200 },

  {
    field: "employees",
    headerName: "Employees",
    width: 300,
    renderCell: (params) => (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <AvatarGroup
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
          max={4}
        >
          {params?.value.map((employee: Employee) => (
            <Avatar key={employee._id} alt={employee.name} src={employee.avatar} sx={{ width: 24, height: 24 }} />
          ))}
        </AvatarGroup>
      </Box>
    ),
  },

  { field: "budget", headerName: "Budget", width: 100 },

  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params) => {
      const value = params.value;
      let color = "gray";
      if (value === "active") color = "success";
      else if (value === "pending") color = "warning";
      else if (value === "inactive") color = "error";

      return (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Chip
            label={value}
            variant="outlined"
            color={color === "success" ? "success" : color === "warning" ? "warning" : "error"}
          />
        </Box>
      );
    },
  },

  {
    field: "action",
    headerName: "Action",
    width: 200,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Stack direction="row" spacing={1}>
          <IconButton onClick={() => console.log("View", params.row)}>
            <MdVisibility />
          </IconButton>
          <IconButton onClick={() => console.log("Edit", params.row)}>
            <MdEdit />
          </IconButton>
          <IconButton onClick={() => console.log("Delete", params.row)}>
            <MdDelete />
          </IconButton>
        </Stack>
      </Box>
    ),
  },
];

type TDepartment = {
  name: string;
  code: number;
  description: string;
  manager: string;
  employees: string[];
  status: string;
  budget: number;
};

// const schema = yup.object({
//   name: yup.string().required("The field is required"),
//   code: yup.number().required("The field is required"),
//   description: yup.string().required("The field is required"),
//   manager: yup.string().required("The field is required"),
//   employees: yup.array().required("The field is required"),
//   status: yup.string().required("The field is required"),
//   budget: yup.number().required("The field is required"),
// });

export default function Index() {
  const [open, setOpen] = useState(false);
  const [rowsDepartment, setRowsDepartment] = useState(undefined);
  const [employessArray, setEmployessArray] = useState([]);
  const { Toast, showToast } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(!open);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TDepartment>({
    defaultValues: { name: "", code: 0, description: "", manager: "", employees: [], status: "active", budget: 0 },
    mode: "onBlur",
    // resolver: yupResolver(schema),
  });

  const onSubmit = async (data: TDepartment) => {
    setLoading(true);
    data.budget = Number(data.budget);
    try {
      const response = await fetchApi(CONFIG_API.DEPARTMENT, "POST", data);
      if (response.statusCode === 201) {
        // fetch new data when create success
        fetchDepartment();
        showToast("Create department successfully!", "success");
      }
    } catch (error) {
      console.log(error);
      showToast("An error occurred please try again", "error");
    } finally {
      handleClose();
      setLoading(false);
    }
  };

  const fetchDepartment = async () => {
    const departmentResponse = await fetchApi(CONFIG_API.DEPARTMENT, "GET");
    const userResponse = await fetchApi(CONFIG_API.USER.INDEX, "GET");
    const userMap = new Map();
    userResponse?.data?.result.forEach((user: any) => {
      userMap.set(user._id, {
        id: user._id,
        name: user.name || user.email,
        avatar: user.avatar || `https://i.pravatar.cc/150?u=${user._id}`,
      });
    });

    setEmployessArray(
      userResponse?.data?.result.map((user: any) => ({
        _id: user._id,
        name: user.name,
        // avatar: user.avatar || `https://i.pravatar.cc/150?u=${user._id}`,
      }))
    );

    const formattedData = departmentResponse?.data?.result.map((department: any, index: number) => ({
      index: index + 1,
      id: department._id,
      name: department.name,
      manager: userMap.get(department.manager)?.name || "Unknown",
      employees: department.employees.map((id: string) => userMap.get(id)).filter(Boolean),
      budget: department.budget,
      status: department.status,
    }));

    setRowsDepartment(formattedData);
  };

  useEffect(() => {
    fetchDepartment();
  }, []);

  if (loading) {
    return <FallbackSpinner />;
  }

  return (
    <>
      <Toast />
      <Button
        onClick={() => {
          setOpen(true);
        }}
        variant="contained"
      >
        CREATE DEPARTMENT
      </Button>
      <h1>departments</h1>
      <CustomDataGrid rows={rowsDepartment} columns={columns} />
      {/* Form popup */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit)(e);
          }}
        >
          <DialogTitle sx={{ fontWeight: 600, px: 3, pt: 3, pb: 1 }}>NEW DEPARTMENT</DialogTitle>
          <DialogContent sx={{ px: 3, pt: 1 }}>
            <Grid item xs={12} md={6}>
              <Controller
                name="code"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    margin="normal"
                    id="Code"
                    label="code"
                    type="number"
                    variant="outlined"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SiCodestream />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid container spacing={2} sx={{ my: 2 }}>
              {/* Row 1 */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      margin="normal"
                      id="name"
                      label="Department Name"
                      variant="outlined"
                      size="small"
                      // error={!!errors.name}
                      // helperText={errors.name?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="budget"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      margin="normal"
                      id="budget"
                      label="Budget"
                      type="number"
                      variant="outlined"
                      size="small"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Row 2 */}
              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      margin="normal"
                      id="description"
                      label="Description"
                      variant="outlined"
                      size="small"
                      multiline
                      rows={3}
                    />
                  )}
                />
              </Grid>

              {/* Row 3 */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="manager"
                  control={control}
                  render={({ field }: { field: ControllerRenderProps<TDepartment, "manager"> }) => (
                    <Autocomplete
                      {...field}
                      onChange={(_, value) => field.onChange(value._id ?? "")}
                      value={employessArray.find((emp: { _id: string }) => emp._id === field.value) || null}
                      fullWidth
                      options={employessArray}
                      getOptionLabel={(option: any) => option?.name ?? "N/A"}
                      renderInput={(params) => <TextField {...params} margin="normal" label="Manager" size="small" />}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth margin="normal" size="small">
                      <InputLabel id="status-label">Status</InputLabel>
                      <Select {...field} labelId="status-label" label="Status">
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </Grid>

              {/* Row 4 */}
              {/* <MultiAutocomplete /> choose employees */}
              <Grid item xs={12}>
                <Controller
                  name="employees"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete<Employee, true, false, false>
                      {...field}
                      multiple
                      fullWidth
                      options={employessArray}
                      disableCloseOnSelect
                      getOptionLabel={(option: any) => option?.name ?? "N/A"}
                      onChange={(_, value) => field.onChange(value.map((v: any) => v._id))}
                      value={employessArray.filter((emp: any) => field.value?.includes(emp._id))}
                      renderOption={(props, option, { selected }) => (
                        <MenuItem value={option._id} sx={{ justifyContent: "space-between" }} {...props}>
                          {option.name}
                          {selected ? <MdCheckCircleOutline color="info" /> : null}
                        </MenuItem>
                      )}
                      renderInput={(params) => (
                        <TextField {...params} variant="outlined" label="Team Members" placeholder="Favorites" />
                      )}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleClose} variant="outlined" sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Create Department
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {/* Form popup */}
    </>
  );
}
