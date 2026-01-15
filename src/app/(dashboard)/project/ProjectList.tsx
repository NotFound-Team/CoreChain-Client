import { memo, useMemo } from "react";
import ProjectCard from "./ProjectCard";
import { Box, Typography, Chip, LinearProgress, AvatarGroup, Avatar, IconButton } from "@mui/material";
import { TProject } from "@/types/project";
import CustomDataGrid from "@/components/custom-data-grid/CustomDataGrid";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { FaTasks, FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useAbility } from "@/hooks/useAbility";
import Link from "next/link";
import { Can } from "@/context/casl/AbilityContext";

const ProjectList = memo(({ projectList, viewMode }: { projectList: TProject[]; viewMode?: "grid" | "list" }) => {
  const { can } = useAbility();

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        minWidth: 200,
        renderCell: (params: GridRenderCellParams) => (
          <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
            <Link href={can("get", "projects/:id") ? `/project/${params.row._id}` : "#"} passHref legacyBehavior>
              <Typography
                component="a"
                variant="body2"
                sx={{ fontWeight: 600, color: "text.primary", textDecoration: "none", "&:hover": { color: "primary.main" } }}
              >
                {params.row.name}
              </Typography>
            </Link>
          </Box>
        ),
      },
      {
        field: "manager",
        headerName: "Leader",
        flex: 1,
        minWidth: 150,
        valueGetter: (params: any) => params?.name || "Unknown",
        renderCell: (params: GridRenderCellParams) => (
            <Typography variant="body2">{params.row.manager?.name || "N/A"}</Typography>
        ),
      },
      {
        field: "department",
        headerName: "Department",
        flex: 1,
        minWidth: 150,
        valueGetter: (params: any) => params?.name || "Unknown",
        renderCell: (params: GridRenderCellParams) => (
            <Typography variant="body2">{params.row.departmentName || "N/A"}</Typography>
        ),
      },
      {
        field: "priority",
        headerName: "Priority",
        width: 120,
        renderCell: (params: GridRenderCellParams) => {
          const priority = params.value;
          let label = "Low";
          let color: "default" | "primary" | "error" = "default";
          if (priority === 2) {
            label = "Medium";
            color = "primary";
          } else if (priority === 3) {
            label = "High";
            color = "error";
          }
          return <Chip label={label} color={color} size="small" variant="outlined" />;
        },
      },
      {
        field: "status",
        headerName: "Status",
        width: 130,
        renderCell: (params: GridRenderCellParams) => {
          const status = params.value;
          let label = "Not Started";
          let color: "default" | "primary" | "success" | "warning" = "default";
          if (status === 2) {
            label = "In Progress";
            color = "warning";
          } else if (status === 3) {
            label = "Completed";
            color = "success";
          }
          return (
             <Chip
                label={label}
                color={color === "default" ? "default" : color} // fix type mismatch if needed
                size="small"
                sx={{
                    bgcolor: status === 1 ? "#F3F3F4" : status === 2 ? "#FFF4E5" : "#D9FBD0",
                    color: status === 1 ? "text.secondary" : status === 2 ? "#FF6F00" : "#1B5E20",
                    borderColor: status === 1 ? "transparent" : status === 2 ? "#FFB74D" : "#A5D6A7",
                    border: "1px solid"
                }}
             />
          );
        },
      },
      {
        field: "teamMembers",
        headerName: "Team",
        width: 150,
        renderCell: (params: GridRenderCellParams) => (
          <AvatarGroup max={3} sx={{ justifyContent: "flex-end" }}>
            {params.row.teamMembers?.map((memberId: string, idx: number) => (
              <Avatar key={idx} src={`https://i.pravatar.cc/150?u=${memberId}`} sx={{ width: 24, height: 24 }} />
            ))}
          </AvatarGroup>
        ),
      },
      {
        field: "progress",
        headerName: "Progress",
        flex: 1,
        minWidth: 150,
        renderCell: (params: GridRenderCellParams) => (
          <Box sx={{ width: "100%", display: "flex", alignItems: "center", gap: 1 }}>
            <LinearProgress variant="determinate" value={params.value} sx={{ flexGrow: 1, borderRadius: 5, height: 6 }} />
            <Typography variant="caption">{params.value}%</Typography>
          </Box>
        ),
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        width: 100,
        getActions: (params: any) => [
          // eslint-disable-next-line react/jsx-key
          <Can I="patch" a="projects/:id">
             <Link href={`/project/${params.id}`} passHref>
                <IconButton size="small">
                    <FaRegEdit />
                </IconButton>
             </Link>
          </Can>,
        ],
      },
    ],
    [can]
  );

  if (viewMode === "list") {
      return (
          <Box sx={{ height: 600, width: '100%' }}>
              <CustomDataGrid
                  rows={projectList}
                  columns={columns}
                  getRowId={(row) => row._id}
                  disableRowSelectionOnClick
              />
          </Box>
      )
  }

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