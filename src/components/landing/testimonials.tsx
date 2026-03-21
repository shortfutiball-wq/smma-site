"use client";

import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import Link from "next/link";

const testimonials = [
  {
    quote:
      "Avant, entre mes devis, mes factures et mes clients qui appellent, je n'avais pas le temps de gérer mon image en ligne. Lattic s'est occupé de tout. Maintenant je reçois 3 à 4 demandes de devis qualifiées par semaine sans lever le petit doigt.",
    name: "Karim B.",
    role: "Plombier-chauffagiste",
    location: "Paris 15ème",
    result: "+4 000 € / mois",
    avatarColor: "#3b82f6",
  },
  {
    quote:
      "Dans le bâtiment on est connus par le bouche-à-oreille, mais ça a ses limites. Depuis qu'on est premiers sur Google dans notre secteur, mon planning est plein deux mois à l'avance. Je regrette de ne pas l'avoir fait plus tôt.",
    name: "Thierry M.",
    role: "Chef d'entreprise BTP",
    location: "Lyon",
    result: "Planning plein 2 mois",
    avatarColor: "#f59e0b",
  },
  {
    quote:
      "Le restaurant tournait bien mais les tables du midi étaient souvent vides. Lattic nous a refait le site et mis en place les automatisations de réservation. Résultat : 4 tables sur 5 sont réservées à l'avance le midi. +30% de CA.",
    name: "Sofia R.",
    role: "Restauratrice",
    location: "Marseille",
    result: "+30% de CA",
    avatarColor: "#10b981",
  },
];

const CONTAINED_RULE = (
  <div className="max-w-6xl mx-auto">
    <div className="h-px" style={{ background: "rgba(0,0,0,0.09)" }} />
  </div>
);

export function Testimonials() {
  return (
    <section className="border-t" style={{ borderColor: "var(--border)" }}>
      {/* Header */}
      <div className="max-w-6xl mx-auto px-10 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--muted)" }}>
            Témoignages clients
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight" style={{ color: "var(--text)" }}>
            Des résultats concrets,
            <br />
            <span style={{ color: "#c0c0c0" }}>pas des promesses</span>
          </h2>
        </motion.div>
      </div>

      {CONTAINED_RULE}

      {/* 3 testimonials */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="px-10 py-12 flex flex-col gap-6"
              style={{
                borderRight: i < testimonials.length - 1 ? "1px solid rgba(0,0,0,0.09)" : "none",
              }}
            >
              {/* Stars */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Result badge */}
              <div
                className="inline-flex self-start px-3 py-1 rounded-full text-xs font-black"
                style={{ background: "var(--lime)", color: "#0d0d0d" }}
              >
                {t.result}
              </div>

              <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--muted)" }}>
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black shrink-0"
                  style={{ background: t.avatarColor, color: "#FFFEFC" }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>
                    {t.role} · {t.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="h-px" style={{ background: "rgba(0,0,0,0.09)" }} />

      {/* CTA after testimonials */}
      <div className="max-w-6xl mx-auto px-10 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-sm font-medium text-center sm:text-left" style={{ color: "var(--muted)" }}>
          Vous aussi, obtenez des résultats mesurables — sans engagement.
        </p>
        <Link
          href="#contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:brightness-105 active:scale-95 shrink-0"
          style={{ background: "var(--lime)", color: "#0d0d0d" }}
        >
          Démarrer mon audit gratuit <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="h-px" style={{ background: "rgba(0,0,0,0.09)" }} />
    </section>
  );
}
