"use client";

import React, { useRef } from "react";
import { Box, Typography, Container, Grid, Button } from "@mui/material";
import FeatureHighlights from "@/components/FeatureHighlights";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function FeaturesContent() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".animate-item", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, { scope: heroRef });

  return (
    <Box className="bg-white">
      {/* Hero Section */}
      <Box ref={heroRef} className="bg-slate-950 py-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[100px] -mr-32 -mt-32" />
        <Container maxWidth="lg" className="relative z-10">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="overline" className="text-indigo-400 font-bold tracking-widest mb-4 block animate-item">
                FEATURES & CAPABILITIES
              </Typography>
              <Typography variant="h1" className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight animate-item">
                Enterprise-Grade <br />
                <span className="text-indigo-400">Blockchain HR</span> Solutions.
              </Typography>
              <Typography variant="h5" className="text-xl text-slate-400 mb-8 max-w-xl leading-relaxed animate-item">
                Everything you need to manage your workforce securely, transparently, and efficiently on the blockchain.
              </Typography>
              <Box className="flex gap-4 animate-item">
                <Button variant="contained" className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-full normal-case text-lg font-semibold">
                  Get Started
                </Button>
                <Button variant="outlined" className="border-slate-700 text-white hover:bg-white/5 px-8 py-3 rounded-full normal-case text-lg font-semibold">
                  View Demo
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Features Component */}
      <FeatureHighlights />

      {/* Detailed Technical Features List (Mock) */}
      <Box className="py-24 bg-slate-50">
        <Container maxWidth="lg">
          <Typography variant="h3" className="text-center font-bold text-slate-900 mb-16">
            Advanced Technical Capabilities
          </Typography>
          <Grid container spacing={4}>
            {[
              { title: "Smart Contract Automation", desc: "Automate payroll and performance bonuses with verifiable smart contracts." },
              { title: "Immutable Audit Trails", desc: "Every HR action is logged on-chain, creating an unalterable history for compliance." },
              { title: "Self-Sovereign Identity", desc: "Employees own their professional data, allowing for seamless verifications." },
              { title: "Scalable Infrastructure", desc: "Built on Layer 2 tech to ensure fast transactions even with large teams." },
              { title: "Customizable Permissions", desc: "Granular access control using CASL integrated with blockchain keys." },
              { title: "API-First Design", desc: "Easily integrate with existing ERP and payroll systems via our robust SDK." },
            ].map((item, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Box className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <Typography variant="h6" className="font-bold mb-4 text-indigo-700">
                    {item.title}
                  </Typography>
                  <Typography className="text-slate-600">
                    {item.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
