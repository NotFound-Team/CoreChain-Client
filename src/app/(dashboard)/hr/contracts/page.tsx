"use client";

// React
import React, { useCallback, useEffect, useMemo, useState } from "react";

// MUI
import { Box, Button, Chip, IconButton, MenuItem, Stack, TextField, Typography, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
// Icons
import { MdAdd, MdVisibility, MdEdit, MdDeleteOutline } from "react-icons/md";
import CustomDataGrid from "@/components/custom-data-grid/CustomDataGrid";
import { createContract, deleteContract, getContracts, updateContract } from "@/services/contracts.service";
import { useSnackbar } from "@/hooks/useSnackbar";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// dyamic import
const DialogConfirmDelete = dynamic(() => import("@/components/dialog-confirm-delete"), { ssr: false });
const ContractFormDrawer = dynamic(() => import("./ContractFormDrawer"), { ssr: false });

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
// const MOCK_CONTRACTS: IContract[] = [
//   {
//     _id: "65a123...",
//     contractCode: "CTR-2024-001",
//     type: "Full-time",
//     file: "/uploads/contracts/ctr-001.pdf",
//     startDate: new Date("2024-01-01"),
//     endDate: new Date("2025-01-01"),
//     status: "Active",
//     employee: { name: "Nguyen Van An", email: "an.nguyen@company.com" },
//     salary: 25000000,
//     allowances: 1500000,
//     insurance: "Full Package (Social, Health, Unemployment)",
//     workingHours: 40,
//     leavePolicy: "12 days/year",
//     terminationTerms: "30 days notice",
//     confidentialityClause: "Standard NDA applied",
//     isDeleted: false,
//     createdAt: new Date("2023-12-25"),
//     updatedAt: new Date("2023-12-25"),
//     createdBy: { _id: "admin1", email: "hr@company.com" },
//     updatedBy: { _id: "admin1", email: "hr@company.com" },
//   },
//   {
//     _id: "65b456...",
//     contractCode: "CTR-2024-002",
//     type: "Part-time",
//     file: "/uploads/contracts/ctr-002.pdf",
//     startDate: new Date("2024-02-15"),
//     endDate: new Date("2024-08-15"),
//     status: "Pending",
//     employee: { name: "Tran Thi Binh", email: "binh.tran@company.com" }, // Object
//     salary: 8000000,
//     allowances: 0,
//     insurance: "None",
//     workingHours: 20,
//     leavePolicy: "No paid leave",
//     terminationTerms: "15 days notice",
//     confidentialityClause: "Basic confidentiality",
//     isDeleted: false,
//     createdAt: new Date("2024-02-10"),
//     updatedAt: new Date("2024-02-10"),
//     createdBy: { _id: "admin2", email: "manager@company.com" },
//     updatedBy: { _id: "admin2", email: "manager@company.com" },
//   },
//   {
//     _id: "65c789...",
//     contractCode: "CTR-2023-099",
//     type: "Internship",
//     file: "/uploads/contracts/ctr-099.pdf",
//     startDate: new Date("2023-09-01"),
//     endDate: new Date("2024-03-01"),
//     status: "Expired",
//     employee: "65d001...", // Trường hợp employee là string ID
//     salary: 3000000,
//     allowances: 500000,
//     insurance: "Accident Insurance only",
//     workingHours: 40,
//     leavePolicy: "1 day/month",
//     terminationTerms: "Immediate",
//     confidentialityClause: "Strict NDA",
//     isDeleted: false,
//     createdAt: new Date("2023-08-25"),
//     updatedAt: new Date("2024-03-02"),
//     createdBy: { _id: "admin1", email: "hr@company.com" },
//     updatedBy: { _id: "admin1", email: "hr@company.com" },
//   },
// ];

const CONTRACT_TYPES = ["All", "Full-time", "Part-time", "Internship", "Freelance"];

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
  const [contracts, setContracts] = useState<IContract[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filterType, setFilterType] = useState("All");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<IContract | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [contractToDelete, setContractToDelete] = useState<string | null>(null);
  const { showToast } = useSnackbar();
  const router = useRouter();

  const fetchContracts = async () => {
    setLoading(true);
    try {
      const response = await getContracts({ current: 1, pageSize: 10 });
      setContracts(response?.data?.result || []);
    } catch (error) {
      setContracts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  const filteredRows = useMemo(() => {
    if (!contracts) return [];
    if (filterType === "All") return contracts;
    return contracts.filter((row) => row.type === filterType);
  }, [contracts, filterType]);

  // Handlers
  const handleCreate = useCallback(() => {
    setSelectedData(null);
    setDrawerOpen(true);
  }, []);

  const handleEdit = (row: IContract) => {
    setSelectedData(row);
    setDrawerOpen(true);
  };

  const handleView = (row: IContract) => {
    router.push(`/hr/contracts/detail/${row._id}`);
  };

  const handleFormSubmit = async (data: any) => {
    try {
      setLoading(true);
      if (selectedData?._id) {
        await updateContract(selectedData._id, data);
        showToast("Cập nhật thành công", "success");
      } else {
        await createContract(data);
        showToast("Tạo mới thành công", "success");
      }

      await fetchContracts();

      setDrawerOpen(false);
      setSelectedData(null);
    } catch (error) {
      showToast("Có lỗi xảy ra, vui lòng thử lại!", "error");
    } finally {
      setLoading(false);
    }
  };

  // interage acion delete
  const handleDelete = (contractId: string) => {
    setContractToDelete(contractId);
    setConfirmDeleteOpen(true);
  };

  const handleCancelCU = useCallback(() => {
    setDrawerOpen(false);
    setSelectedData(null);
  }, []);
  const handleCancelDelete = useCallback(() => {
    setConfirmDeleteOpen(false);
  }, []);

  const handleConfirmDelete = async () => {
    if (!contractToDelete) return;

    try {
      setLoading(true);
      await deleteContract(contractToDelete);
      showToast("Xóa hợp đồng thành công", "success");

      await fetchContracts();
    } catch (error) {
      showToast("Xóa hợp đồng thất bại, vui lòng thử lại!", "error");
    } finally {
      setLoading(false);
      setConfirmDeleteOpen(false);
      setContractToDelete(null);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "contractCode",
      headerName: "Code",
      flex: 1, // Chiếm 1 phần tỉ lệ
      minWidth: 120,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="bold" color="primary">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "employee",
      headerName: "Employee Account",
      flex: 2,
      minWidth: 200,
      valueGetter: (value, row: IContract) => {
        if (typeof row.employee === "string") return row.employee;
        return row.employee?.name || "N/A";
      },
      renderCell: (params) => {
        const emp = params.row.employee;
        if (typeof emp === "string") return <Typography variant="body2">{emp}</Typography>;
        return (
          <Box sx={{ overflow: "hidden" }}>
            <Typography variant="body2" fontWeight={500} noWrap>
              {emp?.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" noWrap>
              {emp?.email}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      minWidth: 110,
      renderCell: (params) => <Chip label={params.value} size="small" variant="outlined" />,
    },
    {
      field: "salary",
      headerName: "Salary (VND)",
      flex: 1,
      minWidth: 130,
      valueFormatter: (value) => formatCurrency(value),
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 1,
      minWidth: 110,
      valueFormatter: (value) => (value ? new Date(value).toLocaleDateString("en-GB") : "---"),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 110,
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
      width: 150,
      sortable: false,
      headerAlign: "right",
      align: "right",
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5} justifyContent="flex-end">
          {/* Action: Xem chi tiết */}
          <Tooltip title="View Details">
            <IconButton size="small" onClick={() => handleView(params.row)} color="info">
              <MdVisibility size={20} />
            </IconButton>
          </Tooltip>

          {/* Action: Chỉnh sửa */}
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => handleEdit(params.row)} color="primary">
              <MdEdit size={20} />
            </IconButton>
          </Tooltip>

          {/* Action: Xóa */}
          <Tooltip title="Delete">
            <IconButton size="small" onClick={() => handleDelete(params.row._id)} color="error">
              <MdDeleteOutline size={20} />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ height: "100%", width: "100%", p: 3, display: "flex", flexDirection: "column" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        mb={3}
      >
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Contract Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage terms and legal documents
          </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          <TextField
            select
            size="small"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            {CONTRACT_TYPES.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>

          <Button variant="contained" startIcon={<MdAdd />} onClick={handleCreate}>
            Create New
          </Button>
        </Stack>
      </Stack>
      <Box
        sx={{
          flex: 1,
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
          overflow: "hidden",
        }}
      >
        <CustomDataGrid
          rows={filteredRows}
          columns={columns}
          getRowId={(row: any) => row._id}
          loading={loading}
          disableRowSelectionOnClick
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          pageSizeOptions={[10, 25, 50]}
        />
      </Box>

      <ContractFormDrawer
        open={drawerOpen}
        onClose={handleCancelCU}
        initialData={
          selectedData
            ? {
                ...selectedData,
                employee:
                  typeof selectedData.employee === "string" ? selectedData.employee : selectedData.employee?.email || "",
              }
            : null
        }
        onSubmit={handleFormSubmit}
      />

      <DialogConfirmDelete
        deleteDialogOpen={confirmDeleteOpen}
        handleCancelDelete={handleCancelDelete}
        titleConfirmDelete="Xác nhận xóa hợp đồng"
        descriptionConfirmDelete={`Bạn có chắc chắn muốn xóa hợp đồng này không?`}
        handleConfirmDelete={handleConfirmDelete}
      />
    </Box>
  );
}
