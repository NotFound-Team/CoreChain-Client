"use client";

import { useState, useEffect } from "react";
import { Box, Grid, Card, Typography, Stack, LinearProgress, Button, Avatar } from "@mui/material";
import {
  MdTrendingUp,
  MdAccountBalanceWallet,
  MdFiberManualRecord,
  MdWork,
  MdAssignmentInd,
  MdTask,
} from "react-icons/md";
import { getEmployeesTurnoverReport, getWorkingHoursReport, getKpiReport } from "@/services/report.service";
import { getUserList } from "@/services/user.service";
import { getProjectList } from "@/services/project.service";
import { getTaskList } from "@/services/task.service";
import CustomDataGrid from "@/components/custom-data-grid/CustomDataGrid";
import dayjs from "dayjs";

const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
  <Card
    sx={{
      p: 3,
      height: "100%",
      borderRadius: 3,
      bgcolor: "background.paper",
      border: "1px solid",
      borderColor: "divider",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      backgroundImage: "none",
    }}
  >
    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
      <Typography
        variant="caption"
        color="text.secondary"
        fontWeight={700}
        sx={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
      >
        {title}
      </Typography>
      <Box sx={{ color: color }}>
        <Icon size={20} />
      </Box>
    </Stack>
    <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: "-0.02em", color: "text.primary" }}>
      {value}
    </Typography>
    {trend && (
      <Stack direction="row" alignItems="center" spacing={0.5} mt={1}>
        <Typography
          variant="caption"
          sx={{ color: trend.startsWith("+") ? "success.main" : "error.main", fontWeight: 700 }}
        >
          {trend}
        </Typography>
        <Typography variant="caption" color="grey.600">
          vs last period
        </Typography>
      </Stack>
    )}
  </Card>
);

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>({
    turnover: null,
    hours: [],
    kpi: [],
    users: { meta: { total: 0 }, result: [] },
    projects: { meta: { total: 0 }, result: [] },
    tasks: { meta: { total: 0 }, result: [] },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [turnoverRes, hoursRes, kpiRes, userRes, projectRes, taskRes] = await Promise.all([
          getEmployeesTurnoverReport(),
          getWorkingHoursReport(),
          getKpiReport(),
          getUserList({ current: 1, pageSize: 1 }),
          getProjectList({ current: 1, pageSize: 5 }),
          getTaskList({ current: 1, pageSize: 1 }),
        ]);
        setData({
          turnover: turnoverRes.data,
          hours: hoursRes.data,
          kpi: kpiRes.data,
          users: userRes.data,
          projects: projectRes.data,
          tasks: taskRes.data,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ p: 4, minHeight: "100vh", color: "text.primary" }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-end" mb={6}>
        <Box>
          <Typography variant="h3" fontWeight={800} sx={{ letterSpacing: "-0.03em", mb: 1, color: "text.primary" }}>
            Observability
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Real-time personnel performance and turnover metrics.
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            sx={{ color: "text.primary", borderColor: "divider", textTransform: "none", borderRadius: 2 }}
          >
            Production
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "primary.main",
              color: "#fff",
              "&:hover": { bgcolor: "primary.dark" },
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            Download Report
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={2} mb={6}>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Total Users"
            value={data.users?.meta?.total || 0}
            icon={MdAssignmentInd}
            color="#0070f3"
            trend="+5"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Total Projects"
            value={data.projects?.meta?.total || 0}
            icon={MdWork}
            color="#f81ce5"
            trend="+2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard
            title="Total Tasks"
            value={data.tasks?.meta?.total || 0}
            icon={MdTask}
            color="#7928ca"
            trend="+12"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard title="KPI Average" value="88.4%" icon={MdTrendingUp} color="#000" trend="+4.2%" />
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <StatCard title="Payroll Est." value="$42.5k" icon={MdAccountBalanceWallet} color="#50e3c2" trend="+1.2k" />
        </Grid>
      </Grid>

      <Grid container spacing={2} mb={6}>
        <Grid item xs={12}>
          <Card
            sx={{
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              p: 4,
              borderRadius: 3,
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <Typography variant="h6" fontWeight={700} mb={4} color="text.primary">
              Recent Projects
            </Typography>
            <Box sx={{ height: 350, width: "100%" }}>
              <CustomDataGrid
                rows={data.projects?.result || []}
                getRowId={(row) => row._id}
                columns={[
                  { field: "name", headerName: "Project Name", flex: 1, minWidth: 200 },
                  { field: "description", headerName: "Description", flex: 1.5, minWidth: 300 },
                  {
                    field: "createdAt",
                    headerName: "Created At",
                    width: 200,
                    valueFormatter: (params) => dayjs(params).format("DD/MM/YYYY HH:mm"),
                  },
                ]}
                pageSizeOptions={[5]}
                initialState={{
                  pagination: { paginationModel: { pageSize: 5 } },
                }}
                disableRowSelectionOnClick
              />
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              p: 4,
              borderRadius: 3,
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={700}
              mb={4}
              sx={{ display: "flex", alignItems: "center", gap: 1, color: "text.primary" }}
            >
              <MdFiberManualRecord size={12} color="#0070f3" /> Departmental Productivity
            </Typography>
            <Stack spacing={4}>
              {data.hours.map((dept: any, i: number) => (
                <Box key={i}>
                  <Stack direction="row" justifyContent="space-between" mb={1.5}>
                    <Typography variant="body2" fontWeight={600} color="text.primary">
                      {dept.department}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {dept.employees.reduce((acc: any, curr: any) => acc + (curr.workingHours || 0), 0)}h total
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={75}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: "grey.100",
                      "& .MuiLinearProgress-bar": { bgcolor: "primary.main", borderRadius: 3 },
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              p: 4,
              borderRadius: 3,
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <Typography variant="h6" fontWeight={700} mb={4} color="text.primary">
              Recent New Hires
            </Typography>
            <Stack spacing={3}>
              {data.turnover?.newEmployees.slice(0, 4).map((emp: any, i: number) => (
                <Stack key={i} direction="row" spacing={2} alignItems="center">
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: "grey.50",
                      border: "1px solid",
                      borderColor: "divider",
                      color: "text.primary",
                      fontWeight: 600,
                    }}
                  >
                    {emp.name[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" fontWeight={600} color="text.primary">
                      {emp.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {emp.position.title}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
