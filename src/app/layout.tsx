import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
import "./globals.css";

const instrumentSerif = localFont({
  src: [
    { path: "./fonts/InstrumentSerif-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/InstrumentSerif-Italic.ttf", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: "Lattic — Agence digitale pour commerces locaux en France",
  description:
    "Lattic place les commerces locaux en tête de Google en 60 jours. Sites haute conversion, SEO local, automatisation des relances — pour artisans, restaurateurs et indépendants partout en France.",
  keywords: [
    "agence digitale commerces locaux",
    "SEO local France",
    "création site web artisan",
    "référencement Google local",
    "site web plombier",
    "agence SMMA France",
  ],
  openGraph: {
    title: "Lattic — Premiers sur Google. En 60 jours.",
    description:
      "Lattic place les commerces locaux en tête de Google. Sites haute conversion, SEO local dominant, relances automatisées.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
