"use client";

import { useState, useEffect } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-10 h-16 grid items-center" style={{ gridTemplateColumns: "1fr auto 1fr" }}>
        {/* Gauche vide */}
        <div />
        {/* Centre : Lattic script */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/lattic-script-transparent.png"
          alt="Lattic"
          style={{
            height: 48,
            width: "auto",
            display: "block",
            filter: scrolled ? "invert(1)" : "none",
            transition: "filter 0.3s ease",
          }}
        />
        <div />
      </div>
    </nav>
  );
}
