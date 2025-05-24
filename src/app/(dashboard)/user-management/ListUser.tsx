"use client";

import { CONFIG_API } from "@/configs/api";
import { Can } from "@/context/casl/AbilityContext";
import { UserResponse } from "@/types/user";
import fetchApi from "@/utils/fetchApi";
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Skeleton,
  Tooltip,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

export default function ListUser() {
  const [listUser, setListUser] = React.useState<UserResponse[] | []>([]);
  const [openConfirmDelete, setOpenConfirmDelete] = React.useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = React.useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  React.useEffect(() => {
    const controller = new AbortController();

    const fetchListUser = async () => {
      try {
        setLoading(true);
        const response = await fetchApi(`${CONFIG_API.USER.INDEX}`, "GET", {
          signal: controller.signal,
        });
        if (response && response.statusCode === 200) {
          setListUser(response.data.result);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListUser();

    return () => {
      controller.abort();
    };
  }, []);

  const handleClose = () => {
    setOpenConfirmDelete(false);
  };

  const handleDeleteUser = async () => {
    setLoading(true);
    try {
      const response = await fetchApi(`${CONFIG_API.USER.INDEX}/${selectedUserId}`, "DELETE");
      if (response && response.statusCode === 200) {
        setListUser((prev) => prev?.filter((user) => user._id !== selectedUserId));
        setOpenConfirmDelete(false);
      }
    } catch (error) {
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  };

  // console.log(listUser);

  if (loading) {
    return (
      <Box className="mt-4">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 font-bold">
              <th className="text-left p-2">No.</th>
              <th className="text-left p-2">User name</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Role</th>
              <th className="text-center p-2">Status</th>
              <th className="text-center p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, index) => (
              <tr key={index} className="border-t-[1px] border-t-gray-300">
                <td className="p-2">
                  <Skeleton variant="text" width={30} />
                </td>
                <td className="p-2">
                  <Skeleton variant="text" width="70%" />
                </td>
                <td className="p-2">
                  <Skeleton variant="text" width="80%" />
                </td>
                <td className="p-2">
                  <Skeleton variant="text" width="100%" />
                </td>
                <td className="p-2 flex justify-center">
                  <Skeleton variant="rounded" width={60} height={30} />
                </td>
                <td className="p-2 text-center">
                  <div className="flex justify-center gap-2">
                    <Skeleton variant="circular" width={30} height={30} />
                    <Skeleton variant="circular" width={30} height={30} />
                    <Skeleton variant="circular" width={30} height={30} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    );
  }

  if (listUser.length === 0) {
    return (
      <Box className="mt-4">
        <Alert severity="info">No users available</Alert>
      </Box>
    );
  }

  return (
    <>
      <Can I="get" a="users">
        <Can I="post" a="users">
          <table className="w-full mt-4">
            <thead>
              <tr className="bg-gray-100 font-bold">
                <th className="text-left p-2">No.</th>
                <th className="text-left p-2">User name</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">Role</th>
                <th className="text-center p-2">Status</th>
                <th className="text-center p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {listUser.map((user, index) => (
                <tr key={user._id} className="border-t-[1px] border-t-gray-300">
                  <td className="p-2 text-left">{index + 1}</td>
                  <td className="p-2 text-left text-[14px] font-semibold">{user.name}</td>
                  <td className="p-2 text-left text-[14px]">{user.email}</td>
                  <td className="p-2 text-left max-w-48">
                    <p className="text-ellipsis line-clamp-2">
                      {user?.role?.name ? user.role.name : "No role assigned"}
                    </p>
                  </td>
                  <td className="p-2 text-center">
                    <Chip label="Active" color="success" variant="filled" />
                    {/* {user.isActive ? (
                  <Chip label="Active" color="success" variant="filled" />
                ) : (
                  <Chip label="Inactive" color="error" variant="filled" />
                )} */}
                  </td>
                  <td className="p-2 text-center flex items-center justify-center">
                    <Can I="get" a="users/:id">
                      <Tooltip title="View" arrow>
                        <Link href={`/user-management/${user._id}`}>
                          <IconButton color="primary">
                            <IoEye />
                          </IconButton>
                        </Link>
                      </Tooltip>
                    </Can>
                    <Can I="patch" a="users/:id">
                      <Tooltip title="Edit" arrow>
                        <IconButton color="warning">
                          <FaRegEdit />
                        </IconButton>
                      </Tooltip>
                    </Can>
                    <Can I="delete" a="users/:id">
                      <Tooltip title="Delete" arrow>
                        <IconButton
                          color="error"
                          onClick={() => {
                            setSelectedUserId(user._id);
                            setOpenConfirmDelete(true);
                          }}
                        >
                          <MdDelete />
                        </IconButton>
                      </Tooltip>
                    </Can>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Can>
      </Can>
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
          <Button onClick={handleDeleteUser} color="error" variant="contained" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
