// -- font --
import { Geist, Geist_Mono } from "next/font/google";

// -- css --
import "../globals.css";

// -- Next --
import { Metadata } from "next";

// -- Components --
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// -- Context --
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Login",
  description: "Login.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
