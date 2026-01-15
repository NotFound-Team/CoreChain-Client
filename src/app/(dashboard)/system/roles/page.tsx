"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  Alert,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Switch,
  TextField,
  IconButton,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import fetchApi from "@/utils/fetchApi";
import { CONFIG_API } from "@/configs/api";
import { FaRegAddressCard } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md"; // Import icon xóa
import { Role } from "@/types/role";
import { useAuth } from "@/hooks/useAuth";
import { Can } from "@/context/casl/AbilityContext";
import { RoleManagementSummary } from "./RoleManagementSummary";
import CustomDataGrid from "@/components/custom-data-grid";

export default function RolePage() {
  const { user } = useAuth();
  const [rolePermissions, setRolePermissions] = useState<Role[] | null>(null);
  const [loading, setLoading] = useState(true); // Thêm state loading cho DataGrid
  const [open, setOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [isActives, setIsActives] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isActive: true,
    permissions: [],
  });

  // ================== COLUMNS DEFINITION ==================
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "no",
        headerName: "No.",
        width: 70,
        renderCell: (params) => {
          // Lấy index dựa trên vị trí trong mảng
          const index = rolePermissions?.findIndex((r) => r._id === params.row._id);
          return (index ?? 0) + 1;
        },
      },
      { field: "name", headerName: "Role name", flex: 1, minWidth: 150 },
      { field: "description", headerName: "Description", flex: 1.5, minWidth: 250 },
      {
        field: "isActive",
        headerName: "Status",
        width: 120,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
          <Chip
            label={params.value ? "Active" : "Inactive"}
            color={params.value ? "success" : "error"}
            size="small"
            variant="filled"
          />
        ),
      },
      {
        field: "actions",
        headerName: "Action",
        width: 100,
        sortable: false,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
          <IconButton
            color="error"
            onClick={() => {
              setSelectedRoleId(params.row._id);
              setOpenConfirmDelete(true);
            }}
          >
            <MdDeleteOutline />
          </IconButton>
        ),
      },
    ],
    [rolePermissions],
  );

  // ================== HANDLERS ==================
  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsActives(event.target.checked);
    setFormData({ ...formData, isActive: event.target.checked });
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetchApi(`${CONFIG_API.ROLE.INDEX}`, "POST", formData);
      if (response && response.statusCode === 201) {
        const NewRole: Role = { ...formData, _id: response.data };
        setRolePermissions((prev) => [...(prev ?? []), NewRole]);
        handleClose();
      }
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  const handleDeleteRole = async () => {
    try {
      const response = await fetchApi(`${CONFIG_API.ROLE.DETAIL(selectedRoleId as string)}`, "DELETE");
      if (response.statusCode === 200) {
        setRolePermissions((prev) => prev?.filter((role) => role._id !== selectedRoleId) ?? null);
        setOpenConfirmDelete(false);
        setSelectedRoleId(null);
      }
    } catch (error) {
      console.error("error message", error);
    }
  };

  useEffect(() => {
    const fetchRole = async () => {
      setLoading(true);
      try {
        const response = await fetchApi(`${CONFIG_API.ROLE.INDEX}`, "GET");
        if (response && response.statusCode === 200) {
          setRolePermissions(response.data.result);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchRole();
  }, []);

  return (
    <>
      <Can I="get" a="roles">
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <RoleManagementSummary />
            <Button
              variant="contained"
              startIcon={<FaRegAddressCard />}
              sx={{ borderRadius: 2, px: 3, height: 48 }}
              onClick={handleClickOpen}
            >
              New role
            </Button>
          </div>

          {/* Thay thế table bằng CustomDataGrid */}
          <div className="flex-grow w-full" style={{ height: 600 }}>
            <CustomDataGrid
              rows={rolePermissions ?? []}
              columns={columns}
              loading={loading}
              getRowId={(row) => row._id}
              pageSizeOptions={[10, 25, 50]}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              disableRowSelectionOnClick
            />
          </div>

          {/* DIALOG CREATE NEW ROLE */}
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <form onSubmit={handleSubmit}>
              <DialogTitle sx={{ fontWeight: 600 }}>NEW ROLE</DialogTitle>
              <DialogContent dividers>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      name="name"
                      label="Name"
                      fullWidth
                      variant="outlined"
                      onChange={handleFormChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      name="description"
                      label="Description"
                      fullWidth
                      variant="outlined"
                      onChange={handleFormChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl component="fieldset" variant="standard">
                      <InputLabel shrink sx={{ fontSize: 20, mb: 2 }}>
                        Status
                      </InputLabel>
                      <FormControlLabel
                        sx={{ mt: 2 }}
                        control={<Switch checked={isActives} onChange={handleStatusChange} color="primary" />}
                        label={
                          isActives ? (
                            <Chip label="Active" color="success" size="small" />
                          ) : (
                            <Chip label="Inactive" color="error" size="small" />
                          )
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions sx={{ p: 2 }}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" variant="contained">
                  Create
                </Button>
              </DialogActions>
            </form>
          </Dialog>

          {/* DIALOG CONFIRM DELETE */}
          <Dialog open={openConfirmDelete} onClose={() => setOpenConfirmDelete(false)}>
            <Alert severity="warning" sx={{ borderRadius: 0 }}>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete this role? This action cannot be undone.
                </DialogContentText>
              </DialogContent>
            </Alert>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => setOpenConfirmDelete(false)}>Cancel</Button>
              <Button onClick={handleDeleteRole} color="error" variant="contained">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Can>
    </>
  );
}
