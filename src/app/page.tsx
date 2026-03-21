import type { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { VideoSection } from "@/components/landing/video-section";
import { LogoBar } from "@/components/landing/logo-bar";
import { Features } from "@/components/landing/features";
import { Testimonials } from "@/components/landing/testimonials";
import { Pricing } from "@/components/landing/pricing";
import { FAQ } from "@/components/landing/faq";
import { CTAFooter } from "@/components/landing/cta-footer";

export const metadata: Metadata = {
  title: "Lattic — Création de sites web & Marketing digital",
  description: "Agence digitale spécialisée en création de sites web, gestion des réseaux sociaux et publicité en ligne.",
};

export default function LandingPage() {
  return (
    <main style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh", position: "relative" }}>
      <div className="grid-line-v" style={{ left: "calc(50% - 576px)", top: "100vh" }} />
      <div className="grid-line-v" style={{ left: "calc(50% + 576px)", top: "100vh" }} />
      <Navbar />
      <Hero />
      <VideoSection />
      <LogoBar />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTAFooter />
    </main>
  );
}
