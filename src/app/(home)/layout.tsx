import "../globals.css";
// -- Next --
import { Metadata } from "next";

// -- Components --
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Blockchain HR Management",
  description: "A secure and transparent blockchain-based platform for managing human resources and employee data.",
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
