import { Metadata } from "next";
import DevelopersContent from "./DevelopersContent";

export const metadata: Metadata = {
  title: "Core Chain Developers - APIs & SDKs for Blockchain HR",
  description: "Documentation and tools for developers to integrate blockchain-based identity, payroll, and auditing into their own applications.",
  openGraph: {
    title: "Core Chain Developers",
    description: "Build the future of decentralized HR with our robust SDKs and APIs.",
    images: ["/images/app-mockup.png"],
  },
};

export default function DevelopersPage() {
  return <DevelopersContent />;
}
