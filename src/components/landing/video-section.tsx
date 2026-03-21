"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cards = [
  { img: "/portfolio-restaurant.png", title: "Restaurant",  desc: "Site, réservation en ligne et réseaux sociaux." },
  { img: "/portfolio-plombier.png",   title: "Plombier",    desc: "Génération de leads locaux et devis en ligne." },
  { img: "/portfolio-avocat.png",     title: "Avocat",      desc: "Référencement local et autorité en ligne." },
  { img: "/portfolio-architecte.png", title: "Architecte",  desc: "Portfolio digital et acquisition de projets." },
  { img: "/portfolio-fastfood.png",   title: "Fast food",   desc: "Commande en ligne et fidélisation client." },
];

export function VideoSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section style={{ background: "#0d0d0d" }}>
      {/* Titre */}
      <div className="max-w-6xl mx-auto px-4 md:px-10 pt-16 md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>Portfolio</p>
          <h2 className="font-heading text-5xl md:text-7xl font-bold tracking-tight" style={{ color: "#FFFEFC" }}>Nos récentes collaborations</h2>
        </motion.div>
      </div>

      {/* Séparateur horizontal — pleine largeur page */}
      <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.18)" }} />

      {/* Fan cards */}
      <div className="max-w-6xl mx-auto px-4 md:px-10 pb-16 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Grand aperçu au hover */}
          <div className="relative" style={{ minHeight: 520 }}>
            <AnimatePresence>
              {hovered !== null && (
                <motion.div
                  key={hovered}
                  initial={{ opacity: 0, scale: 0.88, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 10 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-1/2 z-20 overflow-hidden"
                  style={{
                    width: 520,
                    height: 380,
                    top: 0,
                    transform: "translateX(-50%)",
                    borderRadius: 18,
                    boxShadow: "0 40px 100px rgba(0,0,0,0.85)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "#FFFEFC",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cards[hovered].img}
                    alt={cards[hovered].title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
                  />
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
                    padding: "24px 20px 16px",
                  }}>
                    <p style={{ color: "#FFFEFC", fontWeight: 700, fontSize: "1rem", margin: 0 }}>{cards[hovered].title}</p>
                    <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.8rem", margin: "4px 0 0" }}>{cards[hovered].desc}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Fan cards */}
            <div className="fan-cards" style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
              {cards.map((c, i) => (
                <div
                  key={c.title}
                  className="fan-card"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.img} alt={c.title} loading="lazy" />
                  <div className="fan-card-label">{c.title}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
