"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Globe, MessageSquare } from "lucide-react";

const features = [
  {
    title: "Works everywhere you work",
    description: "Gmail, Slack, Cursor, ChatGPT. One hotkey, any app. Consistent results everywhere.",
    icon: Globe,
  },
  {
    title: "Private by design",
    description: "Local storage. Private servers. Your data never touches third-party AI.",
    icon: Shield,
  },
  {
    title: "Speak your native language",
    description: "100+ languages supported. Add custom dictionaries and prompts.",
    icon: MessageSquare,
  },
];

export function Features() {
  return (
    <section className="py-32 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-volt font-black uppercase tracking-widest text-xs mb-4"
          >
            How it works
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tight"
          >
            Finish your work in <br />
            <span className="text-muted-foreground/30 text-5xl md:text-6xl">1/5th the time</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-2xl border border-white/5 hover:border-volt/20 hover:bg-white/[0.02] transition-all"
            >
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-volt/10 group-hover:text-volt transition-colors">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
