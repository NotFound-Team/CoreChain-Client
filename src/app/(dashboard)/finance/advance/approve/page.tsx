"use client";

import { useState, useEffect } from "react";
import { Box, Card, Stack, Typography, Button, Avatar, Chip, Divider, Tooltip, IconButton, Grid } from "@mui/material";
import { MdCheck, MdClose, MdInfoOutline, MdHistory, MdCheckCircle } from "react-icons/md";
import { getSalaryList, approveSalaryAdvance } from "@/services/personnel.service";
import CustomDataGrid from "@/components/custom-data-grid/CustomDataGrid";
import type { GridColDef } from "@mui/x-data-grid";

export default function ApproveAdvancePage() {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);

  const loadData = async () => {
    setLoading(true);
    const res = await getSalaryList({ current: 1, pageSize: 50 });
    setRows(res?.data?.result || []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApprove = async (id: string) => {
    if (!confirm("Are you sure you want to approve this request?")) return;
    setLoading(true);
    try {
      await approveSalaryAdvance(id);
      alert("Request approved!");
      loadData();
    } finally {
      setLoading(false);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "employee",
      headerName: "Requested By",
      flex: 1.5,
      renderCell: (params) => (
        <Stack direction="row" spacing={2} alignItems="center" height="100%">
          <Avatar
            sx={{
              width: 42,
              height: 42,
              fontSize: "1rem",
              bgcolor: "primary.main",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            {params.value?.charAt(0)}
          </Avatar>
          <Box sx={{ lineHeight: 1.2 }}>
            <Typography variant="body2" fontWeight={700}>
              {params.value}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ID: {params.row._id.slice(-6).toUpperCase()}
            </Typography>
          </Box>
        </Stack>
      ),
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 160,
      renderCell: (params) => (
        <Stack justifyContent="center" height="100%">
          <Typography variant="subtitle1" fontWeight={800} color="error.main">
            -{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(params.value)}
          </Typography>
        </Stack>
      ),
    },
    {
      field: "returnDate",
      headerName: "Return Date",
      width: 140,
      renderCell: (params) => (
        <Stack justifyContent="center" height="100%">
          <Typography variant="body2" color="text.primary">
            {params.value ? new Date(params.value).toLocaleDateString("en-GB") : "N/A"}
          </Typography>
        </Stack>
      ),
    },
    {
      field: "isApproved",
      headerName: "Approval Status",
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
          <Chip
            label={params.value ? "Approved" : "Waiting"}
            color={params.value ? "success" : "warning"}
            variant="outlined" // Sử dụng variant soft cho hiện đại
            size="medium"
            sx={{ fontWeight: 600, borderRadius: 1.5 }}
          />
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Decision",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} alignItems="center" height="100%">
          {!params.row.isApproved ? (
            <>
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={() => handleApprove(params.row._id)}
                startIcon={<MdCheck />}
                sx={{
                  borderRadius: 2,
                  px: 2,
                  py: 0.8,
                  textTransform: "none",
                  fontWeight: 600,
                  boxShadow: "none",
                }}
              >
                Approve
              </Button>
              <Tooltip title="Reject Request">
                <IconButton
                  color="error"
                  sx={{ bgcolor: "error.lighter", "&:hover": { bgcolor: "error.light", color: "white" } }}
                >
                  <MdClose size={20} />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <Stack direction="row" spacing={0.5} alignItems="center">
              <MdCheckCircle color="#2e7d32" size={16} />
              <Typography variant="caption" fontWeight={600} color="text.disabled">
                PROCESSED
              </Typography>
            </Stack>
          )}
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ p: 4, minHeight: "100vh" }}>
      <Stack direction="row" justifyContent="space-between" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight={900} color="text.primary">
            Approval Center
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Review and authorize salary advance requests.
          </Typography>
        </Box>
        <Button startIcon={<MdHistory />} variant="outlined" sx={{ borderRadius: 2 }}>
          Audit Logs
        </Button>
      </Stack>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, textAlign: "center", border: "1px solid #eee" }}>
            <Typography variant="h4" fontWeight={800} color="warning.main">
              {rows.filter((r: any) => !r.isApproved).length}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              PENDING REQUESTS
            </Typography>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ borderRadius: 4, overflow: "hidden", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
        <Box sx={{ height: 650 }}>
          <CustomDataGrid rows={rows} columns={columns} getRowId={(r) => r._id} loading={loading} rowHeight={80} />
        </Box>
      </Card>
    </Box>
  );
}
