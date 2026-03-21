"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-40 pb-20 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-volt/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest uppercase text-volt mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-volt animate-pulse" />
              Now Live in Beta
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8"
            >
              Stop typing <br />
              <span className="text-muted-foreground/50">start talking</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-lg mb-12 leading-relaxed"
            >
              Speak naturally. Get clean, ready-to-send text in any app. Save 20+ hours a month by speaking instead of typing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <Link 
                href="/free"
                className="group flex items-center gap-2 px-8 py-4 bg-volt text-black rounded-xl text-lg font-bold hover:bg-volt-hover transition-all hover:scale-105"
              >
                Try SMMA agence Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                5x Faster <span className="text-white/20 ml-2">Save 20h/month</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 w-full max-w-2xl"
          >
            <div className="relative group">
              {/* Visual representation of voice dictation */}
              <div className="aspect-[4/3] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm p-8 flex flex-col justify-center">
                <div className="space-y-6">
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-volt"
                      initial={{ width: "30%" }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    />
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="text-4xl font-black text-volt">5x faster</div>
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Typing (40 WPM)</div>
                      <div className="h-1.5 w-32 bg-white/10 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating glow behind the element */}
              <div className="absolute -inset-4 bg-volt/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
