"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Copy, Check, Sparkles, Table, Book, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import ReactMarkdown from "react-markdown"

interface StudySidebarProps {
  isOpen: boolean
  onClose: () => void
  content: string
  isLoading: boolean
  type: "explain" | "table" | "define" | ""
}

export function StudySidebar({ isOpen, onClose, content, isLoading, type }: StudySidebarProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    toast.success("Copié dans le presse-papier !")
    setTimeout(() => setCopied(false), 2000)
  }

  const getTitle = () => {
    switch (type) {
      case "explain": return "✨ Explication Précise"
      case "table": return "📊 Tableau Comparatif"
      case "define": return "📖 Définition Simple"
      default: return "IA Study"
    }
  }

  const getIcon = () => {
    switch (type) {
      case "explain": return <Sparkles className="h-4 w-4 text-blue-400" />
      case "table": return <Table className="h-4 w-4 text-emerald-400" />
      case "define": return <Book className="h-4 w-4 text-orange-400" />
      default: return null
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[50] lg:hidden"
          />
          
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-white border-l border-slate-200 shadow-2xl z-[60] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-white">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-orange-50 flex items-center justify-center">
                  {getIcon()}
                </div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">{getTitle()}</h2>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleCopy}
                  disabled={!content || isLoading}
                  className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-900"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                </Button>
                <Button size="icon" variant="ghost" onClick={onClose} className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-900">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Génération en cours...</p>
                </div>
              ) : (
                <div className="prose prose-slate prose-sm max-w-none prose-headings:text-blue-600 prose-headings:font-bold prose-p:text-slate-800 prose-p:leading-relaxed prose-strong:text-slate-900 prose-li:text-slate-800">
                  <ReactMarkdown>{content}</ReactMarkdown>
                </div>
              )}
            </div>

            {/* Footer / Tip */}
            <div className="p-4 border-t border-slate-200 bg-slate-50">
              <p className="text-[10px] text-slate-400 text-center font-medium uppercase tracking-widest">
                Appuyez sur <span className="text-blue-500">ESC</span> pour fermer
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
