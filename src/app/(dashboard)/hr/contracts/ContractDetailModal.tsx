"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Box,
  Divider,
  Chip,
  Stack,
  Skeleton,
  IconButton,
} from "@mui/material";
import { MdClose, MdDescription, MdPerson, MdPayment, MdHistory } from "react-icons/md";
import { getContractDetail } from "@/services/contracts.service"; // Giả định hàm gọi API của bạn
import { IContract } from "@/types/contract";

interface Props {
  contractId: string;
}

const InfoItem = ({
  label,
  value,
  icon,
  loading,
}: {
  label: string;
  value: any;
  icon?: React.ReactNode;
  loading?: boolean;
}) => (
  <Box sx={{ mb: 2 }}>
    <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
      {icon && <Box sx={{ color: "primary.main", display: "flex" }}>{icon}</Box>}
      <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ textTransform: "uppercase" }}>
        {label}
      </Typography>
    </Stack>
    {loading ? (
      <Skeleton width="60%" height={24} />
    ) : (
      <Typography variant="body1" fontWeight={500} sx={{ wordBreak: "break-word" }}>
        {value || "---"}
      </Typography>
    )}
  </Box>
);

export default function ContractDetailModal({ contractId }: Props) {
  const router = useRouter();
  const [data, setData] = useState<IContract | null>(null);
  const [loading, setLoading] = useState(true);

  const handleClose = () => {
    router.back();
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!contractId) return;
      setLoading(true);
      try {
        const res = await getContractDetail(contractId);
        setData(res.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [contractId]);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(val || 0);

  const formatDate = (date: any) => (date ? new Date(date).toLocaleDateString("en-GB") : "---");

  return (
    <Dialog open={true} onClose={handleClose} maxWidth="md" fullWidth scroll="paper">
      <DialogTitle
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: "#f8f9fa", p: 2 }}
      >
        <Box>
          <Typography variant="h6" fontWeight={700}>
            {loading ? <Skeleton width={150} /> : "Contract Details"}
          </Typography>
          <Typography variant="caption" color="primary">
            {loading ? <Skeleton width={100} /> : data?.contractCode}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} alignItems="center">
          {!loading && data && (
            <Chip
              label={data.status}
              color={data.status === "Active" ? "success" : "warning"}
              variant="filled"
              size="small"
            />
          )}
          <IconButton onClick={handleClose} size="small">
            <MdClose />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography
              variant="subtitle2"
              color="primary"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <MdPerson /> EMPLOYEE & GENERAL INFO
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <InfoItem
              label="Employee Name"
              loading={loading}
              value={typeof data?.employee === "string" ? data.employee : data?.employee?.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InfoItem
              label="Email"
              loading={loading}
              value={typeof data?.employee === "string" ? "N/A" : data?.employee?.email}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <InfoItem label="Contract Type" loading={loading} value={data?.type} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <InfoItem label="Start Date" loading={loading} value={formatDate(data?.startDate)} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <InfoItem label="End Date" loading={loading} value={formatDate(data?.endDate)} />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Typography
              variant="subtitle2"
              color="primary"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <MdPayment /> SALARY & BENEFITS
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <InfoItem label="Base Salary" loading={loading} value={formatCurrency(data?.salary || 0)} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <InfoItem label="Allowances" loading={loading} value={formatCurrency(data?.allowances || 0)} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <InfoItem label="Working Hours" loading={loading} value={data ? `${data.workingHours}h / week` : null} />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Typography
              variant="subtitle2"
              color="primary"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <MdDescription /> TERMS & CLAUSES
            </Typography>
            <Divider sx={{ mb: 2 }} />
          </Grid>

          <Grid item xs={12}>
            <InfoItem label="Confidentiality Clause" loading={loading} value={data?.confidentialityClause} />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <MdHistory /> SYSTEM AUDIT
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <Stack direction="row" spacing={3} sx={{ mt: 1 }}>
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  Created by
                </Typography>
                {loading ? (
                  <Skeleton width={100} />
                ) : (
                  <Typography variant="body2" fontWeight={600}>
                    {data?.createdBy?.email}
                  </Typography>
                )}
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  Updated at
                </Typography>
                {loading ? (
                  <Skeleton width={100} />
                ) : (
                  <Typography variant="body2" fontWeight={600}>
                    {formatDate(data?.updatedAt)}
                  </Typography>
                )}
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2, bgcolor: "#f8f9fa" }}>
        <Button onClick={handleClose} variant="outlined" color="inherit">
          Close
        </Button>
        <Button
          variant="contained"
          disabled={loading || !data?.file}
          onClick={() => data?.file && window.open(data.file, "_blank")}
        >
          View Document
        </Button>
      </DialogActions>
    </Dialog>
  );
}
