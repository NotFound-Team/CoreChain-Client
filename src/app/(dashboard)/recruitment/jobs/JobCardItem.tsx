// ================= SUB-COMPONENT: JOB CARD =================
import { TJob } from "@/types/job";
import { Box, Card, CardContent, IconButton, MenuItem, Select, Stack, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { MdMoreVert } from "react-icons/md";

const JobCardItem = ({
  job,
  onMenuOpen,
  onStatusChange,
}: {
  job: TJob;
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

  // Helper màu sắc cho Status Chip
  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return { bg: "#E6F4EA", color: "#1E7E34", label: "Active" }; // Giống hình reference (xanh lá)
      case "draft":
        return { bg: "#F3F4F6", color: "#374151", label: "Draft" };
      case "closed":
        return { bg: "#FDE8E8", color: "#C81E1E", label: "Closed" };
      default:
        return { bg: "#F3F4F6", color: "#374151", label: status };
    }
  };

  const statusStyle = getStatusColor(job.status);

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
          {/* === LEFT SECTION === */}
          <Box sx={{ flex: 1 }}>
            {/* Title & Status Badge */}
            <Stack direction="row" alignItems="center" spacing={1.5} mb={0.5}>
              <Typography variant="h6" fontWeight={700} sx={{ fontSize: "1.1rem" }}>
                {job.title}
              </Typography>

              {/* Badge giống hình: Background nhạt, chữ đậm, bo góc nhẹ */}
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

            {/* Subtitle: Department . Location */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
            >
              {job.department || "General"}
              <Box component="span" sx={{ width: 3, height: 3, borderRadius: "50%", bgcolor: "text.disabled" }} />
              {job.location?.city || "Remote"}
            </Typography>

            {/* Candidates Count */}
            <Typography variant="body2" color="text.primary" fontWeight={500}>
              {job.applicants_count || 0} Candidates Applied
            </Typography>
          </Box>

          {/* === RIGHT SECTION === */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "flex-start", sm: "flex-end" },
              justifyContent: "space-between",
              height: "100%",
              gap: 2,
            }}
          >
            {/* Top Right: Quick Status Select + Menu */}
            <Stack direction="row" spacing={1} alignItems="center">
              {/* Quick Status Dropdown (Mô phỏng cái dropdown bên phải trong hình) */}
              <Select
                size="small"
                value={job.status}
                onChange={(e) => onStatusChange(e.target.value)}
                sx={{
                  height: 32,
                  fontSize: "0.85rem",
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

            {/* Bottom Right: Date */}
            <Typography variant="caption" color="text.secondary" sx={{ mt: "auto" }}>
              Created {timeAgo(job.posted_at)}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
