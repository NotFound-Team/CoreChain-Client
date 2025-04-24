"use client";

import Button from "@mui/material/Button";

// import Switch from "@mui/material/Switch";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Box from "@mui/material/Box";
// import Chip from "@mui/material/Chip";
import { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import fetchApi from "@/utils/fetchApi";
import { CONFIG_API } from "@/configs/api";
import { TRole } from "@/types/user";
import dynamic from "next/dynamic";
import { DialogActions, DialogContent, DialogTitle, Grid, Skeleton } from "@mui/material";
import { useRouter } from "next/navigation";

const FormCreateUser = dynamic(() => import("./FormCreateUser"), {
  ssr: false,
  loading: () => (
    <>
      <DialogTitle sx={{ fontWeight: 700, fontSize: "1.5rem", textAlign: "center", pt: 2 }}>
        <Skeleton width="40%" height={30} sx={{ mx: "auto" }} />
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          {[...Array(6)].map((_, index) => (
            <Grid item xs={12} md={index < 2 ? 6 : 12} key={index}>
              <Skeleton height={56} variant="rectangular" sx={{ borderRadius: 2 }} />
            </Grid>
          ))}
          {[...Array(3)].map((_, index) => (
            <Grid item xs={12} md={index < 2 ? 6 : 12} key={`select-${index}`}>
              <Skeleton height={56} variant="rectangular" sx={{ borderRadius: 2 }} />
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, justifyContent: "space-between" }}>
        <Skeleton width={100} height={36} variant="rectangular" sx={{ borderRadius: 2 }} />
        <Skeleton width={100} height={36} variant="rectangular" sx={{ borderRadius: 2 }} />
      </DialogActions>
    </>
  ),
});

// Mock data for select options (replace with your actual data fetching

const positions = [
  { _id: "67de78b2352e9913c0c06425", name: "Developer" },
  { _id: "67de78b2352e9913c0c06426", name: "Designer" },
  { _id: "67de78b2352e9913c0c06427", name: "Product Manager" },
];

const departments = [
  { _id: "67e588baeba058bfa9416538", name: "Engineering" },
  { _id: "67e588baeba058bfa9416539", name: "Design" },
  { _id: "67e588baeba058bfa9416540", name: "Product" },
];

export default function ButtonCreateUser() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState<TRole[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    employeeId: "",
    position: "6807418c9198d6a3a9c4e012",
    department: "680741069198d6a3a9c4e00b",
    // isActive: true,
  });
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
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
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Submitting:", formData);
      // Replace with actual API call
      const response = await fetchApi(`${CONFIG_API.USER.INDEX}`, "POST", formData);
      console.log(response);
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
    const fectRole = async () => {
      const response = await fetchApi(`${CONFIG_API.ROLE}`, "GET");
      if (response && response.statusCode === 200) {
        const newArrayRole = response.data.result.map(({ _id, name }: TRole) => ({ _id, name }));
        setRoles(newArrayRole);
      }
    };
    // const fectPosition = async () => {
    //   const response = await fetchApi(`${CONFIG_API.POSITION}`, "GET")
    //   console.log(response);
    // }
    // fectPosition();
    fectRole();
  }, []);

  return (
    <>
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
    </>
  );
}
