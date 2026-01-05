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
  LinearProgress,
} from "@mui/material";
import {
  MdAutoGraph,
  MdRefresh,
  MdSearch,
  MdFilterList,
  MdBusiness,
  MdTrendingUp,
  MdInfoOutline,
  MdCheckCircle,
} from "react-icons/md";
import { calculateKpi } from "@/services/personnel.service";
import { getKpiReport } from "@/services/report.service";
import CustomDataGrid from "@/components/custom-data-grid/CustomDataGrid";
import type { GridColDef } from "@mui/x-data-grid";
import { useSnackbar } from "@/hooks/useSnackbar";

export default function KpiAssessmentPage() {
  const [loading, setLoading] = useState(false);
  const [rawRows, setRawRows] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { showToast } = useSnackbar();

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getKpiReport();
      if (res?.data && Array.isArray(res.data)) {
        const flattened = res.data.flatMap((deptItem: any) =>
          deptItem.employees.map((emp: any) => ({
            ...emp,
            id: `${deptItem.department}-${emp._id}`,
            departmentName: deptItem.department,
          }))
        );
        console.log("Flattened KPI Data:", flattened);
        setRawRows(flattened);
      }
    } catch (error) {
      console.error("Failed to load KPI report:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCalculateKpi = async (id: string) => {
    try {
      setLoading(true);
      const res = await calculateKpi(id);
      if (res) {
        showToast(`${res.data || "KPI calculated successfully!"}`, "success");
        await loadData();
      }
    } catch (error) {
      showToast("Error calculating KPI", "error");
    } finally {
      setLoading(false);
    }
  };

  // Logic Search
  const filteredRows = useMemo(() => {
    return rawRows.filter(
      (row) =>
        row.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.departmentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [rawRows, searchQuery]);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Employee",
      flex: 2,
      renderCell: (params) => (
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ height: "100%", py: 1 }}>
          <Avatar sx={{ width: 40, height: 40, fontSize: "1rem", bgcolor: "secondary.main" }}>
            {params.value?.charAt(0)}
          </Avatar>
          <Box sx={{ lineHeight: 1 }}>
            <Typography variant="body2" fontWeight={600}>
              {params.value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.email}
            </Typography>
          </Box>
        </Stack>
      ),
    },
    {
      field: "departmentName",
      headerName: "Department",
      width: 150,
      renderCell: (params) => (
        <Chip icon={<MdBusiness size={16} />} label={params.value} size="small" variant="outlined" color="info" />
      ),
    },
    {
      field: "kpi",
      headerName: "Performance Score",
      width: 300,
      renderCell: (params) => {
        const score = params.value ?? 0;
        const isNotCalculated = params.value === null;
        const color = score >= 80 ? "success" : score >= 50 ? "warning" : "error";

        return (
          <Box sx={{ width: "100%", pr: 2 }}>
            <Stack direction="row" justifyContent="space-between" mb={0.5}>
              <Typography variant="caption" fontWeight={700} color={isNotCalculated ? "text.disabled" : "text.primary"}>
                {isNotCalculated ? "PENDING" : `${score}%`}
              </Typography>
              {!isNotCalculated && (
                <Typography variant="caption" color="text.secondary">
                  Target: 100%
                </Typography>
              )}
            </Stack>
            <LinearProgress
              variant="determinate"
              value={score}
              color={color}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: "grey.200",
                opacity: isNotCalculated ? 0.3 : 1,
              }}
            />
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Evaluation",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          startIcon={<MdAutoGraph />}
          onClick={() => handleCalculateKpi(params.row._id)}
          disabled={loading}
          sx={{
            borderRadius: 1.5,
            textTransform: "none",
            boxShadow: "none",
            "&:hover": { boxShadow: "none" },
          }}
        >
          Assess
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1600, margin: "0 auto" }}>
      {/* Header Section */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            KPI Assessment
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and evaluate employee performance metrics by department.
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<MdRefresh />} onClick={loadData} sx={{ borderRadius: 2 }}>
            Sync Data
          </Button>
          <Button variant="contained" color="secondary" startIcon={<MdCheckCircle />} sx={{ borderRadius: 2, px: 3 }}>
            Approve All
          </Button>
        </Stack>
      </Stack>

      {/* Top Cards for Department Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, border: "1px solid", borderColor: "divider", boxShadow: "none" }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: "primary.lighter", color: "primary.main" }}>
                <MdTrendingUp size={24} />
              </Box>
              <Box>
                <Typography variant="caption" fontWeight={700} color="text.secondary">
                  AVG PERFORMANCE
                </Typography>
                <Typography variant="h5" fontWeight={800}>
                  {rawRows.length > 0
                    ? (
                        rawRows.reduce((sum, r) => sum + (r.kpi ?? 0), 0) / rawRows.filter((r) => r.kpi !== null).length
                      ).toFixed(2)
                    : "0"}
                  %
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, border: "1px solid", borderColor: "divider", boxShadow: "none" }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: "warning.lighter", color: "warning.main" }}>
                <MdInfoOutline size={24} />
              </Box>
              <Box>
                <Typography variant="caption" fontWeight={700} color="text.secondary">
                  PENDING REVIEWS
                </Typography>
                <Typography variant="h5" fontWeight={800}>
                  {rawRows.filter((r) => r.kpi === null).length} Employees
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, border: "1px solid", borderColor: "divider", boxShadow: "none" }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: "success.lighter", color: "success.main" }}>
                <MdBusiness size={24} />
              </Box>
              <Box>
                <Typography variant="caption" fontWeight={700} color="text.secondary">
                  DEPARTMENTS
                </Typography>
                <Typography variant="h5" fontWeight={800}>
                  8 active
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      {/* Main Table Card */}
      <Card
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
          overflow: "hidden",
        }}
      >
        <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 2, bgcolor: "grey.50" }}>
          <TextField
            size="small"
            placeholder="Search by name, email or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: 450 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdSearch size={20} color="gray" />
                </InputAdornment>
              ),
              sx: { borderRadius: 2, bgcolor: "background.paper" },
            }}
          />
          <Button variant="outlined" startIcon={<MdFilterList />} color="inherit">
            Filters
          </Button>
        </Box>

        <Divider />

        <Box sx={{ height: 600, width: "100%" }}>
          <CustomDataGrid
            rows={filteredRows}
            columns={columns}
            loading={loading}
            getRowId={(row) => row.id}
            disableRowSelectionOnClick
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                bgcolor: "grey.50",
                fontWeight: 700,
              },
            }}
          />
        </Box>
      </Card>
    </Box>
  );
}
