import React, { Suspense } from "react";

import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { Boxes } from "../../components/ui/background-boxes";
// import { WorldMap } from "../../components/ui/world-map";

import TeamWork from "../../assets/images/Influencer Marketing on Food Products.png";
import ImgBlockChain from "../../assets/images/blockchain.png";

import { cn } from "../../lib/utils";
import { motion } from "motion/react";

// import Slider from "../../components/HomePage/Slider";
import Header from "../../components/HomePage/Header";
// import Subitle from "../../components/HomePage/Subtitle";
// import Footer from "../../components/HomePage/Footer";

// lazy loading
const WorldMap = React.lazy(() => import("../../components/ui/world-map"));
const Footer = React.lazy(() => import("../../components/HomePage/Footer"));
const Slider = React.lazy(() => import("../../components/HomePage/Slider"));
const Subitle = React.lazy(() => import("../../components/HomePage/Subtitle"));

function LayoutDefault() {
  return (
    <>
      <Suspense
        fallback={
          <Spin
            fullscreen
            tip="Loading..."
            indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
          />
        }
      >
        <div className="bg-[#053F7E] dark:bg-gray-900 dark:text-gray-100">
          {/* Header  */}
          <Header />

          {/* Hero */}
          <div className="py-20">
            <div className="dark:bg-gray-900 dark:text-gray-100 h-[500px] relative w-full overflow-hidden bg-[#074385] flex-center max-md:block flex-col rounded-lg">
              <div className="dark:bg-gray-900 dark:text-gray-100 absolute inset-0 w-full h-full bg-[#053F7E] z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

              <Boxes className="max-md:hidden" />
              <div className="container mx-auto flex items-center justify-between max-md:block max-md:px-4">
                <div className="max-w-xl w-1/2 mr-10 relative z-20 max-md:w-full max-md:mb-20">
                  <h1
                    className={cn(
                      "md:text-5xl max-md:text-xl text-xl font-bold text-white relative z-20"
                    )}
                  >
                    Get More Done with whitepace
                  </h1>
                  <p className="mt-6 mb-6 text-neutral-300 relative z-20 max-md:text-sm">
                    Project management software that enables your teams to
                    collaborate, plan, analyze and manage everyday tasks
                  </p>
                  <a
                    href="/"
                    className="bg-[#4F9CF9] py-4 px-6 rounded-xl relative z-20 max-md:py-2 max-md:px-4 max-md:text-sm"
                  >
                    Try Whitepace free
                  </a>
                </div>
                <div className="flex-1 max-w-xl max-md:w-full">
                  <img
                    className="w-full h-auto object-cover relative z-20"
                    src={TeamWork}
                    alt="TeamWork"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Slider */}
        <Slider />
        {/* Word map  */}
        <div className="dark:bg-gray-900 dark:text-gray-100">
          <div className="container mx-auto max-md:px-4">
            <div className=" py-40 dark:bg-gray-900 bg-white w-full">
              <div className="max-w-7xl mx-auto text-center">
                <p className="font-bold text-xl md:text-4xl dark:text-white text-black">
                  Remote{" "}
                  <span className="text-neutral-400">
                    {"Connectivity".split("").map((word, idx) => (
                      <motion.span
                        key={idx}
                        className="inline-block"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: idx * 0.04 }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </span>
                </p>
                <p className="text-sm md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
                  Break free from traditional boundaries. Work from anywhere, at
                  the comfort of your own studio apartment. Perfect for Nomads
                  and Travellers.
                </p>
              </div>
              <WorldMap
                dots={[
                  {
                    start: {
                      lat: 64.2008,
                      lng: -149.4937,
                    }, // Alaska (Fairbanks)
                    end: {
                      lat: 34.0522,
                      lng: -118.2437,
                    }, // Los Angeles
                  },
                  {
                    start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
                    end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
                  },
                  {
                    start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
                    end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
                  },
                  {
                    start: { lat: 51.5074, lng: -0.1278 }, // London
                    end: { lat: 28.6139, lng: 77.209 }, // New Delhi
                  },
                  {
                    start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                    end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
                  },
                  {
                    start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                    end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
                  },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Title Block Chain  */}
        <div className="dark:bg-gray-900 dark:text-gray-100">
          <div className="container mx-auto py-16 flex items-center justify-between max-md:block max-md:px-4">
            <div className="w-1/2 mr-16 max-md:w-full max-md:mb-8">
              <img
                src={ImgBlockChain}
                alt="Block Chain"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="flex-1 max-md:text-center">
              <h2 className="text-6xl font-bold mb-8 max-md:text-2xl">
                Use Block Chain technology to secure information
              </h2>
              <p>
                Whitepace teams up with your favorite software. Integrate with
                over 1000+ apps with Zapier to have all the tools you need for
                your project success.
              </p>
            </div>
          </div>
        </div>

        {/* Subtitle  */}
        <Subitle />

        {/* Footer  */}
        <Footer />
      </Suspense>
    </>
  );
}

export default LayoutDefault;
