"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-volt flex items-center justify-center rounded-sm font-black text-black group-hover:scale-105 transition-transform">
              G
            </div>
            <span className="text-xl font-bold tracking-tight">SMMA agence</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="/home" className="hover:text-white transition-colors">Home</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/signin" className="px-4 py-2 text-sm font-medium hover:text-white transition-colors">
            Sign In
          </Link>
          <Link 
            href="/signup" 
            className="group flex items-center gap-2 px-5 py-2.5 bg-volt text-black rounded-lg text-sm font-bold hover:bg-volt-hover transition-all active:scale-95"
          >
            Sign Up
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
