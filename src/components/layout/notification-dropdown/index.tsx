"use client";

import React, { useState } from "react";
import {
  Badge,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  List,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { MdNotificationsNone, MdOutlineMessage, MdInfoOutline } from "react-icons/md";
import { useRouter } from "next/navigation";

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: "New Feedback",
    desc: "You have a new encrypted feedback from HR.",
    time: "2 mins ago",
    type: "feedback",
  },
  {
    id: 2,
    title: "Payroll Updated",
    desc: "Your salary for January has been calculated.",
    time: "1 hour ago",
    type: "finance",
  },
  {
    id: 3,
    title: "System Maintenance",
    desc: "The system will be down for 2 hours tonight.",
    time: "5 hours ago",
    type: "system",
  },
];

const NotificationDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewAll = () => {
    handleClose();
    router.push("/notifications"); // Điều hướng đến trang tất cả thông báo
  };

  return (
    <Box>
      <Tooltip title="Notifications">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "notification-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Badge badgeContent={MOCK_NOTIFICATIONS.length} color="error">
            <MdNotificationsNone size={24} />
          </Badge>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="notification-menu"
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              width: 320,
              maxHeight: 450,
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box sx={{ px: 2, py: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Notifications
          </Typography>
          <Typography
            variant="caption"
            sx={{ cursor: "pointer", color: "primary.main" }}
            onClick={() => console.log("Mark all as read")}
          >
            Mark all as read
          </Typography>
        </Box>

        <Divider />

        <List sx={{ p: 0 }}>
          {MOCK_NOTIFICATIONS.map((notif) => (
            <MenuItem key={notif.id} onClick={handleClose} sx={{ py: 1.5, whiteSpace: "normal" }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: notif.type === "finance" ? "success.light" : "primary.light" }}>
                  {notif.type === "feedback" ? <MdOutlineMessage /> : <MdInfoOutline />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body2" fontWeight="medium">
                    {notif.title}
                  </Typography>
                }
                secondary={
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                      {notif.desc}
                    </Typography>
                    <Typography variant="caption" color="primary" sx={{ fontSize: "0.7rem" }}>
                      {notif.time}
                    </Typography>
                  </Box>
                }
              />
            </MenuItem>
          ))}
        </List>

        <Divider />

        <Box sx={{ p: 1, textAlign: "center" }}>
          <Typography
            variant="body2"
            color="primary"
            sx={{ cursor: "pointer", fontWeight: "bold" }}
            onClick={handleViewAll}
          >
            View All Notifications
          </Typography>
        </Box>
      </Menu>
    </Box>
  );
};

export default NotificationDropdown;
