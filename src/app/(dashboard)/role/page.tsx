"use client";

import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import fetchApi from "@/utils/fetchApi";
import { CONFIG_API } from "@/configs/api";
import { FaRegAddressCard } from "react-icons/fa";
import { Role } from "@/types/role";
import ListRole from "./ListRole";
import { useAuth } from "@/hooks/useAuth";
import { hasPermission } from "@/utils/permissions";

export default function RolePage() {
  const { user } = useAuth();
  const [rolePermissions, setRolePermissions] = useState<Role[] | null>(null);
  const [open, setOpen] = React.useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = React.useState(false);
  const [isActives, setIsActives] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isActive: true,
    permissions: [],
  });

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsActives(event.target.checked);
    setFormData({
      ...formData,
      isActive: event.target.checked,
    });
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetchApi(`${CONFIG_API.ROLE}`, "POST", formData);
      if (response && response.statusCode === 201) {
        console.log(response);
        const NewRole: Role = {
          ...formData,
          _id: response.data,
        };
        setRolePermissions((prev) => [...(prev ?? []), NewRole]);
        handleClose();
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const handleDeleteRole = async () => {
    try {
      const response = await fetchApi(`${CONFIG_API.ROLE}/${selectedRoleId}`, "DELETE");
      if (response.statusCode === 200) {
        setRolePermissions((prev) => {
          if (prev !== null) {
            return prev.filter((role) => role._id !== selectedRoleId);
          }
          return null;
        });
        setOpenConfirmDelete(false);
        setSelectedRoleId(null);
      }
    } catch (error) {
      console.log("error message", error);
    }
  };

  useEffect(() => {
    const fecthRole = async () => {
      const response = await fetchApi(`${CONFIG_API.ROLE}`, "GET");
      if (response && response.statusCode === 200) {
        console.log("ROLE", response.data.result);
        setRolePermissions(response.data.result);
      }
    };
    fecthRole();
  }, []);
  console.log();
  return (
    <>
      {hasPermission(user, "get roles") && (
        <div className="p-6">
          <div className="flex justify-end">
            <Button
              variant="contained"
              startIcon={<FaRegAddressCard />}
              sx={{ borderRadius: 2, px: 3 }}
              onClick={handleClickOpen}
            >
              New role
            </Button>
          </div>
          <div>
            <table className="w-full mt-4">
              <thead>
                <tr className="bg-gray-100 font-bold">
                  <th className="text-left p-2">No.</th>
                  <th className="text-left p-2">Role name</th>
                  <th className="text-left p-2">Description</th>
                  <th className="text-center p-2">Status</th>
                  <th className="text-center p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                <ListRole
                  rolePermissions={rolePermissions}
                  setSelectedRoleId={setSelectedRoleId}
                  setOpenConfirmDelete={setOpenConfirmDelete}
                  user={user}
                />
              </tbody>
            </table>
          </div>
          <Dialog open={open} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
              <DialogTitle sx={{ fontWeight: 600 }}>NEW ROLE</DialogTitle>
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
                      // value={formData.name}
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
                      // value={formData.description}
                      onChange={handleFormChange}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel shrink sx={{ fontSize: 20 }}>
                        Status
                      </InputLabel>
                      <FormControlLabel
                        sx={{ margin: 1 }}
                        control={
                          <Switch
                            name="isActive"
                            defaultChecked
                            checked={isActives}
                            onChange={handleStatusChange}
                            inputProps={{ "aria-label": "Status switch" }}
                          />
                        }
                        label={
                          isActives ? (
                            <Chip label="Active" color="success" variant="filled" />
                          ) : (
                            <Chip label="Inactive" color="error" variant="filled" />
                          )
                        }
                      />
                    </FormControl>
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
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Create</Button>
              </DialogActions>
            </form>
          </Dialog>

          <Dialog
            open={openConfirmDelete}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Alert severity="warning" sx={{ borderRadius: 0 }}>
              <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete this role? This action cannot be undone.
                </DialogContentText>
              </DialogContent>
            </Alert>
            <DialogActions sx={{ backgroundColor: "#fff" }}>
              <Button onClick={() => setOpenConfirmDelete(false)} color="inherit">
                Cancel
              </Button>
              <Button onClick={handleDeleteRole} color="error" variant="contained" autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
}
