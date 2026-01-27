"use client";

import React, { useRef } from "react";
import { Box, Typography, Container, Grid, Button } from "@mui/material";
import FeatureHighlights from "@/components/FeatureHighlights";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function FeaturesContent() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".animate-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    },
    { scope: heroRef },
  );

  return (
    <Box sx={{ bgcolor: 'white' }}>
      {/* Hero Section */}
      <Box ref={heroRef} sx={{ bgcolor: '#020617', py: { xs: 8, md: 12 }, color: 'white', position: 'relative', overflow: 'hidden', px: 2 }}>
        <Box sx={{ position: 'absolute', top: 0, right: 0, width: 400, height: 400, bgcolor: 'rgba(79, 70, 229, 0.2)', borderRadius: '50%', filter: 'blur(100px)', mr: -16, mt: -16 }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="overline" className="animate-item" sx={{ color: '#818cf8', fontWeight: 'bold', letterSpacing: '0.2em', mb: 2, display: 'block', fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                FEATURES & CAPABILITIES
              </Typography>
              <Typography variant="h1" className="animate-item" sx={{ fontSize: { xs: '1.875rem !important', md: '3rem', lg: '4.375rem' }, fontWeight: 800, mb: 3, lineHeight: 1.2 }}>
                Enterprise-Grade <br />
                <Box component="span" sx={{ color: '#818cf8' }}>Blockchain HR</Box> Solutions.
              </Typography>
              <Typography variant="h5" className="animate-item" sx={{ fontSize: { xs: '0.875rem', md: '1.25rem' }, color: '#94a3b8', mb: 4, maxWidth: '36rem', lineHeight: 1.6 }}>
                Everything you need to manage your workforce securely, transparently, and efficiently on the blockchain.
              </Typography>
              <Box className="animate-item" sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                <Button variant="contained" sx={{ bgcolor: '#4f46e5', '&:hover': { bgcolor: '#4338ca' }, px: 4, py: 1.5, borderRadius: 999, textTransform: 'none', fontSize: { xs: '1rem', md: '1.125rem' }, fontWeight: 600, width: { xs: '100%', sm: 'auto' } }}>
                  Get Started
                </Button>
                <Button variant="outlined" sx={{ border: '1px solid #334155', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }, px: 4, py: 1.5, borderRadius: 999, textTransform: 'none', fontSize: { xs: '1rem', md: '1.125rem' }, fontWeight: 600, width: { xs: '100%', sm: 'auto' } }}>
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
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#f8fafc', px: 2 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 'bold', color: '#0f172a', mb: { xs: 6, md: 8 }, fontSize: { xs: '1.5rem', md: '2.25rem' } }}>
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
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Box sx={{ p: { xs: 3, md: 4 }, bgcolor: 'white', borderRadius: { xs: 4, md: 6 }, border: '1px solid #e2e8f0', boxShadow: 1, '&:hover': { boxShadow: 4 }, transition: 'box-shadow 0.3s', height: '100%' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#4338ca', fontSize: { xs: '1.125rem', md: '1.25rem' } }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ color: '#475569', fontSize: { xs: '0.875rem', md: '1rem' } }}>
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
