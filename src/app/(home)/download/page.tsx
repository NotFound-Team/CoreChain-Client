import { Metadata } from "next";
import DownloadHero from "./components/DownloadHero";
import FeatureSection from "./components/FeatureSection";

export const metadata: Metadata = {
  title: "Download Core Chain Client for iOS & Android",
  description:
    "Experience secure, transparent, and ultra-fast blockchain management. Download the Core Chain Client today for iOS and Android.",
  openGraph: {
    title: "Download Core Chain Client",
    description: "The official app for Core Chain blockchain management.",
    images: ["/images/app-mockup.png"],
  },
};

export default function DownloadPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with OS Detection */}
      <DownloadHero />
    </div>
  );
}
