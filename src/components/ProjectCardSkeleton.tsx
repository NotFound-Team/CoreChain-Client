"use client";

// -- MUI --
import { Box, Card, CardActions, CardContent, Skeleton, AvatarGroup, IconButton } from "@mui/material";
import Grow from "@mui/material/Grow";

// -- Icon
import { FaTasks } from "react-icons/fa";
import React from "react";

const ProjectCardSkeleton = React.memo(({ index }: { index: number }) => {
  return (
    <Box
      sx={{
        display: "block",
        textDecoration: "none",
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
          }}
        >
          {/* <Box position="relative">
            <Skeleton
              variant="rectangular"
              height={180}
              sx={{
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                width: "100%",
              }}
            />
            <Skeleton
              variant="rounded"
              width={60}
              height={24}
              sx={{
                position: "absolute",
                top: -10,
                left: -10,
                borderRadius: "4px",
              }}
            />
          </Box> */}

          <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: "20px 0" }}>
            {/* Skeleton cho tên Project */}
            <Skeleton variant="text" height={30} width="80%" />

            {/* Skeleton cho Chip trạng thái */}
            <Skeleton variant="rounded" width={70} height={24} />

            {/* Skeleton cho Client và Budget */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Skeleton variant="text" width="70%" height={20} />
              <Skeleton variant="text" width="50%" height={20} />
            </Box>

            {/* Skeleton cho Progress */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Skeleton variant="rounded" width="100%" height={6} sx={{ borderRadius: 3 }} />
              <Skeleton variant="text" width={20} height={20} />
            </Box>

            {/* Skeleton cho StartDate và Deadline */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Skeleton variant="text" width="60%" height={20} />
              <Skeleton variant="text" width="60%" height={20} />
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
            {/* Skeleton cho AvatarGroup */}
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
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} variant="circular" width={30} height={30} />
              ))}
            </AvatarGroup>

            {/* Skeleton cho Task Counter */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <IconButton disabled>
                <FaTasks size={20} />
              </IconButton>
              <Skeleton variant="text" width={20} height={20} />
              <Skeleton variant="text" width={30} height={20} />
            </Box>
          </CardActions>
        </Card>
      </Grow>
    </Box>
  );
});

ProjectCardSkeleton.displayName = "ProjectCardSkeleton";

export default ProjectCardSkeleton;
