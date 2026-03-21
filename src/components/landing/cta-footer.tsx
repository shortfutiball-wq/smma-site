import { ArrowRight } from "lucide-react";
import { LatticLogo } from "./lattic-logo";

export function CTAFooter() {
  return (
    <div style={{ background: "#0d0d0d" }}>
      <section id="cta" className="px-5 md:px-10 pt-16 md:pt-28 pb-14 md:pb-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-4xl md:text-7xl font-bold tracking-tight leading-tight mb-4" style={{ color: "#ffffff" }}>
            Prêt à grandir ?
          </h2>
          <p className="text-base mb-8 md:mb-10" style={{ color: "rgba(255,255,255,0.5)" }}>
            Contactez-nous et décrivez-nous votre projet.<br />
            Audit gratuit, aucun engagement, plan d&apos;action concret.
          </p>
          <div className="flex flex-col gap-3 mb-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input type="email" placeholder="votre@email.com" className="flex-1 px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.12)" }} />
              <span className="hidden sm:flex items-center text-sm justify-center" style={{ color: "rgba(255,255,255,0.3)" }}>ou</span>
              <input type="tel" placeholder="06 12 34 56 78" className="flex-1 px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.12)" }} />
            </div>
            <textarea placeholder="Commentaire (facultatif)" rows={3} className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none" style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.12)" }} />
            <button className="group flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-[1.04] hover:shadow-[0_8px_24px_rgba(74,222,128,0.35)] active:scale-95" style={{ background: "#4ade80", color: "#0d0d0d" }}>
              Recevoir mon audit gratuit <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>
          <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.25)" }}>Aucun engagement. On vous recontacte pour planifier votre audit.</p>
        </div>
      </section>

      {/* Gros Lattic façon Glaido — centré, italic */}
      <div className="overflow-hidden select-none flex items-center justify-center" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <p
          className="font-heading font-black italic leading-none whitespace-nowrap text-center"
          style={{
            fontSize: "clamp(60px, 18vw, 280px)",
            color: "rgba(255,255,255,0.05)",
            letterSpacing: "-0.04em",
            padding: "0.05em 0.1em 0",
          }}
        >
          Lattic
        </p>
      </div>
    </div>
  );
}
