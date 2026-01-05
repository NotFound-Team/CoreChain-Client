"use client";

import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  Grid,
  Box,
  Divider,
} from "@mui/material";
import {
  MdAddCircleOutline,
  MdPersonAdd,
  MdOutlineMessage,
  MdPostAdd,
  MdHelpOutline,
  MdOutlineBugReport,
  MdMenuBook,
  MdContactSupport,
} from "react-icons/md";
import { useRouter } from "next/navigation";

const ActionHelper = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (path: string) => {
    handleClose();
    router.push(path);
  };

  return (
    <>
      <Tooltip title="Quick Actions & Help">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{
            ml: 1,
            color: "white",
            bgcolor: "rgba(255, 255, 255, 0.1)",
            "&:hover": { bgcolor: "rgba(255, 255, 255, 0.2)" },
          }}
        >
          <MdAddCircleOutline size={24} />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{
          paper: {
            elevation: 4,
            sx: { width: 480, mt: 1.5, borderRadius: "12px", overflow: "hidden", p: 0 },
          },
        }}
      >
        <Grid container>
          {/* --- CỘT TRÁI: TẠO NHANH --- */}
          <Grid item xs={6} sx={{ borderRight: "1px solid", borderColor: "divider", py: 1 }}>
            <Typography variant="overline" sx={{ px: 2, fontWeight: "bold", color: "primary.main" }}>
              Tạo nhanh
            </Typography>

            <MenuItem onClick={() => handleAction("/hr/personnel?action=create")}>
              <ListItemIcon>
                <MdPersonAdd size={20} color="#1976d2" />
              </ListItemIcon>
              <ListItemText 
                primary={<Typography variant="body2" fontWeight="500">Thêm nhân sự</Typography>} 
                secondary="Hồ sơ mới" 
              />
            </MenuItem>

            <MenuItem onClick={() => handleAction("/project?action=new")}>
              <ListItemIcon>
                <MdPostAdd size={20} color="#2e7d32" />
              </ListItemIcon>
              <ListItemText 
                primary={<Typography variant="body2" fontWeight="500">Dự án mới</Typography>} 
                secondary="Khởi tạo việc" 
              />
            </MenuItem>

            <MenuItem onClick={() => handleAction("/operations/feedback")}>
              <ListItemIcon>
                <MdOutlineMessage size={20} color="#ed6c02" />
              </ListItemIcon>
              <ListItemText 
                primary={<Typography variant="body2" fontWeight="500">Gửi phản hồi</Typography>} 
                secondary="Góp ý nội bộ" 
              />
            </MenuItem>
          </Grid>

          {/* --- CỘT PHẢI: HƯỚNG DẪN & TRỢ GIÚP --- */}
          <Grid item xs={6} sx={{ py: 1, bgcolor: "#fafafa" }}>
            <Typography variant="overline" sx={{ px: 2, fontWeight: "bold", color: "text.secondary" }}>
              Hướng dẫn & Trợ giúp
            </Typography>

            <MenuItem onClick={() => handleAction("/help/docs")}>
              <ListItemIcon>
                <MdMenuBook size={20} color="#673ab7" />
              </ListItemIcon>
              <ListItemText 
                primary={<Typography variant="body2" fontWeight="500">Tài liệu HDSD</Typography>} 
                secondary="Tra cứu nhanh" 
              />
            </MenuItem>

            <MenuItem onClick={() => handleAction("/help/report")}>
              <ListItemIcon>
                <MdOutlineBugReport size={20} color="#d32f2f" />
              </ListItemIcon>
              <ListItemText 
                primary={<Typography variant="body2" fontWeight="500">Báo lỗi hệ thống</Typography>} 
                secondary="Gửi ticket hỗ trợ" 
              />
            </MenuItem>

            <MenuItem onClick={() => handleAction("/help/contact")}>
              <ListItemIcon>
                <MdContactSupport size={20} color="#455a64" />
              </ListItemIcon>
              <ListItemText 
                primary={<Typography variant="body2" fontWeight="500">Liên hệ kỹ thuật</Typography>} 
                secondary="Hotline/Chat" 
              />
            </MenuItem>
          </Grid>
        </Grid>

        <Divider />
        
        <Box sx={{ p: 1, textAlign: "center", bgcolor: "#fff" }}>
          <Typography variant="caption" color="text.disabled">
            Phiên bản hệ thống v1.0.0
          </Typography>
        </Box>
      </Menu>
    </>
  );
};

export default ActionHelper;