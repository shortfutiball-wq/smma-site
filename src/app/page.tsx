import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { LogoBar } from "@/components/landing/logo-bar";
import { Features } from "@/components/landing/features";
import { Process } from "@/components/landing/process";
import { Testimonials } from "@/components/landing/testimonials";
import { About } from "@/components/landing/about";
import { Pricing } from "@/components/landing/pricing";
import { FAQ } from "@/components/landing/faq";
import { CTAFooter } from "@/components/landing/cta-footer";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Combien de temps faut-il pour être premier sur Google ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En général, les premiers résultats significatifs apparaissent entre 4 et 8 semaines selon votre secteur et votre ville. Pour les villes moyennes, on atteint le top 3 sous 60 jours.",
      },
    },
    {
      "@type": "Question",
      name: "Est-ce que je suis engagé sur le long terme ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non. Aucun engagement minimum. Nous travaillons mois par mois avec nos clients. Notre modèle repose sur les résultats.",
      },
    },
    {
      "@type": "Question",
      name: "Est-ce que ça marche pour un petit commerce local ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "C'est exactement pour ça qu'on est fait. Nos meilleurs résultats viennent de plombiers, restaurants, artisans, avocats et commerces de proximité.",
      },
    },
    {
      "@type": "Question",
      name: "Qu'est-ce qui est inclus dans l'offre de base ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Site web haute conversion, optimisation SEO locale complète, fiche Google Business optimisée, et configuration de base de l'automatisation.",
      },
    },
  ],
};

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
      <Process />
      <Testimonials />
      <About />
      <Pricing />
      <FAQ />
      <CTAFooter />
    </main>
  );
}
