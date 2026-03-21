"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { 
  generatorParameters, 
  FSRS, 
  Card as FSRSCard, 
  Rating, 
  State,
  createEmptyCard,
  fsrs
} from "ts-fsrs"
import { toast } from "sonner"

export interface AnkiCard {
  id: string
  deckId: string
  front: string
  back: string
  // FSRS fields
  due: Date
  stability: number
  difficulty: number
  elapsed_days: number
  scheduled_days: number
  reps: number
  lapses: number
  state: State
  learning_steps: number[]
  last_review?: Date
}

export interface AnkiDeck {
  id: string
  title: string
  color: string
  createdAt: Date
}

interface AnkiContextType {
  decks: AnkiDeck[]
  cards: AnkiCard[]
  addDeck: (title: string, color: string) => void
  addCard: (deckId: string, front: string, back: string) => void
  updateCard: (cardId: string, front: string, back: string) => void
  reviewCard: (cardId: string, rating: Rating) => void
  deleteDeck: (deckId: string) => void
  deleteCard: (cardId: string) => void
}

const AnkiContext = createContext<AnkiContextType | undefined>(undefined)

export function AnkiProvider({ children }: { children: React.ReactNode }) {
  const [decks, setDecks] = useState<AnkiDeck[]>([])
  const [cards, setCards] = useState<AnkiCard[]>([])
  
  const params = generatorParameters({ enable_fuzz: true })
  const f = fsrs(params)

  // Persistence
  useEffect(() => {
    const savedDecks = localStorage.getItem("jaywon_anki_decks")
    const savedCards = localStorage.getItem("jaywon_anki_cards")
    
    if (savedDecks) {
      setDecks(JSON.parse(savedDecks).map((d: any) => ({ ...d, createdAt: new Date(d.createdAt) })))
    }
    if (savedCards) {
      setCards(JSON.parse(savedCards).map((c: any) => ({ 
        ...c, 
        due: new Date(c.due), 
        last_review: c.last_review ? new Date(c.last_review) : undefined 
      })))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("jaywon_anki_decks", JSON.stringify(decks))
  }, [decks])

  useEffect(() => {
    localStorage.setItem("jaywon_anki_cards", JSON.stringify(cards))
  }, [cards])

  const addDeck = (title: string, color: string) => {
    const newDeck: AnkiDeck = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      color,
      createdAt: new Date()
    }
    setDecks([...decks, newDeck])
    toast.success(`Paquet "${title}" créé !`)
  }

  const addCard = (deckId: string, front: string, back: string) => {
    const emptyFSRSCard: FSRSCard = createEmptyCard(new Date())
    const newCard: AnkiCard = {
      id: Math.random().toString(36).substr(2, 9),
      deckId,
      front,
      back,
      due: emptyFSRSCard.due,
      stability: emptyFSRSCard.stability,
      difficulty: emptyFSRSCard.difficulty,
      elapsed_days: emptyFSRSCard.elapsed_days,
      scheduled_days: emptyFSRSCard.scheduled_days,
      reps: emptyFSRSCard.reps,
      lapses: emptyFSRSCard.lapses,
      state: emptyFSRSCard.state,
      learning_steps: (emptyFSRSCard as any).learning_steps || [],
      last_review: emptyFSRSCard.last_review
    }
    setCards([...cards, newCard])
    toast.success("Carte ajoutée !")
  }

  const updateCard = (cardId: string, front: string, back: string) => {
    setCards(prev => prev.map(c => c.id === cardId ? { ...c, front, back } : c))
    toast.success("Carte mise à jour")
  }

  const reviewCard = (cardId: string, rating: Rating) => {
    setCards(prev => prev.map(card => {
      if (card.id === cardId) {
        // Reconstruct FSRS card for calculation
        const fsrsCard: FSRSCard = {
          due: card.due,
          stability: card.stability,
          difficulty: card.difficulty,
          elapsed_days: card.elapsed_days,
          scheduled_days: card.scheduled_days,
          reps: card.reps,
          lapses: card.lapses,
          state: card.state,
          learning_steps: (card as any).learning_steps || [],
          last_review: card.last_review
        }

        const schedulingCards = f.repeat(fsrsCard, new Date())
        const updatedFSRSCard = (schedulingCards as any)[rating].card

        return {
          ...card,
          ...updatedFSRSCard
        }
      }
      return card
    }))
  }

  const deleteDeck = (deckId: string) => {
    setDecks(prev => prev.filter(d => d.id !== deckId))
    setCards(prev => prev.filter(c => c.deckId !== deckId))
  }

  const deleteCard = (cardId: string) => {
    setCards(prev => prev.filter(c => c.id !== cardId))
  }

  return (
    <AnkiContext.Provider value={{ decks, cards, addDeck, addCard, updateCard, reviewCard, deleteDeck, deleteCard }}>
      {children}
    </AnkiContext.Provider>
  )
}

export function useAnki() {
  const context = useContext(AnkiContext)
  if (!context) throw new Error("useAnki must be used within AnkiProvider")
  return context
}
