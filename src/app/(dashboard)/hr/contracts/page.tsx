"use client";

import React, { useMemo, useState } from "react";
import { Box, Button, Chip, IconButton, MenuItem, Stack, TextField, Typography, Tooltip } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { MdAdd, MdVisibility, MdEdit, MdDeleteOutline, MdFilterList, MdFileDownload } from "react-icons/md";
import CustomDataGrid from "@/components/custom-data-grid/CustomDataGrid";
import ContractFormDrawer from "./ContractFormDrawer";


export interface IContract {
  _id: string;
  contractCode: string;
  type: string;
  file: string;
  startDate: Date;
  endDate: Date;
  status: string;
  employee:
    | string
    | {
        name: string;
        email: string;
      };
  salary: number;
  allowances: number;
  insurance: string;
  workingHours: number;
  leavePolicy: string;
  terminationTerms: string;
  confidentialityClause: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date; 
  createdBy: {
    _id: string;
    email: string;
  };
  updatedBy: {
    _id: string;
    email: string;
  };
  deletedBy?: {
    _id: string;
    email: string;
  };
}

// --- Mock Data ---
const MOCK_CONTRACTS: IContract[] = [
  {
    _id: "65a123...",
    contractCode: "CTR-2024-001",
    type: "Full-time",
    file: "/uploads/contracts/ctr-001.pdf",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2025-01-01"),
    status: "Active",
    employee: { name: "Nguyen Van An", email: "an.nguyen@company.com" },
    salary: 25000000,
    allowances: 1500000,
    insurance: "Full Package (Social, Health, Unemployment)",
    workingHours: 40,
    leavePolicy: "12 days/year",
    terminationTerms: "30 days notice",
    confidentialityClause: "Standard NDA applied",
    isDeleted: false,
    createdAt: new Date("2023-12-25"),
    updatedAt: new Date("2023-12-25"),
    createdBy: { _id: "admin1", email: "hr@company.com" },
    updatedBy: { _id: "admin1", email: "hr@company.com" },
  },
  {
    _id: "65b456...",
    contractCode: "CTR-2024-002",
    type: "Part-time",
    file: "/uploads/contracts/ctr-002.pdf",
    startDate: new Date("2024-02-15"),
    endDate: new Date("2024-08-15"),
    status: "Pending",
    employee: { name: "Tran Thi Binh", email: "binh.tran@company.com" }, // Object
    salary: 8000000,
    allowances: 0,
    insurance: "None",
    workingHours: 20,
    leavePolicy: "No paid leave",
    terminationTerms: "15 days notice",
    confidentialityClause: "Basic confidentiality",
    isDeleted: false,
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-10"),
    createdBy: { _id: "admin2", email: "manager@company.com" },
    updatedBy: { _id: "admin2", email: "manager@company.com" },
  },
  {
    _id: "65c789...",
    contractCode: "CTR-2023-099",
    type: "Internship",
    file: "/uploads/contracts/ctr-099.pdf",
    startDate: new Date("2023-09-01"),
    endDate: new Date("2024-03-01"),
    status: "Expired",
    employee: "65d001...", // Trường hợp employee là string ID
    salary: 3000000,
    allowances: 500000,
    insurance: "Accident Insurance only",
    workingHours: 40,
    leavePolicy: "1 day/month",
    terminationTerms: "Immediate",
    confidentialityClause: "Strict NDA",
    isDeleted: false,
    createdAt: new Date("2023-08-25"),
    updatedAt: new Date("2024-03-02"),
    createdBy: { _id: "admin1", email: "hr@company.com" },
    updatedBy: { _id: "admin1", email: "hr@company.com" },
  },
];

const CONTRACT_TYPES = ["All", "Full-time", "Part-time", "Internship", "Freelance"];

// --- Helper Functions ---
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "success";
    case "Pending":
      return "warning";
    case "Expired":
      return "error";
    default:
      return "default";
  }
};


