// -- MUI --
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Grow from "@mui/material/Grow";
import CardActions from "@mui/material/CardActions";

// -- Next --
import Link from "next/link";
// -- Types
import { TProject } from "@/types/project";

export enum Priority {
  Low = 1,
  Medium = 2,
  High = 3,
}

const ProjectCard = ({ projectItem, index }: { projectItem: TProject; index: number }) => {
  const priorityLabel = Priority[projectItem.priority];
  return (
    <Link href={`/project/${projectItem._id}`} passHref legacyBehavior>
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
              height: 380,
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
              <CardMedia
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
              />
              <Chip
                label={priorityLabel}
                color="error"
                size="small"
                sx={{
                  position: "absolute",
                  top: 12,
                  left: 12,
                  fontWeight: 600,
                }}
              />
            </Box>

            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom noWrap sx={{ fontWeight: 600 }}>
                {projectItem.name}
              </Typography>
              <Typography
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
              </Typography>
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
                    width: 32,
                    height: 32,
                    borderColor: "background.paper",
                  },
                }}
              >
                {[1, 2, 3, 4, 5].map((i) => (
                  <Avatar key={i} src={`/static/images/avatar/${i}.jpg`} alt={`Member ${i}`} />
                ))}
              </AvatarGroup>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={projectItem.progress}
                  sx={{
                    width: 80,
                    height: 6,
                    borderRadius: 3,
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 3,
                    },
                  }}
                />
                <Typography variant="caption">{projectItem.progress}%</Typography>
              </Box>
            </CardActions>
          </Card>
        </Grow>
      </Box>
    </Link>
  );
};

export default ProjectCard;
