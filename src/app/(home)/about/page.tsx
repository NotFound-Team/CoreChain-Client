import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Core Chain - Democratizing Workplace Transparency",
  description: "Learn about the mission, story, and the team behind Core Chain Client. We are pioneers in blockchain-based human resource management.",
  openGraph: {
    title: "About Core Chain",
    description: "The story and mission of building a decentralized HR platform.",
    images: ["/images/app-mockup.png"],
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
