"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProviderWrapper } from "@/context/ThemeProviderWrapper";
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY > 70);
    };
    console.log("check");

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProviderWrapper>
          <div className="relative h-[72px]">
            <div
              className={`
              bg-white absolute left-0 right-0 z-50 
              ${showHeader && "fixed -top-[72px] translate-y-[72px] transition-transform duration-400 shadow-md"}
            `}
            >
              <div className="container mx-auto w-full max-sm:px-4">
                <Header />
              </div>
            </div>
          </div>

          <main>{children}</main>
          <div className="bg-[#1A284E]">
            <div className="container mx-auto w-full max-sm:px-4">
              <Footer />
            </div>
          </div>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
