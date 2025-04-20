"use client";

// -- Config --
import { CONFIG_API } from "@/configs/api";

// -- Utils --
import fetchApi from "@/utils/fetchApi";

// -- MUI -- 
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { useTheme } from "@mui/material/styles";

// -- dayjs --
import dayjs from "dayjs";

// -- React --
import { useEffect, useState } from "react";

// -- React-icon --
import { FaInfoCircle, FaListAlt, FaHistory } from "react-icons/fa";
import { IconType } from "react-icons/lib";

export default function RoleIdPage({ params }: { params: { roleId: string } }) {
  const [roleInfo, setRoleInfo] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchRoleInfo = async () => {
      try {
        const response = await fetchApi(`${CONFIG_API.ROLE}/${params.roleId}`);
        if (response && response.statusCode === 200) {
          setRoleInfo(response.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoleInfo();
  }, [params.roleId]);

  const SectionHeader = ({ icon: Icon, title }: { icon: IconType; title: string }) => (
    <div className="flex items-center gap-3 mb-4">
      <Icon className="w-6 h-6 text-primary-500 dark:text-primary-400" />
      <Typography variant="h6" component="h3" className="font-semibold text-gray-800 dark:text-gray-100">
        {title}
      </Typography>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-4">
          <Skeleton variant="rectangular" width={200} height={40} className="mx-auto" />
          <Skeleton variant="rounded" height={400} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Typography
          variant="h4"
          className="text-center font-bold text-gray-800 dark:text-gray-100 mb-6"
          sx={{
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.05rem",
          }}
        >
          Role Details
        </Typography>

        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-900/50">
          <CardContent className="space-y-8 py-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="space-y-1">
                <Typography variant="h3" className="font-bold text-gray-900 dark:text-white text-2xl">
                  {roleInfo?.name || "Unknown Role"}
                </Typography>
                <Typography variant="body2" className="text-gray-500 dark:text-gray-400">
                  Role ID: {params.roleId}
                </Typography>
              </div>
              <Chip
                label={roleInfo?.isActive ? "Active" : "Inactive"}
                color={roleInfo?.isActive ? "success" : "error"}
                variant="filled"
                sx={{
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  px: 2,
                  py: 1,
                }}
              />
            </div>

            {/* Description Section */}
            <Box>
              <SectionHeader icon={FaInfoCircle} title="Description" />
              <div className="bg-gray-100/50 dark:bg-gray-700/30 p-4 rounded-lg">
                <Typography variant="body1" className="text-gray-700 dark:text-gray-300 italic">
                  {roleInfo?.description || "No description available for this role."}
                </Typography>
              </div>
            </Box>

            <Divider className="dark:border-gray-700" />

            {/* Permissions Section */}
            <Box>
              <SectionHeader icon={FaListAlt} title="Permissions" />
              {roleInfo && roleInfo.permissions && roleInfo.permissions.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {roleInfo?.permissions.map((item) => (
                    <Chip
                      key={item._id}
                      label={item.name}
                      color="primary"
                      variant="outlined"
                      className="border-dashed hover:border-solid transition-all"
                      sx={{
                        "&:hover": {
                          color: "white",
                          bgcolor: "primary.light",
                          borderColor: "primary.main",
                        },
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <Typography variant="body2" className="text-gray-500 dark:text-gray-400">
                    No permissions assigned to this role
                  </Typography>
                </div>
              )}
            </Box>

            <Divider className="dark:border-gray-700" />

            {/* Metadata Section */}
            <Box>
              <SectionHeader icon={FaHistory} title="Last Updated" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
                    <strong>Update Date:</strong>{" "}
                    {roleInfo?.updatedAt ? dayjs(roleInfo.updatedAt).format("DD MMM YYYY, HH:mm") : "N/A"}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
                    <strong>Updated By:</strong> {roleInfo?.updatedBy?.email || "Unknown"}
                  </Typography>
                </div>
                <div className="space-y-1">
                  <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
                    <strong>Created Date:</strong>{" "}
                    {roleInfo?.createdAt ? dayjs(roleInfo.createdAt).format("DD MMM YYYY, HH:mm") : "N/A"}
                  </Typography>
                  {/* <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
                    <strong>Created By:</strong> {roleInfo?.createdBy?.email || "Unknown"}
                  </Typography> */}
                </div>
              </div>
            </Box>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
