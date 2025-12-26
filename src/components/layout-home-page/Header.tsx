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
  const [token, setToken] = useState<string | null>(null);
  // const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuRef = React.useRef(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  return (
    <>
      <div className="relative h-[72px]">
        <div
          className={`
              bg-[var(--bg-paper)] absolute left-0 right-0 z-50 transition-colors duration-300
              ${showHeader && "fixed -top-[72px] translate-y-[72px] transition-transform duration-400 shadow-[var(--shadow-md)]"}
            `}
        >
          <div className="container mx-auto w-full px-4">
            <div className="flex items-center justify-between py-4">
              <Link href={'/'}>
                <Image
                  src={"/images/logo-color 1.png"}
                  alt="Logo company"
                  width={150}
                  height={100}
                  className="max-lg:w-[100px]"
                />
              </Link>

              <nav className="max-lg:hidden">
                <ul className="flex items-center gap-x-6 text-[var(--text-secondary)] max-xl:text-[14px]">
                  <li className="hover:text-[var(--color-primary)] transition-colors cursor-pointer">Features</li>
                  <li className="hover:text-[var(--color-primary)] transition-colors cursor-pointer">Solutions</li>
                  <li className="hover:text-[var(--color-primary)] transition-colors cursor-pointer">NFT Storage</li>
                  <li className="hover:text-[var(--color-primary)] transition-colors cursor-pointer">Pricing</li>
                  <li className="hover:text-[var(--color-primary)] transition-colors cursor-pointer">Developers</li>
                </ul>
              </nav>

              <div className="max-lg:hidden">
                <ul className="flex items-center gap-x-8 max-xl:text-[14px]">
                  <li className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors cursor-pointer">App</li>
                  <li className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors cursor-pointer">English</li>
                  {token ? (
                    <li className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold px-6 py-2 rounded-[var(--radius-sm)] transition-all duration-300">
                      <Link href={"/dashboard"}>Go to Dashboard</Link>
                    </li>
                  ) : (
                    <li className="font-bold border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white px-4 py-1 rounded-[var(--radius-sm)] transition-all duration-300">
                      <Link href={"/login"}>Sign In</Link>
                    </li>
                  )}
                </ul>
              </div>

              <div className="hidden max-lg:block text-2xl cursor-pointer text-[var(--text-primary)]" onClick={toggleMenu}>
                <IoIosMenu />
              </div>
            </div>

            <div
              ref={menuRef}
              className={`fixed top-0 right-0 w-64 h-full bg-[var(--bg-paper)] shadow-[var(--shadow-xl)] py-4 transform ${
                isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
              } transition-all ease-in-out`}
            >
              <div className="cursor-pointer text-xl mb-4 px-4 text-[var(--text-primary)] hover:text-[var(--color-primary)]" onClick={toggleMenu}>
                <IoClose />
              </div>
              <ul className="flex flex-col gap-y-4 text-[var(--text-secondary)] text-center">
                <li className="hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 py-2 transform">
                  Features
                </li>
                <li className="hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 py-2">Solutions</li>
                <li className="hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 py-2">NFT Storage</li>
                <li className="hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 py-2">Pricing</li>
                <li className="hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 py-2">Developers</li>
                <li className="hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 py-2">
                  <Link href={"/login"}>Sign In</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
