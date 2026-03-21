"use client"

import React, { useState, useRef, useCallback, useMemo } from "react"
import { Book, Highlighter, Eraser, Loader2, BrainCircuit, ChevronLeft, Send } from "lucide-react"
import { StudySidebar } from "@/components/study-sidebar"
import { AnkiNotepad } from "@/components/anki-notepad"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

// ─── Applique highlights sur texte plain (sans **) ────────────────────────
function applyHighlights(text: string, highlights: string[]): React.ReactNode {
  const plain = text.replace(/\*\*/g, "")
  if (!highlights.length) return plain
  let parts: { t: string; h: boolean }[] = [{ t: plain, h: false }]
  for (const hl of highlights) {
    if (!hl.trim()) continue
    const next: { t: string; h: boolean }[] = []
    for (const part of parts) {
      if (part.h) { next.push(part); continue }
      const idx = part.t.indexOf(hl)
      if (idx === -1) { next.push(part); continue }
      if (idx > 0) next.push({ t: part.t.slice(0, idx), h: false })
      next.push({ t: hl, h: true })
      const after = part.t.slice(idx + hl.length)
      if (after) next.push({ t: after, h: false })
    }
    parts = next
  }
  return (
    <>
      {parts.map((p, i) =>
        p.h
          ? <mark key={i} className="bg-yellow-300 text-slate-900 rounded-sm px-0.5 not-italic">{p.t}</mark>
          : <span key={i}>{p.t}</span>
      )}
    </>
  )
}

// ─── Applique highlights + gras inline ─────────────────────────────────────
// Travaille sur le texte plain pour les highlights (sélection = texte rendu sans **)
function applyHighlightsAndBold(rawText: string, highlights: string[]): React.ReactNode {
  const plain = rawText.replace(/\*\*/g, "")

  if (!highlights.length) {
    // Pas de highlight : rendu gras normal
    return <>{rawText.split(/(\*\*.+?\*\*)/).map((chunk, ci) =>
      chunk.startsWith("**") && chunk.endsWith("**")
        ? <strong key={ci} className="font-bold text-slate-900">{chunk.slice(2, -2)}</strong>
        : <React.Fragment key={ci}>{chunk}</React.Fragment>
    )}</>
  }

  // Avec highlights : on travaille sur le texte plain
  let parts: { t: string; h: boolean }[] = [{ t: plain, h: false }]
  for (const hl of highlights) {
    if (!hl.trim()) continue
    const next: { t: string; h: boolean }[] = []
    for (const part of parts) {
      if (part.h) { next.push(part); continue }
      const idx = part.t.indexOf(hl)
      if (idx === -1) { next.push(part); continue }
      if (idx > 0) next.push({ t: part.t.slice(0, idx), h: false })
      next.push({ t: hl, h: true })
      const after = part.t.slice(idx + hl.length)
      if (after) next.push({ t: after, h: false })
    }
    parts = next
  }
  return (
    <>
      {parts.map((p, i) =>
        p.h
          ? <mark key={i} className="bg-yellow-300 text-slate-900 rounded-sm px-0.5 not-italic">{p.t}</mark>
          : <span key={i}>{p.t}</span>
      )}
    </>
  )
}

