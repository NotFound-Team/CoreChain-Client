"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Button,
  Chip,
  Typography,
  IconButton,
  Stack,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  Avatar,
  AvatarGroup,
  Card,
  CardContent,
  Menu,
  ListItemIcon,
  ListItemText,
  Drawer,
  Divider,
  FormControl,
  InputLabel,
  Badge,
  Grid,
  useTheme,
} from "@mui/material";
import {
  MdAdd,
  MdOutlineRemoveRedEye,
  MdOutlineEdit,
  MdDeleteOutline,
  MdLocationOn,
  MdBusinessCenter,
  MdSearch,
  MdMoreVert,
  MdFilterList,
  MdClose,
  MdRefresh,
} from "react-icons/md";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { CONFIG_API } from "@/configs/api";
import CreateJobModal from "./CreateJobModal";

// ================= TYPES =================
type JobStatus = "draft" | "published" | "closed" | "archived" | "all";

interface Job {
  id: string;
  title: string;
  department?: string;
  location?:
    | {
        city?: string;
        country?: string;
      }
    | any;
  salary_range?: {
    min: number;
    max: number;
    currency: string;
  };
  status: string;
  posted_at: string;
  applicants_count?: number;
  employment_type?: string;
  is_active?: boolean;
}

// ================= SUB-COMPONENT: JOB CARD =================
// Card hiển thị thông tin job theo style mới
const JobCardItem = ({
  job,
  onMenuOpen,
  onStatusChange,
}: {
  job: Job;
  onMenuOpen: (e: React.MouseEvent<HTMLElement>) => void;
  onStatusChange: (val: string) => void;
}) => {
  const theme = useTheme();

  // Helper tính thời gian
  const timeAgo = (iso: string) => {
    if (!iso) return "";
    const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  // Helper màu sắc cho Status Badge (Style giống hình reference)
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "published":
        return { bg: "#E6F4EA", color: "#1E7E34", label: "Active" }; // Xanh lá
      case "draft":
        return { bg: "#F3F4F6", color: "#374151", label: "Draft" }; // Xám
      case "closed":
        return { bg: "#FDE8E8", color: "#C81E1E", label: "Closed" }; // Đỏ
      case "archived":
        return { bg: "#FFF8E1", color: "#F57C00", label: "Archived" }; // Cam
      default:
        return { bg: "#F3F4F6", color: "#374151", label: status };
    }
  };

  const statusStyle = getStatusStyle(job.status);

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "none",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        },
        transition: "all 0.2s ease-in-out",
      }}
    >
      <CardContent sx={{ p: "20px !important" }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          {/* === LEFT SECTION: INFO === */}
          <Box sx={{ flex: 1 }}>
            {/* Title & Status Badge */}
            <Stack direction="row" alignItems="center" spacing={1.5} mb={0.5}>
              <Typography variant="h6" fontWeight={700} sx={{ fontSize: "1.1rem" }}>
                {job.title}
              </Typography>

              <Box
                sx={{
                  bgcolor: statusStyle.bg,
                  color: statusStyle.color,
                  px: 1,
                  py: 0.25,
                  borderRadius: "6px",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 0.5,
                }}
              >
                {statusStyle.label}
              </Box>
            </Stack>

            {/* Subtitle: Department • Location */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
            >
              {job.department || "General"}
              <Box component="span" sx={{ width: 3, height: 3, borderRadius: "50%", bgcolor: "text.disabled" }} />
              {job.location?.city || "Remote"}
            </Typography>

            {/* Candidates Count + Avatars */}
            <Stack direction="row" alignItems="center" spacing={2}>
              <AvatarGroup max={3} sx={{ "& .MuiAvatar-root": { width: 24, height: 24, fontSize: 10 } }}>
                {/* Placeholder avatars */}
                <Avatar sx={{ width: 24, height: 24 }} />
                <Avatar sx={{ width: 24, height: 24 }} />
              </AvatarGroup>
              <Typography variant="body2" color="text.primary" fontWeight={500}>
                {job.applicants_count || 0} Candidates Applied
              </Typography>
            </Stack>
          </Box>

          {/* === RIGHT SECTION: ACTIONS === */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "flex-start", sm: "flex-end" },
              justifyContent: "space-between",
              height: "100%",
              minHeight: 80, // Đảm bảo chiều cao để đẩy ngày xuống dưới
              gap: 2,
            }}
          >
            {/* Quick Status Select + Menu */}
            <Stack direction="row" spacing={1} alignItems="center">
              <Select
                size="small"
                value={job.status}
                onChange={(e) => onStatusChange(e.target.value)}
                sx={{
                  height: 32,
                  fontSize: "0.8rem",
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "divider" },
                }}
              >
                <MenuItem value="published">Active</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
              </Select>

              <IconButton size="small" onClick={onMenuOpen} sx={{ color: "text.secondary" }}>
                <MdMoreVert />
              </IconButton>
            </Stack>

            {/* Date */}
            <Typography variant="caption" color="text.secondary" sx={{ mt: "auto" }}>
              Created {timeAgo(job.posted_at)}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

