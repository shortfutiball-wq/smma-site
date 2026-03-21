"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, Star, TrendingUp, Zap, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section className="section-cream pt-32 pb-24 px-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left */}
          <div className="flex-1">
            {/* Urgency badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest mb-8"
              style={{ borderColor: "var(--border)", color: "#5a7a00", background: "#f0ffe0" }}
            >
              <Zap className="w-3 h-3" fill="currentColor" />
              2 nouvelles places disponibles en avril
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-6xl md:text-7xl font-black tracking-tight leading-[0.95] mb-6"
              style={{ color: "var(--text)" }}
            >
              Vos clients vous
              <br />
              <span style={{ color: "#b0b0b0" }}>cherchent sur Google.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base leading-relaxed mb-6 max-w-md"
              style={{ color: "var(--muted)" }}
            >
              Lattic vous place en tête des résultats locaux et transforme chaque visiteur en devis.
              Sites haute conversion, SEO local dominant, relances automatisées.
            </motion.p>

            {/* Guarantee pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-8"
              style={{ background: "rgba(191,245,73,0.15)", color: "#4a6900", border: "1px solid rgba(191,245,73,0.4)" }}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Résultats visibles sous 90 jours — garanti
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex items-center gap-4 flex-wrap"
            >
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold transition-all hover:brightness-105 active:scale-95"
                style={{ background: "var(--lime)", color: "#0d0d0d" }}
              >
                Recevoir mon audit gratuit <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                Aucun engagement · Réponse sous 24h
              </p>
            </motion.div>
          </div>

          {/* Right — résultats clients */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex-1 w-full max-w-lg"
          >
            <div
              className="rounded-2xl border p-6 relative overflow-hidden"
              style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
            >
              {/* Google snippet mock */}
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-xs font-mono" style={{ color: "var(--muted)" }}>google.com · résultats locaux</span>
              </div>

              {/* 3 client results */}
              <div className="space-y-2 mb-5">
                {[
                  { name: "Plombier Paris 15 · Client Lattic", rank: 1, stars: 4.9, reviews: 127 },
                  { name: "Karim Plomberie & Chauffage", rank: 2, stars: 4.7, reviews: 89 },
                  { name: "Paris Plomb Urgence", rank: 3, stars: 4.3, reviews: 44 },
                ].map((r, i) => (
                  <div
                    key={r.name}
                    className="rounded-xl border px-3 py-2.5 flex items-center gap-3"
                    style={{
                      background: i === 0 ? "var(--bg)" : "transparent",
                      borderColor: i === 0 ? "var(--border)" : "transparent",
                      opacity: i === 0 ? 1 : 0.45,
                    }}
                  >
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center font-black text-xs shrink-0"
                      style={{
                        background: i === 0 ? "var(--lime)" : "var(--border)",
                        color: "#0d0d0d",
                      }}
                    >
                      {r.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate" style={{ color: "var(--text)" }}>{r.name}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                        ))}
                        <span className="text-xs ml-0.5" style={{ color: "var(--muted)" }}>{r.stars} ({r.reviews})</span>
                      </div>
                    </div>
                    {i === 0 && (
                      <div
                        className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold"
                        style={{ background: "var(--lime)", color: "#0d0d0d" }}
                      >
                        <MapPin className="w-2.5 h-2.5" />
                        #1
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1" style={{ color: "var(--muted)" }}>
                    <span className="font-medium">Demandes de devis / semaine</span>
                    <span className="font-bold" style={{ color: "var(--text)" }}>+340%</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: "var(--border)" }}>
                    <div className="h-full rounded-full" style={{ background: "var(--lime)", width: "85%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1" style={{ color: "var(--muted)" }}>
                    <span className="font-medium">Chiffre d&apos;affaires mensuel</span>
                    <span className="font-bold" style={{ color: "var(--text)" }}>+5 000 €</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: "var(--border)" }}>
                    <div className="h-full rounded-full" style={{ background: "var(--lime)", width: "65%" }} />
                  </div>
                </div>
              </div>

              {/* Bottom label */}
              <div className="flex items-center justify-between mt-5 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" style={{ color: "#5a7a00" }} />
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--muted)" }}>résultats Karim B. — 90 jours</span>
                </div>
                <div className="text-xs font-black" style={{ color: "#5a7a00" }}>Lattic</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
