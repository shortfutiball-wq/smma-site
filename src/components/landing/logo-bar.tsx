"use client";

/* eslint-disable @next/next/no-img-element */

const IMG_FILTER = "brightness(0) invert(1) opacity(0.4)";

const logos = [
  { src: "/logo-figaro.svg",     alt: "Le Figaro",   h: 22 },
  { src: "/logo-laprovence.png", alt: "La Provence", h: 22 },
  { src: "/logo-parisien.svg",   alt: "Le Parisien", h: 26 },
  { src: "/logo-lepoint.svg",    alt: "Le Point",    h: 26 },
];

const items = [...logos, ...logos, ...logos];

export function LogoBar() {
  return (
    <div className="border-t border-b" style={{ background: "#111111", borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="max-w-6xl mx-auto overflow-hidden">
        {/* ILS PARLENT DE NOUS | logos */}
        <div className="h-12 flex items-stretch">
          <div className="shrink-0 px-8 flex items-center border-r" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <span className="text-xs font-bold uppercase tracking-widest whitespace-nowrap" style={{ color: "rgba(255,255,255,0.35)" }}>
              ILS PARLENT DE NOUS
            </span>
          </div>
          <div className="flex-1 overflow-hidden flex items-center">
            <div className="ticker-track flex items-center gap-16">
              {items.map((logo, i) => (
                <img
                  key={i}
                  src={logo.src}
                  alt={logo.alt}
                  height={logo.h}
                  style={{ height: logo.h, width: "auto", display: "block", filter: IMG_FILTER, flexShrink: 0 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
