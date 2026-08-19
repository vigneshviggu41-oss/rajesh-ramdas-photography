"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Calendar } from "lucide-react";
import Logo from "./Logo";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const navItems = [
    { label: "Portfolio", href: "#portfolio", number: "01" },
    { label: "Stories", href: "#stories", number: "02" },
    { label: "About", href: "#about", number: "03" },
    { label: "Experience", href: "#experience", number: "04" },
    { label: "Contact", href: "#contact", number: "05" },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference pointer-events-none">
        <div className="flex h-24 items-center justify-between px-6 md:px-14 pointer-events-auto">
          {/* Bespoke Luxury Logo */}
          <Logo variant="full" />

          {/* Desktop Navigation Links & Appointment CTA */}
          <div className="hidden lg:flex items-center gap-10">
            <nav aria-label="Main Navigation" className="flex items-center gap-9">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-[9.5px] font-medium uppercase tracking-[0.22em] text-paper/85 transition-colors hover:text-accent focus-visible:outline-accent"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-accent/80 bg-ink/40 backdrop-blur-md px-5 py-2.5 text-[8.5px] font-semibold uppercase tracking-[0.24em] text-accent transition-all hover:bg-accent hover:text-ink focus-visible:outline-accent"
            >
              <Calendar size={12} />
              <span>Book Appointment</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="grid h-11 w-11 place-items-center text-paper lg:hidden focus-visible:outline-accent border border-white/20 bg-ink/30 backdrop-blur-md"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Fullscreen Luxury Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-6 pb-12 pt-28 lg:hidden"
          >
            <div>
              <div className="mb-6">
                <Logo variant="full" />
              </div>
              <p className="editorial-label mb-6">Fine Art & Wedding Photography · Kakinada</p>
              <div className="flex flex-col">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline justify-between border-t border-white/10 py-4 font-serif text-4xl md:text-5xl tracking-tight text-paper transition-colors hover:text-accent"
                  >
                    <span>{item.label}</span>
                    <span className="font-sans text-[9px] font-normal tracking-[0.2em] text-muted">
                      {item.number}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="w-full text-center border border-accent bg-accent/10 py-3 text-[9px] font-semibold uppercase tracking-[0.24em] text-accent"
              >
                Book a Consultation
              </a>
              <div className="text-[8px] uppercase tracking-[0.22em] text-muted">
                Sri T. Rajesh Ramdas
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
