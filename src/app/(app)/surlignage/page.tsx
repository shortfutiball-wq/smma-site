"use client"

import React, { useState, useRef, useCallback } from "react"
import { Upload, Copy, Check, Highlighter, Eraser, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface HL { start: number; end: number }

function merge(hls: HL[]): HL[] {
  if (!hls.length) return []
  const sorted = [...hls].sort((a, b) => a.start - b.start)
  const result: HL[] = [{ ...sorted[0] }]
  for (let i = 1; i < sorted.length; i++) {
    const last = result[result.length - 1]
    if (sorted[i].start <= last.end) last.end = Math.max(last.end, sorted[i].end)
    else result.push({ ...sorted[i] })
  }
  return result
}

function buildSegments(text: string, hls: HL[]): { t: string; h: boolean }[] {
  const merged = merge(hls)
  const segs: { t: string; h: boolean }[] = []
  let pos = 0
  for (const hl of merged) {
    if (hl.start > pos) segs.push({ t: text.slice(pos, hl.start), h: false })
    segs.push({ t: text.slice(hl.start, hl.end), h: true })
    pos = hl.end
  }
  if (pos < text.length) segs.push({ t: text.slice(pos), h: false })
  return segs
}

function getOffsets(container: HTMLElement): { start: number; end: number } | null {
  const sel = window.getSelection()
  if (!sel || !sel.rangeCount || sel.isCollapsed) return null
  const range = sel.getRangeAt(0)
  const pre = document.createRange()
  pre.setStart(container, 0)
  pre.setEnd(range.startContainer, range.startOffset)
  const start = pre.toString().length
  pre.setEnd(range.endContainer, range.endOffset)
  const end = pre.toString().length
  if (start === end) return null
  return { start, end }
}

export default function SurlignagePage() {
  const [text, setText] = useState("")
  const [fileName, setFileName] = useState("")
  const [highlights, setHighlights] = useState<HL[]>([])
  const [eraseMode, setEraseMode] = useState(false)
  const [copied, setCopied] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFileName(file.name)
    setHighlights([])
    const reader = new FileReader()
    reader.onload = ev => setText(ev.target?.result as string ?? "")
    reader.readAsText(file, "utf-8")
  }

  const handleMouseUp = useCallback(() => {
    if (!contentRef.current) return
    const offsets = getOffsets(contentRef.current)
    if (!offsets) return
    if (eraseMode) {
      setHighlights(prev => prev.filter(h => h.end <= offsets.start || h.start >= offsets.end))
      window.getSelection()?.removeAllRanges()
      toast.success("Surlignage supprimé", { icon: "🧹", duration: 600 })
    } else {
      setHighlights(prev => merge([...prev, offsets]))
      window.getSelection()?.removeAllRanges()
      toast.success("Surligné !", { icon: "🟡", duration: 600 })
    }
  }, [eraseMode])

  const copyHighlighted = async () => {
    const merged = merge(highlights)
    if (!merged.length) { toast.error("Rien de surligné"); return }
    const txt = merged.map(h => text.slice(h.start, h.end)).join("\n\n")
    await navigator.clipboard.writeText(txt)
    setCopied(true)
    toast.success("Passages surlignés copiés !")
    setTimeout(() => setCopied(false), 2000)
  }

  const segments = text ? buildSegments(text, highlights) : []
  const hlCount = merge(highlights).length

  return (
    <div className="max-w-4xl mx-auto pb-32">
      <div className="mb-10">
        <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-[0.3em]">Surlignage</span>
        <h1 className="text-4xl font-black text-white mt-1">Surlignage de cours</h1>
        <p className="text-slate-400 text-sm mt-1">Ouvre un fichier, surligne, copie la sélection.</p>
      </div>

      <input ref={fileInputRef} type="file" accept=".txt,.md" onChange={handleFile} className="hidden" />

      {!text ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-white/10 rounded-3xl p-24 flex flex-col items-center gap-4 cursor-pointer hover:border-yellow-400/30 transition-all group"
        >
          <div className="h-16 w-16 rounded-2xl bg-yellow-400/10 flex items-center justify-center group-hover:bg-yellow-400/20 transition-all">
            <Upload size={28} className="text-yellow-400" />
          </div>
          <p className="text-slate-400 font-bold text-sm">Cliquer pour ouvrir un fichier</p>
          <p className="text-slate-600 text-xs">.txt · .md</p>
        </div>
      ) : (
        <>
          {/* Toolbar */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="h-8 gap-2 text-slate-400 hover:text-white text-xs"
            >
              <Upload size={12} /> {fileName}
            </Button>

            <div className="flex-1" />

            <button
              onClick={() => setEraseMode(m => !m)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all",
                eraseMode
                  ? "bg-rose-500 text-white border-rose-600 shadow-[0_0_12px_rgba(239,68,68,0.3)]"
                  : "bg-yellow-400 text-slate-900 border-yellow-500 shadow-[0_0_12px_rgba(250,204,21,0.25)]"
              )}
            >
              {eraseMode ? <Eraser size={14} /> : <Highlighter size={14} />}
              {eraseMode ? "Gomme" : "Surligner"}
            </button>

            {hlCount > 0 && (
              <>
                <span className="text-xs text-yellow-500 font-bold">{hlCount} surligné{hlCount > 1 ? "s" : ""}</span>
                <Button
                  onClick={copyHighlighted}
                  className="h-8 px-4 bg-yellow-500 hover:bg-yellow-400 text-slate-900 rounded-xl font-bold text-xs gap-2"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  {copied ? "Copié !" : "Copier le surligné"}
                </Button>
                <button
                  onClick={() => setHighlights([])}
                  className="h-8 px-3 flex items-center gap-1.5 text-slate-500 hover:text-rose-400 text-xs font-bold rounded-xl hover:bg-rose-500/10 transition-all"
                >
                  <Trash2 size={12} /> Tout effacer
                </button>
              </>
            )}
          </div>

          {/* Contenu */}
          <div
            ref={contentRef}
            onMouseUp={handleMouseUp}
            className={cn(
              "bg-white rounded-2xl p-8 shadow-sm border border-slate-100 select-text whitespace-pre-wrap leading-[1.9] text-slate-800 text-[15px]",
              eraseMode ? "cursor-cell" : "cursor-text"
            )}
          >
            {segments.map((seg, i) =>
              seg.h
                ? <mark key={i} className="bg-yellow-300 text-slate-900 rounded-[2px] not-italic">{seg.t}</mark>
                : <span key={i}>{seg.t}</span>
            )}
          </div>
        </>
      )}
    </div>
  )
}
