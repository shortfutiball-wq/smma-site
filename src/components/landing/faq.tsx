"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  { q: "Combien de temps faut-il pour être premier sur Google ?", a: "Le référencement naturel est un travail de fond. Pour des résultats locaux (votre ville/secteur), on commence généralement à voir une hausse des appels sous 30 à 90 jours. Pour des résultats immédiats, nous couplons cela avec de la publicité ciblée." },
  { q: "J'ai déjà un site, pourquoi devrais-je en changer ?", a: "Un site 'vitrine' qui ne rapporte rien est une dépense inutile. Nous créons des sites 'vendeurs' optimisés pour la conversion. Si votre site actuel ne transforme pas vos visiteurs en clients, il vous fait perdre de l'argent chaque jour." },
  { q: "C'est quoi concrètement l'automatisation pour mon entreprise ?", a: "C'est installer des systèmes qui travaillent pour vous : relances automatiques de devis par email, prise de rendez-vous en ligne sans appel, ou envoi automatique de factures. Vous gagnez des heures de secrétariat chaque semaine." },
  { q: "Est-ce que je suis engagé sur le long terme ?", a: "Non, nous croyons aux résultats. Nos offres sont conçues pour être flexibles. Si vous n'êtes pas satisfait de la croissance de votre activité, vous restez libre. Notre objectif est que votre abonnement soit rentabilisé dès les premiers mois." },
  { q: "Dois-je m'occuper de la technique ou de la mise à jour ?", a: "Zéro technique pour vous. On s'occupe de l'hébergement, de la sécurité, des mises à jour et des modifications. Vous nous envoyez un message, on s'en occupe. Vous restez concentré sur votre métier." },
  { q: "Est-ce que ça marche pour un petit commerce local ?", a: "C'est justement là que c'est le plus efficace. Aujourd'hui, même pour un boulanger ou un plombier, le premier réflexe est Google. Si vous n'y êtes pas, vous donnez vos clients à vos concurrents." },
  { q: "Qu'est-ce qui est inclus dans l'offre de base ?", a: "L'essentiel pour démarrer : un site pro optimisé mobile, votre référencement local Google Maps configuré, et une maintenance technique complète pour que vous soyez toujours joignable." },
  { q: "Comment l'automatisation me fait-elle gagner de l'argent ?", a: "Elle réduit vos coûts opérationnels. En automatisant vos relances, vous récupérez des chantiers ou des ventes que vous auriez oubliés par manque de temps, sans avoir besoin d'embaucher une assistante." },
  { q: "Pourquoi choisir votre agence plutôt que de le faire moi-même ?", a: "Parce que votre temps est précieux. Faire son site soi-même prend des semaines pour un résultat souvent moyen. Nous le faisons en quelques jours avec une expertise marketing qui garantit que le site ramènera des clients." },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: "var(--border)" }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left gap-4 group">
        <span className="text-sm font-medium group-hover:opacity-70 transition-opacity" style={{ color: "var(--text)" }}>{q}</span>
        <Plus className="w-4 h-4 shrink-0 transition-transform duration-200" style={{ color: open ? "var(--text)" : "var(--muted)", transform: open ? "rotate(45deg)" : "rotate(0deg)" }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
            <p className="pb-5 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="section-green border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-3xl mx-auto px-4 md:px-10 pt-14 md:pt-28 pb-10 md:pb-16">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-3 text-center" style={{ color: "var(--muted)" }}>RÉPONSES</p>
          <h2 className="text-5xl md:text-7xl tracking-tight text-center" style={{ color: "var(--text)" }}>
            Questions fréquentes
          </h2>
        </motion.div>
      </div>
      <div className="h-px" style={{ background: "var(--border)" }} />
      <div className="max-w-3xl mx-auto px-4 md:px-10">
        {faqs.map((faq) => <FAQItem key={faq.q} {...faq} />)}
      </div>
      <div className="h-px" style={{ background: "var(--border)" }} />
    </section>
  );
}
