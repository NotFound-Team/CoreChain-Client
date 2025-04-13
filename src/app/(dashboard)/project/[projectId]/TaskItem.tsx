import { TTask } from "@/types/task";
import {
  Avatar,
  AvatarGroup,
  Box,
  Chip,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Theme,
  Tooltip,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const TaskItem = ({ data }: { data: { tasks: TTask; theme: Theme } }) => {
  const { tasks, theme } = data;
  const taskStart = tasks?.startDate;
  const taskEnd = tasks?.endDate;
  // const handleStatusChange = () => {};
  // const handleDeleteTask = () => {};

  return (
    <Box>
      <Paper
        key={tasks._id}
        elevation={2}
        sx={{
          pr: 2,
          mb: 2,
          background: theme.palette.background.paper,
          display: "flex",
          borderRadius: 3,
          overflow: "hidden",
          transition: "transform 0.2s",
          "&:hover": { transform: "translateX(5px)" },
        }}
      >
        <Box
          sx={{
            pl: 2,
            height: "100px",
            bgcolor: tasks.status === 1 ? "#F3F3F4" : tasks.status === 2 ? "#7367F0" : "#EA5455",
          }}
        ></Box>
        <ListItem sx={{ py: 2, background: theme.palette.background.paper }}>
          <ListItemAvatar>
            <AvatarGroup max={3}>
              <Tooltip title={`Assignee `}>
                <Avatar
                  src={"/static/images/avatar/1.jpg"}
                  sx={{
                    width: 40,
                    height: 40,
                    border: "2px solid #fff",
                    "&:hover": { transform: "scale(1.1)" },
                    transition: "transform 0.2s",
                  }}
                />
              </Tooltip>
            </AvatarGroup>
          </ListItemAvatar>

          <ListItemText
            primary={
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {tasks.title}
              </Typography>
            }
            secondary={
              <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
                {tasks.description}
              </Typography>
            }
            sx={{ mx: 2, flex: "1 1 auto" }}
          />

          <Box sx={{ minWidth: 140, textAlign: "center" }}>
            <Typography
              variant="caption"
              sx={{
                display: "block",
                color: "text.secondary",
                mb: 0.5,
              }}
            >
              {dayjs(taskStart).format("DD/MM/YYYY")} - {dayjs(taskEnd).format("DD/MM/YYYY")}
            </Typography>

            <Tooltip title="Priority">
              <Box>
                {tasks.priority === 1 && <Chip label="Low" color="default" size="small" sx={{ borderRadius: 1 }} />}
                {tasks.priority === 2 && <Chip label="Medium" color="primary" size="small" sx={{ borderRadius: 1 }} />}
                {tasks.priority === 3 && <Chip label="High" color="error" size="small" sx={{ borderRadius: 1 }} />}
              </Box>
            </Tooltip>
          </Box>
          <Divider sx={{ ml: 2 }} orientation="vertical" flexItem />
          <Tooltip sx={{ ml: 2 }} title="Status">
            <Box>
              {tasks.status === 1 && <Chip label="Not Started" color="default" size="small" sx={{ borderRadius: 1 }} />}
              {tasks.status === 2 && <Chip label="In Progress" color="primary" size="small" sx={{ borderRadius: 1 }} />}
              {tasks.status === 3 && <Chip label="Completed" color="error" size="small" sx={{ borderRadius: 1 }} />}
            </Box>
          </Tooltip>

          <Divider sx={{ ml: 2 }} orientation="vertical" flexItem />

          <Box sx={{ ml: 2, display: "flex", gap: 1 }}>
            <Tooltip title="Edit Task">
              <IconButton
                sx={{
                  background: theme.palette.action.hover,
                  "&:hover": { background: theme.palette.action.selected },
                }}
              >
                <FaRegEdit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Task">
              <IconButton
                color="error"
                sx={{
                  background: theme.palette.error.light + "20",
                  "&:hover": { background: theme.palette.error.light + "40" },
                }}
                // onClick={() => handleDeleteTask(task.id)}
              >
                <MdDeleteForever />
              </IconButton>
            </Tooltip>
          </Box>
        </ListItem>
      </Paper>
    </Box>
  );
};

export default TaskItem;
