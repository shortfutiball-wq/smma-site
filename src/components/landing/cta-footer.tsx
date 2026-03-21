"use client";

import Link from "next/link";
import { ArrowRight, Mail, Phone, MapPin, Instagram, Linkedin } from "lucide-react";
import { useState } from "react";

const sectors = [
  "Plomberie / BTP / Artisan",
  "Restauration / Food",
  "Juridique / Comptabilité",
  "Santé / Bien-être / Beauté",
  "Architecture / Décoration",
  "Auto / Mécanique",
  "Commerce de proximité",
  "Autre",
];

export function CTAFooter() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div style={{ background: "#0d0d0d" }}>
      {/* CTA */}
      <section id="contact" className="relative overflow-hidden px-10 pt-28 pb-20">
        {/* Decorative chevron pattern */}
        <div className="absolute right-0 top-0 bottom-0 w-80 pointer-events-none select-none opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            {Array.from({ length: 7 }).map((_, row) =>
              Array.from({ length: 5 }).map((_, col) => (
                <g key={`${row}-${col}`} transform={`translate(${col * 55 - 20}, ${row * 55 - 20})`}>
                  <rect x="5" y="5" width="35" height="35" fill="none" stroke="#FFFEFC" strokeWidth="2" rx="4" />
                  <polyline points="18,5 35,5 35,22" fill="none" stroke="#FFFEFC" strokeWidth="2" />
                </g>
              ))
            )}
          </svg>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
            Audit gratuit · Aucun engagement
          </p>
          <h2 className="text-5xl md:text-6xl tracking-tight leading-tight mb-4 max-w-lg" style={{ color: "#FFFEFC" }}>
            Prêt à grandir ?
          </h2>
          <p className="text-sm mb-10 max-w-md leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
            Décrivez-nous votre activité. On revient vers vous sous 24h avec un plan d&apos;action concret, sans engagement.
          </p>

          {/* Contact form */}
          <form className="flex flex-col gap-3 max-w-lg" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="votre@email.fr"
                required
                className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#FFFEFC",
                }}
              />
              <input
                type="tel"
                placeholder="06 XX XX XX XX"
                className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#FFFEFC",
                }}
              />
            </div>

            {/* Sector select */}
            <select
              className="w-full px-4 py-3 rounded-xl text-sm outline-none appearance-none"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.7)",
              }}
              defaultValue=""
            >
              <option value="" disabled style={{ color: "#333" }}>Votre secteur d&apos;activité</option>
              {sectors.map((s) => (
                <option key={s} value={s} style={{ color: "#333" }}>{s}</option>
              ))}
            </select>

            {/* RGPD */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 shrink-0 w-4 h-4 rounded accent-lime-400"
                required
              />
              <span className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
                J&apos;accepte que Lattic utilise mes coordonnées pour me recontacter au sujet de mon audit gratuit.
                Mes données ne seront jamais revendues.{" "}
                <Link href="#" className="underline hover:opacity-80">Politique de confidentialité</Link>.
              </span>
            </label>

            <button
              type="submit"
              disabled={!agreed}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:brightness-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: "var(--lime)", color: "#0d0d0d" }}
            >
              Recevoir mon audit gratuit <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="mt-4 text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            Aucun engagement. On vous recontacte pour planifier votre audit sous 24h.
          </p>

          {/* Direct contact */}
          <div className="flex flex-wrap gap-5 mt-8 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <a href="mailto:contact@lattic.fr" className="flex items-center gap-2 text-xs transition-opacity hover:opacity-80" style={{ color: "rgba(255,255,255,0.45)" }}>
              <Mail className="w-3.5 h-3.5" />
              contact@lattic.fr
            </a>
            <a href="tel:+33612345678" className="flex items-center gap-2 text-xs transition-opacity hover:opacity-80" style={{ color: "rgba(255,255,255,0.45)" }}>
              <Phone className="w-3.5 h-3.5" />
              +33 6 XX XX XX XX
            </a>
            <span className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
              <MapPin className="w-3.5 h-3.5" />
              Paris, France — intervention nationale
            </span>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto">
        <div className="h-px" style={{ background: "rgba(255,255,255,0.1)" }} />
      </div>

      {/* Footer */}
      <footer className="px-10 py-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center font-black text-xs"
                style={{ background: "var(--lime)", color: "#0d0d0d" }}
              >
                L
              </div>
              <span className="font-bold text-sm" style={{ color: "#FFFEFC" }}>Lattic</span>
            </div>
            <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
              Agence digitale spécialisée dans la croissance des commerces locaux.
              Sites haute conversion, SEO local, automatisation.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2 mb-4">
              <a
                href="https://instagram.com/lattic.agency"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com/company/lattic"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>

            <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
              © {new Date().getFullYear()} Lattic. Tous droits réservés.
            </p>
          </div>

          <div className="flex gap-16">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-bold mb-1" style={{ color: "#FFFEFC" }}>Agence</p>
              {[
                { label: "Services", href: "#services" },
                { label: "Portfolio", href: "#work" },
                { label: "FAQ", href: "#faq" },
              ].map((l) => (
                <Link key={l.label} href={l.href} className="text-xs hover:opacity-70 transition-opacity" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-bold mb-1" style={{ color: "#FFFEFC" }}>Contact</p>
              <a href="mailto:contact@lattic.fr" className="text-xs hover:opacity-70 transition-opacity" style={{ color: "rgba(255,255,255,0.4)" }}>
                contact@lattic.fr
              </a>
              <a href="tel:+33612345678" className="text-xs hover:opacity-70 transition-opacity" style={{ color: "rgba(255,255,255,0.4)" }}>
                +33 6 XX XX XX XX
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-bold mb-1" style={{ color: "#FFFEFC" }}>Légal</p>
              {["Mentions légales", "Politique de confidentialité"].map((l) => (
                <Link key={l} href="#" className="text-xs hover:opacity-70 transition-opacity" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {l}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
