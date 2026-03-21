"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "40+", label: "commerces accompagnés" },
  { value: "94%", label: "de clients satisfaits" },
  { value: "60 j", label: "pour les premiers résultats" },
  { value: "0 €", label: "d'engagement minimum" },
];

const sectors = [
  "Plomberie & BTP",
  "Restauration",
  "Juridique",
  "Architecture",
  "Beauté & Bien-être",
  "Auto & Mécanique",
  "Santé & Médical",
  "Comptabilité",
];

export function LogoBar() {
  return (
    <section className="section-green py-10 border-y" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-6xl mx-auto px-10">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="text-center"
            >
              <p className="text-2xl font-black" style={{ color: "var(--text)" }}>{s.value}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px mb-6" style={{ background: "var(--border)" }} />

        {/* Sectors */}
        <div>
          <p className="text-center text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--muted)" }}>
            Secteurs que nous accompagnons
          </p>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {sectors.map((s) => (
              <span
                key={s}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: "var(--bg-card)", color: "var(--muted)", border: "1px solid var(--border)" }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
