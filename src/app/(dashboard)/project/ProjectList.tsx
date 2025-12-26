import { memo } from "react";
import ProjectCard from "./ProjectCard";
import { Box } from "@mui/material";
import { TProject } from "@/types/project";

const ProjectList = memo(({ projectList }: { projectList: TProject[] }) => {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 3 }}>
      {projectList.map((project, index) => (
        <ProjectCard key={`${project._id}+${index}`} projectItem={project as TProject} index={index} />
      ))}
    </Box>
  );
});

ProjectList.displayName = "ProjectList";
export default ProjectList;