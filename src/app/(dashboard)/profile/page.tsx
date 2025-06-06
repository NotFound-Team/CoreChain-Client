"use client";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  Grid,
  Typography,
  Button,
  Chip,
  Divider,
  TextField,
  MenuItem,
  Paper,
  Box,
  IconButton,
  Avatar,
  Tab,
  Tabs,
} from "@mui/material";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import dayjs from "dayjs";
import { FiEdit2, FiSave, FiX } from "react-icons/fi";
import fetchApi from "@/utils/fetchApi";
import { CONFIG_API } from "@/configs/api";
import { useAuth } from "@/hooks/useAuth";
import { updateUser } from "@/services/user";
import { useSnackbar } from "@/hooks/useSnackbar";
import SpinnerModal from "@/components/modal-spinner";
import FallbackSpinner from "@/components/fall-back";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dateOfBirth: "",
    male: true,
    personalPhoneNumber: "",
    nationality: "",
    permanentAddress: "",
    employeeId: "",
    department: { _id: "", name: "" },
    role: { _id: "", name: "" },
    createdAt: "",
    employeeContractCode: "",
    salary: 0,
    allowances: 0,
    netSalary: 0,
    loansSupported: 0,
    backAccountNumber: "",
    healthInsuranceCode: "",
    lifeInsuranceCode: "",
    healthCheckRecordCode: [] as string[],
    medicalHistory: "",
    isActive: false,
  });
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  // ** hooks
  const { user } = useAuth();
  const { Toast, showToast } = useSnackbar();

  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  // ** handle
  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setLoadingUpdate(true);
    if (user?._id !== undefined) {
      const response = await updateUser({ ...formData, id: user?._id, loansSupported: 0 });
      setLoadingUpdate(false);
      if (response.statusCode === 200) {
        showToast("User information updated successfully", "success");
        fetchUserPrivate();
      } else {
        showToast("User information update failed", "error");
      }
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // fetch api
  const fetchUserPrivate = async () => {
    setLoading(true);
    try {
      const response = await fetchApi(`${CONFIG_API.USER.PRIVATE}/${user?._id}`);
      if (response.statusCode === 200) {
        setFormData(response.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserPrivate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id]);

  if (loading) {
    return <FallbackSpinner />;
  }

  return (
    <>
      {loadingUpdate && <SpinnerModal />}
      <Toast />
      <div ref={containerRef} className="container mx-auto p-4 max-w-8xl">
        <Paper elevation={0} className="p-6 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
          <div className="flex items-center gap-6 mb-8">
            <Avatar
              sx={{ width: 100, height: 100, bgcolor: "primary.main" }}
              className="border-4 border-white shadow-lg"
            >
              {formData.name.charAt(0).toUpperCase()}
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <TextField
                  label="Full Name"
                  variant="standard"
                  value={formData.name.toUpperCase()}
                  onChange={(e) => handleChange("name", e.target.value)}
                  disabled={!isEditing}
                  InputProps={{
                    style: { fontSize: "1.5rem", fontWeight: 600 },
                    endAdornment: isEditing && (
                      <IconButton size="small">
                        <FiEdit2 />
                      </IconButton>
                    ),
                  }}
                />
                <Chip
                  label={formData.isActive ? "ACTIVE" : "INACTIVE"}
                  color={formData.isActive ? "success" : "error"}
                  variant="outlined"
                  className="!text-sm !font-medium"
                />
              </div>
              <Typography variant="body1" color="text.secondary" className="mt-2">
                {formData.role?.name} • {formData.department?.name}
              </Typography>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<FiSave />}
                    onClick={() => {
                      handleSubmit();
                      setIsEditing(false);
                    }}
                  >
                    Save
                  </Button>
                  <Button variant="outlined" color="error" startIcon={<FiX />} onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button variant="contained" color="primary" startIcon={<FiEdit2 />} onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
              )}
            </div>
          </div>

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            className="!border-b !border-gray-200"
          >
            <Tab label="Personal Information" />
            <Tab label="Company Information" />
            <Tab label="Finance & Insurance" />
          </Tabs>

          <Box className="mt-6">
            {activeTab === 0 && (
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Card className="p-4 hover:shadow-md transition-shadow">
                    <Typography variant="h6" className="!mb-4 !font-semibold flex items-center gap-2">
                      <span className="w-1 h-6 bg-primary-500 rounded-full"></span>
                      Personal Information
                    </Typography>
                    <Divider className="!mb-4" />
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Email"
                          variant="outlined"
                          fullWidth
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          disabled={true}
                          className="hover:bg-gray-50"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Date of Birth"
                          type="date"
                          variant="outlined"
                          fullWidth
                          value={dayjs(formData.dateOfBirth).format("YYYY-MM-DD")}
                          onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                          disabled={!isEditing}
                          InputLabelProps={{ shrink: true }}
                          className="hover:bg-gray-50"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          select
                          label="Gender"
                          variant="outlined"
                          fullWidth
                          value={formData.male ? "male" : "female"}
                          onChange={(e) => handleChange("male", e.target.value === "male")}
                          disabled={!isEditing}
                          className="hover:bg-gray-50"
                        >
                          <MenuItem value="male">Male</MenuItem>
                          <MenuItem value="female">Female</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Phone Number"
                          variant="outlined"
                          fullWidth
                          value={formData.personalPhoneNumber}
                          onChange={(e) => handleChange("personalPhoneNumber", e.target.value)}
                          disabled={!isEditing}
                          className="hover:bg-gray-50"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Nationality"
                          variant="outlined"
                          fullWidth
                          value={formData.nationality}
                          onChange={(e) => handleChange("nationality", e.target.value)}
                          disabled={!isEditing}
                          className="hover:bg-gray-50"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Address"
                          variant="outlined"
                          fullWidth
                          multiline
                          rows={2}
                          value={formData.permanentAddress}
                          onChange={(e) => handleChange("permanentAddress", e.target.value)}
                          disabled={!isEditing}
                          className="hover:bg-gray-50"
                        />
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            )}

            {activeTab === 1 && (
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Card className="p-4 hover:shadow-md transition-shadow">
                    <Typography variant="h6" className="!mb-4 !font-semibold flex items-center gap-2">
                      <span className="w-1 h-6 bg-primary-500 rounded-full"></span>
                      Company Information
                    </Typography>
                    <Divider className="!mb-4" />
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Employee ID"
                          variant="outlined"
                          fullWidth
                          value={formData.employeeId}
                          onChange={(e) => handleChange("employeeId", e.target.value)}
                          disabled={true}
                          className="hover:bg-gray-50"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Department"
                          variant="outlined"
                          fullWidth
                          value={formData?.department?.name}
                          onChange={(e) => handleChange("department", e.target.value)}
                          disabled={true}
                          className="hover:bg-gray-50"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Role"
                          variant="outlined"
                          fullWidth
                          value={formData?.role?.name}
                          onChange={(e) => handleChange("role", e.target.value)}
                          disabled={true}
                          className="hover:bg-gray-50"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Date of Joining"
                          type="date"
                          variant="outlined"
                          fullWidth
                          value={dayjs(formData.createdAt).format("YYYY-MM-DD")}
                          onChange={(e) => handleChange("createdAt", e.target.value)}
                          disabled={true}
                          InputLabelProps={{ shrink: true }}
                          className="hover:bg-gray-50"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Contract Code"
                          variant="outlined"
                          fullWidth
                          value={formData.employeeContractCode}
                          onChange={(e) => handleChange("employeeContractCode", e.target.value)}
                          disabled={true}
                          className="hover:bg-gray-50"
                        />
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            )}

            {activeTab === 2 && (
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Card className="p-4 hover:shadow-md transition-shadow">
                    <Typography variant="h6" className="!mb-4 !font-semibold flex items-center gap-2">
                      <span className="w-1 h-6 bg-primary-500 rounded-full"></span>
                      Financial Information
                    </Typography>
                    <Divider className="!mb-4" />
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <TextField
                          label="Base Salary"
                          type="number"
                          variant="outlined"
                          fullWidth
                          value={formData.salary}
                          onChange={(e) => handleChange("salary", Number(e.target.value))}
                          disabled={true}
                          className="hover:bg-gray-50"
                          InputProps={{
                            startAdornment: <span className="mr-2">$</span>,
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Allowance"
                          type="number"
                          variant="outlined"
                          fullWidth
                          value={formData.allowances}
                          onChange={(e) => handleChange("allowances", Number(e.target.value))}
                          disabled={true}
                          className="hover:bg-gray-50"
                          InputProps={{
                            startAdornment: <span className="mr-2">$</span>,
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          label="Net Salary"
                          type="number"
                          variant="outlined"
                          fullWidth
                          value={formData.netSalary}
                          onChange={(e) => handleChange("netSalary", Number(e.target.value))}
                          disabled={true}
                          className="hover:bg-gray-50"
                          InputProps={{
                            startAdornment: <span className="mr-2">$</span>,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Bank Account Number"
                          variant="outlined"
                          fullWidth
                          value={formData.backAccountNumber}
                          onChange={(e) => handleChange("backAccountNumber", e.target.value)}
                          disabled={!isEditing}
                          className="hover:bg-gray-50"
                        />
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card className="p-4 hover:shadow-md transition-shadow">
                    <Typography variant="h6" className="!mb-4 !font-semibold flex items-center gap-2">
                      <span className="w-1 h-6 bg-primary-500 rounded-full"></span>
                      Insurance Information
                    </Typography>
                    <Divider className="!mb-4" />
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          label="Health Insurance Number"
                          variant="outlined"
                          fullWidth
                          value={formData.healthInsuranceCode}
                          onChange={(e) => handleChange("healthInsuranceCode", e.target.value)}
                          disabled={!isEditing}
                          className="hover:bg-gray-50"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Life Insurance Number"
                          variant="outlined"
                          fullWidth
                          value={formData.lifeInsuranceCode}
                          onChange={(e) => handleChange("lifeInsuranceCode", e.target.value)}
                          disabled={!isEditing}
                          className="hover:bg-gray-50"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Health Checkup Code"
                          variant="outlined"
                          fullWidth
                          value={formData.healthCheckRecordCode.join(", ")}
                          onChange={(e) => handleChange("healthCheckRecordCode", e.target.value.split(", "))}
                          disabled={!isEditing}
                          className="hover:bg-gray-50"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Medical History"
                          variant="outlined"
                          fullWidth
                          multiline
                          rows={2}
                          value={formData.medicalHistory}
                          onChange={(e) => handleChange("medicalHistory", e.target.value)}
                          disabled={!isEditing}
                          className="hover:bg-gray-50"
                        />
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            )}
          </Box>
        </Paper>
      </div>
    </>
  );
}
