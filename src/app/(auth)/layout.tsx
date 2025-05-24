// -- css --
import "../globals.css";

// -- Next --
import { Metadata } from "next";

// -- Components --
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Login | Blockchain HR Management",
  description: "Login.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