export default function ContractPage() {
  const [rows, setRows] = useState<IContract[]>(MOCK_CONTRACTS);
  const [filterType, setFilterType] = useState("All");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);

  const handleCreate = () => {
    setSelectedData(null); 
    setDrawerOpen(true);
  };

  const handleEdit = (row: any) => {
    setSelectedData(row);
    setDrawerOpen(true);
  };

  const handleFormSubmit = (data: any) => {
    if (selectedData) {
      console.log("Calling API Update for ID:", selectedData._id, "with data:", data);
    } else {
      console.log("Calling API Create with data:", data);
    }
    setDrawerOpen(false);
  };

  // Filter Logic
  const filteredRows = useMemo(() => {
    if (filterType === "All") return rows;
    return rows.filter((row) => row.type === filterType);
  }, [rows, filterType]);

  // Actions Mock
  const handleAdd = () => alert("Open Add Modal");
  const handleView = (row: IContract) =>
    alert(`Viewing Contract: ${row.contractCode} \nConfidentiality: ${row.confidentialityClause}`);
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this contract?")) {
      setRows((prev) => prev.filter((r) => r._id !== id));
    }
  };
  const handleDownload = (file: string) => alert(`Downloading: ${file}`);

  // Grid Columns Configuration
  const columns: GridColDef[] = [
    {
      field: "contractCode",
      headerName: "Code",
      width: 140,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="bold" color="primary">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "employee",
      headerName: "Employee",
      width: 220,
      // Xử lý logic vì type là string | object
      valueGetter: (value: any, row: IContract) => {
        if (typeof row.employee === "string") return "ID: " + row.employee; // Fallback nếu chỉ có ID
        return row.employee.name;
      },
      renderCell: (params) => {
        const emp = params.row.employee;
        if (typeof emp === "string") {
          return (
            <Typography variant="body2" color="text.secondary">
              Ref: {emp.substring(0, 8)}...
            </Typography>
          );
        }
        return (
          <Box>
            <Typography variant="body2" fontWeight={500}>
              {emp.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              {emp.email}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "type",
      headerName: "Type",
      width: 130,
      renderCell: (params) => <Chip label={params.value} size="small" variant="outlined" />,
    },
    {
      field: "salary",
      headerName: "Salary (VND)",
      width: 150,
      valueFormatter: (value: number) => formatCurrency(value),
    },
    {
      field: "workingHours", // Thêm cột này từ interface mới
      headerName: "Hours/Wk",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 120,
      valueFormatter: (value: Date) => value.toLocaleDateString("en-GB"),
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 120,
      valueFormatter: (value: Date) => value.toLocaleDateString("en-GB"),
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={getStatusColor(params.value) as any}
          size="small"
          sx={{ fontWeight: 600, minWidth: 80 }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200, // Tăng width để chứa 4 nút
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={0}>
          {/* View Action */}
          <Tooltip title="View Details">
            <IconButton size="small" onClick={() => handleView(params.row)} color="info">
              <MdVisibility size={18} />
            </IconButton>
          </Tooltip>

          {/* Edit Action */}
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => handleEdit(params.row._id)} color="primary">
              <MdEdit size={18} />
            </IconButton>
          </Tooltip>

          {/* Download File Action (Dựa trên field file) */}
          <Tooltip title="Download Contract">
            <IconButton size="small" onClick={() => handleDownload(params.row.file)} color="secondary">
              <MdFileDownload size={18} />
            </IconButton>
          </Tooltip>

          {/* Delete Action */}
          <Tooltip title="Delete">
            <IconButton size="small" onClick={() => handleDelete(params.row._id)} color="error">
              <MdDeleteOutline size={18} />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ height: "100%", width: "100%", p: 3, display: "flex", flexDirection: "column" }}>
      {/* HEADER & FILTER */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        mb={3}
        sx={{ flexShrink: 0 }}
      >
        <Box>
          <Typography variant="h5" fontWeight={700} color="text.primary">
            Contract Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage terms, salaries and legal documents
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} width={{ xs: "100%", sm: "auto" }}>
          {/* FILTER BY TYPE */}
          <TextField
            select
            label="Type"
            size="small"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            sx={{ minWidth: 150, bgcolor: "background.paper" }}
            InputProps={{
              startAdornment: <MdFilterList style={{ marginRight: 8, color: "#666" }} />,
            }}
          >
            {CONTRACT_TYPES.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>

          {/* ADD ACTION */}
          <Button
            variant="contained"
            startIcon={<MdAdd />}
            onClick={handleCreate}
            sx={{ textTransform: "none", fontWeight: 600, boxShadow: "none" }}
          >
            Create New
          </Button>
        </Stack>
      </Stack>

      {/* DATA GRID */}
      <Box
        sx={{
          flex: 1,
          width: "100%",
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CustomDataGrid
          rows={filteredRows}
          columns={columns}
          getRowId={(row: any) => row._id}
          loading={false}
          checkboxSelection
          disableRowSelectionOnClick
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 25, 50]}
        />
      </Box>
      <ContractFormDrawer
        open={drawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        initialData={selectedData}
        onSubmit={handleFormSubmit}
      />
    </Box>
  );
}
