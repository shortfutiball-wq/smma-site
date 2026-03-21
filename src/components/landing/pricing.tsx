"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const sans = [
  "Invisible sur Google (zéro trafic)",
  "Dépendance totale au bouche-à-oreille",
  "Publicités qui gaspillent votre budget",
  "Aucun nouveau devis via votre site",
  "Chiffre d'affaires qui stagne",
];

const avec = [
  "N°1 sur Google dans votre ville",
  "Flux continu de nouveaux prospects",
  "Publicités rentables pilotées au ROI",
  "Un site qui vend et convertit 24h/24",
  "Croissance garantie chaque mois",
];

export function Pricing() {
  return (
    <section id="pricing" style={{ background: "#0d0d0d", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-10 pt-12 md:pt-20 pb-8 md:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>COMPARAISON</p>
          <h2 className="font-heading text-4xl md:text-7xl font-bold tracking-tight" style={{ color: "#ffffff" }}>
            Pourquoi nous choisir ?
          </h2>
        </motion.div>
      </div>

      <div className="h-px" style={{ background: "rgba(255,255,255,0.07)" }} />

      <div className="max-w-5xl mx-auto px-4 md:px-10 pt-10 md:pt-16 pb-16 md:pb-28">
        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

          {/* Sans nous */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl p-6 sm:p-10 flex flex-col gap-6"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Sans nous</p>
              <p className="text-2xl font-bold" style={{ color: "#f87171" }}>Vous stagez.</p>
            </div>
            <ul className="space-y-4 sm:space-y-5">
              {sans.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(248,113,113,0.12)" }}>
                    <X className="w-3 h-3" style={{ color: "#f87171" }} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* VS séparateur mobile (visible seulement sur mobile) */}
          <div className="flex sm:hidden justify-center items-center py-1">
            <div className="w-11 h-11 rounded-full flex items-center justify-center font-black text-xs" style={{ background: "#ffffff", color: "#0d0d0d", border: "3px solid rgba(255,255,255,0.2)" }}>
              VS
            </div>
          </div>

          {/* VS badge desktop (visible seulement sur sm+) */}
          <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full items-center justify-center font-black text-xs shadow-xl" style={{ background: "#ffffff", color: "#0d0d0d", border: "3px solid #0d0d0d" }}>
            VS
          </div>

          {/* Avec nous */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl p-6 sm:p-10 flex flex-col gap-6"
            style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.25)", boxShadow: "0 20px 60px rgba(74,222,128,0.06)" }}
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.3)" }}>Avec nous</p>
              <p className="text-2xl font-bold" style={{ color: "#4ade80" }}>Vous grandissez.</p>
            </div>
            <ul className="space-y-4 sm:space-y-5">
              {avec.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(74,222,128,0.15)" }}>
                    <Check className="w-3 h-3" style={{ color: "#4ade80" }} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      <div className="h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
    </section>
  );
}
