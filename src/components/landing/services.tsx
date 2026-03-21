"use client";

import { motion } from "framer-motion";
import { Palette, Code2, TrendingUp, Bot, Layers } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Web Design & UI/UX",
    description: "Pixel-perfect interfaces that convert visitors into customers. Every pixel intentional.",
  },
  {
    icon: Code2,
    title: "Web Development",
    description: "Next.js, React, TypeScript. Performant, scalable, and maintainable codebases.",
  },
  {
    icon: TrendingUp,
    title: "SEO Optimization",
    description: "Technical SEO, Core Web Vitals, structured data. Rank higher, get found.",
  },
  {
    icon: Bot,
    title: "AI Integration",
    description: "Claude, OpenAI, custom models. Automate workflows and enhance your product with AI.",
  },
  {
    icon: Layers,
    title: "Software Development",
    description: "Full-stack apps, dashboards, SaaS products. From idea to production.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-32">
      <div className="max-w-6xl mx-auto px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
            What we do
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-3">
            Services
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-lg transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4 group-hover:bg-amber-50 dark:group-hover:bg-amber-400/10 transition-colors">
                <s.icon className="w-5 h-5 text-neutral-600 dark:text-neutral-400 group-hover:text-amber-500 transition-colors" />
              </div>
              <h3 className="font-bold text-base mb-2">{s.title}</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-500 leading-relaxed">
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
