"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Box, Typography, Button, Container, Grid, useTheme } from "@mui/material";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import APP_DOWNLOAD_CONFIG from "@/configs/app-download";

const DownloadHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [os, setOs] = useState<"ios" | "android" | "desktop">("desktop");

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(userAgent)) {
      setOs("ios");
    } else if (/android/.test(userAgent)) {
      setOs("android");
    } else {
      setOs("desktop");
    }
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

      tl.from(textRef.current?.children || [], {
        y: 50,
        opacity: 0,
        stagger: 0.2,
      }).from(
        mockupRef.current,
        {
          x: 100,
          opacity: 0,
        },
        "-=0.5",
      );
    },
    { scope: containerRef },
  );

  return (
    <Box
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white py-20 lg:py-32"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -ml-64 -mb-64" />

      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} lg={7}>
            <Box ref={textRef}>
              <Box className="flex items-center gap-4 mb-8">
                <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md border border-white/20">
                  <Image
                    src="/images/corechain.png"
                    alt="Core Chain Logo"
                    width={48}
                    height={48}
                    className="rounded-lg"
                  />
                </div>
                <Typography variant="h6" className="font-bold tracking-tight text-white/90">
                  CORE CHAIN CLIENT
                </Typography>
              </Box>

              <Typography
                variant="h1"
                className="text-5xl lg:text-7xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent"
              >
                The Future of <br /> Digital Assets.
              </Typography>

              <Typography variant="h5" className="text-xl text-slate-400 mb-10! max-w-xl leading-relaxed">
                Experience secure, transparent, and ultra-fast blockchain management. Download the Core Chain Client
                today and take control of your digital identity.
              </Typography>

              <Box className="flex flex-wrap gap-4 mb-12">
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<FaApple className="text-2xl" />}
                  className={`px-8 py-4 rounded-2xl normal-case text-lg font-semibold transition-all duration-300 ${
                    os === "ios"
                      ? "bg-white text-black scale-105 shadow-xl shadow-white/10"
                      : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                  }`}
                  href={APP_DOWNLOAD_CONFIG.IOS_DOWNLOAD_URL}
                  target="_blank"
                >
                  App Store
                  {os === "ios" && (
                    <span className="ml-2 px-2 py-0.5 bg-indigo-600 text-[10px] rounded-full">Recommended</span>
                  )}
                </Button>

                <Button
                  variant="contained"
                  size="large"
                  startIcon={<FaGooglePlay className="text-xl" />}
                  className={`px-8 py-4 rounded-2xl normal-case text-lg font-semibold transition-all duration-300 ${
                    os === "android"
                      ? "bg-white text-black scale-105 shadow-xl shadow-white/10"
                      : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                  }`}
                  href={APP_DOWNLOAD_CONFIG.ANDROID_DOWNLOAD_URL}
                  target="_blank"
                >
                  Google Play
                  {os === "android" && (
                    <span className="ml-2 px-2 py-0.5 bg-indigo-600 text-[10px] rounded-full">Recommended</span>
                  )}
                </Button>
              </Box>

              {os === "desktop" && (
                <Box className="flex items-center gap-8 lg:p-6 p-4 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm max-w-fit">
                  <div className="space-y-2">
                    <Typography className="text-sm font-medium text-slate-300">Scan to download</Typography>
                    <div className="flex gap-4">
                      {/* iOS */}
                      <div className="flex flex-col items-center gap-2 bg-white p-3 rounded-xl">
                        <div className="relative w-40 h-40 rounded-lg overflow-hidden">
                          <Image
                            src="/images/qr-ios.webp"
                            alt="Download app on iOS"
                            fill
                            className="object-contain"
                            sizes="140px"
                            priority
                          />
                        </div>
                        <span className="text-sm font-medium text-slate-700">iOS</span>
                      </div>

                      {/* Android */}
                      <div className="flex flex-col items-center gap-2 bg-white p-3 rounded-xl">
                        <div className="relative w-40 h-40 rounded-lg overflow-hidden">
                          <Image
                            src="/images/qr-android.png"
                            alt="Download app on Android"
                            fill
                            className="object-contain"
                            sizes="140px"
                            priority
                          />
                        </div>
                        <span className="text-sm font-medium text-slate-700">Android</span>
                      </div>
                    </div>
                  </div>
                </Box>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} lg={5} className="relative">
            <Box ref={mockupRef} className="relative z-10">
              <div className="relative group">
                <div className="absolute inset-0 bg-indigo-500 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
                <Image
                  src="/images/app-mockup.png"
                  alt="App Mockup"
                  width={600}
                  height={800}
                  className="relative z-20 drop-shadow-2xl animate-float"
                  priority
                />
              </div>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </Box>
  );
};

export default DownloadHero;
