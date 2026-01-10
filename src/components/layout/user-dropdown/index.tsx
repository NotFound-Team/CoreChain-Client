import { CONFIG_API } from "@/configs/api";
import { useAuth } from "@/hooks/useAuth";
import { useSnackbar } from "@/hooks/useSnackbar";
import fetchApi from "@/utils/fetchApi";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const UserDropdown = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const { showToast } = useSnackbar();

  const handleLogout = useCallback(async () => {
    try {
      await fetchApi(`${CONFIG_API.AUTH.LOGOUT}`, "POST");
      localStorage.removeItem("token");
      localStorage.removeItem("projects");
      showToast("Logut successfully!", "success");
      router.push("/login");
    } catch (error) {
      console.error("error", error);
      showToast("Error during logout. Please try again!", "error");
    } finally {
      setAnchorEl(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigateProfile = () => {
    setAnchorEl(null);
    router.push("/profile");
  };

  const { user } = useAuth();

  return (
    <>
      <Box>
        <Tooltip title="Accout" followCursor arrow>
          <StyledBadge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar alt="Remy Sharp" sx={{ width: 32, height: 32 }} src={"/images/img_avatar.png"} />
            </IconButton>
          </StyledBadge>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mx: 2, pb: 2 }}>
            <StyledBadge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot">
              <Avatar sx={{ width: 32, height: 32 }}>
                {user?.avatar ? (
                  <Image src={""} width={0} height={0} alt="avatar" style={{ height: "32px", width: "32px" }} />
                ) : (
                  <FaRegUser />
                )}
              </Avatar>
            </StyledBadge>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography component={"span"}>{user?.name}</Typography>
              <Typography component={"span"}>{user?.role.name}</Typography>
            </Box>
          </Box>
          <Divider />
          <MenuItem onClick={handleNavigateProfile}>
            <ListItemIcon>
              <FaRegUser />
            </ListItemIcon>
            My account
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <MdExitToApp size={24} />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default UserDropdown;
