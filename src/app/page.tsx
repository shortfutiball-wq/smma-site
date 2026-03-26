import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { LogoBar } from "@/components/landing/logo-bar";
import { Features } from "@/components/landing/features";
import { Testimonials } from "@/components/landing/testimonials";
import { Pricing } from "@/components/landing/pricing";
import { CTAFooter } from "@/components/landing/cta-footer";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Lattic",
  description:
    "Agence digitale spécialisée dans la croissance des commerces locaux. Sites haute conversion, SEO local, automatisation.",
  url: "https://lattic.fr",
  telephone: "+33612345678",
  email: "contact@lattic.fr",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Paris",
    addressCountry: "FR",
  },
  areaServed: "FR",
  serviceType: ["SEO local", "Création de site web", "Automatisation marketing"],
};

export default function LandingPage() {
  return (
    <main
      style={{
        background: "var(--bg)",
        color: "var(--text)",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Layout grid lines */}
      <div className="grid-line-h" style={{ top: "64px" }} />
      <div className="grid-line-v" style={{ left: "calc(50% - 576px)" }} />
      <div className="grid-line-v" style={{ left: "calc(50% + 576px)" }} />

      <Navbar />
      <Hero />
      <LogoBar />
      <Features />
      <Testimonials />
      <Pricing />
      <CTAFooter />
    </main>
  );
}
