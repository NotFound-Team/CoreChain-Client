"use client";

import * as React from "react";
import { Box, IconButton, Typography, Button, SelectChangeEvent } from "@mui/material";
import { MdAddBox, MdOutlineGridView } from "react-icons/md";
import { LuRows3 } from "react-icons/lu";
import { TCreateProject, TProject, Employee } from "@/types/project";
import { CONFIG_API } from "@/configs/api";
import fetchApi from "@/utils/fetchApi";
import { useSnackbar } from "@/hooks/useSnackbar";
import Loading from "@/components/Loading";
import ProjectCardSkeleton from "@/components/ProjectCardSkeleton";
import { Can } from "@/context/casl/AbilityContext";
import ProjectList from "./ProjectList";
import { FormCreate } from "./FormCreate";

export default function ProjectPage() {
  const { Toast, showToast } = useSnackbar();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [projectList, setProjectList] = React.useState<(TProject | TCreateProject)[]>([]);
  const [open, setOpen] = React.useState(false);
  const [, setEmployees] = React.useState<Employee[]>([]);
  const [department, setDepartment] = React.useState([]);
  const [upFiles, setUpFiles] = React.useState<File[]>([]);
  const [formData, setFormData] = React.useState<TCreateProject>({
    name: "",
    description: "",
    teamMembers: [],
    manager: "",
    department: "",
    priority: 1,
    attachments: [],
    status: 1,
    tasks: [],
    revenue: 0,
    startDate: null,
    endDate: null,
  });

  const handleClickOpen = React.useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent<number>, field: string) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const handleDateChange = (date: Date | null, field: string) => {
    setFormData({
      ...formData,
      [field]: date,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setUpFiles(filesArray);
    }
  };

  // Send submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log("formData 1", formData);
    if (upFiles && upFiles.length > 0) {
      for (const file of upFiles) {
        const data = new FormData();
        data.append("fileUpload", file);

        // Kiểm tra nội dung FormData
        // for (const [key, value] of data.entries()) {
        //   console.log("KEY:", key, "VALUE:", value);
        // }

        try {
          const response = await fetchApi(`${CONFIG_API.FILE}`, "POST", data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          formData.attachments.push(response.data.url);
        } catch (error) {
          console.error("Upload faild!", error);
        }
      }
    }

    try {
      setLoading(true);
      // console.log("formData 2", formData);
      const response = await fetchApi(`${CONFIG_API.PROJECT}`, "POST", formData);
      if (response && response.statusCode === 201) {
        // console.log("NEW PROJECT", response);
        const newProject = {
          ...formData,
          _id: response.data,
        };
        setProjectList((prev) => [...prev, newProject]);
        fetchProjects();
        showToast("Create project success!", "success");
      }
    } catch (error) {
      showToast("Error message!", "error");
      console.error("error", error);
    } finally {
      setLoading(false);
    }

    handleClose();
  };

  // ** Fetch api
  const fetchProjects = async () => {
    const response = await fetchApi(`${CONFIG_API.PROJECT}`, "GET");
    // console.log(response);
    if (response && response.statusCode === 200) {
      setProjectList(response.data.projects);
    }
  };
  const fetchData = async () => {
    try {
      // Gọi song song 2 API
      const [deptRes, empRes] = await Promise.all([
        fetchApi(`${CONFIG_API.DEPARTMENT}`, "GET"),
        fetchApi(`${CONFIG_API.USER.INDEX}`, "GET"),
      ]);

      // Xử lý department
      if (deptRes && deptRes.statusCode === 200) {
        setDepartment(
          deptRes.data.result.map((item: any) => ({
            name: item.name,
            _id: item._id,
            manager: item.manager,
            employees: item.employees,
            budget: item.budget,
          }))
        );
      }

      // Xử lý employees
      if (empRes && empRes.statusCode === 200) {
        setEmployees(
          empRes.data.result.map((item: any) => ({
            name: item.name,
            _id: item._id,
          }))
        );
      }
    } catch (error) {
      console.error("Fetch department hoặc employees thất bại:", error);
      // Bạn có thể showToast báo lỗi ở đây nếu muốn
    }
  };

  React.useEffect(() => {
    fetchProjects();

    fetchData();

    return () => {
      setProjectList([]);
    };
  }, []);

  // React.useEffect(() => {
  //   if (projectList.length > 0 && employees.length > 0) {
  //     setProjectList((prev) =>
  //       prev.map((proj: any) => {
  //         const mgr = employees.find((e: Employee) => e.id === proj.manager);
  //         return {
  //           ...proj,
  //           managerName: mgr ? mgr.name : "Unknown Manager",
  //         };
  //       })
  //     );
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [employees]);

  // console.log("up file", upFiles);

  // console.log(projectList);

  return (
    <>
      <Toast />
      <Loading open={loading} message="Creating project..." />
      {loading || projectList.length === 0 ? (
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 3 }}>
          {Array.from({ length: 5 }).map((_, index) => (
            <ProjectCardSkeleton key={index} index={index} />
          ))}
        </Box>
      ) : (
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
            <Typography variant="h4" sx={{ fontSize: { xs: "20px", sm: "28px", md: "32px" } }} fontWeight={700}>
              Projects
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                color="primary"
                sx={{ bgcolor: "action.selected", borderRadius: 2, "&:hover": { bgcolor: "action.hover" } }}
              >
                <MdOutlineGridView size={20} />
              </IconButton>
              <IconButton
                color="primary"
                sx={{ bgcolor: "action.selected", borderRadius: 2, "&:hover": { bgcolor: "action.hover" } }}
              >
                <LuRows3 size={20} />
              </IconButton>
              <Can I="post" a="projects">
                <Button
                  variant="contained"
                  startIcon={<MdAddBox size={20} />}
                  sx={{
                    borderRadius: 2,
                    px: { xs: 2, sm: 3, md: 4 }, // padding-x responsive theo breakpoint
                    fontSize: { xs: "10px", sm: "14px", md: "16px" }, // font size responsive
                    height: { xs: 30, sm: 36, md: 42 }, // thêm luôn height nếu muốn đồng bộ
                    gap: { xs: 0.5, sm: 1 },
                  }}
                  onClick={handleClickOpen}
                >
                  New Project
                </Button>
              </Can>
            </Box>
          </Box>

          {/* Form popup */}
          <React.Suspense fallback={<div>Loading...</div>}>
            <FormCreate
              open={open}
              handleClose={handleClose}
              handleSubmit={handleSubmit}
              formData={formData}
              handleFormChange={handleFormChange}
              setFormData={setFormData}
              handleFileChange={handleFileChange}
              handleSelectChange={handleSelectChange}
              handleDateChange={handleDateChange}
              department={department}
            />
          </React.Suspense>
          {/* Form popup */}

          <ProjectList projectList={projectList as TProject[]} />
        </Box>
      )}
    </>
  );
}
