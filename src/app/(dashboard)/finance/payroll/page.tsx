"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Card,
  Stack,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Chip,
  TextField,
  Grid,
  InputAdornment,
  Divider,
  Avatar,
} from "@mui/material";
import {
  MdCalculate,
  MdHistory,
  MdRefresh,
  MdSearch,
  MdFilterList,
  MdTrendingUp,
  MdPeople,
  MdAccountBalanceWallet,
  MdCheckCircle,
  MdPendingActions,
} from "react-icons/md";
import { getSalaryList, calculateSalary } from "@/services/personnel.service";
import CustomDataGrid from "@/components/custom-data-grid/CustomDataGrid";
import type { GridColDef } from "@mui/x-data-grid";
import type { ISalaryAdvance } from "@/types/personnel";
import { getUserDetail } from "@/services/user.service";

// const MOCK_PAYROLL_DATA: ISalaryAdvance[] = [
//   {
//     _id: "1",
//     employee: "Nguyễn Văn A",
//     amount: 5000000,
//     reason: "Tạm ứng lương tháng 1",
//     isApproved: true,
//     approvedBy: { _id: "admin1", email: "admin@company.com" },
//     returnDate: new Date("2025-03-30T00:00:00.000Z"),
//     isDeleted: false,
//     createdAt: new Date("2025-03-27T14:20:50.236Z"),
//     updatedAt: new Date("2025-03-27T15:00:00.000Z"),
//     createdBy: { _id: "admin1", email: "admin@company.com" },
//     updatedBy: { _id: "admin1", email: "admin@company.com" },
//     deletedAt: null as any,
//     deletedBy: null as any,
//   },
//   {
//     _id: "2",
//     employee: "Trần Thị B",
//     amount: 3000000,
//     reason: "Chi phí đi lại dự án",
//     isApproved: false,
//     approvedBy: { _id: "", email: "" },
//     returnDate: new Date("2025-04-05T00:00:00.000Z"),
//     isDeleted: false,
//     createdAt: new Date("2025-03-28T09:15:20.111Z"),
//     updatedAt: new Date("2025-03-28T09:15:20.111Z"),
//     createdBy: { _id: "admin1", email: "admin@company.com" },
//     updatedBy: { _id: "admin1", email: "admin@company.com" },
//     deletedAt: null as any,
//     deletedBy: null as any,
//   },
// ];

const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
  <Card
    sx={{
      p: 3,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden",
      border: "1px solid",
      borderColor: "divider",
      boxShadow: "none",
      "&:hover": { boxShadow: "0 4px 20px rgba(0,0,0,0.05)" },
    }}
  >
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
      <Typography variant="overline" color="text.secondary" fontWeight={600}>
        {title}
      </Typography>
      <Box
        sx={{
          p: 1,
          borderRadius: 1,
          bgcolor: `${color}.lighter`,
          color: `${color}.main`,
          display: "flex",
        }}
      >
        <Icon size={24} />
      </Box>
    </Box>
    <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
      {value}
    </Typography>
    {trend && (
      <Stack direction="row" spacing={0.5} alignItems="center">
        <MdTrendingUp color="green" />
        <Typography variant="caption" color="success.main" fontWeight={600}>
          {trend}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          vs last month
        </Typography>
      </Stack>
    )}
  </Card>
);

type PayrollRow = ISalaryAdvance & { employeeInfo: { name: string; email: string } };

