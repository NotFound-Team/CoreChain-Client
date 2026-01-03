"use client";

import Button from "@mui/material/Button";

// import Switch from "@mui/material/Switch";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Box from "@mui/material/Box";
// import Chip from "@mui/material/Chip";
import { Suspense, useCallback, useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import fetchApi from "@/utils/fetchApi";
import { CONFIG_API } from "@/configs/api";
import { TFormDataCreateUser, TRole } from "@/types/user";
// import { DialogActions, DialogContent, DialogTitle, Grid, Skeleton } from "@mui/material";
import { useRouter } from "next/navigation";
import { Can } from "@/context/casl/AbilityContext";
import FormCreateUser from "./FormCreateUser";


export default function ButtonCreateUser() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<TRole[]>([]);
  const [positions, setPositions] = useState([]);
  const [departments, setDepartment] = useState([]);
  const [formData, setFormData] = useState<TFormDataCreateUser>({
    name: "",
    email: "",
    password: "",
    role: "",
    employeeId: "",
    position: "",
    department: "",
    // isActive: true,
  });
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "",
      employeeId: "",
      position: "",
      department: "",
      // isActive: true,
    });
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handleSelectChange = useCallback((name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Replace with actual API call
      const response = await fetchApi(`${CONFIG_API.USER.INDEX}`, "POST", formData);

      if (response.statusCode === 201) {
        router.refresh();
      }
      handleClose();
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [roleRes, positionRes, departmentRes] = await Promise.all([
          fetchApi(`${CONFIG_API.ROLE.INDEX}`, "GET"),
          fetchApi(`${CONFIG_API.POSITION.INDEX}`, "GET"),
          fetchApi(`${CONFIG_API.DEPARTMENT.INDEX}`, "GET"),
        ]);

        // Xử lý role
        if (roleRes?.statusCode === 200) {
          const rolesMapped = roleRes.data.result.map(({ _id, name }: TRole) => ({ _id, name }));
          setRoles(rolesMapped);
        }

        // Xử lý position
        if (positionRes?.statusCode === 200) {
          const positionsMapped = positionRes.data.result.map(({ _id, title }: { _id: string; title: string }) => ({
            _id,
            title,
          }));
          setPositions(positionsMapped);
        }

        // Xử lý department
        if (departmentRes?.statusCode === 200) {
          const departmentsMapped = departmentRes.data.result.map(({ _id, name }: { _id: string; name: string }) => ({
            _id,
            name,
          }));
          setDepartment(departmentsMapped);
        }
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
      }
    };

    fetchAllData();
  }, []);

  return (
    <>
      <Can I="post" a="users">
        <Button
          variant="contained"
          startIcon={<FaUserPlus />}
          sx={{
            borderRadius: 2,
            px: 3,
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
              backgroundColor: "primary.dark",
            },
          }}
          onClick={handleClickOpen}
        >
          Create user
        </Button>
      </Can>
      <Suspense fallback={<div>Loading...</div>}>
        <FormCreateUser
          data={{
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
          }}
        />
      </Suspense>
    </>
  );
}
