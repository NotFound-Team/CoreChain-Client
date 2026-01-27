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
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', py: { xs: 8, md: 12 }, px: 2 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <FaQuestionCircle className="text-4xl md:text-5xl text-indigo-600 mx-auto mb-6" />
          <Typography variant="h2" sx={{ fontWeight: 800, color: '#0f172a', mb: 2, fontSize: { xs: '1.875rem', md: '3rem' } }}>
            Frequently Asked Questions
          </Typography>
          <Typography variant="h5" sx={{ color: '#64748b', maxWidth: '36rem', mx: 'auto', fontWeight: 300, fontSize: { xs: '1rem', md: '1.25rem' } }}>
            Everything you need to know about Core Chain. Can&apos;t find an answer? Contact our support team.
          </Typography>
        </Box>

        {faqs.map((cat, idx) => (
          <Box key={idx} sx={{ mb: { xs: 5, md: 6 } }}>
            <Typography variant="h6" sx={{ color: '#4f46e5', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', mb: { xs: 2, md: 3 }, px: 1, fontSize: { xs: '0.875rem', md: '1rem' } }}>
              {cat.category}
            </Typography>
            <Box sx={{ '& > div': { mb: { xs: 1.5, md: 2 } } }}>
              {cat.questions.map((faq, fIdx) => (
                <Accordion 
                  key={fIdx} 
                  sx={{ 
                    borderRadius: '12px !important', 
                    '&:before': { display: 'none' },
                    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
                    border: '1px solid #e2e8f0',
                    overflow: 'hidden',
                    '&:hover': { boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' },
                    transition: 'box-shadow 0.2s'
                  }}
                >
                  <AccordionSummary
                    expandIcon={<FaChevronDown className="text-indigo-600 text-xs md:text-base" />}
                    sx={{ py: { xs: 0.5, md: 1 }, '&:hover': { bgcolor: '#f8fafc' }, transition: 'background-color 0.2s' }}
                  >
                    <Typography sx={{ fontWeight: 'bold', color: '#1e293b', fontSize: { xs: '0.875rem', md: '1rem' } }}>{faq.q}</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ bgcolor: 'white', borderTop: '1px solid #f1f5f9', py: { xs: 2, md: 3 } }}>
                    <Typography sx={{ color: '#475569', lineHeight: 1.6, fontWeight: 300, fontSize: { xs: '0.875rem', md: '1rem' } }}>
                      {faq.a}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Box>
        ))}

        {/* Support CTA */}
        <Box sx={{ mt: { xs: 8, md: 10 }, p: { xs: 3, md: 6 }, bgcolor: '#4f46e5', borderRadius: { xs: 6, md: 10 }, textAlign: 'center', color: 'white' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, fontSize: { xs: '1.5rem', md: '2.25rem' } }}>Still have questions?</Typography>
          <Typography sx={{ opacity: 0.8, mb: 4, maxWidth: '32rem', mx: 'auto', fontSize: { xs: '0.875rem', md: '1rem' } }}>
            We&apos;re here to help. Reach out to our dedicated support team for any technical or billing inquiries.
          </Typography>
          <button className="bg-white text-indigo-600 px-8 md:px-10 py-3 rounded-full font-bold hover:bg-slate-100 transition-colors text-sm md:text-base w-full sm:w-auto">
            Get in touch
          </button>
        </Box>
      </Container>
    </Box>
  );
}
