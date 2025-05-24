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

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  // Khởi tạo state cho form có thể chỉnh sửa
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
    backAccountNumber: "",
    healthInsuranceCode: "",
    lifeInsuranceCode: "",
    healthCheckRecordCode: [] as string[],
    medicalHistory: "",
    isActive: false,
  });
  const { user } = useAuth();

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

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    // Gọi API cập nhật thông tin
    console.log("Submitting updated data:", formData);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    const fetchUserPrivate = async () => {
      try {
        const response = await fetchApi(`${CONFIG_API.USER.PRIVATE}/${user?._id}`);
        if (response.statusCode === 200) {
          setFormData(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserPrivate();
  }, [user?._id]);

  return (
    <div ref={containerRef} className="container mx-auto p-4 max-w-8xl">
      <Paper elevation={0} className="p-6 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
        <div className="flex items-center gap-6 mb-8">
          <Avatar sx={{ width: 100, height: 100, bgcolor: "primary.main" }} className="border-4 border-white shadow-lg">
            {formData.name.charAt(0).toUpperCase()}
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <TextField
                label="Họ tên"
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
                  Lưu
                </Button>
                <Button variant="outlined" color="error" startIcon={<FiX />} onClick={() => setIsEditing(false)}>
                  Hủy
                </Button>
              </>
            ) : (
              <Button variant="contained" color="primary" startIcon={<FiEdit2 />} onClick={() => setIsEditing(true)}>
                Chỉnh sửa
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
          <Tab label="Thông tin cá nhân" />
          <Tab label="Thông tin công ty" />
          <Tab label="Tài chính & Bảo hiểm" />
        </Tabs>

        <Box className="mt-6">
          {activeTab === 0 && (
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <Typography variant="h6" className="!mb-4 !font-semibold flex items-center gap-2">
                    <span className="w-1 h-6 bg-primary-500 rounded-full"></span>
                    Thông tin cá nhân
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
                        disabled={!isEditing}
                        className="hover:bg-gray-50"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Ngày sinh"
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
                        label="Giới tính"
                        variant="outlined"
                        fullWidth
                        value={formData.male ? "male" : "female"}
                        onChange={(e) => handleChange("male", e.target.value === "male")}
                        disabled={!isEditing}
                        className="hover:bg-gray-50"
                      >
                        <MenuItem value="male">Nam</MenuItem>
                        <MenuItem value="female">Nữ</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="SĐT"
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
                        label="Quốc tịch"
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
                        label="Địa chỉ thường trú"
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
                    Thông tin công ty
                  </Typography>
                  <Divider className="!mb-4" />
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Mã nhân viên"
                        variant="outlined"
                        fullWidth
                        value={formData.employeeId}
                        onChange={(e) => handleChange("employeeId", e.target.value)}
                        disabled={!isEditing}
                        className="hover:bg-gray-50"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Phòng ban"
                        variant="outlined"
                        fullWidth
                        value={formData.department.name}
                        onChange={(e) => handleChange("department", e.target.value)}
                        disabled={!isEditing}
                        className="hover:bg-gray-50"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Vai trò"
                        variant="outlined"
                        fullWidth
                        value={formData.role.name}
                        onChange={(e) => handleChange("role", e.target.value)}
                        disabled={!isEditing}
                        className="hover:bg-gray-50"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Ngày vào công ty"
                        type="date"
                        variant="outlined"
                        fullWidth
                        value={dayjs(formData.createdAt).format("YYYY-MM-DD")}
                        onChange={(e) => handleChange("createdAt", e.target.value)}
                        disabled={!isEditing}
                        InputLabelProps={{ shrink: true }}
                        className="hover:bg-gray-50"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Mã hợp đồng"
                        variant="outlined"
                        fullWidth
                        value={formData.employeeContractCode}
                        onChange={(e) => handleChange("employeeContractCode", e.target.value)}
                        disabled={!isEditing}
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
                    Thông tin tài chính
                  </Typography>
                  <Divider className="!mb-4" />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        label="Lương cơ bản"
                        type="number"
                        variant="outlined"
                        fullWidth
                        value={formData.salary}
                        onChange={(e) => handleChange("salary", Number(e.target.value))}
                        disabled={!isEditing}
                        className="hover:bg-gray-50"
                        InputProps={{
                          startAdornment: <span className="mr-2">$</span>,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Phụ cấp"
                        type="number"
                        variant="outlined"
                        fullWidth
                        value={formData.allowances}
                        onChange={(e) => handleChange("allowances", Number(e.target.value))}
                        disabled={!isEditing}
                        className="hover:bg-gray-50"
                        InputProps={{
                          startAdornment: <span className="mr-2">$</span>,
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Lương thực nhận"
                        type="number"
                        variant="outlined"
                        fullWidth
                        value={formData.netSalary}
                        onChange={(e) => handleChange("netSalary", Number(e.target.value))}
                        disabled={!isEditing}
                        className="hover:bg-gray-50"
                        InputProps={{
                          startAdornment: <span className="mr-2">$</span>,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Số tài khoản ngân hàng"
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
                    Thông tin bảo hiểm
                  </Typography>
                  <Divider className="!mb-4" />
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        label="Mã bảo hiểm y tế"
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
                        label="Mã bảo hiểm nhân thọ"
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
                        label="Mã khám sức khỏe"
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
                        label="Tiền sử bệnh"
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
  );
}
