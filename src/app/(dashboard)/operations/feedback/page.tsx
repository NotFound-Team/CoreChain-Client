"use client";

import React, { useEffect, useState, useCallback } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { IconButton, Chip, Tooltip, Stack, Typography } from "@mui/material";
import { MdOutlineVpnKey, MdDeleteOutline, MdVisibility } from "react-icons/md";
import { IFeedback } from "@/types/feedback";
import dayjs from "dayjs";
import { deleteFeedback, getFeedbackList } from "@/services/feedback.service";
import CustomDataGrid from "@/components/custom-data-grid/CustomDataGrid";
import DecryptModal from "./DecryptModal";

const FeedbackPage = () => {
  const [rows, setRows] = useState<IFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

  const [decryptTarget, setDecryptTarget] = useState<string | null>(null);

  const fetchList = useCallback(async () => {
    setLoading(true);
    const params = {
      current: paginationModel.page + 1,
      pageSize: paginationModel.pageSize,
    };
    const res = await getFeedbackList(params);
    if (res?.statusCode === 200) {
      setRows(res.data.results || []);
    }
    setLoading(false);
  }, [paginationModel]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa phản hồi này?")) {
      await deleteFeedback(id);
      fetchList();
    }
  };

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Tiêu đề",
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight={params.row.isFlagged ? "bold" : "normal"}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "category",
      headerName: "Phân loại",
      width: 150,
      renderCell: (params) => <Chip label={params.value} size="small" variant="outlined" />,
    },
    {
      field: "wasDecrypted",
      headerName: "Trạng thái",
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value ? "Đã giải mã" : "Đang mã hóa"}
          color={params.value ? "success" : "warning"}
          size="small"
        />
      ),
    },
    {
      field: "createdAt",
      headerName: "Ngày gửi",
      width: 180,
      valueFormatter: (params) => dayjs(params).format("DD/MM/YYYY HH:mm"),
    },
    {
      field: "actions",
      headerName: "Thao tác",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          {!params.row.wasDecrypted && (
            <Tooltip title="Giải mã nội dung">
              <IconButton color="primary" onClick={() => setDecryptTarget(params.row._id)}>
                <MdOutlineVpnKey size={20} />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Xem chi tiết">
            <IconButton onClick={() => alert("Chức năng xem chi tiết đang phát triển")}>
              <MdVisibility size={20} />
            </IconButton>
          </Tooltip>
          {/* Nút Xóa */}
          <Tooltip title="Xóa">
            <IconButton color="error" onClick={() => handleDelete(params.row._id)}>
              <MdDeleteOutline size={20} />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Stack spacing={3} sx={{ p: 3, height: "calc(100vh - 100px)" }}>
      <Typography variant="h5" fontWeight="bold">
        Quản lý Feedback Nhân viên
      </Typography>

      <CustomDataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}
        loading={loading}
        paginationMode="server"
        rowCount={rows.length}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />

      {decryptTarget && (
        <DecryptModal
          open={!!decryptTarget}
          feedbackId={decryptTarget}
          onClose={() => setDecryptTarget(null)}
          onSuccess={() => {
            setDecryptTarget(null);
            fetchList();
          }}
        />
      )}
    </Stack>
  );
};

export default FeedbackPage;
