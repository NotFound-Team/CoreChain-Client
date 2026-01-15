"use client"

import { UserResponse } from "@/types/user";
import { Card, CardContent, Chip, Typography, Avatar, Grid, Paper, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import {
  FaIdCard,
  FaBuilding,
  FaUserTag,
  FaClock,
  FaKey,
  FaHistory,
  FaExternalLinkAlt,
  FaComments,
} from "react-icons/fa";
import { IconType } from "react-icons/lib";
import ButtonBack from "./ButtonBack";

export default function UserDetails({ user }: { user: UserResponse }) {
  // const [loading, setLoading] = useState(false);


  //  const fetchUserPrivate = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetchApi(`${CONFIG_API.USER.PRIVATE}/${user?._id}`);
  //     if (response.statusCode === 200) {
  //       console.log("Private user data:", response.data);
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     console.error(error);
  //   }
  // };


  const InfoRow = ({
    icon: Icon,
    label,
    value,
    isCode = false,
  }: {
    icon: IconType;
    label: string;
    value: string | number;
    isCode?: boolean;
  }) => (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 text-slate-500">
        <Icon className="w-3.5 h-3.5" />
        <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <Typography
        variant="body1"
        className={`text-slate-800 font-medium ${isCode ? "font-mono text-sm break-all bg-slate-100 p-1 rounded" : ""}`}
      >
        {value || "N/A"}
      </Typography>
    </div>
  );

  // useEffect(() => {
  //   fetchUserPrivate();
  // }, [])

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-[#f8fafc]">
      <div className="mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <ButtonBack />
          <div className="text-right">
            <Typography variant="caption" className="text-slate-400 block uppercase font-bold">
              Admin View
            </Typography>
            <Typography variant="h6" className="text-slate-800 leading-none">
              User Profile
            </Typography>
          </div>
        </div>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={4}>
            <div className="space-y-6">
              <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl overflow-hidden">
                <div className="h-28 bg-gradient-to-br from-indigo-600 to-violet-700" />
                <CardContent className="relative pt-0 flex flex-col items-center">
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      mt: -6,
                      border: "6px solid white",
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                      bgcolor: "indigo.500",
                      fontSize: "2.5rem",
                    }}
                  >
                    {user?.name?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography variant="h5" className="mt-4 font-bold text-slate-900">
                    {user?.name}
                  </Typography>
                  <Typography variant="body2" className="text-slate-500 mb-4">
                    {user?.email}
                  </Typography>

                  <div className="flex flex-wrap justify-center gap-2 mb-2">
                    <Chip
                      label={user.role?.name || "No Role"}
                      size="small"
                      className="bg-indigo-50 text-indigo-700 font-bold"
                    />
                    <Chip
                      label={user.employeeId}
                      size="small"
                      variant="outlined"
                      className="border-slate-200 text-slate-600 font-mono"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-6">
                <Typography
                  variant="subtitle2"
                  className="text-slate-400 uppercase font-bold mb-4 flex items-center gap-2"
                >
                  <FaClock /> Performance Metrics
                </Typography>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
                    <Typography className="text-amber-600 text-xs font-bold uppercase">Days Off</Typography>
                    <Typography variant="h4" className="text-amber-700 font-black">
                      {user.dayOff ?? 0}
                    </Typography>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                    <Typography className="text-emerald-600 text-xs font-bold uppercase">Working Hrs</Typography>
                    <Typography variant="h4" className="text-emerald-700 font-black">
                      {user.workingHours ?? 0}
                    </Typography>
                  </div>
                </div>
              </Card>
            </div>
          </Grid>

          <Grid item xs={12} lg={8}>
            <div className="space-y-6">
              <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-8">
                <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-4">
                  <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                    <FaBuilding />
                  </div>
                  <Typography variant="h6" className="font-bold text-slate-800">
                    Organizational Details
                  </Typography>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InfoRow icon={FaBuilding} label="Department" value={user.department?.name || "Unassigned"} />
                  <InfoRow icon={FaUserTag} label="Position" value={user.position?.title || "Unassigned"} />
                  <InfoRow icon={FaIdCard} label="Employee ID" value={user.employeeId} />
                  <InfoRow
                    icon={FaHistory}
                    label="Last Updated"
                    value={user.updatedAt ? dayjs(user.updatedAt).format("DD-MM-YYYY") : "N/A"}
                  />
                </div>
              </Card>

              {/* Permissions & Blockchain Card */}
              <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-8">
                <div className="flex items-center gap-2 mb-6 border-b border-slate-50 pb-4">
                  <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                    <FaKey />
                  </div>
                  <Typography variant="h6" className="font-bold text-slate-800">
                    Access & Security
                  </Typography>
                </div>

                <div className="space-y-6">
                  <div>
                    <Typography variant="caption" className="text-slate-400 font-bold uppercase block mb-3">
                      System Permissions
                    </Typography>
                    <div className="flex flex-wrap gap-2">
                      {user?.permissions?.length > 0 ? (
                        user.permissions.map((p, i) => (
                          <Chip key={i} label={p} size="small" className="bg-slate-100 text-slate-600 font-medium" />
                        ))
                      ) : (
                        <span className="text-sm text-slate-400 italic">No special permissions</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <Typography variant="caption" className="text-slate-400 font-bold uppercase block mb-2">
                      Blockchain Transaction Hash
                    </Typography>
                    <Paper
                      elevation={0}
                      className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center justify-between"
                    >
                      <Typography variant="body2" className="font-mono text-slate-500 truncate mr-4">
                        {user.txHash || "0x0000000000000000000000000000000000000000"}
                      </Typography>
                      <Tooltip title="View on Explorer">
                        <button className="text-indigo-600 hover:text-indigo-800">
                          <FaExternalLinkAlt size={14} />
                        </button>
                      </Tooltip>
                    </Paper>
                  </div>
                </div>
              </Card>

              {/* Feedback Section */}
              <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                    <FaComments />
                  </div>
                  <Typography variant="h6" className="font-bold text-slate-800">
                    Admin Feedback
                  </Typography>
                </div>

                {user.feedback && user.feedback.length > 0 ? (
                  <div className="space-y-3">
                    {/* Map qua feedback nếu là array */}
                    {user.feedback.map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-slate-700 italic"
                      >
                        &quot;{item}&quot;
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 border-2 border-dashed border-slate-100 rounded-2xl text-slate-400">
                    No feedback records found.
                  </div>
                )}
              </Card>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
