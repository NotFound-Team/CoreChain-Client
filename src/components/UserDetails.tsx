import { UserResponse } from "@/types/user";
import { Box, Card, CardContent, Chip, Divider, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FaHistory, FaInfoCircle, FaListAlt } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { FaUserCog } from "react-icons/fa";
import ButtonBack from "./ButtonBack";

export default function UserDetails({ user }: { user: UserResponse }) {
  const SectionHeader = ({ icon: Icon, title }: { icon: IconType; title: string }) => (
    <div className="flex items-center gap-3 mb-4">
      <Icon className="w-6 h-6 text-primary-500 dark:text-primary-400" />
      <Typography variant="h6" component="h3" className="font-semibold text-gray-800 dark:text-gray-100">
        {title}
      </Typography>
    </div>
  );
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Typography
          variant="h4"
          className="text-center font-bold text-gray-800 dark:text-gray-100 mb-6"
          sx={{
            // background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            bgcolor: "red",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.05rem",
          }}
        >
          User Details
        </Typography>

        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-900/50">
          <ButtonBack />
          <CardContent className="space-y-8 py-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="space-y-1">
                <Typography variant="h3" className="font-bold text-gray-900 dark:text-white text-2xl">
                  {user?.name}
                </Typography>
                <Typography variant="body2" component="div" className="text-2xl text-gray-500 dark:text-gray-400">
                  <SectionHeader icon={FaUserCog} title={`Role: ${user.role?.name || "No role"}`} />
                  <div></div>
                </Typography>
              </div>
              {/* <Chip
                label={roleInfo?.isActive ? "Active" : "Inactive"}
                color={roleInfo?.isActive ? "success" : "error"}
                variant="filled"
                sx={{
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  px: 2,
                  py: 1,
                }}
              /> */}
            </div>

            {/* Description Section */}
            <Box>
              <SectionHeader icon={FaInfoCircle} title="Feedback" />
              <div className="bg-gray-100/50 dark:bg-gray-700/30 p-4 rounded-lg">
                <Typography variant="body1" className="text-gray-700 dark:text-gray-300 italic">
                  {user?.feedback || "No feedback available for this user."}
                </Typography>
              </div>
            </Box>

            <Divider className="dark:border-gray-700" />

            {/* Permissions Section */}
            <Box>
              <SectionHeader icon={FaListAlt} title="Permissions" />
              {user && user.permissions && user.permissions.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {user?.permissions.map((item, index) => (
                    <Chip
                      key={`${item}-${index}`}
                      label={item}
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
                    <strong>Create Date:</strong>{" "}
                    {user?.updatedAt ? dayjs(user.updatedAt).format("DD MMM YYYY, HH:mm") : "N/A"}
                  </Typography>
                  {/* <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
                    <strong>Updated By:</strong> {roleInfo?.updatedBy?.email || "Unknown"}
                  </Typography> */}
                </div>
                <div className="space-y-1">
                  <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
                    <strong>Created Date:</strong>{" "}
                    {user?.createdAt ? dayjs(user.createdAt).format("DD MMM YYYY, HH:mm") : "N/A"}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600 dark:text-gray-400">
                    {/* <strong>Created At:</strong> {user?.createdBy?.email || "Unknown"} */}
                  </Typography>
                </div>
              </div>
            </Box>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
