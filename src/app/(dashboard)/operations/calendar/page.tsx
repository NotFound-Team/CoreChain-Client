"use client";

import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Chip,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { MdAlarm, MdVideoCall, MdAssignment, MdStars, MdOpenInNew } from "react-icons/md";

// Helper render icon
const renderIcon = (iconName: string) => {
  const iconStyle = { marginRight: "6px", fontSize: "16px" };
  switch (iconName) {
    case "deadline":
      return <MdAlarm style={iconStyle} />;
    case "meeting":
      return <MdVideoCall style={iconStyle} />;
    case "task":
      return <MdAssignment style={iconStyle} />;
    case "project":
      return <MdStars style={iconStyle} />;
    default:
      return null;
  }
};

const UnifiedCalendarPage = () => {
  const router = useRouter();
  const currentMonth = dayjs().format("YYYY-MM");

  const [noti, setNoti] = useState({ open: false, msg: "" });
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);

  // 10 Data Mock đa dạng: Task, Meeting, Project, Deadline
  const [events] = useState([
    {
      id: "1",
      title: "Deadline: Báo cáo thuế",
      start: `${currentMonth}-06T23:59:00`,
      backgroundColor: "#ea4335",
      extendedProps: { type: "deadline", iconName: "deadline", url: "/finance/payroll" },
    },
    {
      id: "2",
      title: "Họp Team Design",
      start: `${currentMonth}-06T10:00:00`,
      end: `${currentMonth}-06T11:30:00`,
      backgroundColor: "#1a73e8",
      extendedProps: { type: "meeting", iconName: "meeting", url: "/operations/meetings/m1" },
    },
    {
      id: "3",
      title: "Task: Review Code",
      start: `${currentMonth}-08`,
      backgroundColor: "#34a853",
      extendedProps: { type: "task", iconName: "task", url: "/project/task-1" },
    },
    {
      id: "4",
      title: "Project: ERP Phase 2",
      start: `${currentMonth}-10`,
      end: `${currentMonth}-15`,
      backgroundColor: "#fbbc04",
      extendedProps: { type: "project", iconName: "project", url: "/project/erp" },
    },
    {
      id: "5",
      title: "Deadline: Nộp Profile",
      start: `${currentMonth}-10T17:00:00`,
      backgroundColor: "#ea4335",
      extendedProps: { type: "deadline", iconName: "deadline", url: "/hr/personnel" },
    },
    {
      id: "6",
      title: "Họp Khách Hàng",
      start: `${currentMonth}-12T14:00:00`,
      backgroundColor: "#1a73e8",
      extendedProps: { type: "meeting", iconName: "meeting", url: "/operations/meetings/m2" },
    },
    {
      id: "7",
      title: "Task: Fix Bug UI",
      start: `${currentMonth}-15T09:00:00`,
      backgroundColor: "#34a853",
      extendedProps: { type: "task", iconName: "task", url: "/project/task-2" },
    },
    {
      id: "8",
      title: "Deadline: Ký hợp đồng",
      start: `${currentMonth}-15T23:59:00`,
      backgroundColor: "#ea4335",
      extendedProps: { type: "deadline", iconName: "deadline", url: "/hr/contracts" },
    },
    {
      id: "9",
      title: "Weekly Sync",
      start: `${currentMonth}-20T08:30:00`,
      backgroundColor: "#1a73e8",
      extendedProps: { type: "meeting", iconName: "meeting", url: "/operations/meetings/m3" },
    },
    {
      id: "10",
      title: "Launching Beta",
      start: `${currentMonth}-25`,
      end: `${currentMonth}-28`,
      backgroundColor: "#fbbc04",
      extendedProps: { type: "project", iconName: "project", url: "/project/beta" },
    },
  ]);

  const handleEventClick = (info: any) => {
    setSelectedEvent({
      title: info.event.title,
      start: info.event.start,
      url: info.event.extendedProps.url,
      type: info.event.extendedProps.type,
    });
    setOpenModal(true);
  };

  const handleEventDrop = (info: any) => {
    setNoti({ open: true, msg: `Đã dời "${info.event.title}" sang ${dayjs(info.event.start).format("DD/MM")}` });
  };

  const handleNavigate = () => {
    if (selectedEvent?.url) router.push(selectedEvent.url);
    setOpenModal(false);
  };

  return (
    <Box sx={{ p: 3, height: "100vh", display: "flex", flexDirection: "column", gap: 3, bgcolor: "#f8f9fa" }}>
      {/* Header & Legend */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight="bold">
          Lịch Tổng Hợp
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip label="Task" size="small" sx={{ bgcolor: "#34a853", color: "white" }} />
          <Chip label="Meeting" size="small" sx={{ bgcolor: "#1a73e8", color: "white" }} />
          <Chip label="Project" size="small" sx={{ bgcolor: "#fbbc04", color: "white" }} />
          <Chip label="Deadline" size="small" sx={{ bgcolor: "#ea4335", color: "white" }} />
        </Stack>
      </Stack>

      <Paper
        elevation={0}
        sx={{ p: 2, borderRadius: "16px", border: "1px solid #e0e0e0", flexGrow: 1, overflow: "hidden" }}
      >
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          // --- CẤU HÌNH CÁC NÚT TÙY CHỈNH NGÀY THÁNG Ở ĐÂY ---
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay", // Hiện các nút: Tháng, Tuần, Ngày
          }}
          buttonText={{
            today: "Hôm nay",
            month: "Tháng",
            week: "Tuần",
            day: "Ngày",
          }}
          events={events}
          editable={true}
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
          height="100%"
          locale="vi"
          eventContent={(eventInfo) => (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: "2px 4px",
                color: "white",
                cursor: "pointer",
                overflow: "hidden",
              }}
            >
              {renderIcon(eventInfo.event.extendedProps.iconName)}
              <Typography
                variant="caption"
                sx={{ fontWeight: "500", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}
              >
                {eventInfo.event.title}
              </Typography>
            </Box>
          )}
        />
      </Paper>

      {/* Modal Detail */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>Chi tiết hoạt động</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ textAlign: "center", py: 1 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              {selectedEvent?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Bắt đầu: {dayjs(selectedEvent?.start).format("HH:mm - DD/MM/YYYY")}
            </Typography>
            <Chip label={selectedEvent?.type?.toUpperCase()} size="small" sx={{ mt: 2, fontWeight: "bold" }} />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setOpenModal(false)} variant="outlined" color="inherit" fullWidth>
            Đóng
          </Button>
          <Button onClick={handleNavigate} variant="contained" color="primary" fullWidth startIcon={<MdOpenInNew />}>
            Đi đến
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={noti.open} autoHideDuration={3000} onClose={() => setNoti({ ...noti, open: false })}>
        <Alert severity="success" variant="filled">
          {noti.msg}
        </Alert>
      </Snackbar>

      <style jsx global>{`
        .fc-toolbar-title {
          font-size: 1.2rem !important;
          font-weight: bold;
        }
        .fc-button-primary {
          background-color: #fff !important;
          color: #333 !important;
          border: 1px solid #ddd !important;
          text-transform: capitalize !important;
        }
        .fc-button-active {
          background-color: #1976d2 !important;
          color: #fff !important;
        }
        .fc-event {
          border: none !important;
          border-radius: 4px !important;
          margin: 1px 0;
        }
      `}</style>
    </Box>
  );
};

export default UnifiedCalendarPage;
