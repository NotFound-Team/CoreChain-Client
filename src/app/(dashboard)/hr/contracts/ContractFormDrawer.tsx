"use client";

import React, { useEffect } from "react";
import { Box, Drawer, Typography, Stack, TextField, MenuItem, Button, IconButton, Divider, Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { MdClose } from "react-icons/md";

interface CreateContractDto {
  contractCode: string;
  type: string;
  file: string;
  startDate: Date | string;
  endDate: Date | string;
  status: string;
  employee: string;
  salary: number;
  allowances: number;
  insurance: string;
  workingHours: number;
  leavePolicy: string;
  terminationTerms: string;
  confidentialityClause: string;
}


type UpdateContractDto = Partial<CreateContractDto>;

interface Props {
  open: boolean;
  onClose: () => void;
 
  onSubmit: (data: CreateContractDto | UpdateContractDto) => void;
  initialData?: UpdateContractDto | null; 
}

const ContractFormDrawer = ({ open, onClose, onSubmit, initialData }: Props) => {
  const isUpdate = !!initialData;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateContractDto>({
    defaultValues: {
      type: "Full-time",
      status: "Active",
      salary: 0,
      allowances: 0,
      workingHours: 44,
    },
  });

  useEffect(() => {
    if (open) {
      if (initialData) {

        const formattedData = {
          ...initialData,
          startDate: initialData.startDate ? new Date(initialData.startDate).toISOString().split("T")[0] : "",
          endDate: initialData.endDate ? new Date(initialData.endDate).toISOString().split("T")[0] : "",
        };
        reset(formattedData as any);
      } else {
        reset({
          contractCode: "",
          type: "Full-time",
          status: "Active",
          salary: 0,
          allowances: 0,
          workingHours: 44,
          employee: "",
          file: "",
          insurance: "",
          leavePolicy: "",
          terminationTerms: "",
          confidentialityClause: "",
        });
      }
    }
  }, [open, initialData, reset]);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: "50%", minWidth: "500px", border: "none" },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Header Dynamic */}
        <Box sx={{ p: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" fontWeight={700}>
            {isUpdate ? "Update Contract" : "Create New Contract"}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <MdClose />
          </IconButton>
        </Box>

        <Divider />

        <Box
          component="form"
          id="contract-form-action"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ p: 3, flex: 1, overflowY: "auto" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                General Information
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="contractCode"
                control={control}
                rules={{ required: "Mã hợp đồng là bắt buộc" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Contract Code *"
                    fullWidth
                    size="small"
                    error={!!errors.contractCode}
                    helperText={errors.contractCode?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <TextField {...field} select label="Contract Type" fullWidth size="small">
                    {["Full-time", "Part-time", "Internship", "Freelance"].map((t) => (
                      <MenuItem key={t} value={t}>
                        {t}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="employee"
                control={control}
                rules={{ required: "ID nhân viên là bắt buộc" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Employee (Mongo ID) *"
                    fullWidth
                    size="small"
                    disabled={isUpdate} // Thường không cho đổi nhân viên khi update hợp đồng
                    error={!!errors.employee}
                    helperText={errors.employee?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <TextField {...field} select label="Status" fullWidth size="small">
                    {["Active", "Pending", "Expired", "Terminated"].map((s) => (
                      <MenuItem key={s} value={s}>
                        {s}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 1 }} />
            </Grid>

            {/* Tài chính & Thời gian */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Financial & Timeline
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="salary"
                control={control}
                render={({ field }) => (
                  <TextField {...field} type="number" label="Basic Salary" fullWidth size="small" />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="allowances"
                control={control}
                render={({ field }) => <TextField {...field} type="number" label="Allowances" fullWidth size="small" />}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="date"
                    label="Start Date"
                    fullWidth
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="date"
                    label="End Date"
                    fullWidth
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 1 }} />
            </Grid>

            {/* Điều khoản khác */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="primary" gutterBottom>
                Terms & Conditions
              </Typography>
            </Grid>

            <Grid item xs={8}>
              <Controller
                name="insurance"
                control={control}
                render={({ field }) => <TextField {...field} label="Insurance Policy" fullWidth size="small" />}
              />
            </Grid>
            <Grid item xs={4}>
              <Controller
                name="workingHours"
                control={control}
                render={({ field }) => <TextField {...field} type="number" label="Hours/Week" fullWidth size="small" />}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="terminationTerms"
                control={control}
                render={({ field }) => <TextField {...field} label="Termination Terms" fullWidth size="small" />}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="confidentialityClause"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Confidentiality Clause" multiline rows={3} fullWidth />
                )}
              />
            </Grid>
          </Grid>
        </Box>

        <Divider />

        {/* Footer */}
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end", gap: 2, bgcolor: "#f8fafc" }}>
          <Button onClick={onClose} variant="outlined" color="inherit" sx={{ textTransform: "none" }}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="contract-form-action"
            variant="contained"
            sx={{
              textTransform: "none",
              px: 4,
              bgcolor: isUpdate ? "#2563eb" : "#0f172a", 
              "&:hover": { bgcolor: isUpdate ? "#1d4ed8" : "#1e293b" },
            }}
          >
            {isUpdate ? "Update Contract" : "Save Contract"}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ContractFormDrawer;
