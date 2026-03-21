"use client";

import { motion } from "framer-motion";
import { X, Check, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import Link from "next/link";

const withoutUs = [
  "Invisible sur Google (zéro trafic organique)",
  "Dépendance totale au bouche-à-oreille",
  "Publicités qui gaspillent votre budget",
  "Aucun nouveau devis via votre site",
  "Chiffre d'affaires qui stagne",
];

const withUs = [
  "N°1 sur Google dans votre ville et secteur",
  "Flux continu de nouveaux prospects qualifiés",
  "Publicités rentables pilotées au ROI",
  "Un site qui vend et convertit 24h/24",
  "Croissance mesurable chaque mois",
];

export function Pricing() {
  return (
    <section className="section-cream border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-6xl mx-auto px-10 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--muted)" }}>
            Pourquoi nous choisir
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight" style={{ color: "var(--text)" }}>
            La différence est
            <br />
            <span style={{ color: "#c0c0c0" }}>immédiatement visible</span>
          </h2>
        </motion.div>
      </div>

      <div className="h-px" style={{ background: "rgba(0,0,0,0.09)" }} />

      <div className="max-w-6xl mx-auto px-10 pt-16 pb-16">
        <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
          {/* Sans nous */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1 rounded-2xl border p-7 flex flex-col gap-5"
            style={{ background: "var(--bg)", borderColor: "var(--border)" }}
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--muted)" }}>Sans nous</p>
              <p className="text-2xl font-black" style={{ color: "var(--text)" }}>Vous stagnez</p>
            </div>
            <ul className="space-y-3">
              {withoutUs.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-xs" style={{ color: "var(--muted)" }}>
                  <X className="w-3.5 h-3.5 shrink-0 mt-0.5 text-red-400" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Avec nous */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex-1 rounded-2xl border p-7 flex flex-col gap-5"
            style={{
              background: "var(--bg)",
              borderColor: "var(--lime)",
              boxShadow: "0 0 0 1px var(--lime), 0 8px 32px rgba(191,245,73,0.12)",
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--muted)" }}>Avec nous</p>
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-bold"
                  style={{ background: "var(--lime)", color: "#0d0d0d" }}
                >
                  Recommandé
                </span>
              </div>
              <p className="text-2xl font-black" style={{ color: "var(--text)" }}>Vous grandissez</p>
            </div>
            <ul className="space-y-3">
              {withUs.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-xs" style={{ color: "var(--muted)" }}>
                  <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "#4a6900" }} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Guarantee + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mt-8 rounded-2xl border p-6 flex flex-col sm:flex-row items-center gap-5"
          style={{ background: "var(--bg)", borderColor: "var(--border)" }}
        >
          <div className="flex items-start gap-3 flex-1">
            <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "#4a6900" }} />
            <div>
              <p className="text-sm font-bold mb-0.5" style={{ color: "var(--text)" }}>Garantie résultats 90 jours</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                Si vous ne constatez pas de progression après 90 jours de collaboration, on continue à travailler gratuitement jusqu'à ce que les résultats soient là.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 shrink-0">
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:brightness-105 active:scale-95"
              style={{ background: "var(--lime)", color: "#0d0d0d" }}
            >
              Commencer maintenant <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted)" }}>
              <Clock className="w-3 h-3" />
              <span>Plus que 2 places ce mois-ci</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="h-px" style={{ background: "rgba(0,0,0,0.09)" }} />
    </section>
  );
}
