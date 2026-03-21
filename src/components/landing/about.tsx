"use client";

import { motion } from "framer-motion";
import { Target, Users, TrendingUp } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Résultats mesurables",
    description:
      "On ne travaille pas pour vous impressionner avec des rapports. On travaille pour que votre téléphone sonne.",
  },
  {
    icon: Users,
    title: "Accompagnement humain",
    description:
      "Un interlocuteur dédié, des réponses sous 24h, aucun contrat en jargon. On s'adapte à vous, pas l'inverse.",
  },
  {
    icon: TrendingUp,
    title: "Croissance continue",
    description:
      "Le digital évolue vite. On optimise en continu pour que vous restiez devant, quelles que soient les mises à jour Google.",
  },
];

export function About() {
  return (
    <section className="section-green border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-6xl mx-auto px-10 pt-28 pb-28">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--muted)" }}>
              Notre mission
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6" style={{ color: "var(--text)" }}>
              On ne vend pas
              <br />
              <span style={{ color: "var(--muted)" }}>des services.</span>
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
              On délivre des résultats. Depuis 2022, Lattic accompagne des artisans, restaurateurs,
              professions libérales et commerces de proximité à travers toute la France.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              Notre conviction : chaque commerce local mérite une présence digitale qui travaille
              pour lui 24h/24 — sans avoir à comprendre les algorithmes ou gérer la technique.
              C&apos;est exactement pour ça qu&apos;on est là.
            </p>
          </motion.div>

          {/* Right — values */}
          <div className="flex-1 flex flex-col gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4 items-start"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
                >
                  <v.icon className="w-4 h-4" style={{ color: "var(--muted)" }} />
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1" style={{ color: "var(--text)" }}>{v.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{v.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
