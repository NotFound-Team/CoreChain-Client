import type { Metadata } from "next";
import PricingContent from "./PricingContent";

export const metadata: Metadata = {
  title: "Core Chain Pricing - Transparent & Fair Blockchain HR Plans",
  description: "Find the perfect plan for your team. From free starting plans for small teams to full-scale enterprise blockchain HR solutions.",
  openGraph: {
    title: "Core Chain Pricing",
    description: "Transparent and fair blockchain HR plans for teams of all sizes.",
    images: ["/images/app-mockup.png"],
  },
};

export default function PricingPage() {
  return <PricingContent />;
}
