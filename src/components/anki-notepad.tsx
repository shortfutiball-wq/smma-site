"use client"

import { useState } from "react"
import { Copy, Check, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface AnkiNotepadProps {
  content: string
  isVisible: boolean
}

function buildHtml(content: string): string {
  const lines = content.split("\n")
  let html = '<div style="font-family:sans-serif;font-size:14px;">'
  let firstTitle = true

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue

    const titleMatch = trimmed.match(/^\*\*(.+)\*\*$/)
    if (titleMatch) {
      if (!firstTitle) html += '<div style="height:8px"></div>'
      html += `<p style="font-weight:700;margin:0 0 4px 0;">${titleMatch[1]}</p>`
      firstTitle = false
      continue
    }

    const subBulletMatch = line.match(/^(\s{2,}|\t)[-•*]\s(.+)/)
    if (subBulletMatch) {
      html += `<p style="margin:0 0 2px 24px;color:#374151;">◦ ${subBulletMatch[2]}</p>`
      continue
    }

    const bulletMatch = trimmed.match(/^[-•*]\s(.+)/)
    if (bulletMatch) {
      html += `<p style="margin:0 0 2px 8px;color:#374151;">• ${bulletMatch[1]}</p>`
      continue
    }

    html += `<p style="margin:0 0 2px 8px;color:#374151;">• ${trimmed}</p>`
  }

  html += '</div>'
  return html
}

export function AnkiNotepad({ content, isVisible }: AnkiNotepadProps) {
  const [copied, setCopied] = useState(false)

  if (!isVisible || !content) return null

  const handleCopy = async () => {
    try {
      const html = buildHtml(content)
      const htmlBlob = new Blob([html], { type: "text/html" })
      const textBlob = new Blob([content], { type: "text/plain" })
      await navigator.clipboard.write([
        new ClipboardItem({ "text/html": htmlBlob, "text/plain": textBlob })
      ])
    } catch {
      navigator.clipboard.writeText(content)
    }
    setCopied(true)
    toast.success("Copié avec mise en forme !")
    setTimeout(() => setCopied(false), 2000)
  }

  const lines = content.split("\n")
  let firstTitle = true

  return (
    <div className="mt-12 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-blue-500 flex items-center justify-center text-white">
            <FileText size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Bloc-notes Anki</h3>
            <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">Optimisé pour Notion & Anki</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="h-9 px-4 rounded-xl border-slate-200 hover:bg-white text-xs font-bold gap-2"
        >
          {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
          {copied ? "Copié !" : "Tout copier"}
        </Button>
      </div>

      {/* Content */}
      <div className="p-8 md:p-12 bg-white min-h-[400px]">
        <div className="max-w-[700px] mx-auto">
          {lines.map((line, i) => {
            const trimmed = line.trim()
            if (!trimmed) return null

            // Titre : **Titre** seul OU bullet + **Titre**
            const titleMatch = trimmed.match(/^(?:[-•*]\s*)?\*\*(.+)\*\*$/)
            if (titleMatch) {
              const isFirst = firstTitle
              firstTitle = false
              return (
                <div key={i} className={isFirst ? "" : "mt-5"}>
                  <p className="text-blue-600 font-bold text-sm pb-2">{titleMatch[1]}</p>
                </div>
              )
            }

            const subBulletMatch = line.match(/^(\s{2,}|\t)[-•*]\s(.+)/)
            if (subBulletMatch) {
              const text = subBulletMatch[2].replace(/\*\*/g, "")
              return (
                <div key={i} className="flex gap-2 pl-8 mb-0.5">
                  <span className="text-slate-400 mt-0.5 flex-shrink-0">◦</span>
                  <span className="text-slate-700 text-sm leading-relaxed">{text}</span>
                </div>
              )
            }

            const bulletMatch = trimmed.match(/^[-•*]\s(.+)/)
            if (bulletMatch) {
              const text = bulletMatch[1].replace(/\*\*/g, "")
              return (
                <div key={i} className="flex gap-2 pl-2 mb-0.5">
                  <span className="text-slate-400 mt-0.5 flex-shrink-0">•</span>
                  <span className="text-slate-700 text-sm leading-relaxed">{text}</span>
                </div>
              )
            }

            return (
              <div key={i} className="flex gap-2 pl-2 mb-0.5">
                <span className="text-slate-400 mt-0.5 flex-shrink-0">•</span>
                <span className="text-slate-700 text-sm leading-relaxed">{trimmed.replace(/\*\*/g, "")}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-center">
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-[0.2em]">JayWon Active Learning System v1.0</p>
      </div>
    </div>
  )
}
