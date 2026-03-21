"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Globe, MapPin, Zap } from "lucide-react";

const features = [
  { icon: Globe, title: "Site Web Haute Conversion", description: "Un site conçu pour transformer chaque visiteur en demande de devis. Fini la simple vitrine, place à un outil qui génère du chiffre d'affaires 24h/24." },
  { icon: MapPin, title: "Domination Google Locale", description: "On vous place tout en haut des recherches dans votre secteur. Captez le trafic de vos concurrents et devenez la référence incontournable sur votre zone." },
  { icon: Zap, title: "Automatisation Business", description: "Relances clients, gestion de RDV et suivis : on automatise vos tâches répétitives. Votre business tourne tout seul pour que vous restiez concentré sur votre métier." },
];

const FULL_RULE = <div className="h-px" style={{ background: "rgba(0,0,0,0.09)" }} />;
const CONTAINED_RULE = <div className="max-w-6xl mx-auto"><div className="h-px" style={{ background: "rgba(0,0,0,0.09)" }} /></div>;

export function Features() {
  return (
    <section className="section-cream border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-10 pt-12 md:pt-20 pb-8 md:pb-12">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--muted)" }}>PLUS VALUE</p>
          <h2 className="text-4xl md:text-7xl tracking-tight leading-tight" style={{ color: "var(--text)" }}>Nos domaines d&apos;expertise</h2>
        </motion.div>
      </div>
      {FULL_RULE}
      <div className="max-w-6xl mx-auto px-4 md:px-10 pt-6 md:pt-8 pb-6 md:pb-8">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden w-full" style={{ minHeight: "240px", position: "relative" }}>
          <Image
            src="/features-chat.png"
            alt="Agence Lattic — conversation client"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            quality={100}
          />
        </motion.div>
      </div>
      {CONTAINED_RULE}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="px-5 py-8 md:px-10 md:py-14 feature-col"
              style={{
                borderRight: i < features.length - 1 ? "1px solid rgba(0,0,0,0.09)" : "none",
              }}
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ background: "var(--bg-card2, #e8ebef)" }}>
                <f.icon className="w-6 h-6" style={{ color: "var(--text)" }} />
              </div>
              <h3 className="font-bold text-xl mb-3 leading-snug" style={{ color: "var(--text)" }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
