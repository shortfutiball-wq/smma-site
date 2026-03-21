"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { calculateRevisionDates, CourseItem, COLLEGES, CollegeTransversal } from "@/lib/revision-engine"
import { toast } from "sonner"

interface CourseContextType {
  courses: CourseItem[]
  collegeData: Record<string, CollegeTransversal>
  selectedCollegeName: string
  setSelectedCollegeName: (name: string) => void
  addCourse: (itemNumber: string, title: string, college: string, date: Date) => void
  moveCourse: (courseId: string, newJ1Date: Date) => void
  deleteCourse: (courseId: string) => void
  toggleRevisionStatus: (courseId: string, j: number) => void
  updateCourseColor: (courseId: string, color: string) => void
  updateQCMStatus: (courseId: string, field: keyof CourseItem, value: any) => void
  updateCollegeTransversal: (collegeName: string, field: keyof CollegeTransversal, value: any) => void
}

const CourseContext = createContext<CourseContextType | undefined>(undefined)

// ID de votre Google Sheet extrait de l'URL
const GOOGLE_SHEET_ID = "14jDtmFAEp_oDa0jETiPCbB3aZJAQSOZqFhaHm0YFV4k";

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const [courses, setCourses] = useState<CourseItem[]>([])
  const [collegeData, setCollegeData] = useState<Record<string, CollegeTransversal>>({})
  const [selectedCollegeName, setSelectedCollegeName] = useState<string>(COLLEGES[0].name)

  // Fonction pour synchroniser avec Google Sheets par Numéro d'Item
  const syncWithGoogleSheets = async (itemNumber: string, title: string, revisions: any[]) => {
    try {
      const response = await fetch('/api/sync-sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemNumber,
          title,
          revisions,
          sheetId: GOOGLE_SHEET_ID
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success(`Excel mis à jour (Item ${itemNumber})`);
      } else {
        console.warn("Sync Sheets:", data.error);
      }
    } catch (err) {
      console.error("Erreur sync:", err);
    }
  };

  // Load from local storage
  useEffect(() => {
    const savedCourses = localStorage.getItem("jaywon_courses")
    if (savedCourses) {
      const parsed = JSON.parse(savedCourses)
      const revived = parsed.map((c: any) => ({
        ...c,
        startDate: new Date(c.startDate),
        revisions: c.revisions.map((r: any) => ({ ...r, date: new Date(r.date) }))
      }))
      setCourses(revived)
    }

    const savedCollege = localStorage.getItem("jaywon_college_data")
    if (savedCollege) {
      setCollegeData(JSON.parse(savedCollege))
    }

    const savedSelectedCollege = localStorage.getItem("jaywon_selected_college")
    if (savedSelectedCollege) {
      setSelectedCollegeName(savedSelectedCollege)
    }
  }, [])

  // Save to local storage
  useEffect(() => {
    localStorage.setItem("jaywon_courses", JSON.stringify(courses))
  }, [courses])

  useEffect(() => {
    localStorage.setItem("jaywon_college_data", JSON.stringify(collegeData))
  }, [collegeData])

  useEffect(() => {
    localStorage.setItem("jaywon_selected_college", selectedCollegeName)
  }, [selectedCollegeName])

  const addCourse = (itemNumber: string, title: string, collegeName: string, date: Date) => {
    const college = COLLEGES.find(c => c.name === collegeName) || COLLEGES[0]
    const revisions = calculateRevisionDates(date);
    const newCourse: CourseItem = {
      id: Math.random().toString(36).substr(2, 9),
      itemNumber,
      title,
      college: collegeName,
      color: college.color,
      startDate: date,
      revisions,
      masterclassEDNi: "",
      spe360Hypo: "",
      hypocampusDone: false,
      edniDone: false,
      unessDone: false,
      resumeDone: false,
      martingaleDone: false,
      collegeDone: false,
    }
    setCourses([...courses, newCourse])
    
    // Déclencher la synchronisation par numéro
    syncWithGoogleSheets(itemNumber, title, revisions);
  }

  const moveCourse = (courseId: string, newJ1Date: Date) => {
    const revisions = calculateRevisionDates(newJ1Date);
    let title = "";
    let itemNumber = "";

    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        title = c.title;
        itemNumber = c.itemNumber;
        return {
          ...c,
          startDate: newJ1Date,
          revisions
        }
      }
      return c
    }))

    // Synchroniser si le cours a été trouvé
    if (itemNumber) {
      syncWithGoogleSheets(itemNumber, title, revisions);
    }
  }

  const deleteCourse = (courseId: string) => {
    setCourses(prev => prev.filter(c => c.id !== courseId))
  }

  const toggleRevisionStatus = (courseId: string, j: number) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        return {
          ...c,
          revisions: c.revisions.map(r => r.j === j ? { ...r, isDone: !r.isDone } : r)
        }
      }
      return c
    }))
  }

  const updateCourseColor = (courseId: string, color: string) => {
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, color } : c))
  }

  const updateQCMStatus = (courseId: string, field: keyof CourseItem, value: any) => {
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, [field]: value } : c))
  }

  const updateCollegeTransversal = (collegeName: string, field: keyof CollegeTransversal, value: any) => {
    setCollegeData(prev => {
      const current = prev[collegeName] || {
        college: collegeName,
        masterclassEDNi: "",
        spe360Hypo: "",
        unessDone: false,
        martingaleDone: false,
        collegeDone: false,
        resumeDone: false
      }
      return {
        ...prev,
        [collegeName]: { ...current, [field]: value }
      }
    })
  }

  return (
    <CourseContext.Provider value={{ 
      courses, 
      collegeData, 
      selectedCollegeName,
      setSelectedCollegeName,
      addCourse, 
      moveCourse, 
      deleteCourse, 
      toggleRevisionStatus, 
      updateCourseColor,
      updateQCMStatus,
      updateCollegeTransversal
    }}>
      {children}
    </CourseContext.Provider>
  )
}

export function useCourses() {
  const context = useContext(CourseContext)
  if (!context) throw new Error("useCourses must be used within CourseProvider")
  return context
}
