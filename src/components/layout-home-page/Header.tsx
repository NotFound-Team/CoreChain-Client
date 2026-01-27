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

const MENU_ITEMS = [
  { label: "Features", href: "/features" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Developers", href: "/developers" },
  { label: "Jobs", href: "/jobs" },
  { label: "FAQ", href: "/faq" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const menuRef = React.useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  // Handle click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Handle body scroll locking
  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  React.useEffect(() => {
    if (isMenuOpen) {
      gsap.to(menuRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(menuRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }

    const handleScroll = () => {
      setShowHeader(window.scrollY > 70);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  return (
    <div className="relative h-[72px]">
      <div
        className={`
              bg-[var(--bg-paper)] absolute left-0 right-0 z-50 transition-colors duration-300
              ${
                showHeader &&
                "fixed -top-[72px] translate-y-[72px] transition-transform duration-400 shadow-[var(--shadow-md)]"
              }
            `}
      >
        <div className="container mx-auto w-full px-4">
          <div className="flex items-center justify-between py-4">
            <Link href={"/"} className="flex items-center gap-x-2">
              <Image
                src={"/images/corechain.png"}
                alt="Logo company"
                width={40}
                height={40}
                className="object-contain"
              />
              <h1 className="font-bold text-xl">CoreChain</h1>
            </Link>

            <nav className="max-lg:hidden">
              <ul className="flex items-center gap-x-6 text-[var(--text-secondary)] max-xl:text-[14px]">
                {MENU_ITEMS.map((item) => (
                  <li key={item.label} className="hover:text-[var(--color-primary)] transition-colors cursor-pointer">
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="max-lg:hidden">
              <ul className="flex items-center gap-x-8 max-xl:text-[14px]">
                <Link
                  href={"/download"}
                  className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors cursor-pointer"
                >
                  App
                </Link>
                <li className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors cursor-pointer">
                  English
                </li>
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

            <div
              className="hidden max-lg:block text-2xl cursor-pointer text-[var(--text-primary)]"
              onClick={toggleMenu}
            >
              <IoIosMenu />
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop - Moved outside to avoid transform clipping */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[55] lg:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu - Moved outside to avoid transform clipping */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 w-72 h-full bg-[var(--bg-paper)] shadow-[var(--shadow-xl)] py-6 z-[60] lg:hidden translate-x-full opacity-0`}
      >
        <div className="flex items-center justify-between px-6 mb-8">
          <span className="font-bold text-lg text-[var(--color-primary)]">Menu</span>
          <div
            className="cursor-pointer text-2xl text-[var(--text-primary)] hover:text-[var(--color-primary)] transition-colors"
            onClick={closeMenu}
          >
            <IoClose />
          </div>
        </div>
        
        <ul className="flex flex-col px-4 gap-y-1">
          {MENU_ITEMS.map((item) => (
            <li key={item.label}>
              <Link 
                href={item.href}
                onClick={closeMenu}
                className="block px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-200"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <hr className="my-2 border-slate-100 dark:border-slate-800" />
          <li>
            <Link 
              href="/download"
              onClick={closeMenu}
              className="block px-4 py-3 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-200"
            >
              App
            </Link>
          </li>
          <li>
            <Link 
              href="/login"
              onClick={closeMenu}
              className="block px-4 py-3 mt-4 text-center font-bold bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-all duration-200"
            >
              {token ? "Dashboard" : "Sign In"}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
