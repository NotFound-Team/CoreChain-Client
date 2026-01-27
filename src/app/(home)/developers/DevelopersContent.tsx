"use client";

import React from "react";
import { Box, Typography, Container, Grid, Button, Paper } from "@mui/material";
import { FaCode, FaBook, FaTerminal, FaGithub } from "react-icons/fa";

const CodeSnippet = ({ code }: { code: string }) => (
  <Box sx={{ 
    bgcolor: '#0f172a', 
    borderRadius: 4, 
    p: 3, 
    fontFamily: 'monospace', 
    fontSize: '0.875rem', 
    color: '#a5b4fc', 
    overflowX: 'auto', 
    border: '1px solid #1e293b', 
    boxShadow: 24 
  }}>
    <pre><code>{code}</code></pre>
  </Box>
);

export default function DevelopersContent() {
  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: { xs: 8, md: 12 } }}>
      {/* Header */}
      <Box sx={{ bgcolor: '#020617', py: { xs: 8, md: 12 }, color: 'white', px: 2 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" sx={{ fontWeight: 800, mb: 3, fontSize: { xs: '1.875rem', md: '3rem', lg: '3.75rem' } }}>
                Built for <Box component="span" sx={{ color: '#818cf8' }}>Engineers</Box>.
              </Typography>
              <Typography variant="h5" sx={{ color: '#94a3b8', mb: 4, lineHeight: 1.6, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                Seamlessly integrate blockchain-based identity and payroll into your applications using our robust APIs and SDKs.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                <Button variant="contained" sx={{ bgcolor: '#4f46e5', '&:hover': { bgcolor: '#4338ca' }, px: 3, py: 1.5, borderRadius: 2, textTransform: 'none', fontWeight: 'bold', width: { xs: '100%', sm: 'auto' } }}>
                  Read Documentation
                </Button>
                <Button variant="outlined" sx={{ border: '1px solid #334155', color: 'white', '&:hover': { border: '1px solid #475569', bgcolor: 'rgba(255,255,255,0.05)' }, px: 3, py: 1.5, borderRadius: 2, textTransform: 'none', fontWeight: 'bold', width: { xs: '100%', sm: 'auto' } }}>
                  Get API Key
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <CodeSnippet code={`const coreChain = require('@core-chain/sdk');

// Initialize with your API key
const client = coreChain.init({
  apiKey: 'cc_live_xyz123...',
  environment: 'production'
});

// Create a new employee on-chain
const result = await client.employees.create({
  identity: 'did:core:12345',
  contract: '0xabc...'
});`} />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* SDKs & Tools */}
      <Container maxWidth="lg" sx={{ mt: { xs: -4, md: -6 }, px: 2 }}>
        <Grid container spacing={3}>
          {[
            { icon: <FaTerminal />, title: "Node.js SDK", desc: "Easily integrate with our first-class JavaScript and TypeScript SDK." },
            { icon: <FaCode />, title: "React Hooks", desc: "Built-in hooks for authentication and data fetching in React apps." },
            { icon: <FaTerminal />, title: "Core CLI", desc: "Manage your blockchain nodes and contracts from the command line." },
            { icon: <FaGithub />, title: "Open Source", desc: "Check out our community-driven examples and star us on GitHub." },
          ].map((item, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Paper sx={{ 
                p: { xs: 3, md: 4 }, 
                height: '100%', 
                borderRadius: { xs: 4, md: 6 }, 
                border: '1px solid #e2e8f0', 
                boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)', 
                transition: 'all 0.3s', 
                '&:hover': { transform: 'translateY(-4px)' } 
              }}>
                <Box sx={{ fontSize: { xs: '1.5rem', md: '1.875rem' }, color: '#4f46e5', mb: 2 }}>{item.icon}</Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, fontSize: { xs: '1.125rem', md: '1.25rem' } }}>{item.title}</Typography>
                <Typography sx={{ color: '#475569', fontSize: '0.875rem', lineHeight: 1.6 }}>{item.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* API Reference Preview */}
      <Container maxWidth="lg" sx={{ mt: { xs: 8, md: 12 }, px: 2 }}>
        <Box sx={{ bgcolor: 'white', p: { xs: 3, md: 6 }, borderRadius: { xs: 4, md: 10 }, border: '1px solid #e2e8f0' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, fontSize: { xs: '1.5rem', md: '2.25rem' }, textAlign: { xs: 'center', md: 'left' } }}>API Reference Preview</Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ '& > div': { mb: 2 } }}>
                <Box sx={{ p: 2, bgcolor: '#eef2ff', borderRadius: 3, borderLeft: '4px solid #4f46e5' }}>
                  <Typography sx={{ fontWeight: 'bold', color: '#1e1b4b', fontSize: { xs: '0.875rem', md: '1rem' } }}>GET /v1/employees</Typography>
                  <Typography sx={{ fontSize: { xs: '10px', md: '0.75rem' }, color: '#4338ca' }}>Retrieve a list of employees</Typography>
                </Box>
                <Box sx={{ p: 2, '&:hover': { bgcolor: '#f8fafc' }, borderRadius: 3, transition: 'colors 0.2s' }}>
                  <Typography sx={{ fontWeight: 'bold', color: '#0f172a', fontSize: { xs: '0.875rem', md: '1rem' } }}>POST /v1/payroll</Typography>
                  <Typography sx={{ fontSize: { xs: '10px', md: '0.75rem' }, color: '#64748b' }}>Initiate a smart contract payment</Typography>
                </Box>
                <Box sx={{ p: 2, '&:hover': { bgcolor: '#f8fafc' }, borderRadius: 3, transition: 'colors 0.2s' }}>
                  <Typography sx={{ fontWeight: 'bold', color: '#0f172a', fontSize: { xs: '0.875rem', md: '1rem' } }}>GET /v1/audit/{`{id}`}</Typography>
                  <Typography sx={{ fontSize: { xs: '10px', md: '0.75rem' }, color: '#64748b' }}>Get audit logs for a specific tx</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <CodeSnippet code={`// Response Example
{
  "status": "success",
  "data": [
    {
      "id": "emp_01JHZE...",
      "onChainId": "did:core:99283",
      "status": "ACTIVE",
      "updatedAt": "2026-01-26T10:00:00Z"
    }
  ],
  "meta": { "total": 1 }
}`} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
