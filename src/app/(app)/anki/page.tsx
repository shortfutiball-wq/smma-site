"use client"

import React, { useState, useMemo } from "react"
import { useAnki, AnkiCard } from "@/components/anki-context"
import { Rating, State } from "ts-fsrs"
import { 
  Plus, 
  Play, 
  Library, 
  ChevronLeft, 
  Layers, 
  BrainCircuit, 
  History,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Zap,
  Trash2,
  Pencil,
  Save,
  X,
  Settings2
} from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { isBefore, startOfToday } from "date-fns"
import { toast } from "sonner"

export default function AnkiPage() {
  const { decks, cards, addDeck, addCard, updateCard, reviewCard, deleteCard, deleteDeck } = useAnki()
  const [isReviewing, setIsReviewing] = useState(false)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  
  const [isDeckModalOpen, setIsDeckModalOpen] = useState(false)
  const [isCardModalOpen, setIsCardModalOpen] = useState(false)
  const [managingDeckId, setManagingDeckId] = useState<string | null>(null)
  const [editingCardId, setEditingCardId] = useState<string | null>(null)
  const [editValues, setEditValues] = useState({ front: "", back: "" })
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  
  const [isEditingInReview, setIsEditingInReview] = useState(false)

  const [newDeck, setNewDeck] = useState({ title: "", color: "#3b82f6" })
  const [newCard, setNewCard] = useState({ deckId: "", front: "", back: "" })

  const dueCards = useMemo(() => {
    return cards.filter(card => isBefore(card.due, new Date()) || card.state === State.New)
  }, [cards])

  const currentCard = dueCards[currentCardIndex]

  const nextCard = () => {
    if (currentCardIndex < dueCards.length - 1) {
      setCurrentCardIndex(prev => prev + 1)
      setShowAnswer(false)
      setIsEditingInReview(false)
    } else {
      setIsReviewing(false)
      setCurrentCardIndex(0)
      setIsEditingInReview(false)
    }
  }

  const handleReview = (rating: Rating) => {
    reviewCard(currentCard.id, rating)
    nextCard()
  }

  const handleDeleteInReview = () => {
    deleteCard(currentCard.id)
    toast.error("Carte supprimée")
    nextCard()
  }

  const handleSaveInReview = () => {
    updateCard(currentCard.id, editValues.front, editValues.back)
    setIsEditingInReview(false)
  }

  const startSession = () => {
    if (dueCards.length > 0) {
      setIsReviewing(true)
      setCurrentCardIndex(0)
      setShowAnswer(false)
    }
  }

  if (isReviewing && currentCard) {
    return (
      <div className="max-w-2xl mx-auto flex flex-col gap-8 min-h-[600px]">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setIsReviewing(false)} className="text-slate-400 hover:text-white">
            <ChevronLeft className="mr-2 h-4 w-4" /> Quitter
          </Button>
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Carte {currentCardIndex + 1} / {dueCards.length}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center perspective-1000 relative">
          {showAnswer && !isEditingInReview && (
            <div className="absolute top-4 right-4 z-50 flex gap-2">
              <Button size="icon" variant="ghost" onClick={() => { setEditValues({ front: currentCard.front, back: currentCard.back }); setIsEditingInReview(true) }} className="h-8 w-8 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/10 text-slate-400 hover:text-white hover:bg-blue-500/20">
                <Pencil size={14} />
              </Button>
              <Button size="icon" variant="ghost" onClick={handleDeleteInReview} className="h-8 w-8 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/10 text-slate-400 hover:text-rose-400 hover:bg-rose-500/20">
                <X size={14} />
              </Button>
            </div>
          )}

          <motion.div initial={false} animate={{ rotateY: showAnswer ? 180 : 0 }} transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }} style={{ transformStyle: "preserve-3d" }} className="relative w-full aspect-[4/3] cursor-pointer" onClick={() => !showAnswer && !isEditingInReview && setShowAnswer(true)}>
            <div style={{ backfaceVisibility: "hidden" }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-12 flex flex-col items-center justify-center text-center shadow-2xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 mb-8">Question</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-relaxed">{currentCard.front}</h2>
              {!showAnswer && <div className="mt-12 text-slate-500 text-xs font-bold uppercase tracking-widest animate-pulse">Cliquer pour voir la réponse</div>}
            </div>
            <div style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }} className="absolute inset-0 bg-blue-600/10 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-12 flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(59,130,246,0.15)]">
              {isEditingInReview ? (
                <div className="w-full h-full flex flex-col gap-4 p-4 bg-slate-900/90 rounded-2xl z-50 overflow-hidden" onClick={(e) => e.stopPropagation()}>
                   <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold uppercase text-blue-400">Modification rapide</span>
                    <Button size="icon" variant="ghost" onClick={() => setIsEditingInReview(false)} className="h-6 w-6"><X size={14}/></Button>
                  </div>
                  <Textarea value={editValues.front} onChange={(e) => setEditValues({...editValues, front: e.target.value})} className="flex-1 bg-white/5 border-white/10 text-xs" />
                  <Textarea value={editValues.back} onChange={(e) => setEditValues({...editValues, back: e.target.value})} className="flex-1 bg-white/5 border-white/10 text-xs" />
                  <Button onClick={handleSaveInReview} className="bg-blue-600 hover:bg-blue-500 h-10 font-bold text-xs gap-2"><Save size={14}/> Sauvegarder</Button>
                </div>
              ) : (
                <>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400 mb-8">Réponse</span>
                  <div className="text-xl md:text-2xl font-medium text-slate-200 leading-relaxed overflow-auto max-h-full w-full">{currentCard.back}</div>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {showAnswer && !isEditingInReview && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-4 gap-3">
            <Button onClick={() => handleReview(Rating.Again)} className="flex flex-col h-20 bg-rose-500/10 hover:bg-rose-500/20 border-rose-500/20 text-rose-400 rounded-2xl gap-1">
              <XCircle size={18} /><span className="text-[10px] font-bold uppercase tracking-tighter">Again</span><span className="text-[8px] opacity-60 tracking-widest">1 min</span>
            </Button>
            <Button onClick={() => handleReview(Rating.Hard)} className="flex flex-col h-20 bg-orange-500/10 hover:bg-orange-500/20 border-orange-500/20 text-orange-400 rounded-2xl gap-1">
              <AlertCircle size={18} /><span className="text-[10px] font-bold uppercase tracking-tighter">Hard</span><span className="text-[8px] opacity-60 tracking-widest">Demain</span>
            </Button>
            <Button onClick={() => handleReview(Rating.Good)} className="flex flex-col h-20 bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/20 text-blue-400 rounded-2xl gap-1">
              <CheckCircle2 size={18} /><span className="text-[10px] font-bold uppercase tracking-tighter">Good</span><span className="text-[8px] opacity-60 tracking-widest">~4-5 j</span>
            </Button>
            <Button onClick={() => handleReview(Rating.Easy)} className="flex flex-col h-20 bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/20 text-emerald-400 rounded-2xl gap-1">
              <Zap size={18} /><span className="text-[10px] font-bold uppercase tracking-tighter">Easy</span><span className="text-[8px] opacity-60 tracking-widest">~7+ j</span>
            </Button>
          </motion.div>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-10 max-w-5xl mx-auto pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-slate-900/40 backdrop-blur-lg border border-white/10 p-10 rounded-3xl shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity"><BrainCircuit size={120} className="text-blue-500" /></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4"><div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" /><span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-400">Système FSRS V4</span></div>
          <h1 className="text-5xl font-black text-white mb-2 tracking-tight">Flashcards</h1>
          <p className="text-slate-400 text-sm font-medium">Apprentissage actif par répétition espacée optimisée.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full md:w-auto">
          <Dialog open={isDeckModalOpen} onOpenChange={setIsDeckModalOpen}>
            <DialogTrigger asChild><Button className="h-14 px-8 bg-white/5 hover:bg-white/10 border-white/10 text-white font-bold rounded-2xl gap-3 transition-all"><Plus size={20} /> Nouveau Paquet</Button></DialogTrigger>
            <DialogContent className="bg-slate-950 border-white/10 text-white rounded-[2rem]">
              <DialogHeader><DialogTitle className="text-2xl font-bold">Créer un Paquet</DialogTitle></DialogHeader>
              <div className="py-6 space-y-6"><div className="space-y-2"><Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Nom du paquet</Label><Input value={newDeck.title} onChange={(e) => setNewDeck({ ...newDeck, title: e.target.value })} className="bg-white/5 border-white/10 h-12 rounded-xl" /></div></div>
              <DialogFooter><Button onClick={() => { addDeck(newDeck.title, newDeck.color); setIsDeckModalOpen(false); setNewDeck({ title: "", color: "#3b82f6" }) }} className="w-full h-14 bg-blue-600 hover:bg-blue-500 font-bold uppercase tracking-widest rounded-2xl">Confirmer</Button></DialogFooter>
            </DialogContent>
          </Dialog>
          <Button onClick={startSession} disabled={dueCards.length === 0} className="h-14 px-10 bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/20 text-white font-bold rounded-2xl gap-3 transition-all disabled:opacity-50 disabled:grayscale">
            <Play size={20} fill="currentColor" /> Réviser {dueCards.length} cartes
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {managingDeckId ? (
          <motion.div key="deck-manager" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => { setManagingDeckId(null); setEditingCardId(null) }} className="rounded-xl border border-white/5"><ChevronLeft size={20} /></Button>
                <div><h2 className="text-2xl font-bold text-white">{decks.find(d => d.id === managingDeckId)?.title}</h2><p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Gestion des cartes</p></div>
              </div>
              <Dialog open={isCardModalOpen} onOpenChange={setIsCardModalOpen}>
                <DialogTrigger asChild><Button className="bg-blue-600 hover:bg-blue-500 h-10 rounded-xl gap-2 text-xs font-bold"><Plus size={16} /> Ajouter une carte</Button></DialogTrigger>
                <DialogContent className="bg-slate-950 border-white/10 text-white rounded-[2rem]">
                  <DialogHeader><DialogTitle className="text-2xl font-bold">Ajouter une Flashcard</DialogTitle></DialogHeader>
                  <div className="py-6 space-y-6"><div className="space-y-2"><Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Question</Label><Textarea value={newCard.front} onChange={(e) => setNewCard({...newCard, front: e.target.value})} className="bg-white/5 border-white/10 rounded-xl" /></div><div className="space-y-2"><Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Réponse</Label><Textarea value={newCard.back} onChange={(e) => setNewCard({...newCard, back: e.target.value})} className="bg-white/5 border-white/10 rounded-xl" /></div></div>
                  <DialogFooter><Button onClick={() => { addCard(managingDeckId, newCard.front, newCard.back); setIsCardModalOpen(false); setNewCard({...newCard, front: "", back: ""}) }} className="w-full h-14 bg-blue-600 rounded-2xl">Enregistrer</Button></DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex flex-col gap-3">
              {cards.filter(c => c.deckId === managingDeckId).map(card => {
                const isEditing = editingCardId === card.id
                const isConfirming = confirmDeleteId === card.id
                return (
                  <div key={card.id} className="group bg-slate-900/40 border border-white/5 hover:border-white/10 rounded-2xl p-4 transition-all">
                    {isEditing ? (
                      <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-4"><div className="space-y-1"><Label className="text-[9px] font-bold uppercase text-slate-500">Recto</Label><Textarea value={editValues.front} onChange={(e) => setEditValues({...editValues, front: e.target.value})} className="bg-white/5 border-white/10 text-xs h-20" /></div><div className="space-y-1"><Label className="text-[9px] font-bold uppercase text-slate-500">Verso</Label><Textarea value={editValues.back} onChange={(e) => setEditValues({...editValues, back: e.target.value})} className="bg-white/5 border-white/10 text-xs h-20" /></div></div>
                        <div className="flex justify-end gap-2"><Button variant="ghost" size="sm" onClick={() => setEditingCardId(null)}>Annuler</Button><Button size="sm" onClick={() => { updateCard(card.id, editValues.front, editValues.back); setEditingCardId(null) }} className="bg-blue-600 h-8 text-xs font-bold gap-2"><Save size={14}/> Sauvegarder</Button></div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-6">
                        <div className="flex-1 grid grid-cols-2 gap-8"><div className="text-sm font-medium text-slate-200 line-clamp-2">{card.front}</div><div className="text-sm text-slate-400 line-clamp-2 border-l border-white/5 pl-8 italic">{card.back}</div></div>
                        <div className="flex items-center gap-2">{isConfirming ? (<div className="flex items-center gap-1 bg-rose-500/10 rounded-xl p-1 animate-in slide-in-from-right-2"><span className="text-[9px] font-bold uppercase text-rose-400 px-2">Sûr ?</span><Button size="icon" variant="ghost" onClick={() => { deleteCard(card.id); setConfirmDeleteId(null) }} className="h-7 w-7 text-rose-400 hover:bg-rose-500 hover:text-white rounded-lg"><CheckCircle2 size={14}/></Button><Button size="icon" variant="ghost" onClick={() => setConfirmDeleteId(null)} className="h-7 w-7 text-slate-500 hover:bg-white/10 rounded-lg"><X size={14}/></Button></div>) : (<><Button size="icon" variant="ghost" onClick={() => { setEditingCardId(card.id); setEditValues({ front: card.front, back: card.back }) }} className="h-9 w-9 rounded-xl text-slate-500 hover:text-blue-400 hover:bg-blue-500/10"><Pencil size={16} /></Button><Button size="icon" variant="ghost" onClick={() => setConfirmDeleteId(card.id)} className="h-9 w-9 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-blue-500/10"><Trash2 size={16} /></Button></>)}</div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div key="decks-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex items-center gap-3"><Library className="text-slate-500" size={20} /><h2 className="text-xl font-bold text-white">Vos Paquets</h2></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {decks.map(deck => {
                const deckCards = cards.filter(c => c.deckId === deck.id)
                const dueCount = deckCards.filter(c => isBefore(c.due, new Date()) || c.state === State.New).length
                return (
                  <div key={deck.id} className="group p-6 bg-slate-900/40 border border-white/10 rounded-[2rem] hover:border-blue-500/30 transition-all flex flex-col gap-6 relative overflow-hidden">
                    <div className="flex justify-between items-start"><div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400"><Layers size={24} /></div><div className="flex flex-col items-end"><span className="text-2xl font-black text-white leading-none">{deckCards.length}</span><span className="text-[8px] font-bold uppercase tracking-widest text-slate-500">Cartes</span></div></div>
                    <div><h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{deck.title}</h3><div className="flex items-center gap-4 mt-2"><div className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-blue-500" /><span className="text-[10px] font-bold text-slate-500 uppercase">{dueCount} à réviser</span></div></div></div>
                    <div className="flex gap-2 mt-2"><Button onClick={() => setManagingDeckId(deck.id)} variant="ghost" className="flex-1 bg-white/5 hover:bg-blue-600 hover:text-white border-transparent h-10 rounded-xl font-bold text-xs gap-2"><Settings2 size={14} /> Gérer</Button><Button onClick={() => deleteDeck(deck.id)} variant="ghost" className="h-10 w-10 bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 border-transparent rounded-xl"><Trash2 size={16} /></Button></div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  )
}