// ─── Renderer markdown custom avec highlights ──────────────────────────────
function CourseRenderer({ text, highlights }: { text: string; highlights: string[] }) {
  const lines = text.split("\n")
  const nodes: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const raw = lines[i]
    const trimmed = raw.trim()

    if (!trimmed) { i++; continue }

    // Titres markdown
    if (trimmed.startsWith("### ")) {
      nodes.push(<h3 key={i} className="text-blue-600 font-black uppercase tracking-widest text-xs mt-10 mb-4">{applyHighlights(trimmed.slice(4), highlights)}</h3>)
    } else if (trimmed.startsWith("## ")) {
      nodes.push(<h2 key={i} className="text-blue-600 font-black uppercase tracking-widest text-sm mt-12 mb-5">{applyHighlights(trimmed.slice(3), highlights)}</h2>)
    } else if (trimmed.startsWith("# ")) {
      nodes.push(<h1 key={i} className="text-blue-600 font-black uppercase tracking-widest text-base mt-12 mb-6">{applyHighlights(trimmed.slice(2), highlights)}</h1>)
    }
    // Bullet
    else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      nodes.push(
        <li key={i} className="text-slate-800 text-lg leading-[2] mb-1 ml-5 list-disc">
          {applyHighlights(trimmed.slice(2), highlights)}
        </li>
      )
    }
    // Texte en gras seul → sous-titre
    else if (/^\*\*(.+)\*\*$/.test(trimmed)) {
      nodes.push(<p key={i} className="font-bold text-slate-900 text-lg leading-[2] mb-2">{applyHighlights(trimmed, highlights)}</p>)
    }
    // Paragraphe normal (highlights + gras inline en un seul pass)
    else {
      nodes.push(<p key={i} className="text-slate-800 text-lg leading-[2] mb-6">{applyHighlightsAndBold(trimmed, highlights)}</p>)
    }
    i++
  }

  return <>{nodes}</>
}