export default function PayrollPage() {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<PayrollRow[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getSalaryList({
        current: pagination.current,
        pageSize: pagination.pageSize,
      });
      if (res?.data?.result) {
        const employeeIds: string[] = Array.from(new Set(res.data.result.map((item: ISalaryAdvance) => item.employee)));
        const userCache = new Map<string, { name: string; email: string }>();

        await Promise.all(
          employeeIds.map(async (employeeId) => {
            if (!userCache.has(employeeId)) {
              const user = await getUserDetail(employeeId);
              userCache.set(employeeId, {
                name: user.name,
                email: user.email,
              });
            }
          })
        );

        res.data.result.forEach((item: ISalaryAdvance & { employeeInfo: { name: string; email: string } }) => {
          const employeeInfo = userCache.get(item.employee) || { name: "Unknown", email: "" };
          item.employeeInfo = employeeInfo;
        });
        // console.log("Payroll data with user info:", res.data.result);
        setRows(res.data.result);
      }
    } catch (error) {
      console.error("Failed to load payroll data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  const handleCalculateSalary = async (id: string) => {
    try {
      setLoading(true);
      const res = await calculateSalary(id);

      if (res?.data) {
        alert(`Salary calculated successfully!`);
        await loadData();
      } else {
        alert(res?.message || "Failed to calculate salary");
      }
    } catch (error) {
      console.error("Calculation error:", error);
      alert("An error occurred during calculation");
    } finally {
      setLoading(false);
    }
  };

  const filteredRows = useMemo(() => {
    return rows.filter(
      (row) =>
        row.employeeInfo?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.reason?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [rows, searchQuery]);

  const columns: GridColDef<PayrollRow>[] = [
    {
      field: "employeeInfo.name",
      headerName: "Employee",
      width: 250,
      renderCell: (params) => (
        <Stack direction="row" spacing={1.5} alignItems="center" height="100%">
          <Avatar sx={{ width: 32, height: 32, fontSize: "0.875rem", bgcolor: "primary.main" }}>
            {params.value?.charAt(0)}
          </Avatar>
          <Typography variant="body2" fontWeight={500}>
            {params.row.employeeInfo?.name || "Unknown"}
          </Typography>
        </Stack>
      ),
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight={600} color="primary.main">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(params.value || 0)}
        </Typography>
      ),
    },
    {
      field: "reason",
      headerName: "Reason",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "isApproved",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value ? "Approved" : "Pending"}
          color={params.value ? "success" : "warning"}
          size="small"
          variant="outlined"
          icon={params.value ? <MdCheckCircle /> : <MdPendingActions />}
          sx={{ fontWeight: 600 }}
        />
      ),
    },
    {
      field: "returnDate",
      headerName: "Return Date",
      width: 150,
      valueFormatter: (value) => {
        if (!value) return "---";
        const date = new Date(value);
        return isNaN(date.getTime()) ? "---" : date.toLocaleDateString("en-GB");
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} alignItems="center" height="100%">
          <Tooltip title="Calculate Salary">
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleCalculateSalary(params.row.employee)}
              disabled={loading}
              sx={{ bgcolor: "primary.lighter" }}
            >
              <MdCalculate size={20} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh">
            <IconButton size="small" onClick={loadData} disabled={loading}>
              <MdRefresh size={20} />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1600, margin: "0 auto" }}>
      {/* Header Section */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={800} letterSpacing="-0.02em" gutterBottom>
            Payroll Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage employee salaries, advances, and settlements in one place.
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<MdHistory />} sx={{ borderRadius: 2 }}>
            History
          </Button>
          <Button variant="contained" startIcon={<MdCalculate />} sx={{ borderRadius: 2, px: 3 }} disabled={loading}>
            Run Monthly Payroll
          </Button>
        </Stack>
      </Stack>

      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Estimated Payout"
            value="2.45B ₫"
            icon={MdAccountBalanceWallet}
            color="primary"
            trend="+12.5%"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Active Employees" value="156" icon={MdPeople} color="info" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Approved Advances" value="42" icon={MdCheckCircle} color="success" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Pending Requests" value="12" icon={MdPendingActions} color="warning" />
        </Grid>
      </Grid>

      {/* Main Table Section */}
      <Card
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
          overflow: "hidden",
        }}
      >
        <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between", bgcolor: "grey.50" }}>
          <Stack direction="row" spacing={2} sx={{ width: "100%", maxWidth: 600 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by name or reason..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MdSearch size={20} color="gray" />
                  </InputAdornment>
                ),
                sx: { borderRadius: 2, bgcolor: "background.paper" },
              }}
            />
            <Button
              variant="outlined"
              startIcon={<MdFilterList />}
              sx={{ borderRadius: 2, whiteSpace: "nowrap", bgcolor: "background.paper" }}
            >
              Filters
            </Button>
          </Stack>
          <IconButton onClick={loadData} disabled={loading}>
            <MdRefresh />
          </IconButton>
        </Box>

        <Divider />

        <Box sx={{ height: 600, width: "100%" }}>
          <CustomDataGrid
            rows={filteredRows}
            columns={columns}
            getRowId={(row) => row._id}
            loading={loading}
            pageSizeOptions={[10, 25, 50]}
            disableRowSelectionOnClick
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                bgcolor: "grey.50",
                color: "text.secondary",
                fontWeight: 600,
                textTransform: "uppercase",
                fontSize: "0.75rem",
                letterSpacing: "0.05em",
              },
              "& .MuiDataGrid-cell": {
                borderColor: "divider",
                display: "flex",
                alignItems: "center",
              },
            }}
          />
        </Box>
      </Card>
    </Box>
  );
}
