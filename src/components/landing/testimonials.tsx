"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Avant, entre mes devis, mes factures et mes clients qui appellent, je n'avais pas le temps de me faire connaître sur internet. Lattic a créé notre site et gère nos réseaux. Aujourd'hui on reçoit 3 à 4 demandes de devis par semaine en ligne. Sur le mois ça représente facilement 4 000 à 5 000 € de chantiers.",
    name: "Karim B.",
    role: "Plombier-chauffagiste, 12 ans d'expérience",
  },
  {
    quote: "Dans le bâtiment on est connus par le bouche-à-oreille, mais ça a ses limites. Depuis qu'on a confié notre communication à Lattic, on apparaît en premier sur Google dans notre secteur et on a des leads réguliers. J'ai dû embaucher un ouvrier tellement le carnet de commandes s'est rempli.",
    name: "Thierry M.",
    role: "Chef d'entreprise BTP — Gros œuvre & rénovation",
  },
  {
    quote: "Le restaurant tourne bien mais les tables du midi étaient souvent vides. Lattic nous a fait un site avec réservation en ligne et gère nos posts Instagram. Résultat : le midi est complet 4 jours sur 5 et on a augmenté de 30 % notre chiffre d'affaires mensuel. L'investissement est rentabilisé en quelques semaines.",
    name: "Sofia R.",
    role: "Restauratrice — Bistrot moderne",
  },
];

export function Testimonials() {
  return (
    <section className="border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-10 pt-14 md:pt-28 pb-10 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--muted)" }}>AVIS</p>
          <h2 className="font-heading text-4xl md:text-7xl font-bold tracking-tight" style={{ color: "var(--text)" }}>Témoignages</h2>
        </motion.div>
      </div>
      <div className="max-w-6xl mx-auto"><div className="h-px" style={{ background: "rgba(0,0,0,0.09)" }} /></div>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="px-5 py-8 md:px-10 md:py-12 flex flex-col gap-6 testimonial-card"
              style={{ borderRight: i < testimonials.length - 1 ? "1px solid rgba(0,0,0,0.09)" : "none" }}
            >
              <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--muted)" }}>&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0" style={{ background: "var(--border)", color: "var(--text)" }}>{t.name[0]}</div>
                <div>
                  <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "var(--muted)" }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="h-px" style={{ background: "rgba(0,0,0,0.09)" }} />
    </section>
  );
}