// ─── Page principale ───────────────────────────────────────────────────────
export default function CoursePage() {
  const [courseRawText, setCourseRawText] = useState("")
  const [isReadingMode, setIsReadingMode] = useState(false)
  const [courseTitle, setCourseTitle] = useState("Nouveau Cours")
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0, show: false })
  const [bubblePos, setBubblePos] = useState({ x: 0, y: 0, show: false })
  const selectedTextRef = useRef("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [sidebarContent, setSidebarContent] = useState("")
  const [sidebarLoading, setSidebarLoading] = useState(false)
  const [sidebarType, setSidebarType] = useState<"explain" | "table" | "define" | "">("")
  const [highlights, setHighlights] = useState<string[]>([])
  const [highlightMode, setHighlightMode] = useState(false)
  const [ankiContent, setAnkiContent] = useState("")
  const [ankiLoading, setAnkiLoading] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  // Fermer menus au clic ailleurs
  const closeMenus = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.closest("[data-menu]") && !target.closest("[data-bubble]")) {
      setMenuPos(p => ({ ...p, show: false }))
      setBubblePos(p => ({ ...p, show: false }))
    }
  }, [])

  React.useEffect(() => {
    window.addEventListener("mousedown", closeMenus)
    return () => window.removeEventListener("mousedown", closeMenus)
  }, [closeMenus])

  // Sélection → bulle ou highlight auto
  const handleMouseUp = useCallback(() => {
    // Petit délai pour laisser la sélection se stabiliser
    setTimeout(() => {
      const sel = window.getSelection()
      const text = sel?.toString().trim() ?? ""
      if (!text || text.length < 2) {
        setBubblePos(p => ({ ...p, show: false }))
        return
      }
      selectedTextRef.current = text

      if (highlightMode) {
        const parts = text.split(/\r?\n/).map(l => l.trim().replace(/\*\*/g, "")).filter(l => l.length > 1)
        setHighlights(prev => {
          const next = [...prev]
          for (const p of parts) if (!next.includes(p)) next.push(p)
          return next
        })
        sel?.removeAllRanges()
        toast.success("Surligné !", { icon: "🟡", duration: 800 })
        return
      }

      const range = sel!.getRangeAt(0)
      const rect = range.getBoundingClientRect()
      setBubblePos({ x: rect.left + rect.width / 2, y: rect.top - 8, show: true })
      setMenuPos(p => ({ ...p, show: false }))
    }, 50)
  }, [highlightMode])

  // Clic droit
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    const text = window.getSelection()?.toString().trim() ?? ""
    if (text) {
      e.preventDefault()
      selectedTextRef.current = text
      setMenuPos({ x: e.clientX, y: e.clientY, show: true })
      setBubblePos(p => ({ ...p, show: false }))
    }
  }, [])

  const doHighlight = useCallback(() => {
    const text = selectedTextRef.current
    if (!text) return
    const parts = text.split("\n").map(l => l.trim()).filter(l => l.length > 1)
    setHighlights(prev => {
      const next = [...prev]
      for (const p of parts) if (!next.includes(p)) next.push(p)
      return next
    })
    setMenuPos(p => ({ ...p, show: false }))
    setBubblePos(p => ({ ...p, show: false }))
    window.getSelection()?.removeAllRanges()
    toast.success("Surligné !", { icon: "🟡", duration: 800 })
  }, [])

  const doErase = useCallback(() => {
    const text = selectedTextRef.current
    if (!text) return
    setHighlights(prev => prev.filter(h => h !== text && !h.includes(text) && !text.includes(h)))
    setMenuPos(p => ({ ...p, show: false }))
    setBubblePos(p => ({ ...p, show: false }))
    window.getSelection()?.removeAllRanges()
    toast.success("Surlignage supprimé", { icon: "🧹", duration: 800 })
  }, [])

  const handleAIAction = useCallback(async (type: "define") => {
    const text = selectedTextRef.current
    if (!text) return
    setMenuPos(p => ({ ...p, show: false }))
    setBubblePos(p => ({ ...p, show: false }))
    setSidebarType(type)
    setIsSidebarOpen(true)
    setSidebarLoading(true)
    setSidebarContent("")
    try {
      const res = await fetch("/api/study-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, type }),
      })
      const data = await res.json()
      if (data.content) setSidebarContent(data.content)
      else toast.error("Erreur : " + (data.error || "Génération impossible"))
    } catch {
      toast.error("Impossible de contacter l'IA")
    } finally {
      setSidebarLoading(false)
    }
  }, [])

  const generateAnki = useCallback(async () => {
    if (!highlights.length) return
    setAnkiLoading(true)
    try {
      const res = await fetch("/api/study-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: highlights.join("\n\n"), type: "anki" }),
      })
      const data = await res.json()
      if (data.content) setAnkiContent(data.content)
      else toast.error("Erreur Anki : " + (data.error || ""))
    } catch {
      toast.error("Erreur réseau")
    } finally {
      setAnkiLoading(false)
    }
  }, [highlights])

  const menuItems = [
    { label: "Définition",  icon: <Book size={15} className="text-orange-400" />,        action: () => handleAIAction("define"), color: "hover:bg-orange-50 hover:text-orange-600" },
    { label: "Surligner",   icon: <Highlighter size={15} className="text-yellow-500" />,  action: doHighlight,                    color: "hover:bg-yellow-50 hover:text-yellow-700" },
    { label: "Gomme",       icon: <Eraser size={15} className="text-slate-400" />,        action: doErase,                        color: "hover:bg-slate-100 hover:text-slate-700" },
  ]

  return (
    <div className="relative min-h-screen pb-32">
      <div className="max-w-[800px] mx-auto pt-10 px-6">

        {/* ── Mode saisie ── */}
        {!isReadingMode ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.3em]">Lecture Active</span>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white">Collez votre cours</h1>
            </div>
            <div className="space-y-4">
              <Input
                placeholder="Titre du cours"
                value={courseTitle}
                onChange={e => setCourseTitle(e.target.value)}
                className="h-14 bg-white text-slate-900 border-slate-200 rounded-2xl px-6 font-bold"
              />
              <Textarea
                placeholder="Contenu du cours..."
                value={courseRawText}
                onChange={e => setCourseRawText(e.target.value)}
                className="min-h-[400px] bg-white text-slate-900 border-slate-200 rounded-3xl p-8 leading-relaxed text-base"
              />
              <Button
                onClick={() => { if (courseRawText.trim()) setIsReadingMode(true); else toast.error("Veuillez coller un texte") }}
                className="w-full h-16 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold uppercase tracking-widest gap-3 shadow-xl shadow-blue-500/20"
              >
                <Send size={18} /> Lancer l'étude
              </Button>
            </div>
          </div>

        ) : (
          /* ── Mode lecture ── */
          <div className="animate-in fade-in duration-700">

            {/* Header */}
            <div className="flex items-center justify-between mb-10">
              <Button
                variant="ghost"
                onClick={() => { setIsReadingMode(false); setHighlights([]); setAnkiContent(""); setHighlightMode(false) }}
                className="text-slate-500 hover:text-slate-900 gap-2"
              >
                <ChevronLeft size={16} /> Retour
              </Button>
              <div className="flex items-center gap-3">
                {highlights.length > 0 && (
                  <span className="text-xs text-yellow-600 font-bold flex items-center gap-1">
                    <Highlighter size={12} /> {highlights.length} surligné{highlights.length > 1 ? "s" : ""}
                  </span>
                )}
                <button
                  onClick={() => setHighlightMode(m => !m)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all",
                    highlightMode
                      ? "bg-yellow-400 text-slate-900 border-yellow-500 shadow-[0_0_12px_rgba(250,204,21,0.35)]"
                      : "bg-white text-slate-500 border-slate-200 hover:border-yellow-400/60"
                  )}
                >
                  <Highlighter size={14} />
                  {highlightMode ? "Surlignage ON" : "Surlignage OFF"}
                </button>
              </div>
            </div>

            {/* Titre cours */}
            <div className="mb-10 border-l-4 border-blue-500 pl-8 py-2">
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.3em] mb-2 block">Support de cours</span>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">{courseTitle}</h1>
            </div>

            {/* Contenu du cours */}
            <div
              ref={contentRef}
              onMouseUp={handleMouseUp}
              onContextMenu={handleContextMenu}
              className={cn(
                "bg-white rounded-2xl p-8 shadow-sm border border-slate-100 select-text",
                highlightMode && "cursor-crosshair"
              )}
            >
              <CourseRenderer text={courseRawText} highlights={highlights} />
            </div>

            {/* Bouton Anki */}
            {highlights.length > 0 && (
              <div className="mt-16 flex flex-col items-center gap-6 p-10 bg-blue-500/5 border border-blue-500/10 rounded-[2.5rem] border-dashed">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  {highlights.length} passage{highlights.length > 1 ? "s" : ""} surligné{highlights.length > 1 ? "s" : ""}
                </h3>
                <Button
                  onClick={generateAnki}
                  disabled={ankiLoading}
                  className="bg-blue-600 hover:bg-blue-500 h-14 px-10 rounded-2xl font-bold uppercase tracking-widest text-xs gap-3 shadow-xl shadow-blue-500/20"
                >
                  {ankiLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <BrainCircuit size={20} />}
                  {ankiLoading ? "Génération..." : "Générer les questions Anki"}
                </Button>
              </div>
            )}

            <AnkiNotepad content={ankiContent} isVisible={!!ankiContent || ankiLoading} />
          </div>
        )}
      </div>

      {/* ── Bulle flottante ── */}
      {bubblePos.show && (
        <div
          data-bubble
          className="fixed z-[100] bg-white border border-slate-200 rounded-xl shadow-xl p-1 animate-in fade-in zoom-in-95 duration-100"
          style={{ left: bubblePos.x, top: bubblePos.y, transform: "translate(-50%, -100%)" }}
        >
          <div className="flex items-center gap-0.5">
            {menuItems.map(item => (
              <button
                key={item.label}
                onMouseDown={e => { e.preventDefault(); e.stopPropagation() }}
                onClick={item.action}
                className={cn("flex items-center gap-1.5 px-3 py-2 rounded-lg text-slate-600 text-xs font-bold whitespace-nowrap transition-all", item.color)}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Menu clic droit ── */}
      {menuPos.show && (
        <div
          data-menu
          className="fixed z-[100] bg-white border border-slate-200 rounded-xl shadow-xl p-1 min-w-[180px] animate-in fade-in zoom-in-95 duration-100"
          style={{ top: menuPos.y, left: menuPos.x }}
        >
          {menuItems.map(item => (
            <button
              key={item.label}
              onMouseDown={e => { e.preventDefault(); e.stopPropagation() }}
              onClick={item.action}
              className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 text-xs font-bold text-left transition-all", item.color)}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>
      )}

      <StudySidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        content={sidebarContent}
        isLoading={sidebarLoading}
        type={sidebarType}
      />
    </div>
  )
}
