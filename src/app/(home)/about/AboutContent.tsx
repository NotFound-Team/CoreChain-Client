"use client";

import React from "react";
import { Box, Typography, Container, Grid, Avatar } from "@mui/material";

export default function AboutContent() {
  return (
    <Box className="bg-white min-h-screen">
      {/* Vision Section */}
      <Box className="bg-indigo-600 py-32 text-center text-white">
        <Container maxWidth="md">
          <Typography variant="overline" className="font-bold tracking-[0.2em] mb-4 block opacity-80">
            OUR MISSION
          </Typography>
          <Typography variant="h2" className="font-extrabold mb-8 leading-[1.2]">
            Democratizing Workplace Transparency through Blockchain.
          </Typography>
          <Typography variant="h5" className="opacity-90 leading-relaxed font-light">
            Founded in 2024, Core Chain Client was born out of a desire to fix the broken systems of human resource
            management, making them more secure, employee-centric, and auditable.
          </Typography>
        </Container>
      </Box>

      {/* Story Section */}
      <Container maxWidth="lg" className="py-24">
        <Grid container spacing={12} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" className="font-bold mb-6 text-slate-900">
              Our Story
            </Typography>
            <Box className="space-y-6 text-slate-600 leading-relaxed">
              <p>
                The team behind Core Chain saw a pattern of centralized databases failing companies—not just through
                technical vulnerabilities, but through a lack of trust. Employees felt like data points, and managers
                struggled with fragmented records.
              </p>
              <p>
                We decided to build a bridge between traditional HR needs and decentralized technology. By leveraging
                the security of the blockchain, we&apos;ve created a platform where transparency is built-in, and security is
                non-negotiable.
              </p>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="grid grid-cols-2 gap-4">
              <Box className="bg-slate-50 p-8 rounded-3xl text-center">
                <Typography variant="h3" className="font-extrabold text-indigo-600 mb-2">
                  500+
                </Typography>
                <Typography className="text-slate-500 font-medium uppercase text-xs">Companies</Typography>
              </Box>
              <Box className="bg-slate-900 p-8 rounded-3xl text-center text-white">
                <Typography variant="h3" className="font-extrabold text-white mb-2">
                  1M+
                </Typography>
                <Typography className="text-white/50 font-medium uppercase text-xs">Smart Contracts</Typography>
              </Box>
              <Box className="bg-indigo-50 p-8 rounded-3xl text-center col-span-2">
                <Typography variant="h3" className="font-extrabold text-indigo-900 mb-2">
                  99.9%
                </Typography>
                <Typography className="text-indigo-700 font-medium uppercase text-xs">Uptime</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Team Section (Mock) */}
      <Box className="bg-slate-50 py-24">
        <Container maxWidth="lg">
          <Typography variant="h3" className="text-center font-bold mb-16">
            Meet the Pioneers
          </Typography>
          <Grid container spacing={6} justifyContent="center">
            {[
              {
                name: "Tran Van D",
                role: "Backend Developer",
                desc: "Software engineering student interested in backend systems and security.",
              },
              {
                name: "Cao Nguyen Tri Ngoc",
                role: "Backend Developer",
                desc: "Software engineering student interested in backend systems and security.",
              },
              {
                name: "Le Anh Kiet",
                role: "Frontend Developer",
                desc: "Frontend-focused student passionate about building user-friendly interfaces.",
              },
            ].map((member, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Box className="text-center">
                  <Avatar className="w-32 h-32 mx-auto mb-6 bg-indigo-100 text-indigo-600 text-4xl shadow-lg border-4 border-white">
                    {member.name[0]}
                  </Avatar>
                  <Typography variant="h6" className="font-bold text-slate-900">
                    {member.name}
                  </Typography>
                  <Typography variant="body2" className="text-indigo-600 font-semibold mb-4 uppercase tracking-tighter">
                    {member.role}
                  </Typography>
                  <Typography className="text-slate-500 text-sm">{member.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
