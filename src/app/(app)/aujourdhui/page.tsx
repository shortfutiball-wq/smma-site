"use client"

import { useCourses } from "@/components/course-context"
import { useAnki } from "@/components/anki-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, BookOpen, Brain, CalendarCheck, Flame } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { isToday, isPast, format } from "date-fns"
import { fr } from "date-fns/locale"

export default function AujourdhuiPage() {
  const { courses, toggleRevisionStatus, updateQCMStatus } = useCourses()
  const { cards, decks } = useAnki()

  const today = new Date()

  // Révisions dues aujourd'hui
  const revisionsAujourdhui = courses.flatMap(course =>
    course.revisions
      .filter(r => isToday(r.date))
      .map(r => ({ ...r, course }))
  )

  // Révisions en retard (passées, non faites)
  const revisionsEnRetard = courses.flatMap(course =>
    course.revisions
      .filter(r => isPast(r.date) && !isToday(r.date) && !r.isDone)
      .map(r => ({ ...r, course }))
  )

  // Cartes Anki dues aujourd'hui ou en retard
  const cartesAnkiDues = cards.filter(c => c.due <= today)

  // Stats globales
  const totalRevisionsFaites = courses.flatMap(c => c.revisions).filter(r => r.isDone).length
  const totalRevisions = courses.flatMap(c => c.revisions).length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Aujourd'hui</h1>
        <p className="text-slate-400 text-sm">{format(today, "EEEE d MMMM yyyy", { locale: fr })}</p>
      </div>

      {/* Stats rapides */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CalendarCheck className="text-blue-400" size={20} />
              <div>
                <p className="text-2xl font-bold text-white">{revisionsAujourdhui.length}</p>
                <p className="text-xs text-slate-400">Révisions aujourd'hui</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Flame className="text-orange-400" size={20} />
              <div>
                <p className="text-2xl font-bold text-white">{revisionsEnRetard.length}</p>
                <p className="text-xs text-slate-400">En retard</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Brain className="text-purple-400" size={20} />
              <div>
                <p className="text-2xl font-bold text-white">{cartesAnkiDues.length}</p>
                <p className="text-xs text-slate-400">Cartes Anki dues</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <BookOpen className="text-green-400" size={20} />
              <div>
                <p className="text-2xl font-bold text-white">
                  {totalRevisions > 0 ? Math.round((totalRevisionsFaites / totalRevisions) * 100) : 0}%
                </p>
                <p className="text-xs text-slate-400">Progression globale</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Révisions du jour */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-base flex items-center gap-2">
            <CalendarCheck size={16} className="text-blue-400" />
            Révisions du jour
            <Badge variant="secondary" className="ml-auto">{revisionsAujourdhui.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {revisionsAujourdhui.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-4">Aucune révision prévue aujourd'hui</p>
          ) : (
            revisionsAujourdhui.map(({ course, j, isDone }) => (
              <div
                key={`${course.id}-${j}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/60 hover:bg-slate-800 transition-colors"
              >
                <button onClick={() => toggleRevisionStatus(course.id, j)}>
                  {isDone
                    ? <CheckCircle2 size={18} className="text-green-400" />
                    : <Circle size={18} className="text-slate-500" />
                  }
                </button>
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: course.color }}
                />
                <div className="flex-1 min-w-0">
                  <span className={`text-sm font-medium ${isDone ? "line-through text-slate-500" : "text-white"}`}>
                    Item {course.itemNumber} — {course.title}
                  </span>
                  <p className="text-xs text-slate-500">{course.college} · J{j}</p>
                </div>
                {/* Indicateurs ressources circulaires */}
                <TooltipProvider delayDuration={200}>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {([
                      { field: "hypocampusDone", label: "Hypocampus", letter: "H" },
                      { field: "edniDone", label: "EDNi", letter: "E" },
                      { field: "unessDone", label: "UNESS", letter: "U" },
                      { field: "resumeDone", label: "Résumé", letter: "R" },
                    ] as const).map(({ field, label, letter }) => {
                      const done = !!course[field]
                      return (
                        <Tooltip key={field}>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => updateQCMStatus(course.id, field, !done)}
                              className={`flex items-center gap-1 transition-all hover:scale-105 active:scale-95 px-1.5 py-0.5 rounded-md text-xs font-bold border ${
                                done
                                  ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                                  : "border-slate-700 text-slate-500 hover:text-slate-300"
                              }`}
                            >
                              <span>{letter}</span>
                              {done && <CheckCircle2 size={12} className="text-emerald-400" />}
                            </button>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="text-xs">
                            {label}
                          </TooltipContent>
                        </Tooltip>
                      )
                    })}
                  </div>
                </TooltipProvider>
                <Badge
                  className="text-xs flex-shrink-0"
                  style={{ backgroundColor: course.color + "22", color: course.color, border: `1px solid ${course.color}44` }}
                >
                  J{j}
                </Badge>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* En retard */}
      {revisionsEnRetard.length > 0 && (
        <Card className="bg-slate-900 border-orange-900/40">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-base flex items-center gap-2">
              <Flame size={16} className="text-orange-400" />
              En retard
              <Badge className="ml-auto bg-orange-500/20 text-orange-400 border-orange-500/30">
                {revisionsEnRetard.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {revisionsEnRetard.slice(0, 10).map(({ course, j, isDone, date }) => (
              <div
                key={`${course.id}-${j}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/60 hover:bg-slate-800 transition-colors"
              >
                <button onClick={() => toggleRevisionStatus(course.id, j)}>
                  <Circle size={18} className="text-orange-400" />
                </button>
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: course.color }}
                />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-white">
                    Item {course.itemNumber} — {course.title}
                  </span>
                  <p className="text-xs text-orange-400/70">
                    {course.college} · J{j} · prévu le {format(date, "d MMM", { locale: fr })}
                  </p>
                </div>
                {/* Indicateurs ressources circulaires */}
                <TooltipProvider delayDuration={200}>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {([
                      { field: "hypocampusDone", label: "Hypocampus", letter: "H" },
                      { field: "edniDone", label: "EDNi", letter: "E" },
                      { field: "unessDone", label: "UNESS", letter: "U" },
                      { field: "resumeDone", label: "Résumé", letter: "R" },
                    ] as const).map(({ field, label, letter }) => {
                      const done = !!course[field]
                      return (
                        <Tooltip key={field}>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => updateQCMStatus(course.id, field, !done)}
                              className={`flex items-center gap-1 transition-all hover:scale-105 active:scale-95 px-1.5 py-0.5 rounded-md text-xs font-bold border ${
                                done
                                  ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                                  : "border-slate-700 text-slate-500 hover:text-slate-300"
                              }`}
                            >
                              <span>{letter}</span>
                              {done && <CheckCircle2 size={12} className="text-emerald-400" />}
                            </button>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="text-xs">
                            {label}
                          </TooltipContent>
                        </Tooltip>
                      )
                    })}
                  </div>
                </TooltipProvider>
              </div>
            ))}
            {revisionsEnRetard.length > 10 && (
              <p className="text-xs text-slate-500 text-center pt-1">
                +{revisionsEnRetard.length - 10} autres révisions en retard
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Anki du jour */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-base flex items-center gap-2">
            <Brain size={16} className="text-purple-400" />
            Cartes Anki à réviser
            <Badge variant="secondary" className="ml-auto">{cartesAnkiDues.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {cartesAnkiDues.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-4">Aucune carte due pour aujourd'hui</p>
          ) : (
            <div className="space-y-2">
              {decks.map(deck => {
                const deckDues = cartesAnkiDues.filter(c => c.deckId === deck.id)
                if (deckDues.length === 0) return null
                return (
                  <div key={deck.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/60">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: deck.color }} />
                      <span className="text-sm text-white">{deck.title}</span>
                    </div>
                    <Badge style={{ backgroundColor: deck.color + "22", color: deck.color, border: `1px solid ${deck.color}44` }}>
                      {deckDues.length} carte{deckDues.length > 1 ? "s" : ""}
                    </Badge>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
