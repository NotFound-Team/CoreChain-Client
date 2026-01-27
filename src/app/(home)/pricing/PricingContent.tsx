"use client";

import React from "react";
import { Box, Typography, Container } from "@mui/material";
import Pricing from "@/components/Pricing";

export default function PricingContent() {
  return (
    <Box sx={{ bgcolor: 'var(--bg-default)', minHeight: '100vh' }}>
      <Box sx={{ pt: { xs: 12, md: 16 }, pb: { xs: 6, md: 10 }, px: 2 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ textAlign: 'center', fontWeight: 800, color: 'var(--text-primary)', mb: 2, fontSize: { xs: '1.875rem', md: '3rem', lg: '3.75rem' } }}>
            Transparent Pricing
          </Typography>
          <Typography variant="h5" sx={{ textAlign: 'center', color: 'var(--text-secondary)', mb: { xs: 4, md: 6 }, mx: 'auto', lineHeight: 1.6, maxWidth: '42rem', fontSize: { xs: '1rem', md: '1.25rem' } }}>
            Choose the best plan for your team. No hidden fees, no complexity.
          </Typography>
        </Container>
      </Box>

      {/* Existing Pricing Component */}
      <Pricing />

      {/* Comparison Table (Mock) */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'white', borderTop: '1px solid #e2e8f0', px: 2 }}>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: { xs: 4, md: 6 }, color: '#0f172a', fontSize: { xs: '1.5rem', md: '2.25rem' } }}>
            Compare Plans
          </Typography>
          <Box sx={{ overflowX: 'auto', mx: -2, px: 2, pb: 2 }}>
            <table className="w-full border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b-2 border-slate-100">
                  <th className="text-left p-4 text-slate-500 font-semibold uppercase text-[10px] md:text-xs">Feature</th>
                  <th className="p-4 text-slate-900 font-bold text-sm md:text-base">Standard</th>
                  <th className="p-4 text-indigo-600 font-bold text-sm md:text-base">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Storage Limit", s: "100GB", e: "Unlimited" },
                  { name: "Team Members", s: "Up to 5", e: "Unlimited" },
                  { name: "Smart Contracts", s: "Basic", e: "Advanced" },
                  { name: "API Access", s: "Limited", e: "Full" },
                  { name: "Audit Support", s: "Standard", e: "Priority 24/7" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 text-slate-700 font-medium text-xs md:text-sm">{row.name}</td>
                    <td className="p-4 text-center text-slate-600 text-xs md:text-sm">{row.s}</td>
                    <td className="p-4 text-center text-slate-900 font-semibold text-xs md:text-sm">{row.e}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
