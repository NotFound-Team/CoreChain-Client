"use client";

import { useState, useEffect, useRef } from "react";
import { FiMessageSquare, FiUser, FiFlag, FiMapPin, FiGlobe, FiPhone, FiMail } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { IoStar } from "react-icons/io5";
import { gsap } from "gsap";
import { Card, CardContent, Button, Typography, Tab, Tabs, Box, Avatar, Chip, IconButton } from "@mui/material";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("about");
  const profileRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Initial animations
    // gsap.from(profileRef.current, {
    //   y: -50,
    //   opacity: 0,
    //   duration: 1,
    //   ease: "power3.out"
    // });
    // gsap.from(contentRef.current, {
    //   y: 50,
    //   opacity: 0,
    //   duration: 1,
    //   delay: 0.3,
    //   ease: "power3.out"
    // });
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
    // Animate content change
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      onComplete: () => {
        setActiveTab(newValue);
        gsap.to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.3,
        });
      },
    });
  };

  return (
    <div className="max-w-8xl mx-auto p-6 min-h-screen">
      {/* Profile Header */}
      <Card sx={{ borderRadius: 4 }} ref={profileRef} elevation={2} className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <Avatar
                sx={{
                  width: 96,
                  height: 96,
                  background: "linear-gradient(to right, #60A5FA, #A78BFA)",
                  fontSize: "2rem",
                }}
              >
                JR
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-1">
                <IoStar className="text-white text-sm" />
              </div>
            </div>

            <div className="flex-1">
              <Typography variant="h4" className="font-bold text-gray-900">
                Jeremy Rose
              </Typography>
              <Typography variant="subtitle1" className="text-gray-600 mb-3">
                Producer Designer
              </Typography>

              {/* Rating */}
              <Box className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <IoStar key={i} className={`text-lg ${i < 4 ? "text-yellow-400" : "text-gray-300"}`} />
                ))}
                <Typography variant="body1" className="ml-2 font-medium">
                  8.6
                </Typography>
              </Box>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button variant="contained" startIcon={<FiMessageSquare />} color="primary" size="small">
                  Send message
                </Button>
                <Button variant="outlined" startIcon={<FiUser />} size="small">
                  Contacts
                </Button>
                <Button variant="outlined" startIcon={<FiFlag />} color="error" size="small">
                  Report user
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card sx={{ borderRadius: 4 }} elevation={2}>
            <CardContent>
              <Typography variant="h6" className="mb-4">
                Work Places
              </Typography>

              <div className="space-y-4">
                {/* Spotify */}
                <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                  <Avatar className="bg-blue-50 text-blue-600">
                    <HiOutlineBuildingOffice2 />
                  </Avatar>
                  <div>
                    <Typography variant="subtitle1">Spotify New York</Typography>
                    <Typography variant="body2" color="textSecondary">
                      170 William Street
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      New York, NY 10038
                    </Typography>
                  </div>
                </div>

                {/* Museum */}
                <div className="flex items-start gap-4">
                  <Avatar className="bg-purple-50 text-purple-600">
                    <HiOutlineBuildingOffice2 />
                  </Avatar>
                  <div>
                    <Typography variant="subtitle1">Metropolitan Museum</Typography>
                    <Typography variant="body2" color="textSecondary">
                      525 E 8th Street
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      New York, NY 10051
                    </Typography>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: 4 }} elevation={2}>
            <CardContent>
              <Typography variant="h6" className="mb-4">
                Reading
              </Typography>
              <div className="flex flex-wrap gap-2">
                <Chip label="UI/UX" />
                <Chip label="Web Design" />
                <Chip label="Packaging" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card elevation={2}>
            <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
              <Tab value="about" label="About" />
              <Tab value="timeline" label="Timeline" />
            </Tabs>
          </Card>

          <Card sx={{ borderRadius: 3 }} elevation={2}>
            <CardContent>
              <Typography variant="h6" className="mb-4">
                Contact Information
              </Typography>

              <div className="space-y-4">
                <Box className="flex items-center gap-3">
                  <IconButton size="small" color="primary">
                    <FiPhone />
                  </IconButton>
                  <Typography>+1 123 456 7890</Typography>
                </Box>

                <Box className="flex items-start gap-3">
                  <IconButton size="small" color="primary">
                    <FiMapPin />
                  </IconButton>
                  <div>
                    <Typography>525 E 8th Street</Typography>
                    <Typography>New York, NY 10051</Typography>
                  </div>
                </Box>

                <Box className="flex items-center gap-3">
                  <IconButton size="small" color="primary">
                    <FiMail />
                  </IconButton>
                  <Typography>hello@jeremyrose.com</Typography>
                </Box>

                <Box className="flex items-center gap-3">
                  <IconButton size="small" color="primary">
                    <FiGlobe />
                  </IconButton>
                  <Typography className="text-blue-600">www.jeremyrose.com</Typography>
                </Box>
              </div>
            </CardContent>
          </Card>

          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" className="mb-4">
                Personal Information
              </Typography>

              <div className="space-y-3">
                <Box className="flex justify-between">
                  <Typography color="textSecondary">Birthday:</Typography>
                  <Typography>June 5, 1992</Typography>
                </Box>

                <Box className="flex justify-between">
                  <Typography color="textSecondary">Gender:</Typography>
                  <Typography>Male</Typography>
                </Box>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
