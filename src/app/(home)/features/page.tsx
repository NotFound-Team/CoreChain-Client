import { Metadata } from "next";
import FeaturesContent from "./FeaturesContent";

export const metadata: Metadata = {
  title: "Core Chain Features - Enterprise Blockchain HR Solutions",
  description: "Explore the advanced capabilities of Core Chain Client, including smart contract payroll, immutable audit trails, and self-sovereign employee identity.",
  openGraph: {
    title: "Core Chain Features",
    description: "Enterprise-grade blockchain solutions for HR management.",
    images: ["/images/app-mockup.png"],
  },
};

export default function FeaturesPage() {
  return <FeaturesContent />;
}
