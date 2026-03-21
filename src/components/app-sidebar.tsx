"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Search,
  LayoutGrid,
  Settings,
  CheckCircle2,
  GraduationCap,
  LibraryBig,
  Music,
  BrainCircuit,
  FileText
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const mainItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutGrid,
  },
  {
    title: "Aujourd'hui",
    url: "/aujourdhui",
    icon: CheckCircle2,
  },
  {
    title: "Recherche d'Item",
    url: "/recherche",
    icon: Search,
  },
  {
    title: "Suivi par Collège",
    url: "/college",
    icon: LibraryBig,
  },
  {
    title: "Flashcards Anki",
    url: "/anki",
    icon: GraduationCap,
  },
  {
    title: "Lecture Active",
    url: "/lecture-active",
    icon: BrainCircuit,
  },
  {
    title: "Surlignage",
    url: "/surlignage",
    icon: FileText,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed lg:relative inset-y-0 left-0 z-40 w-64 transform -translate-x-full lg:translate-x-0 transition-all duration-300 ease-in-out flex flex-col gap-6 border-r border-white/10 bg-slate-900/50 backdrop-blur-xl p-6">
      {/* Brand */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Music size={20} className="text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">MédRev</span>
      </div>

      <nav className="flex flex-col gap-2">
        {mainItems.map((item) => {
          const isActive = pathname === item.url
          return (
            <Link 
              key={item.title} 
              href={item.url}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium",
                isActive 
                  ? "bg-blue-600/20 text-cyan-400 border border-blue-500/20" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              {item.title}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-2">
        <Link 
          href="/parametres"
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium",
            pathname === "/parametres" ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
          )}
        >
          <Settings size={18} />
          Paramètres
        </Link>
        
        <div className="mt-4 pt-4 border-t border-white/5 flex flex-col items-center gap-6">
          <div className="h-14 w-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-2 border-white dark:border-slate-700 shadow-xl text-saas-primary font-black text-xs cursor-default">
            MR
          </div>
        </div>
      </div>
    </aside>
  )
}
