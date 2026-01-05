"use client";
import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button, Stack } from "@mui/material";
import { decryptFeedback } from "@/services/feedback.service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const DecryptModal = ({ open, feedbackId, onClose, onSuccess }: any) => {
  const [form, setForm] = useState({ reason: "", approvedBy: "", secretKey: "" });
  const [loading, setLoading] = useState(false);

  const handleDecrypt = async () => {
    setLoading(true);
    const res = await decryptFeedback(feedbackId, form);
    if (res?.statusCode === 201 || res?.statusCode === 200) {
      alert("Giải mã thành công! Nội dung: " + res.data.content);
      onSuccess();
    } else {
      alert(res?.message || "Sai Secret Key hoặc lỗi hệ thống");
    }
    setLoading(false);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>Yêu cầu giải mã Feedback</Typography>
        <Stack spacing={2}>
          <TextField
            label="Người phê duyệt"
            fullWidth
            onChange={(e) => setForm({ ...form, approvedBy: e.target.value })}
          />
          <TextField
            label="Lý do giải mã"
            fullWidth
            multiline
            rows={2}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
          />
          <TextField
            label="Secret Key"
            type="password"
            fullWidth
            onChange={(e) => setForm({ ...form, secretKey: e.target.value })}
          />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button onClick={onClose}>Hủy</Button>
            <Button variant="contained" onClick={handleDecrypt} disabled={loading}>
              {loading ? "Đang xử lý..." : "Giải mã"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default DecryptModal;