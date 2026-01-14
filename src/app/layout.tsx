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

export async function generateMetadata() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/settings`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch settings: ${res.statusText}`);
    }

    const json = await res.json();
    const settings = json.data || {};
    const metadata = settings.metadata || {};

    return {
      title: metadata.title || "Gemini HR Management",
      description: metadata.description || "Secure and Transparent HR Management with Blockchain",
      keywords: metadata.keywords || ["blockchain", "hr"],
      openGraph: {
        title: metadata.og?.title || metadata.title,
        description: metadata.og?.description || metadata.description,
        images: metadata.og?.image_url ? [metadata.og.image_url] : [],
      },
      icons: {
        icon: metadata.favicon_url || "/favicon.ico",
      },
    };
  } catch (e) {
    console.error("Error generating metadata:", e);
    return {
      title: "Gemini HR Management",
      description: "Secure and Transparent HR Management with Blockchain",
    };
  }
}

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
