"use client"

import { useState } from "react"
import { useCourses } from "@/components/course-context"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, CheckCircle2, Circle } from "lucide-react"
import { COLLEGES } from "@/lib/revision-engine"

export default function RecherchePage() {
  const { courses } = useCourses()
  const [query, setQuery] = useState("")
  const [selectedCollege, setSelectedCollege] = useState<string | null>(null)

  const q = query.toLowerCase().trim()

  const filtered = courses.filter(course => {
    const matchQuery =
      q === "" ||
      course.itemNumber.toLowerCase().includes(q) ||
      course.title.toLowerCase().includes(q)
    const matchCollege = selectedCollege === null || course.college === selectedCollege
    return matchQuery && matchCollege
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Recherche d'Item</h1>
        <p className="text-slate-400 text-sm">{courses.length} item{courses.length > 1 ? "s" : ""} au total</p>
      </div>

      {/* Barre de recherche */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <Input
          className="pl-9 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-blue-500"
          placeholder="Rechercher par numéro d'item ou titre..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoFocus
        />
      </div>

      {/* Filtres collège */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCollege(null)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            selectedCollege === null
              ? "bg-blue-500 text-white"
              : "bg-slate-800 text-slate-400 hover:text-white"
          }`}
        >
          Tous
        </button>
        {COLLEGES.map(college => {
          const count = courses.filter(c => c.college === college.name).length
          if (count === 0) return null
          return (
            <button
              key={college.name}
              onClick={() => setSelectedCollege(selectedCollege === college.name ? null : college.name)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedCollege === college.name
                  ? "text-white"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
              style={selectedCollege === college.name ? { backgroundColor: college.color } : {}}
            >
              {college.name} ({count})
            </button>
          )
        })}
      </div>

      {/* Résultats */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <Search size={32} className="mx-auto mb-3 opacity-30" />
            <p>Aucun item trouvé</p>
          </div>
        ) : (
          <>
            <p className="text-xs text-slate-500 mb-3">
              {filtered.length} résultat{filtered.length > 1 ? "s" : ""}
            </p>
            {filtered.map(course => {
              const revDone = course.revisions.filter(r => r.isDone).length
              const revTotal = course.revisions.length
              const pct = revTotal > 0 ? Math.round((revDone / revTotal) * 100) : 0

              return (
                <Card key={course.id} className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div
                          className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                          style={{ backgroundColor: course.color }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-mono text-slate-400">Item {course.itemNumber}</span>
                            <Badge
                              className="text-xs"
                              style={{
                                backgroundColor: course.color + "22",
                                color: course.color,
                                border: `1px solid ${course.color}44`
                              }}
                            >
                              {course.college}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium text-white mt-1 truncate">{course.title}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-bold text-white">{pct}%</p>
                        <p className="text-xs text-slate-500">{revDone}/{revTotal} rév.</p>
                      </div>
                    </div>

                    {/* Barre de progression révisions */}
                    <div className="mt-3 flex gap-0.5">
                      {course.revisions.map(r => (
                        <div
                          key={r.j}
                          className="h-1.5 flex-1 rounded-full"
                          style={{ backgroundColor: r.isDone ? course.color : "#1e293b" }}
                          title={`J${r.j}`}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}
