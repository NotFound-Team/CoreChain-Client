"use client";

// -- MUI --
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Grow from "@mui/material/Grow";
import CardActions from "@mui/material/CardActions";

// -- Next --
import Link from "next/link";
// -- Types
import { TProject } from "@/types/project";
import React, { useEffect, useState } from "react";
import { FaMoneyCheck, FaTasks, FaUser } from "react-icons/fa";
import { IconButton } from "@mui/material";

// -- dayjs --
import dayjs from "dayjs";
import { useAbility } from "@/hooks/useAbility";

export enum Priority {
  Low = 1,
  Medium = 2,
  High = 3,
}

const ProjectCard = React.memo(({ projectItem, index }: { projectItem: TProject; index: number }) => {
  const priorityLabel = Priority[projectItem.priority];
  const [permissionProjectId, setPermissionProjectId] = useState(false);
  const { can } = useAbility();

  useEffect(() => {
    if (can("get", "projects/:id")) {
      setPermissionProjectId(true);
    } else {
      setPermissionProjectId(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Link href={permissionProjectId ? `/project/${projectItem._id}` : "#"} passHref legacyBehavior>
      <Box
        component="a"
        sx={{
          display: "block",
          textDecoration: "none",
          "&:hover": {
            transform: "translateY(-4px)",
            transition: "transform 0.3s ease",
          },
        }}
      >
        <Grow in={true} timeout={500 + Number(index) * 100}>
          <Card
            sx={{
              minHeight: "345px",
              minWidth: "300px",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              borderRadius: 2,
              boxShadow: 2,
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                boxShadow: 6,
                "& .project-image": {},
              },
            }}
          >
            <Box position="relative">
              {/* <CardMedia
                className="project-image"
                component="img"
                alt="Project thumbnail"
                image="https://www.shutterstock.com/image-vector/this-cat-pixel-art-colorful-260nw-2346901397.jpg"
                sx={{
                  height: 180,
                  objectFit: "cover",
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                }}
              /> */}
              <Chip
                label={priorityLabel}
                color="error"
                size="small"
                sx={{
                  borderTopLeftRadius: "4px",
                  position: "absolute",
                  top: -10,
                  left: -10,
                  fontWeight: 600,
                  boxShadow: "-2px 2px 2px 0px rgba(0,0,0,1)",
                }}
              />
            </Box>

            <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: "20px 0" }}>
              <Typography
                variant="body2"
                gutterBottom
                noWrap
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  fontWeight: 600,
                  fontSize: "20px",
                }}
              >
                {projectItem.name}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", gap: 1 }}>
                <Chip
                  sx={{
                    borderRadius: "5px",
                    border: "1px solid",
                    outline: "none",
                    "& .MuiChip-label": {
                      lineHeight: "16px",
                    },
                    "&.MuiChip-colorSuccess": {
                      backgroundColor: "#D9FBD0",
                      color: "#1B5E20",
                      borderColor: "#A5D6A7",
                    },
                    "&.MuiChip-colorError": {
                      backgroundColor: "#FFD6D6",
                      color: "#B71C1C",
                      borderColor: "#EF9A9A",
                    },
                    "&.MuiChip-colorWarning": {
                      backgroundColor: "#FFF4E5",
                      color: "#FF6F00",
                      borderColor: "#FFB74D",
                    },
                    "&.MuiChip-colorInfo": {
                      backgroundColor: "#E0F7FA",
                      color: "#006064",
                      borderColor: "#4DD0E1",
                    },
                  }}
                  size="small"
                  label={
                    projectItem.status === 1 ? "not started" : projectItem.status === 2 ? "in progress" : "completed"
                  }
                  color={projectItem.status === 1 ? "secondary" : projectItem.status === 2 ? "warning" : "success"}
                />
              </Box>
              {/* <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {projectItem.description}
              </Typography> */}
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", gap: 1 }}>
                <Typography
                  sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5, fontSize: "15px" }}
                  variant="caption"
                >
                  <Box>
                    <span className="flex-center gap-x-1 font-semibold">
                      <FaUser />
                      <span>Client: </span>
                    </span>
                  </Box>
                  <span>Gusteau’s Restaurant</span>
                </Typography>
                <Typography
                  sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5, fontSize: "15px" }}
                  variant="caption"
                >
                  <Box>
                    <span className="flex-center gap-x-1 font-semibold">
                      <FaMoneyCheck />
                      <span>Budget: </span>
                    </span>
                  </Box>
                  <span>10,500$</span>
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={projectItem.progress}
                  sx={{
                    width: "100%",
                    height: 6,
                    borderRadius: 3,
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 3,
                    },
                  }}
                />
                <Typography variant="caption">{projectItem.progress}%</Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", gap: 1 }}>
                <Typography variant="caption">
                  <span className="font-semibold">Started:</span>{" "}
                  {dayjs(projectItem.startDate).format("DD[th] MMMM[,] YYYY")}
                </Typography>
                <Typography variant="caption">
                  <span className="font-semibold">Deadline:</span>{" "}
                  {dayjs(projectItem.endDate).format("DD[th] MMMM[,] YYYY")}
                </Typography>
              </Box>
            </CardContent>

            <CardActions
              sx={{
                display: "flex",
                justifyContent: "space-between",
                px: 2,
                pb: 2,
              }}
            >
              <AvatarGroup
                max={4}
                sx={{
                  "& .MuiAvatar-root": {
                    width: 30,
                    height: 30,
                    borderColor: "background.paper",
                  },
                }}
              >
                {projectItem.teamMembers.map((i, index) => (
                  <Avatar key={index} src={`https://i.pravatar.cc/150?u=${i}`} alt={`Member ${i}`} />
                ))}
              </AvatarGroup>

              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <IconButton>
                  <FaTasks size={20} />
                </IconButton>
                <Typography sx={{ fontWeight: 600 }}>{projectItem.tasks.length}</Typography>
                <span>Task</span>
              </Box>
            </CardActions>
          </Card>
        </Grow>
      </Box>
    </Link>
  );
});

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
