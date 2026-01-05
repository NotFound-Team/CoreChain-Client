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
  styled,
} from "@mui/material";
import { IoIosChatbubbles } from "react-icons/io";
import { useRouter } from "next/navigation";

const SmallOnlineBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    width: 8,
    height: 8,
    borderRadius: "50%",
  },
}));

const MOCK_MESSAGES = [
  {
    id: 1,
    sender: "Admin HR",
    avatar: "/images/avatar-1.png",
    lastMsg: "Bạn đã kiểm tra danh sách điều chuyển nhân sự chưa?",
    time: "5 phút trước",
    isUnread: true,
  },
  {
    id: 2,
    sender: "Technical Lead",
    avatar: "",
    lastMsg: "Dự án Operation Group cần cập nhật API mới.",
    time: "20 phút trước",
    isUnread: true,
  },
  {
    id: 3,
    sender: "Kế toán trưởng",
    avatar: "/images/avatar-2.png",
    lastMsg: "Bảng lương tháng này đã được duyệt rồi nhé.",
    time: "2 giờ trước",
    isUnread: false,
  },
];

const MessageDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGoToChat = (id?: string) => {
    handleClose();
    router.push(id ? `/chat?id=${id}` : "/chat");
  };

  const unreadCount = MOCK_MESSAGES.filter((m) => m.isUnread).length;

  return (
    <Box>
      <Tooltip title="Messages">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "message-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Badge badgeContent={unreadCount} color="info">
            <IoIosChatbubbles size={24} />
          </Badge>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="message-menu"
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              width: 350,
              maxHeight: 500,
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
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Messages
          </Typography>
        </Box>

        <Divider />

        <List sx={{ p: 0 }}>
          {MOCK_MESSAGES.map((msg) => (
            <MenuItem
              key={msg.id}
              onClick={() => handleGoToChat(msg.id.toString())}
              sx={{
                py: 1.5,
                bgcolor: msg.isUnread ? "action.hover" : "transparent",
              }}
            >
              <ListItemAvatar>
                <SmallOnlineBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar src={msg.avatar}>{!msg.avatar && msg.sender[0]}</Avatar>
                </SmallOnlineBadge>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="body2" fontWeight={msg.isUnread ? "bold" : "medium"}>
                      {msg.sender}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>
                      {msg.time}
                    </Typography>
                  </Box>
                }
                secondary={
                  <Typography
                    variant="caption"
                    color={msg.isUnread ? "text.primary" : "text.secondary"}
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      fontWeight: msg.isUnread ? 500 : 400,
                    }}
                  >
                    {msg.lastMsg}
                  </Typography>
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
            onClick={() => handleGoToChat()}
          >
            Open Chat Room
          </Typography>
        </Box>
      </Menu>
    </Box>
  );
};

export default MessageDropdown;
