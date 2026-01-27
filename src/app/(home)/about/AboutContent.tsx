"use client";

import React from "react";
import { Box, Typography, Container, Grid, Avatar } from "@mui/material";

export default function AboutContent() {
  return (
    <Box sx={{ bgcolor: 'white', minHeight: '100vh' }}>
      {/* Vision Section */}
      <Box sx={{ bgcolor: '#4f46e5', py: { xs: 8, md: 16 }, textAlign: 'center', color: 'white', px: 2 }}>
        <Container maxWidth="md">
          <Typography variant="overline" sx={{ fontWeight: 'bold', letterSpacing: '0.2em', mb: 2, display: 'block', opacity: 0.8, fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
            OUR MISSION
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: { xs: 3, md: 4 }, lineHeight: 1.2, fontSize: { xs: '1.875rem', md: '3rem', lg: '3.75rem' } }}>
            Democratizing Workplace Transparency through Blockchain.
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9, lineHeight: 1.6, fontWeight: 300, fontSize: { xs: '1rem', md: '1.25rem' } }}>
            Founded in 2024, Core Chain Client was born out of a desire to fix the broken systems of human resource
            management, making them more secure, employee-centric, and auditable.
          </Typography>
        </Container>
      </Box>

      {/* Story Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 3, color: '#0f172a', fontSize: { xs: '1.5rem', md: '2.25rem' } }}>
              Our Story
            </Typography>
            <Box sx={{ '& > p': { mb: 3 }, color: '#475569', lineHeight: 1.6, fontSize: { xs: '0.875rem', md: '1rem' } }}>
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
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              <Box sx={{ bgcolor: '#f8fafc', p: { xs: 3, md: 4 }, borderRadius: { xs: 4, md: 6 }, textAlign: 'center', boxShadow: 1 }}>
                <Typography variant="h3" sx={{ fontWeight: 800, color: '#4f46e5', mb: 1, fontSize: { xs: '1.875rem', md: '2.25rem' } }}>
                  500+
                </Typography>
                <Typography sx={{ color: '#64748b', fontWeight: 500, textTransform: 'uppercase', fontSize: { xs: '10px', md: '0.75rem' } }}>Companies</Typography>
              </Box>
              <Box sx={{ bgcolor: '#0f172a', p: { xs: 3, md: 4 }, borderRadius: { xs: 4, md: 6 }, textAlign: 'center', color: 'white', boxShadow: 3 }}>
                <Typography variant="h3" sx={{ fontWeight: 800, color: 'white', mb: 1, fontSize: { xs: '1.875rem', md: '2.25rem' } }}>
                  1M+
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500, textTransform: 'uppercase', fontSize: { xs: '10px', md: '0.75rem' } }}>Smart Contracts</Typography>
              </Box>
              <Box sx={{ bgcolor: '#eef2ff', p: { xs: 3, md: 4 }, borderRadius: { xs: 4, md: 6 }, textAlign: 'center', gridColumn: { sm: 'span 2' }, boxShadow: 1, border: '1px solid #e0e7ff' }}>
                <Typography variant="h3" sx={{ fontWeight: 800, color: '#1e1b4b', mb: 1, fontSize: { xs: '1.875rem', md: '2.25rem' } }}>
                  99.9%
                </Typography>
                <Typography sx={{ color: '#4338ca', fontWeight: 500, textTransform: 'uppercase', fontSize: { xs: '10px', md: '0.75rem' } }}>Uptime</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Team Section (Mock) */}
      <Box sx={{ bgcolor: '#f8fafc', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 'bold', mb: { xs: 6, md: 8 }, fontSize: { xs: '1.5rem', md: '2.25rem' } }}>
            Meet the Pioneers
          </Typography>
          <Grid container spacing={4} justifyContent="center">
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
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Box sx={{ 
                  textAlign: 'center', 
                  p: 3, 
                  bgcolor: { xs: 'white', md: 'transparent' }, 
                  borderRadius: 4, 
                  boxShadow: { xs: 1, md: 0 }, 
                  border: { xs: '1px solid #f1f5f9', md: 'none' } 
                }}>
                  <Avatar sx={{ 
                    width: { xs: 96, md: 128 }, 
                    height: { xs: 96, md: 128 }, 
                    mx: 'auto', 
                    mb: 3, 
                    bgcolor: '#eef2ff', 
                    color: '#4f46e5', 
                    fontSize: '2.25rem', 
                    boxShadow: 3, 
                    border: '4px solid white' 
                  }}>
                    {member.name[0]}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#0f172a', fontSize: { xs: '1.125rem', md: '1.25rem' } }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#4f46e5', fontWeight: 600, mb: 2, textTransform: 'uppercase', letterSpacing: '-0.025em', fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                    {member.role}
                  </Typography>
                  <Typography sx={{ color: '#64748b', fontSize: '0.875rem' }}>{member.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
