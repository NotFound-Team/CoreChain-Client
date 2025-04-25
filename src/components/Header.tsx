"use client";
// -- React --
import React, { useState } from "react";

// -- Next --
import Image from "next/image";
import Link from "next/link";

// -- Reac-icon --
import { IoIosMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";

// -- GSAP
import { gsap } from "gsap";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const token = localStorage.getItem("token");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuRef = React.useRef(null);

  React.useEffect(() => {
    if (isMenuOpen) {
      gsap.to(menuRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.5)",
      });
    } else {
      gsap.to(menuRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.5,
        ease: "back.in(1.5)",
      });
    }

    const handleScroll = () => {
      setShowHeader(window.scrollY > 70);
    };
    console.log("check");

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  return (
    <>
      <div className="relative h-[72px]">
        <div
          className={`
              bg-white absolute left-0 right-0 z-50 
              ${showHeader && "fixed -top-[72px] translate-y-[72px] transition-transform duration-400 shadow-md"}
            `}
        >
          <div className="container mx-auto w-full max-sm:px-4">
            <div className="flex items-center justify-between py-4">
              <div>
                <Image
                  src={"/images/logo-color 1.png"}
                  alt="Logo company"
                  width={150}
                  height={300}
                  style={{
                    height: "auto",
                  }}
                  className="max-lg:w-[100px]"
                  priority
                />
              </div>

              <nav className="max-lg:hidden">
                <ul className="flex items-center gap-x-6 text-[#5C5F6E] max-xl:text-[14px]">
                  <li>Features</li>
                  <li>Solutions</li>
                  <li>NFT Storage</li>
                  <li>Pricing</li>
                  <li>Developers</li>
                </ul>
              </nav>

              <div className="max-lg:hidden">
                <ul className="flex items-center gap-x-8 max-xl:text-[14px]">
                  <li className="text-[#5C5F6E]">App</li>
                  <li className="text-[#5C5F6E]">English</li>
                  {token ? (
                    <li className="bg-[#651FFF] text-white font-bold px-6 py-2 rounded-md">
                      <Link href={"/dashboard"}>Go to Dashboard</Link>
                    </li>
                  ) : (
                    <li className="font-bold outline-black outline-3 px-2 py-1 rounded-md">
                      <Link href={"/login"}>Sign In</Link>
                    </li>
                  )}
                </ul>
              </div>

              <div className="hidden max-lg:block text-2xl cursor-pointer" onClick={toggleMenu}>
                <IoIosMenu />
              </div>
            </div>

            <div
              ref={menuRef}
              className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg py-4 transform ${
                isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
              } transition-all ease-in-out`}
            >
              <div className="cursor-pointer text-xl mb-4 px-4" onClick={toggleMenu}>
                <IoClose />
              </div>
              <ul className="flex flex-col gap-y-4 text-[#5C5F6E] text-center">
                <li className="hover:bg-[#651FFF] hover:text-white transition-all duration-300 py-2 transform">
                  Features
                </li>
                <li className="hover:bg-[#651FFF] hover:text-white transition-all duration-300 py-2">Solutions</li>
                <li className="hover:bg-[#651FFF] hover:text-white transition-all duration-300 py-2">NFT Storage</li>
                <li className="hover:bg-[#651FFF] hover:text-white transition-all duration-300 py-2">Pricing</li>
                <li className="hover:bg-[#651FFF] hover:text-white transition-all duration-300 py-2">Developers</li>
                <li className="hover:bg-[#651FFF] hover:text-white transition-all duration-300 py-2">
                  <Link href={"/login"}>Sign In</Link>
                </li>
                <li className="hover:bg-[#651FFF] hover:text-white transition-all duration-300 py-2">
                  <Link href={"/register"}>Create an account</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
