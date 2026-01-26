"use client";

import React, { useRef } from "react";
import { Box, Typography, Container, Grid, Card } from "@mui/material";
import { FaShieldAlt, FaBolt, FaGlobe } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    icon: <FaShieldAlt className="text-3xl text-indigo-400" />,
    title: "Military-Grade Security",
    description: "Your data is encrypted and stored on the blockchain, ensuring maximum security and privacy.",
  },
  {
    icon: <FaBolt className="text-3xl text-sky-400" />,
    title: "Lightning Fast",
    description: "Manage your assets with near-instant transaction speeds and a highly responsive interface.",
  },
  {
    icon: <FaGlobe className="text-3xl text-emerald-400" />,
    title: "Global Accessibility",
    description: "Access your account from anywhere in the world on any device, seamlessly synced.",
  },
];

const FeatureSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".feature-card", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
    });
  }, { scope: containerRef });

  return (
    <Box ref={containerRef} className="py-24 bg-slate-950 border-t border-white/5">
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          className="text-center font-bold text-white mb-16"
        >
          Why choose Core Chain?
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card className="feature-card h-full p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
                <Box className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                  {feature.icon}
                </Box>
                <Typography variant="h5" className="font-bold text-white mb-4">
                  {feature.title}
                </Typography>
                <Typography className="text-slate-400 leading-relaxed">
                  {feature.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeatureSection;
