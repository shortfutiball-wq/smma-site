"use client";

import { motion } from "framer-motion";
import { ClipboardList, Lightbulb, Rocket, BarChart3 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Audit gratuit",
    timing: "Jour 1",
    description:
      "On analyse votre présence en ligne, vos concurrents locaux et les opportunités concrètes pour votre secteur. Pas de jargon, un rapport clair.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Stratégie sur-mesure",
    timing: "Sous 48h",
    description:
      "Plan d'action personnalisé selon votre ville, votre secteur et vos objectifs. Vous savez exactement ce qu'on va faire et pourquoi.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Exécution complète",
    timing: "2 à 4 semaines",
    description:
      "Site, SEO local, fiche Google Business, automatisations — on gère tout de A à Z. Vous continuez votre métier, on s'occupe du reste.",
  },
  {
    number: "04",
    icon: BarChart3,
    title: "Résultats & suivi",
    timing: "Chaque mois",
    description:
      "Rapports clairs, ajustements continus, croissance mesurable. Vous voyez les leads arriver. On optimise pour que ça ne s'arrête pas.",
  },
];

export function Process() {
  return (
    <section className="border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-6xl mx-auto px-10 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--muted)" }}>
            Comment ça fonctionne
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight" style={{ color: "var(--text)" }}>
            De l&apos;audit aux premiers
            <br />
            <span style={{ color: "#c0c0c0" }}>clients en 4 étapes</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "var(--border)" }}>
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col gap-4 p-8"
              style={{ background: "var(--bg)" }}
            >
              {/* Number + icon row */}
              <div className="flex items-start justify-between">
                <span className="text-4xl font-black" style={{ color: "var(--border)" }}>{step.number}</span>
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "var(--lime)" }}
                >
                  <step.icon className="w-4.5 h-4.5" style={{ color: "#0d0d0d" }} strokeWidth={2.5} />
                </div>
              </div>

              {/* Timing pill */}
              <span
                className="self-start px-2 py-0.5 rounded-md text-xs font-bold"
                style={{ background: "var(--bg-card)", color: "var(--muted)" }}
              >
                {step.timing}
              </span>

              <div>
                <h3 className="font-bold text-base mb-2" style={{ color: "var(--text)" }}>{step.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
