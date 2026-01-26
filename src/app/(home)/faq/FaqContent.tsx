"use client";

import React from "react";
import { Box, Typography, Container, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";

const faqs = [
  {
    category: "General",
    questions: [
      { q: "What is Core Chain Client?", a: "Core Chain Client is a decentralized human resource management platform that uses blockchain technology to provide secure, transparent, and immutable employee records." },
      { q: "Is it really free for small teams?", a: "Yes! Our Standard plan is free for teams with up to 5 members, allowing you to experience the power of blockchain HR without any cost." },
      { q: "Do I need blockchain knowledge to use it?", a: "Not at all. We've abstracted the complexity of the blockchain so you can manage your HR tasks just like any other modern SaaS platform." },
    ]
  },
  {
    category: "Technical",
    questions: [
      { q: "Which blockchain do you use?", a: "Currently, we operate on a highly scalable Layer 2 Ethereum solution to ensure low transaction costs and high speeds while maintaining security." },
      { q: "How is my data stored?", a: "Files are stored on decentralized storage networks like IPFS/Filecoin, while critical metadata and identity proofs are managed on-chain via smart contracts." },
      { q: "Can I integrate with my current HRIS?", a: "Absolutely. Our platform is API-first. You can use our Developer SDK to sync data between Core Chain and systems like Workday or SAP." },
    ]
  },
  {
    category: "Security",
    questions: [
      { q: "Is my personal data visible on the public blockchain?", a: "No. We use Zero-Knowledge Proofs and advanced encryption. Only authorized parties with the correct keys can decrypt and view sensitive employee information." },
      { q: "What happens if I lose my account key?", a: "We offer multi-signature recovery options and secure social recovery mechanisms to ensure you never lose access to your data." },
    ]
  }
];

export default function FaqContent() {
  return (
    <Box className="bg-slate-50 min-h-screen py-24">
      <Container maxWidth="md">
        <Box className="text-center mb-16">
          <FaQuestionCircle className="text-5xl text-indigo-600 mx-auto mb-6" />
          <Typography variant="h2" className="font-extrabold text-slate-900 mb-4">
            Frequently Asked Questions
          </Typography>
          <Typography variant="h5" className="text-slate-500 max-w-xl mx-auto font-light">
            Everything you need to know about Core Chain. Can&apos;t find an answer? Contact our support team.
          </Typography>
        </Box>

        {faqs.map((cat, idx) => (
          <Box key={idx} className="mb-12">
            <Typography variant="h6" className="text-indigo-600 font-bold uppercase tracking-widest mb-6 px-4">
              {cat.category}
            </Typography>
            <Box className="space-y-4">
              {cat.questions.map((faq, fIdx) => (
                <Accordion 
                  key={fIdx} 
                  className="rounded-2xl border border-slate-200 before:hidden shadow-sm hover:shadow-md transition-shadow mb-3 overflow-hidden"
                  sx={{ 
                    borderRadius: '16px !important', 
                    '&:before': { display: 'none' },
                    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
                  }}
                >
                  <AccordionSummary
                    expandIcon={<FaChevronDown className="text-indigo-600" />}
                    className="py-2 hover:bg-slate-50 transition-colors"
                  >
                    <Typography className="font-bold text-slate-800">{faq.q}</Typography>
                  </AccordionSummary>
                  <AccordionDetails className="bg-white border-t border-slate-50 py-6">
                    <Typography className="text-slate-600 leading-relaxed font-light">
                      {faq.a}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Box>
        ))}

        {/* Support CTA */}
        <Box className="mt-20 p-12 bg-indigo-600 rounded-[40px] text-center text-white">
          <Typography variant="h4" className="font-bold mb-4">Still have questions?</Typography>
          <Typography className="opacity-80 mb-8 max-w-lg mx-auto">
            We&apos;re here to help. Reach out to our dedicated support team for any technical or billing inquiries.
          </Typography>
          <button className="bg-white text-indigo-600 px-10 py-3 rounded-full font-bold hover:bg-slate-100 transition-colors">
            Get in touch
          </button>
        </Box>
      </Container>
    </Box>
  );
}
