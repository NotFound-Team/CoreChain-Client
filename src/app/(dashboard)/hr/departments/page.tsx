"use client";

import CustomDataGrid from "@/components/custom-data-grid";
import { CONFIG_API } from "@/configs/api";
import fetchApi from "@/utils/fetchApi";
import {
  Alert,
  alpha,
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { MdCheckCircleOutline, MdWork } from "react-icons/md";
import { MdVisibility, MdEdit, MdDelete } from "react-icons/md";
import { Avatar, AvatarGroup, IconButton, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Controller, ControllerRenderProps, useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
import { SiCodestream } from "react-icons/si";
import { useSnackbar } from "@/hooks/useSnackbar";
import FallbackSpinner from "@/components/fall-back";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Can } from "@/context/casl/AbilityContext";
import dynamic from "next/dynamic";
const DialogConfirmDelete = dynamic(() => import("@/components/dialog-confirm-delete"), { ssr: false });

interface Employee {
  _id: string;
  name: string;
  avatar?: string;
}

type TDepartment = {
  id: string;
  managerId?: string;
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
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [rowsDepartment, setRowsDepartment] = useState<TDepartment[] | []>([]);
  const [employessArray, setEmployessArray] = useState([]);
  const { Toast, showToast } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [loadingFetchDepartment, setLoadingFetchDepartment] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);

  // router
  const router = useRouter();

  const columns: GridColDef[] = [
    { field: "index", headerName: "#", flex: 0.5, maxWidth: 80 },
    { field: "name", headerName: "Name", flex: 2, maxWidth: 320 },
    { field: "manager", headerName: "Manager", flex: 1.5, maxWidth: 250 },

    {
      field: "employees",
      headerName: "Employees",
      flex: 1,
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
      flex: 1,
      maxWidth: 120,
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
                    router.push(`/department/${params.id}`);
                  }}
                >
                  <MdVisibility />
                </IconButton>
              </Can>
              <Can I="patch" a="departments/:id">
                <IconButton
                  onClick={() => {
                    handleOpenForm(String(params.id));
                    setSelectedDepartmentId(String(params.id));
                  }}
                >
                  <MdEdit />
                </IconButton>
              </Can>
              <Can I="delete" a="departments/:id">
                <IconButton
                  onClick={() => {
                    setSelectedDepartmentId(String(params.id));
                    setOpenConfirmDelete(true);
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

  const handleClose = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const handleCloseCofirm = useCallback(() => {
    setOpenConfirmDelete(false);
  }, []);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TDepartment>({
    defaultValues: { name: "", code: 0, description: "", manager: "", employees: [], status: "active", budget: 0 },
    mode: "onBlur",
    // resolver: yupResolver(schema),
  });

  // const onSubmit = async (data: TDepartment) => {
  //   setLoading(true);
  //   data.budget = Number(data.budget);
  //   try {
  //     const response = await fetchApi(CONFIG_API.DEPARTMENT, "POST", data);
  //     if (response.statusCode === 201) {
  //       // fetch new data when create success
  //       fetchDepartment();
  //       showToast("Create department successfully!", "success");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     showToast("An error occurred please try again", "error");
  //   } finally {
  //     handleClose();
  //     setLoading(false);
  //   }
  // };

  const onSubmit = async (data: TDepartment) => {
    setLoading(true);
    data.budget = Number(data.budget);
    try {
      const method = selectedDepartmentId ? "PATCH" : "POST";
      const url = selectedDepartmentId ? `${CONFIG_API.DEPARTMENT.DETAIL(selectedDepartmentId)}` : `${CONFIG_API.DEPARTMENT}`;
      const response = await fetchApi(url, method, data);
      if (response.statusCode === (selectedDepartmentId ? 200 : 201)) {
        showToast(
          selectedDepartmentId ? "Department updated successfully" : "Department created successfully",
          "success"
        );
        fetchDepartment();
      }
    } catch (error) {
      showToast("An error occurred, please try again", "error");
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  const handleDeleteDepartment = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchApi(`${CONFIG_API.DEPARTMENT.DETAIL(selectedDepartmentId as string)}`, "DELETE");
      if (response.statusCode === 200) {
        fetchDepartment();
        showToast("Delete department successfully!", "success");
        fetchDepartment();
      }
    } catch (error) {
      showToast("An error occurred please try again", "error");
    } finally {
      setOpenConfirmDelete(false);
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDepartmentId]);

  const fetchDepartment = async () => {
    try {
      setLoadingFetchDepartment(true);
      const departmentResponse = await fetchApi(CONFIG_API.DEPARTMENT.INDEX, "GET");
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
          avatar: user.avatar || `https://i.pravatar.cc/150?u=${user._id}`,
        }))
      );

      const formattedData = departmentResponse?.data?.result.map((department: any, index: number) => ({
        index: index + 1,
        id: department._id,
        code: department.code,
        name: department.name,
        description: department.description,
        manager: userMap.get(department.manager)?.name || "N/A",
        managerId: department.manager,
        employees: department.employees.map((id: string) => userMap.get(id)).filter(Boolean),
        budget: department.budget,
        status: department.status,
      }));
      setRowsDepartment(formattedData);
    } catch (error) {
    } finally {
      setLoadingFetchDepartment(false);
    }
  };

  const handleOpenForm = (id?: string) => {
    if (id) {
      // Edit mode
      if (rowsDepartment) {
        const dept = rowsDepartment?.find((r: TDepartment) => r.id === id);
        if (dept) {
          reset({
            name: dept.name,
            code: dept.code,
            description: dept.description,
            manager: dept.managerId,
            employees: dept.employees.map((e: any) => e.id),
            status: dept.status,
            budget: dept.budget,
          });
          setSelectedDepartmentId(id);
        }
      }
    } else {
      // Create mode
      reset({ name: "", code: 0, description: "", manager: "", employees: [], status: "active", budget: 0 });
      setSelectedDepartmentId(null);
    }
    setOpen(true);
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
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Paper
          elevation={0}
          sx={{
            width: "calc(100% - 64px)",
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
                Department Management
              </Typography>
            </Box>
            <Can I="post" a="departments">
              <Button
                variant="contained"
                startIcon={<FaPlus />}
                onClick={() => handleOpenForm()}
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
                Create Department
              </Button>
            </Can>
          </Box>
          <Typography variant="body1" color="text.secondary">
            Manage and organize positions within your organization
          </Typography>
        </Paper>

        <Box
          sx={{
            height: "calc(100vh - 150px)",
            width: "calc(100% - 64px)",
          }}
        >
          <CustomDataGrid
            loading={loadingFetchDepartment}
            rows={loadingFetchDepartment ? [] : rowsDepartment}
            // rows={rowsDepartment}
            columns={columns}
            pageSizeOptions={[10, 25, 50]}
            autoHeight
          />
        </Box>
        {/* Form popup */}
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit)(e);
            }}
          >
            <DialogTitle sx={{ fontWeight: 600, px: 3, pt: 3, pb: 1 }}>
              {selectedDepartmentId ? "UPDATE DEPARTMENT" : "NEW DEPARTMENT"}
            </DialogTitle>
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
                {selectedDepartmentId ? "Update" : "Create"}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        {/* Form popup */}
        
        {/* Alert comfirm delete department */}
        <DialogConfirmDelete
          deleteDialogOpen={openConfirmDelete}
          titleConfirmDelete=" Delete Department"
          descriptionConfirmDelete=" Are you sure you want to delete this department? This action cannot be undone."
          handleConfirmDelete={handleDeleteDepartment}
          handleCancelDelete={handleCloseCofirm}
        />
      </Box>
    </>
  );
}
