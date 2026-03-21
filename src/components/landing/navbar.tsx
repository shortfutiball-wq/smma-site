"use client";

import Link from "next/link";
import { ArrowRight, Instagram, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.80)",
        backdropFilter: "blur(16px)",
        borderColor: scrolled ? "var(--border)" : "transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center font-black text-sm"
            style={{ background: "var(--lime)", color: "#0d0d0d" }}
          >
            L
          </div>
          <span className="font-bold text-base" style={{ color: "var(--text)" }}>Lattic</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium" style={{ color: "var(--muted)" }}>
          <Link href="#services" className="hover:text-[#0d0d0d] transition-colors">Services</Link>
          <Link href="#work" className="hover:text-[#0d0d0d] transition-colors">Portfolio</Link>
          <Link href="#faq" className="hover:text-[#0d0d0d] transition-colors">FAQ</Link>
        </div>

        {/* Right: socials + CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2">
            <a
              href="https://instagram.com/lattic.agency"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-gray-100"
              style={{ color: "var(--muted)" }}
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/company/lattic"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-gray-100"
              style={{ color: "var(--muted)" }}
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
          <Link
            href="#contact"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-all hover:brightness-105 active:scale-95"
            style={{ background: "var(--lime)", color: "#0d0d0d" }}
          >
            Audit gratuit <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
