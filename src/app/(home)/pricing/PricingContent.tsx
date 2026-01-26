"use client";

import React from "react";
import { Box, Typography, Container } from "@mui/material";
import Pricing from "@/components/Pricing";

export default function PricingContent() {
  return (
    <Box className="bg-[var(--bg-default)] min-h-screen">
      <Box className="pt-20 pb-10">
        <Container maxWidth="lg">
          <Typography variant="h2" className="text-center font-extrabold text-[var(--text-primary)] mb-4">
            Transparent Pricing
          </Typography>
          <Typography variant="h5" className="text-center text-[var(--text-secondary)] mb-12 mx-auto leading-relaxed">
            Choose the best plan for your team. No hidden fees, no complexity.
          </Typography>
        </Container>
      </Box>

      {/* Existing Pricing Component */}
      <Pricing />

      {/* Comparison Table (Mock) */}
      <Box className="py-24 bg-white border-t border-slate-200">
        <Container maxWidth="md">
          <Typography variant="h4" className="text-center font-bold mb-12 text-slate-900">
            Compare Plans
          </Typography>
          <Box className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-100">
                  <th className="text-left p-4 text-slate-500 font-semibold uppercase text-xs">Feature</th>
                  <th className="p-4 text-slate-900 font-bold">Standard</th>
                  <th className="p-4 text-indigo-600 font-bold">Enterprise</th>
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
                    <td className="p-4 text-slate-700 font-medium">{row.name}</td>
                    <td className="p-4 text-center text-slate-600">{row.s}</td>
                    <td className="p-4 text-center text-slate-900 font-semibold">{row.e}</td>
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
