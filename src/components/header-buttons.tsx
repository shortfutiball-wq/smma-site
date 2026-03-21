"use client"

import React from "react"
import { Calendar } from "lucide-react"
import { toast } from "sonner"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

export default function HeaderButtons() {
  const today = new Date()

  return (
    <div className="flex items-center gap-4">
      <div
        onClick={() => toast.info("Calendrier synchronisé")}
        className="h-12 px-6 rounded-2xl glass flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm font-black shadow-sm cursor-pointer hover:bg-white/80 transition-all"
      >
        <Calendar size={18} className="text-saas-primary" strokeWidth={3} />
        <span className="uppercase tracking-widest">{format(today, "d MMMM yyyy", { locale: fr })}</span>
      </div>
    </div>
  )
}
