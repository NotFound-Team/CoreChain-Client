"use client";

// -- React --
import * as React from "react";

// -- MUI
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// -- React-icon --
import { MdAddBox, MdOutlineGridView } from "react-icons/md";
import { LuRows3 } from "react-icons/lu";

// -- Components
import ProjectCard from "./ProjectCard";

// -- utils --
import fetchApi from "@/utils/fetchApi";

// -- Configs --
import { CONFIG_API } from "@/configs/api";

// -- Types --
import { TProject } from "@/types/project";

// const StatusBadge = styled(Badge)(({ theme }) => ({
//   "& .MuiBadge-badge": {
//     right: 16,
//     top: 16,
//     padding: theme.spacing(0.5),
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: theme.palette.success.main,
//     color: theme.palette.common.white,
//     fontSize: theme.typography.caption.fontSize,
//   },
// }));

export default function ProjectList() {
  const [projectList, setProjectList] = React.useState<TProject[]>([]);
  React.useEffect(() => {
    const data = async () => {
      const response = await fetchApi(`${CONFIG_API.PROJECT}`, "GET");
      if (response && response.statusCode === 200) {
        setProjectList(response.data.projects);
      }
    };
    data();
  }, []);

  console.log(projectList);

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
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
          <Button variant="contained" startIcon={<MdAddBox />} sx={{ borderRadius: 2, px: 3 }}>
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
        {projectList.map((project, index) => (
          <ProjectCard key={project._id} projectItem={project} index={index} />
        ))}
      </Box>
    </Box>
  );
}