// ================= MAIN COMPONENT =================
export default function JobManagementPage() {
  const { user } = useAuth();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFilter, setOpenFilter] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  // ========= MENU STATE (Global) =========
  // Thay vì lưu array ref, ta lưu id của job đang được mở menu
  const [menuAnchor, setMenuAnchor] = useState<{ el: HTMLElement | null; id: string | null }>({
    el: null,
    id: null,
  });

  const handleOpenMenu = (id: string, event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor({ el: event.currentTarget, id });
  };
  const handleCloseMenu = () => {
    setMenuAnchor({ el: null, id: null });
  };

  // ========= FILTER STATE =========
  const initialFilters = {
    keyword: "",
    status: "all",
    is_active: "all",
    public: "all",
    employment_type: "all",
    remote_type: "all",
    experience_level: "all",
    department: "",
    tag: "",
    min_salary: "",
    max_salary: "",
  };

  const [filters, setFilters] = useState(initialFilters);

  // Đếm số filter đang dùng (trừ keyword)
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.status !== "all") count++;
    if (filters.is_active !== "all") count++;
    if (filters.public !== "all") count++;
    if (filters.employment_type !== "all") count++;
    if (filters.remote_type !== "all") count++;
    if (filters.experience_level !== "all") count++;
    if (filters.department) count++;
    if (filters.tag) count++;
    if (filters.min_salary) count++;
    if (filters.max_salary) count++;
    return count;
  }, [filters]);

  const updateFilter = (key: keyof typeof initialFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({ ...initialFilters, keyword: filters.keyword });
  };

  // ========= FETCH JOBS =========
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (filters.keyword) params.keyword = filters.keyword;
      if (filters.status !== "all") params.status = filters.status;
      if (filters.is_active !== "all") params.is_active = filters.is_active;
      if (filters.public !== "all") params.public = filters.public;
      if (filters.employment_type !== "all") params.employment_type = filters.employment_type;
      if (filters.remote_type !== "all") params.remote_type = filters.remote_type;
      if (filters.experience_level !== "all") params.experience_level = filters.experience_level;
      if (filters.department) params.department = filters.department;
      if (filters.tag) params.tag = filters.tag;
      if (filters.min_salary) params.min_salary = filters.min_salary;
      if (filters.max_salary) params.max_salary = filters.max_salary;

      params.sort_by = "created_at";
      params.order = "desc";

      const response = await axios.get(CONFIG_API.JOB.INDEX, {
        params,
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      if (response?.data?.data) {
        setJobs(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(fetchJobs, 400);
    return () => clearTimeout(delay);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, user?.token]);

  // ========= HANDLERS =========
  const handleQuickStatusChange = async (id: string, newStatus: string) => {
    // Optimistic UI Update
    const oldJobs = [...jobs];
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, status: newStatus } : j)));

    try {
      // Gọi API cập nhật status (Giả định endpoint update)
      // await axios.patch(`${CONFIG_API.JOB.INDEX}/${id}`, { status: newStatus }, ...);
      console.log(`Updated job ${id} to ${newStatus}`);
    } catch (error) {
      console.error("Update failed", error);
      setJobs(oldJobs); // Revert nếu lỗi
    }
  };

  // ================= RENDER =================
  return (
    <Box className="p-6" sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", gap: 3 }}>
      {/* HEADER */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Recruitment
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your job postings
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<MdAdd />}
          sx={{ borderRadius: 2, px: 3, height: 45, textTransform: "none" }}
          onClick={() => setModalOpen(true)}
        >
          Add New Job
        </Button>
      </Box>

      {/* SEARCH BAR & FILTER BUTTON */}
      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          size="small"
          placeholder="Search by title, description..."
          value={filters.keyword}
          onChange={(e) => updateFilter("keyword", e.target.value)}
          sx={{ flexGrow: 1, maxWidth: 500, bgcolor: "background.paper" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MdSearch size={22} color="#888" />
              </InputAdornment>
            ),
          }}
        />

        <Badge badgeContent={activeFilterCount} color="error">
          <Button
            variant="outlined"
            startIcon={<MdFilterList />}
            onClick={() => setOpenFilter(true)}
            sx={{
              height: 40,
              bgcolor: "background.paper",
              color: "text.primary",
              borderColor: "divider",
              textTransform: "none",
              px: 3,
            }}
          >
            Filters
          </Button>
        </Badge>

        {activeFilterCount > 0 && (
          <Button variant="text" size="small" onClick={handleResetFilters} color="error">
            Clear
          </Button>
        )}
      </Stack>

      {/* JOB LIST */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {loading ? (
          <Typography textAlign="center" py={4}>
            Loading jobs...
          </Typography>
        ) : jobs.length === 0 ? (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography color="text.secondary">No jobs found matching your criteria.</Typography>
            <Button variant="text" onClick={handleResetFilters}>
              Clear Filters
            </Button>
          </Box>
        ) : (
          jobs.map((job) => (
            <JobCardItem
              key={job.id}
              job={job}
              onMenuOpen={(e) => handleOpenMenu(job.id, e)}
              onStatusChange={(val) => handleQuickStatusChange(job.id, val)}
            />
          ))
        )}
      </Box>

      {/* GLOBAL MENU ACTION */}
      <Menu
        anchorEl={menuAnchor.el}
        open={Boolean(menuAnchor.el)}
        onClose={handleCloseMenu}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{ paper: { sx: { width: 160, borderRadius: 2 } } }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <ListItemIcon>
            <MdOutlineRemoveRedEye />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <ListItemIcon>
            <MdOutlineEdit />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleCloseMenu} sx={{ color: "error.main" }}>
          <ListItemIcon sx={{ color: "error.main" }}>
            <MdDeleteOutline />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      {/* ================= FILTER DRAWER ================= */}
      <Drawer
        anchor="right"
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        PaperProps={{ sx: { width: { xs: "100%", sm: 400 }, p: 0 } }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          {/* Header */}
          <Box
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="h6" fontWeight={700}>
              Filter Jobs
            </Typography>
            <IconButton onClick={() => setOpenFilter(false)}>
              <MdClose />
            </IconButton>
          </Box>

          {/* Content Scrollable */}
          <Box sx={{ p: 3, flexGrow: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Status Section */}
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1.5, color: "text.secondary", fontWeight: 700 }}>
                STATUS & VISIBILITY
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={filters.status}
                      label="Status"
                      onChange={(e) => updateFilter("status", e.target.value)}
                    >
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="published">Published</MenuItem>
                      <MenuItem value="draft">Draft</MenuItem>
                      <MenuItem value="closed">Closed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Active</InputLabel>
                    <Select
                      value={filters.is_active}
                      label="Active"
                      onChange={(e) => updateFilter("is_active", e.target.value)}
                    >
                      <MenuItem value="all">All</MenuItem>
                      <MenuItem value="true">Active</MenuItem>
                      <MenuItem value="false">Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            <Divider />

            {/* Details Section */}
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1.5, color: "text.secondary", fontWeight: 700 }}>
                JOB DETAILS
              </Typography>
              <Stack spacing={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Employment Type</InputLabel>
                  <Select
                    value={filters.employment_type}
                    label="Employment Type"
                    onChange={(e) => updateFilter("employment_type", e.target.value)}
                  >
                    <MenuItem value="all">All Types</MenuItem>
                    <MenuItem value="full-time">Full-time</MenuItem>
                    <MenuItem value="part-time">Part-time</MenuItem>
                    <MenuItem value="contract">Contract</MenuItem>
                    <MenuItem value="internship">Internship</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth size="small">
                  <InputLabel>Remote Type</InputLabel>
                  <Select
                    value={filters.remote_type}
                    label="Remote Type"
                    onChange={(e) => updateFilter("remote_type", e.target.value)}
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="onsite">On-site</MenuItem>
                    <MenuItem value="remote">Remote</MenuItem>
                    <MenuItem value="hybrid">Hybrid</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth size="small">
                  <InputLabel>Level</InputLabel>
                  <Select
                    value={filters.experience_level}
                    label="Level"
                    onChange={(e) => updateFilter("experience_level", e.target.value)}
                  >
                    <MenuItem value="all">All Levels</MenuItem>
                    <MenuItem value="entry">Entry</MenuItem>
                    <MenuItem value="junior">Junior</MenuItem>
                    <MenuItem value="senior">Senior</MenuItem>
                    <MenuItem value="manager">Manager</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Box>

            <Divider />

            {/* Keyword Section */}
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1.5, color: "text.secondary", fontWeight: 700 }}>
                CATEGORIZATION
              </Typography>
              <Stack spacing={2}>
                <TextField
                  size="small"
                  label="Department"
                  value={filters.department}
                  onChange={(e) => updateFilter("department", e.target.value)}
                />
                <TextField
                  size="small"
                  label="Tags"
                  value={filters.tag}
                  onChange={(e) => updateFilter("tag", e.target.value)}
                />
              </Stack>
            </Box>
          </Box>

          {/* Footer */}
          <Box
            sx={{
              p: 2,
              borderTop: "1px solid",
              borderColor: "divider",
              display: "flex",
              gap: 2,
              bgcolor: "background.paper",
            }}
          >
            <Button variant="outlined" fullWidth onClick={handleResetFilters} startIcon={<MdRefresh />}>
              Reset
            </Button>
            <Button variant="contained" fullWidth onClick={() => setOpenFilter(false)}>
              Show Results
            </Button>
          </Box>
        </Box>
      </Drawer>
      <CreateJobModal open={isModalOpen} onClose={() => setModalOpen(false)} />
    </Box>
  );
}
