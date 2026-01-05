"use client";

import { useState, useEffect } from "react";
import {
  Box, Card, Stack, Typography, Button, TextField, 
  InputAdornment, Chip, Avatar, IconButton, Divider
} from "@mui/material";
import { 
  MdAdd, MdSearch, MdHistory, MdFilterList, 
  MdAccessTime, MdCheckCircle, MdCancel 
} from "react-icons/md";
import { getSalaryList } from "@/services/personnel.service";
import CustomDataGrid from "@/components/custom-data-grid/CustomDataGrid";
import type { GridColDef } from "@mui/x-data-grid";

export default function AdvanceRequestsPage() {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);

  const loadData = async () => {
    setLoading(true);
    const res = await getSalaryList({ current: 1, pageSize: 50 });
    setRows(res?.data?.result || []);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const columns: GridColDef[] = [
    {
      field: "employee",
      headerName: "Employee",
      flex: 1.5,
      renderCell: (params) => (
        <Stack direction="row" spacing={1.5} alignItems="center" height="100%">
          <Avatar sx={{ width: 32, height: 32 }}>{params.value?.charAt(0)}</Avatar>
          <Typography variant="body2" fontWeight={600}>{params.value}</Typography>
        </Stack>
      )
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight={700} color="primary.main">
          {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(params.value)}
        </Typography>
      )
    },
    {
      field: "createdAt",
      headerName: "Requested Date",
      width: 150,
      valueFormatter: (value) => new Date(value).toLocaleDateString("en-GB")
    },
    {
      field: "isApproved",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value ? "Approved" : "Pending"}
          color={params.value ? "success" : "warning"}
          size="small"
          variant="outlined"
          icon={params.value ? <MdCheckCircle /> : <MdAccessTime />}
        />
      )
    },
    {
      field: "reason",
      headerName: "Reason",
      flex: 2
    }
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Stack direction="row" justifyContent="space-between" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight={800}>Advance Requests</Typography>
          <Typography variant="body2" color="text.secondary">My personal or department&apos;s salary advance history.</Typography>
        </Box>
        <Button variant="contained" startIcon={<MdAdd />} sx={{ borderRadius: 2 }}>
          New Request
        </Button>
      </Stack>

      <Card sx={{ borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
        <Box sx={{ p: 2, display: "flex", gap: 2, bgcolor: "grey.50" }}>
          <TextField
            size="small"
            placeholder="Search request..."
            InputProps={{ startAdornment: <MdSearch color="gray" /> }}
            sx={{ width: 300, bgcolor: "white" }}
          />
          <Button startIcon={<MdFilterList />} variant="outlined">Filter</Button>
        </Box>
        <Divider />
        <Box sx={{ height: 600 }}>
          <CustomDataGrid rows={rows} columns={columns} getRowId={(r) => r._id} loading={loading} rowHeight={70} />
        </Box>
      </Card>
    </Box>
  );
}