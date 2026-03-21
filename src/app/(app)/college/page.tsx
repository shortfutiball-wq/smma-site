"use client"

import { useCourses } from "@/components/course-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { CheckCircle2, ChevronDown, ChevronRight } from "lucide-react"
import { COLLEGES } from "@/lib/revision-engine"
import { useState } from "react"

export default function CollegePage() {
  const { courses, collegeData, updateCollegeTransversal, updateQCMStatus } = useCourses()
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const toggle = (name: string) => setExpanded(prev => ({ ...prev, [name]: !prev[name] }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Suivi par Collège</h1>
        <p className="text-slate-400 text-sm">{courses.length} item{courses.length > 1 ? "s" : ""} répartis sur {COLLEGES.length} collèges</p>
      </div>

      <div className="space-y-3">
        {COLLEGES.map(college => {
          const collegeCourses = courses.filter(c => c.college === college.name)
          const data = collegeData[college.name]
          const isOpen = expanded[college.name]
          const totalRev = collegeCourses.flatMap(c => c.revisions).length
          const doneRev = collegeCourses.flatMap(c => c.revisions).filter(r => r.isDone).length
          const pct = totalRev > 0 ? Math.round((doneRev / totalRev) * 100) : 0

          return (
            <Card key={college.name} className="bg-slate-900 border-slate-800 overflow-hidden">
              {/* Header collège */}
              <button
                className="w-full text-left"
                onClick={() => toggle(college.name)}
              >
                <CardHeader className="pb-3 hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center gap-3">
                    {isOpen
                      ? <ChevronDown size={16} className="text-slate-400 flex-shrink-0" />
                      : <ChevronRight size={16} className="text-slate-400 flex-shrink-0" />
                    }
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: college.color }}
                    />
                    <CardTitle className="text-sm font-semibold text-white flex-1">
                      {college.name}
                    </CardTitle>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-xs text-slate-400">{collegeCourses.length} item{collegeCourses.length > 1 ? "s" : ""}</p>
                        <p className="text-xs font-bold" style={{ color: college.color }}>{pct}%</p>
                      </div>
                    </div>
                  </div>
                  {/* Mini barre de progression */}
                  <div className="h-1 bg-slate-800 rounded-full mt-2 ml-7">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, backgroundColor: college.color }}
                    />
                  </div>
                </CardHeader>
              </button>

              {/* Contenu déroulable */}
              {isOpen && (
                <CardContent className="pt-0 space-y-4">
                  {/* Suivi transversal collège */}
                  <div className="p-3 rounded-lg bg-slate-800/60 space-y-3">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Ressources transversales</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-slate-400 mb-1 block">Masterclass EDNi</label>
                        <Input
                          className="h-7 text-xs bg-slate-900 border-slate-700 text-white"
                          placeholder="ex: session 3, chapitre 2..."
                          value={data?.masterclassEDNi || ""}
                          onChange={e => updateCollegeTransversal(college.name, "masterclassEDNi", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 mb-1 block">Spe360 / Hypo</label>
                        <Input
                          className="h-7 text-xs bg-slate-900 border-slate-700 text-white"
                          placeholder="ex: module 4..."
                          value={data?.spe360Hypo || ""}
                          onChange={e => updateCollegeTransversal(college.name, "spe360Hypo", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { field: "unessDone", label: "Uness DP" },
                        { field: "martingaleDone", label: "Martingale" },
                        { field: "collegeDone", label: "Collège" },
                      ].map(({ field, label }) => {
                        const done = !!(data as any)?.[field]
                        return (
                          <button
                            key={field}
                            onClick={() => updateCollegeTransversal(college.name, field as any, !done)}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all border ${
                              done
                                ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                                : "bg-slate-800 border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300"
                            }`}
                          >
                            <span>{label}</span>
                            {done && <CheckCircle2 size={13} className="text-emerald-400" />}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Liste des items */}
                  {collegeCourses.length === 0 ? (
                    <p className="text-slate-500 text-sm text-center py-3">Aucun item dans ce collège</p>
                  ) : (
                    <div className="space-y-2">
                      {collegeCourses.map(course => {
                        const revDone = course.revisions.filter(r => r.isDone).length
                        const revTotal = course.revisions.length
                        const coursePct = revTotal > 0 ? Math.round((revDone / revTotal) * 100) : 0
                        return (
                          <div key={course.id} className="p-3 rounded-lg bg-slate-800/40 space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="text-xs font-mono text-slate-400 flex-shrink-0">Item {course.itemNumber}</span>
                                <span className="text-sm text-white truncate">{course.title}</span>
                              </div>
                              <span className="text-xs font-bold text-slate-300 flex-shrink-0">{coursePct}%</span>
                            </div>
                            {/* Révisions timeline */}
                            <div className="flex gap-0.5">
                              {course.revisions.map(r => (
                                <div
                                  key={r.j}
                                  className="h-1.5 flex-1 rounded-full"
                                  style={{ backgroundColor: r.isDone ? college.color : "#1e293b" }}
                                  title={`J${r.j}`}
                                />
                              ))}
                            </div>
                            {/* QCM checkboxes */}
                            <div className="flex flex-wrap gap-2">
                              {[
                                { field: "hypocampusDone", label: "Hypocampus" },
                                { field: "edniDone", label: "EDNi" },
                                { field: "unessDone", label: "UNESS" },
                                { field: "resumeDone", label: "Résumé" },
                              ].map(({ field, label }) => {
                                const done = !!(course as any)[field]
                                return (
                                  <button
                                    key={field}
                                    onClick={() => updateQCMStatus(course.id, field as any, !done)}
                                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all border ${
                                      done
                                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                                        : "bg-slate-800 border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300"
                                    }`}
                                  >
                                    <span>{label}</span>
                                    {done && <CheckCircle2 size={13} className="text-emerald-400" />}
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
