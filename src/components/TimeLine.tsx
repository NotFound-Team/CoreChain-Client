"use client"

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaPhoenixFramework, FaCalendarAlt, FaClock } from "react-icons/fa";
import { Box, Typography, Paper, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface TimelineItemProps {
  date: string;
  time: string;
  title: string;
  author: string;
  content: string;
  isLast: boolean;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[4],
  },
}));

const TimelineItem: React.FC<TimelineItemProps> = ({ date, time, title, author, content, isLast }) => {
  return (
    <Box className={`flex ${!isLast ? "mb-6" : ""}`}>
      {/* Timeline line and dot */}
      <Box className="flex flex-col items-center mr-3">
        <Box className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
          <FaPhoenixFramework className="text-white text-[10px]" />
        </Box>
        {!isLast && <Divider orientation="vertical" className="h-full w-0.5 bg-gray-300 mt-1" />}
      </Box>

      {/* Content */}
      <Box className="flex-1 pb-4">
        <Box className="flex items-center text-gray-500 mb-1">
          <FaCalendarAlt className="mr-1 text-xs" />
          <Typography variant="caption" className="text-xs font-medium ml-1">
            {date}
          </Typography>
          <FaClock className="ml-2 mr-1 text-xs" />
          <Typography variant="caption" className="text-xs font-medium ml-1">
            {time}
          </Typography>
        </Box>

        <StyledPaper elevation={2} className="bg-white">
          <Typography variant="subtitle2" className="text-gray-800 mb-1 font-semibold">
            {title}
          </Typography>
          <Typography variant="caption" className="text-gray-500 italic mb-1 block">
            by {author}
          </Typography>
          <Typography variant="body2" className="text-gray-600 text-sm">
            {content}
          </Typography>
        </StyledPaper>
      </Box>
    </Box>
  );
};

const Timeline: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = gsap.utils.toArray<HTMLElement>(".timeline-item");

    items.forEach((item) => {
      gsap.from(item, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });

    // Animate the timeline line
    gsap.from(".timeline-line", {
      scaleY: 0,
      duration: 1.2,
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top center",
        toggleActions: "play none none none",
      },
    });
  }, []);

  const timelineData = [
    {
      date: "01 DEC, 2023",
      time: "10:30 AM",
      title: "Phoenix Template: Unleashing Creative Possibilities",
      author: "Shantinon Mekalan",
      content:
        "Discover limitless creativity with the Phoenix template! Our latest update offers an array of innovative features and design options.",
    },
    {
      date: "05 DEC, 2023",
      time: "12:30 AM",
      title: "Empower Your Digital Presence: The Phoenix Template Unveiled",
      author: "Bookworm22",
      content:
        "Unveiling the Phoenix template, a game-changer for your digital presence. With its powerful features and sleek design.",
    },
    {
      date: "15 DEC, 2023",
      time: "2:30 AM",
      title: "Phoenix Template: Simplified Design, Maximum Impact",
      author: "Sharuka Nijibum",
      content:
        "Introducing the Phoenix template, where simplified design meets maximum impact. Elevate your digital presence with its sleek and intuitive features.",
    },
  ];

  return (
    <Box className="max-w-2xl mx-auto px-4 py-8" ref={timelineRef}>
      <Typography variant="h5" className="text-center mb-8 text-gray-800 font-semibold">
        Phoenix Template Timeline
      </Typography>

      <Box className="relative">
        {timelineData.map((item, index) => (
          <Box key={index} className="timeline-item">
            <TimelineItem
              date={item.date}
              time={item.time}
              title={item.title}
              author={item.author}
              content={item.content}
              isLast={index === timelineData.length - 1}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Timeline;
