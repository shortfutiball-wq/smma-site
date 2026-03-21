"use client"

import React, { useState } from "react"
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isToday,
  addDays,
  isBefore,
  startOfToday
} from "date-fns"
import { fr } from "date-fns/locale"
import { ChevronLeft, ChevronRight, Plus, Trash2, CheckCircle2, Circle, Info, Activity, Zap, Target } from "lucide-react"
import { useCourses } from "@/components/course-context"
import { COLLEGES } from "@/lib/revision-engine"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [viewFilter, setViewFilter] = useState<'all' | 'j1'>('all')
  const { courses, addCourse, moveCourse, deleteCourse, toggleRevisionStatus } = useCourses()
  
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [newItem, setNewItem] = useState({ number: "", title: "", college: "", date: format(new Date(), "yyyy-MM-dd") })

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 })
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 })
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate })

  const handleAddSubmit = () => {
    if (newItem.number && newItem.title && newItem.college) {
      addCourse(newItem.number, newItem.title, newItem.college, new Date(newItem.date))
      setIsAddOpen(false)
      setNewItem({ ...newItem, number: "", title: "" })
      toast.success(`Item ${newItem.number} ajouté !`)
    }
  }

  // Stats
  const totalItemsGoal = 367
  const currentItemsCount = courses.length
  const progressPercent = Math.round((currentItemsCount / totalItemsGoal) * 100)
  const today = startOfToday()
  const todayRevisions = courses.flatMap(c => c.revisions).filter(r => isSameDay(r.date, today))
  const countToday = todayRevisions.length
  const doneToday = todayRevisions.filter(r => r.isDone).length
  const dailyGoalPercent = countToday > 0 ? Math.round((doneToday / countToday) * 100) : 0

  return (
    <div className="flex flex-col gap-6 pb-20">
      {/* Studio Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-xl p-6 flex flex-col justify-between min-h-[160px]">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Progression Globale</p>
            <Target className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-3xl font-bold text-white">{progressPercent}%</p>
            <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-widest">{currentItemsCount} / {totalItemsGoal} items</p>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-1000" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-xl p-6 flex flex-col justify-between min-h-[160px]">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">J Aujourd'hui</p>
            <Activity className="h-5 w-5 text-cyan-400" />
          </div>
          <div>
            <p className="text-3xl font-bold text-white">{countToday}</p>
            <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-widest">{doneToday} validés</p>
          </div>
          <p className="text-[10px] text-cyan-400/60 font-semibold mt-2">Studio Analytics • Live</p>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-xl p-6 flex flex-col justify-between min-h-[160px]">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Objectif du jour</p>
            <Zap className="h-5 w-5 text-emerald-400" />
          </div>
          <p className="text-3xl font-bold text-white">{dailyGoalPercent}%</p>
          <div className="w-full h-1.5 bg-white/5 rounded-full mt-4 overflow-hidden">
            <div className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-1000" style={{ width: `${dailyGoalPercent}%` }} />
          </div>
        </div>
      </div>

      {/* Calendar Grid Section */}
      <div className="bg-slate-900/40 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden">
        {/* Calendar Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
          <div className="flex items-center gap-6">
            <h2 className="text-xl font-bold text-white capitalize">{format(currentMonth, "MMMM yyyy", { locale: fr })}</h2>
            <div className="flex items-center gap-1 bg-slate-800/50 p-1 rounded-lg border border-white/5">
              <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-1.5 hover:bg-white/10 rounded-md transition"><ChevronLeft size={16}/></button>
              <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-1.5 hover:bg-white/10 rounded-md transition"><ChevronRight size={16}/></button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-slate-800/50 p-1 rounded-lg border border-white/5 text-[10px] font-bold uppercase tracking-widest">
              <button onClick={() => setViewFilter('all')} className={cn("px-3 py-1.5 rounded-md transition", viewFilter === 'all' ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:text-white")}>Tous les J</button>
              <button onClick={() => setViewFilter('j1')} className={cn("px-3 py-1.5 rounded-md transition", viewFilter === 'j1' ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:text-white")}>Que les J1</button>
            </div>

            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-500 text-white font-bold h-9 rounded-lg gap-2 text-xs uppercase tracking-widest">
                  <Plus size={14} strokeWidth={3} />
                  Nouvel Item
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-white/10 text-white rounded-2xl">
                <DialogHeader><DialogTitle className="text-xl font-bold tracking-tight">Nouveau Protocole J</DialogTitle></DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Item #</Label>
                    <Input className="col-span-3 bg-white/5 border-white/10 rounded-xl" value={newItem.number} onChange={(e) => setNewItem({...newItem, number: e.target.value})} placeholder="209" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Titre</Label>
                    <Input className="col-span-3 bg-white/5 border-white/10 rounded-xl" value={newItem.title} onChange={(e) => setNewItem({...newItem, title: e.target.value})} placeholder="BPCO" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Collège</Label>
                    <Select onValueChange={(v) => setNewItem({...newItem, college: v})}>
                      <SelectTrigger className="col-span-3 bg-white/5 border-white/10 rounded-xl">
                        <SelectValue placeholder="Spécialité" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-white/10 text-white">
                        {COLLEGES.map(c => <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Date J1</Label>
                    <Input type="date" className="col-span-3 bg-white/5 border-white/10 rounded-xl" value={newItem.date} onChange={(e) => setNewItem({...newItem, date: e.target.value})} />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddSubmit} className="w-full bg-blue-600 hover:bg-blue-500 py-6 rounded-xl font-bold uppercase tracking-[0.2em]">Lancer le Protocole</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-white/5">
          {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(d => (
            <div key={d} className="py-3 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 bg-white/[0.02]">{d}</div>
          ))}
        </div>

        {/* Grid Days */}
        <div className="grid grid-cols-7">
          {calendarDays.map((day) => {
            const isCurrentMonth = isSameMonth(day, monthStart)
            const isTodayDay = isToday(day)
            return (
              <div key={day.toString()} className={cn("min-h-[140px] p-2 border-r border-b border-white/5 flex flex-col gap-2 transition-colors hover:bg-white/[0.02]", !isCurrentMonth && "opacity-20 pointer-events-none")}>
                <div className="flex justify-between items-center px-1">
                  <span className={cn("text-xs font-bold", isTodayDay ? "text-blue-400" : "text-slate-500")}>{format(day, "d")}</span>
                  {isTodayDay && <div className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#3b82f6]" />}
                </div>
                <div className="flex flex-col gap-1.5">
                  {courses.flatMap(course => {
                    const items = []
                    if (isSameDay(course.startDate, day)) items.push({ course, j: 1, type: 'J1', isDone: course.revisions[0]?.isDone || false })
                    if (viewFilter === 'all') {
                      course.revisions.forEach(rev => {
                        if (rev.j !== 1 && isSameDay(rev.date, day)) items.push({ course, j: rev.j, type: `J${rev.j}`, isDone: rev.isDone })
                      })
                    }
                    return items
                  }).map(({ course, j, type, isDone }) => (
                    <ContextMenu key={`${course.id}-${j}`}>
                      <ContextMenuTrigger>
                        <div className={cn("text-[9px] p-2 rounded-lg border flex items-center justify-between cursor-pointer transition-all", isDone ? "bg-white/[0.02] border-transparent opacity-30 line-through grayscale" : "bg-slate-800/50 border-white/5 hover:border-blue-500/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]")}>
                          <div className="flex items-center gap-2 truncate">
                            <div className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: !isDone ? course.color : '#475569' }} />
                            <span className="truncate font-bold text-slate-200">
                              <span className="text-blue-400 mr-1">{type}</span>
                              {course.itemNumber} • {course.title}
                            </span>
                          </div>
                        </div>
                      </ContextMenuTrigger>
                      <ContextMenuContent className="bg-slate-900 border-white/10 text-white rounded-xl p-1 shadow-2xl">
                        <ContextMenuItem onClick={() => toggleRevisionStatus(course.id, j)} className="rounded-lg font-bold text-[10px] gap-2 p-2">
                          <CheckCircle2 size={14} className="text-emerald-400" /> Marquer comme fait
                        </ContextMenuItem>
                        <ContextMenuItem onClick={() => deleteCourse(course.id)} className="rounded-lg font-bold text-[10px] gap-2 p-2 text-rose-400">
                          <Trash2 size={14} /> Supprimer l'item
                        </ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenu>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
