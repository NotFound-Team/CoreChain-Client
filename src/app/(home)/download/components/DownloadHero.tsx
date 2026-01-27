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
      sx={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(to bottom right, #020617, #0f172a, #1e1b4b)",
        color: "white",
        py: { xs: 8, lg: 16 },
      }}
    >
      {/* Background Decorative Elements */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 500,
          height: 500,
          bgcolor: "primary.main",
          opacity: 0.2,
          borderRadius: "50%",
          filter: "blur(120px)",
          mr: -32,
          mt: -32,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: 500,
          height: 500,
          bgcolor: "#4f46e5",
          opacity: 0.1,
          borderRadius: "50%",
          filter: "blur(120px)",
          ml: -32,
          mb: -32,
        }}
      />

      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, lg: 8 }} alignItems="center">
          <Grid item xs={12} lg={7}>
            <Box ref={textRef}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
                <Box
                  sx={{
                    bgcolor: "rgba(255,255,255,0.1)",
                    p: 1.5,
                    borderRadius: 2,
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <Image
                    src="/images/corechain.png"
                    alt="Core Chain Logo"
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    letterSpacing: "-0.025em",
                    color: "rgba(255,255,255,0.9)",
                    fontSize: { xs: "0.875rem", md: "1.25rem" },
                  }}
                >
                  CORE CHAIN CLIENT
                </Typography>
              </Box>

              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.25rem", md: "3.75rem", lg: "4.5rem" },
                  fontWeight: 800,
                  mb: 3,
                  lineHeight: 1.1,
                  background: "linear-gradient(to right, #fff, #c7d2fe, #818cf8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                The Future of <br /> Digital Assets.
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: "1rem", md: "1.25rem" },
                  color: "#94a3b8",
                  mb: 5,
                  maxWidth: "36rem",
                  lineHeight: 1.6,
                }}
              >
                Experience secure, transparent, and ultra-fast blockchain management. Download the Core Chain Client
                today and take control of your digital identity.
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: { xs: 4, lg: 6 } }}>
                <Button
                  variant="contained"
                  sx={{
                    px: { xs: 4, md: 5 },
                    py: 2,
                    borderRadius: 4,
                    textTransform: "none",
                    fontSize: { xs: "0.875rem", md: "1.125rem" },
                    fontWeight: 600,
                    transition: "all 0.3s",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    ...(os === "ios"
                      ? {
                          bgcolor: "white",
                          color: "black",
                          "&:hover": { bgcolor: "#f1f5f9" },
                          transform: "scale(1.05)",
                          boxShadow: "0 20px 25px -5px rgba(255,255,255,0.1)",
                        }
                      : {
                          bgcolor: "rgba(255,255,255,0.05)",
                          color: "white",
                          border: "1px solid rgba(255,255,255,0.1)",
                          "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                        }),
                  }}
                  startIcon={<FaApple style={{ fontSize: "1.5rem" }} />}
                  href={APP_DOWNLOAD_CONFIG.IOS_DOWNLOAD_URL}
                  target="_blank"
                >
                  App Store
                  {os === "ios" && (
                    <Box
                      component="span"
                      sx={{
                        ml: 1,
                        px: 1.5,
                        py: 0.5,
                        bgcolor: "#4f46e5",
                        color: "white",
                        fontSize: "10px",
                        borderRadius: 999,
                      }}
                    >
                      Recommended
                    </Box>
                  )}
                </Button>

                <Button
                  variant="contained"
                  sx={{
                    px: { xs: 4, md: 5 },
                    py: 2,
                    borderRadius: 4,
                    textTransform: "none",
                    fontSize: { xs: "0.875rem", md: "1.125rem" },
                    fontWeight: 600,
                    transition: "all 0.3s",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    ...(os === "android"
                      ? {
                          bgcolor: "white",
                          color: "black",
                          "&:hover": { bgcolor: "#f1f5f9" },
                          transform: "scale(1.05)",
                          boxShadow: "0 20px 25px -5px rgba(255,255,255,0.1)",
                        }
                      : {
                          bgcolor: "rgba(255,255,255,0.05)",
                          color: "white",
                          border: "1px solid rgba(255,255,255,0.1)",
                          "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                        }),
                  }}
                  startIcon={<FaGooglePlay style={{ fontSize: "1.25rem" }} />}
                  href={APP_DOWNLOAD_CONFIG.ANDROID_DOWNLOAD_URL}
                  target="_self"
                  download
                >
                  Download APK
                  {os === "android" && (
                    <Box
                      component="span"
                      sx={{
                        ml: 1,
                        px: 1.5,
                        py: 0.5,
                        bgcolor: "#4f46e5",
                        color: "white",
                        fontSize: "10px",
                        borderRadius: 999,
                      }}
                    >
                      Recommended
                    </Box>
                  )}
                </Button>
              </Box>

              {os === "desktop" && (
                <Box
                  sx={{
                    display: "inline-flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "flex-start", sm: "center" },
                    gap: { xs: 2, sm: 4 },
                    p: { xs: 3, md: 4 },
                    bgcolor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 6,
                    backdropFilter: "blur(10px)",
                    width: { xs: "100%", sm: "auto" },
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Typography sx={{ fontSize: "0.875rem", fontWeight: 500, color: "#cbd5e1" }}>
                      Scan to download
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, flexWrap: { xs: "wrap", sm: "nowrap" } }}>
                      {/* iOS */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 1,
                          bgcolor: "white",
                          p: 1.5,
                          borderRadius: 3,
                        }}
                      >
                        <Box
                          sx={{
                            position: "relative",
                            width: { xs: 80, sm: 120, md: 160 },
                            height: { xs: 80, sm: 120, md: 160 },
                            borderRadius: 2,
                            overflow: "hidden",
                          }}
                        >
                          <Image
                            src="/images/qr-ios.webp"
                            alt="Download app on iOS"
                            fill
                            className="object-contain"
                            sizes="(max-width: 640px) 80px, 160px"
                            priority
                          />
                        </Box>
                        <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, color: "#334155" }}>iOS</Typography>
                      </Box>

                      {/* Android */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 1,
                          bgcolor: "white",
                          p: 1.5,
                          borderRadius: 3,
                        }}
                      >
                        <Box
                          sx={{
                            position: "relative",
                            width: { xs: 80, sm: 120, md: 160 },
                            height: { xs: 80, sm: 120, md: 160 },
                            borderRadius: 2,
                            overflow: "hidden",
                          }}
                        >
                          <Image
                            src="/images/qr-android.png"
                            alt="Download app on Android"
                            fill
                            className="object-contain"
                            sizes="(max-width: 640px) 80px, 160px"
                            priority
                          />
                        </Box>
                        <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, color: "#334155" }}>Android</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} lg={5} sx={{ position: "relative" }}>
            <Box ref={mockupRef} sx={{ position: "relative", zIndex: 10 }}>
              <Box sx={{ position: "relative", "&:hover .glow": { opacity: 0.4 } }}>
                <Box
                  className="glow"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    bgcolor: "#6366f1",
                    borderRadius: "50%",
                    filter: "blur(80px)",
                    opacity: 0.2,
                    transition: "opacity 0.7s",
                  }}
                />
                <Image
                  src="/images/app-mockup.png"
                  alt="App Mockup"
                  width={600}
                  height={800}
                  className="relative z-20 drop-shadow-2xl animate-float"
                  priority
                  style={{ width: "100%", height: "auto", maxWidth: "500px", margin: "0 auto" }}
                />
              </Box>
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
