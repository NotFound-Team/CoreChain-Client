"use client";

import React from "react";
import { Box, Typography, Container, Grid, Button, Paper } from "@mui/material";
import { FaCode, FaBook, FaTerminal, FaGithub } from "react-icons/fa";

const CodeSnippet = ({ code }: { code: string }) => (
  <Box className="bg-slate-900 rounded-2xl p-6 font-mono text-sm text-indigo-300 overflow-x-auto border border-slate-800 shadow-2xl">
    <pre><code>{code}</code></pre>
  </Box>
);

export default function DevelopersContent() {
  return (
    <Box className="bg-slate-50 min-h-screen pb-24">
      {/* Header */}
      <Box className="bg-slate-950 py-24 text-white">
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" className="font-extrabold mb-6">
                Built for <span className="text-indigo-400">Engineers</span>.
              </Typography>
              <Typography variant="h5" className="text-slate-400 mb-8 leading-relaxed">
                Seamlessly integrate blockchain-based identity and payroll into your applications using our robust APIs and SDKs.
              </Typography>
              <Box className="flex gap-4">
                <Button variant="contained" className="bg-indigo-600 px-6 py-2 rounded-lg normal-case font-bold">
                  Read Documentation
                </Button>
                <Button variant="outlined" className="border-slate-700 text-white px-6 py-2 rounded-lg normal-case font-bold">
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
      <Container maxWidth="lg" className="-mt-12">
        <Grid container spacing={4}>
          {[
            { icon: <FaTerminal />, title: "Node.js SDK", desc: "Easily integrate with our first-class JavaScript and TypeScript SDK." },
            { icon: <FaCode />, title: "React Hooks", desc: "Built-in hooks for authentication and data fetching in React apps." },
            { icon: <FaTerminal />, title: "Core CLI", desc: "Manage your blockchain nodes and contracts from the command line." },
            { icon: <FaGithub />, title: "Open Source", desc: "Check out our community-driven examples and star us on GitHub." },
          ].map((item, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Paper className="p-8 h-full rounded-3xl border border-slate-200 shadow-sm hover:translate-y-[-4px] transition-all duration-300">
                <Box className="text-3xl text-indigo-600 mb-4">{item.icon}</Box>
                <Typography variant="h6" className="font-bold mb-2">{item.title}</Typography>
                <Typography className="text-slate-600 text-sm leading-relaxed">{item.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* API Reference Preview */}
      <Container maxWidth="lg" className="mt-24">
        <Box className="bg-white p-12 rounded-[40px] border border-slate-200">
          <Typography variant="h4" className="font-bold mb-8">API Reference Preview</Typography>
          <Grid container spacing={8}>
            <Grid item xs={12} md={4}>
              <Box className="space-y-6">
                <Box className="p-4 bg-indigo-50 rounded-xl border-l-4 border-indigo-600">
                  <Typography className="font-bold text-indigo-900">GET /v1/employees</Typography>
                  <Typography className="text-xs text-indigo-700">Retrieve a list of employees</Typography>
                </Box>
                <Box className="p-4 hover:bg-slate-50 rounded-xl cursor-default transition-colors">
                  <Typography className="font-bold text-slate-900">POST /v1/payroll</Typography>
                  <Typography className="text-xs text-slate-500">Initiate a smart contract payment</Typography>
                </Box>
                <Box className="p-4 hover:bg-slate-50 rounded-xl cursor-default transition-colors">
                  <Typography className="font-bold text-slate-900">GET /v1/audit/{`{id}`}</Typography>
                  <Typography className="text-xs text-slate-500">Get audit logs for a specific tx</Typography>
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
