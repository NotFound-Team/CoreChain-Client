// -- css --
import "../globals.css";

// -- Next --
import { Metadata } from "next";

// -- Components --
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// -- Context --
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Login",
  description: "Login.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </AuthProvider>
  );
}
