"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  { name: "Startup Landing", category: "Web Design", color: "from-violet-500/10 to-blue-500/10" },
  { name: "SaaS Dashboard", category: "Development", color: "from-amber-500/10 to-orange-500/10" },
  { name: "E-Commerce", category: "Full Stack", color: "from-emerald-500/10 to-teal-500/10" },
  { name: "Portfolio Agency", category: "Web Design", color: "from-pink-500/10 to-rose-500/10" },
  { name: "AI Product", category: "AI Integration", color: "from-cyan-500/10 to-blue-500/10" },
  { name: "Corporate Site", category: "SEO + Dev", color: "from-slate-500/10 to-gray-500/10" },
];

export function Work() {
  return (
    <section id="work" className="py-32 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
              Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-3">
              Selected work
            </h2>
          </div>
          <p className="hidden md:block text-sm text-neutral-500 dark:text-neutral-500 max-w-xs text-right">
            A selection of projects we&apos;re proud of. Every site built from scratch.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group relative aspect-[4/3] rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-neutral-50 dark:bg-neutral-900 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-60`} />
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-500 mb-1">
                  {p.category}
                </div>
                <div className="font-bold text-neutral-900 dark:text-neutral-100">{p.name}</div>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
