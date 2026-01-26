import { Metadata } from "next";
import FaqContent from "./FaqContent";

export const metadata: Metadata = {
  title: "Core Chain FAQ - Frequently Asked Questions",
  description: "Find answers to everything you need to know about Core Chain, from general questions to technical security details and billing.",
  openGraph: {
    title: "Core Chain FAQ",
    description: "Get your questions answered about our decentralized HR platform.",
    images: ["/images/app-mockup.png"],
  },
};

export default function FAQPage() {
  return <FaqContent />;
}
