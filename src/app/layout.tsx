// -- font --
import { Geist, Geist_Mono } from "next/font/google";

// -- CSS --
import "./globals.css";

// -- Context --
import { ThemeProviderWrapper } from "@/context/ThemeProviderWrapper";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProviderWrapper>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
