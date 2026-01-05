"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  Chip,
  AvatarGroup,
  Avatar,
  Tooltip,
  Tab,
  Tabs,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Paper,
  Grid,
} from "@mui/material";
import {
  MdVideoCall,
  MdCalendarMonth,
  MdList,
  MdAdd,
  MdEdit,
  MdDelete,
  MdAccessTime,
  MdPlace,
} from "react-icons/md";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

const MOCK_MEETINGS = [
  {
    _id: "m1",
    title: "Họp triển khai module HR",
    type: "Online",
    startTime: "2024-03-25T09:00:00",
    duration: "60 min",
    participants: [{ name: "Admin" }, { name: "Dev 1" }, { name: "Designer" }],
    status: "Upcoming",
  },
  {
    _id: "m2",
    title: "Review thiết kế UI/UX",
    type: "Offline - Phòng 201",
    startTime: "2024-03-26T14:00:00",
    duration: "45 min",
    participants: [{ name: "Designer" }, { name: "PM" }],
    status: "Upcoming",
  },
];

const MeetingPage = () => {
  const router = useRouter();
  const [tab, setTab] = useState(0);
  const [meetings, setMeetings] = useState(MOCK_MEETINGS);
  const [openForm, setOpenForm] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null);

  const handleOpenForm = (meeting: any = null) => {
    setSelectedMeeting(meeting);
    setOpenForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa cuộc họp này?")) {
      setMeetings(meetings.filter((m) => m._id !== id));
    }
  };

  return (
    <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography variant="h5" fontWeight="bold">Meetings</Typography>
          <Typography variant="body2" color="text.secondary">Quản lý các buổi thảo luận và làm việc nhóm</Typography>
        </Box>
        <Button variant="contained" startIcon={<MdAdd />} onClick={() => handleOpenForm()} sx={{ borderRadius: "10px", px: 3 }}>
          Tạo cuộc họp
        </Button>
      </Box>

      {/* Tabs Điều hướng */}
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 1 }}>
        <Tab icon={<MdList />} iconPosition="start" label="Danh sách thẻ" />
        <Tab icon={<MdCalendarMonth />} iconPosition="start" label="Lịch biểu" />
      </Tabs>

      {tab === 0 ? (
        <Grid container spacing={3}>
          {meetings.map((meeting) => (
            <Grid item xs={12} sm={6} md={4} key={meeting._id}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: "16px",
                  border: "1px solid",
                  borderColor: "divider",
                  transition: "all 0.3s",
                  "&:hover": {
                    boxShadow: "0px 10px 20px rgba(0,0,0,0.05)",
                    borderColor: "primary.main",
                  },
                }}
              >
                {/* Status & Type */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                  <Chip
                    label={meeting.status}
                    size="small"
                    color={meeting.status === "Upcoming" ? "primary" : "default"}
                    sx={{ fontWeight: "bold", fontSize: "0.7rem" }}
                  />
                  <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                    <MdPlace /> {meeting.type}
                  </Typography>
                </Stack>

                {/* Title */}
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, height: "60px", overflow: "hidden" }}>
                  {meeting.title}
                </Typography>

                {/* Time Info */}
                <Stack spacing={1} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                    <MdCalendarMonth size={18} />
                    <Typography variant="body2">{dayjs(meeting.startTime).format("DD MMM, YYYY")}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'primary.main' }}>
                    <MdAccessTime size={18} />
                    <Typography variant="body2" fontWeight="500">
                      {dayjs(meeting.startTime).format("HH:mm")} ({meeting.duration})
                    </Typography>
                  </Box>
                </Stack>

                {/* Participants */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 2, borderTop: '1px dashed', borderColor: 'divider' }}>
                  <AvatarGroup max={4}>
                    {meeting.participants.map((p, i) => (
                      <Tooltip title={p.name} key={i}>
                        <Avatar sx={{ width: 30, height: 30, fontSize: "12px" }}>{p.name[0]}</Avatar>
                      </Tooltip>
                    ))}
                  </AvatarGroup>

                  <Stack direction="row" spacing={0.5}>
                    <IconButton size="small" onClick={() => handleOpenForm(meeting)} color="info">
                      <MdEdit size={18} />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(meeting._id)} color="error">
                      <MdDelete size={18} />
                    </IconButton>
                  </Stack>
                </Box>

                {/* Join Button */}
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  startIcon={<MdVideoCall />}
                  sx={{ mt: 2, borderRadius: "8px", textTransform: 'none' }}
                  onClick={() => router.push(`/operations/meetings/${meeting._id}`)}
                >
                  Tham gia phòng họp
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ p: 5, textAlign: "center", border: "2px dashed #eee", borderRadius: 4 }}>
          <Typography color="text.secondary">Tính năng Calendar View đang cập nhật...</Typography>
        </Box>
      )}

      {/* Dialog Form giữ nguyên như cũ */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
        <DialogTitle>{selectedMeeting ? "Chỉnh sửa cuộc họp" : "Tạo cuộc họp mới"}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Tiêu đề cuộc họp" fullWidth defaultValue={selectedMeeting?.title} />
            <Stack direction="row" spacing={2}>
              <TextField label="Ngày" type="date" fullWidth InputLabelProps={{ shrink: true }} defaultValue={dayjs(selectedMeeting?.startTime).format("YYYY-MM-DD")} />
              <TextField label="Giờ" type="time" fullWidth InputLabelProps={{ shrink: true }} defaultValue={dayjs(selectedMeeting?.startTime).format("HH:mm")} />
            </Stack>
            <TextField select label="Hình thức" fullWidth defaultValue={selectedMeeting?.type || "Online"}>
              <MenuItem value="Online">Online (Hệ thống)</MenuItem>
              <MenuItem value="Offline">Offline (Văn phòng)</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Hủy</Button>
          <Button variant="contained" onClick={() => setOpenForm(false)}>Lưu</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MeetingPage;