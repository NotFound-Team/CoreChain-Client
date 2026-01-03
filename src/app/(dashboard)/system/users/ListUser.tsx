"use client";

import React, { useCallback, useState, useEffect, useMemo } from "react";
import { Box, Chip, IconButton, Tooltip, Typography, Stack, Avatar } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import dynamic from "next/dynamic";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

import { CONFIG_API } from "@/configs/api";
import { Can } from "@/context/casl/AbilityContext";
import { UserResponse } from "@/types/user";
import fetchApi from "@/utils/fetchApi";
import CustomDataGrid from "@/components/custom-data-grid/CustomDataGrid";

const DialogConfirmDelete = dynamic(() => import("@/components/dialog-confirm-delete"), { ssr: false });

export default function ListUser() {
  const [listUser, setListUser] = useState<UserResponse[]>([]);
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchListUser = useCallback(async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      const response = await fetchApi(`${CONFIG_API.USER.INDEX}`, "GET", { signal });
      if (response && response.statusCode === 200) {
        setListUser(response.data.result);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchListUser(controller.signal);
    return () => controller.abort();
  }, [fetchListUser]);

  const handleCloseConfirm = () => setOpenConfirmDelete(false);

  const handleDeleteUser = async () => {
    if (!selectedUserId) return;
    try {
      setLoading(true);
      const response = await fetchApi(`${CONFIG_API.USER.INDEX}/${selectedUserId}`, "DELETE");
      if (response && response.statusCode === 200) {
        setListUser((prev) => prev.filter((user) => user._id !== selectedUserId));
        setOpenConfirmDelete(false);
      }
    } catch (error) {
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "index",
        headerName: "No.",
        width: 70,
        sortable: false,
        renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1,
      },
      {
        field: "name",
        headerName: "User Information",
        flex: 1,
        minWidth: 250,
        renderCell: (params) => (
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{
              height: "100%",
              width: "100%",
              py: 0.5,
            }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                fontSize: "15px",
                fontWeight: 600,
                bgcolor: "primary.light",
                color: "primary.main",
              }}
            >
              {params.row.name?.charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{
                  lineHeight: 1.4,
                  color: "text.primary",
                }}
              >
                {params.row.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  lineHeight: 1.2,
                  color: "text.secondary",
                  display: "block",
                }}
              >
                {params.row.email}
              </Typography>
            </Box>
          </Stack>
        ),
      },
      {
        field: "role",
        headerName: "Role",
        width: 200,
        valueGetter: (params, row) => row.role?.name || "No role assigned",
        renderCell: (params) => (
          <Typography variant="body2" color="text.secondary">
            {params.value}
          </Typography>
        ),
      },
      {
        field: "status",
        headerName: "Status",
        width: 130,
        align: "center",
        headerAlign: "center",
        renderCell: () => (
          <Chip label="Active" color="success" size="small" variant="filled" sx={{ fontWeight: 600 }} />
        ),
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 150,
        sortable: false,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
          <Stack direction="row" spacing={0.5}>
            <Can I="get" a="users/:id">
              <Tooltip title="View" arrow>
                <IconButton size="small" color="primary" component={Link} href={`/user-management/${params.row._id}`}>
                  <IoEye size={20} />
                </IconButton>
              </Tooltip>
            </Can>

            <Can I="patch" a="users/:id">
              <Tooltip title="Edit" arrow>
                <IconButton size="small" color="warning">
                  <FaRegEdit size={18} />
                </IconButton>
              </Tooltip>
            </Can>

            <Can I="delete" a="users/:id">
              <Tooltip title="Delete" arrow>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => {
                    setSelectedUserId(params.row._id);
                    setOpenConfirmDelete(true);
                  }}
                >
                  <MdDelete size={20} />
                </IconButton>
              </Tooltip>
            </Can>
          </Stack>
        ),
      },
    ],
    []
  );

  return (
    <Box sx={{ height: "calc(100vh - 200px)", width: "100%", mt: 2 }}>
      <Can I="get" a="users">
        <CustomDataGrid
          rows={listUser}
          columns={columns}
          getRowId={(row: UserResponse) => row._id}
          loading={loading}
          pagination
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          disableRowSelectionOnClick
        />
      </Can>

      <DialogConfirmDelete
        deleteDialogOpen={openConfirmDelete}
        titleConfirmDelete="Delete User"
        descriptionConfirmDelete="Are you sure you want to delete this user? This action cannot be undone."
        handleConfirmDelete={handleDeleteUser}
        handleCancelDelete={handleCloseConfirm}
      />
    </Box>
  );
}
