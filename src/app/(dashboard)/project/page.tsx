"use client";

import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Avatar,
  AvatarGroup,
  Typography,
  Badge,
  IconButton,
  Chip,
  LinearProgress,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { MdAddBox, MdOutlineGridView } from "react-icons/md";
import { LuRows3 } from "react-icons/lu";
import Link from "next/link";
import { Grow } from "@mui/material";

const StatusBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 16,
    top: 16,
    padding: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    fontSize: theme.typography.caption.fontSize,
  },
}));

const ProjectCard = ({ id }: { id: string }) => (
  <Link href={`/project/${id}`} passHref legacyBehavior>
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
      <Grow in={true} timeout={500 + Number(id) * 100}>
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
              "& .project-image": {
              },
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
              label="High Priority"
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
            <Typography variant="h6" gutterBottom noWrap sx={{fontWeight: 600}}>
              Lizard Conservation Platform
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
              Comprehensive platform for monitoring and protecting lizard species 
              through AI-powered habitat analysis and community engagement.
            </Typography>
          </CardContent>

          <CardActions sx={{ 
            display: "flex",
            justifyContent: "space-between",
            px: 2,
            pb: 2,
          }}>
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
                <Avatar
                  key={i}
                  src={`/static/images/avatar/${i}.jpg`}
                  alt={`Member ${i}`}
                />
              ))}
            </AvatarGroup>
            
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LinearProgress
                variant="determinate"
                value={65}
                sx={{
                  width: 80,
                  height: 6,
                  borderRadius: 3,
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 3,
                  },
                }}
              />
              <Typography variant="caption">65%</Typography>
            </Box>
          </CardActions>
        </Card>
      </Grow>
    </Box>
  </Link>
);

export default function ProjectList() {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ 
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 4,
      }}>
        <Typography variant="h4" fontWeight={700}>
          Project Dashboard
        </Typography>
        
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            color="primary"
            sx={{
              bgcolor: "action.selected",
              borderRadius: 2,
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            <MdOutlineGridView size={20} />
          </IconButton>
          <IconButton
            color="primary"
            sx={{
              bgcolor: "action.selected",
              borderRadius: 2,
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            <LuRows3 size={20} />
          </IconButton>
          <Button
            variant="contained"
            startIcon={<MdAddBox />}
            sx={{ borderRadius: 2, px: 3 }}
          >
            New Project
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
          },
          gap: 3,
        }}
      >
        {[1, 2, 3, 4, 5].map((item) => (
          <ProjectCard key={item} id={item.toString()} />
        ))}
      </Box>
    </Box>
  );
}