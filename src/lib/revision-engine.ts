import { addDays, format } from "date-fns"

export const J_INTERVALS = [
  1, 2, 3, 4, 7, 12, 18, 33, 48, 63, 78, 93, 108, 123, 138, 153, 168, 183, 198, 213, 228, 243, 258, 273, 288
]

export interface Revision {
  j: number
  date: Date
  isDone: boolean
}

export interface CourseItem {
  id: string
  itemNumber: string
  title: string
  college: string
  color: string
  startDate: Date
  revisions: Revision[]
  // Suivi QCM / Ressources
  masterclassEDNi?: string // Texte libre
  spe360Hypo?: string      // Texte libre
  hypocampusDone?: boolean // Checkbox
  edniDone?: boolean       // Checkbox
  unessDone?: boolean      // Checkbox
  resumeDone?: boolean     // Checkbox
  martingaleDone?: boolean // Checkbox
  collegeDone?: boolean    // Checkbox
}

export interface CollegeTransversal {
  college: string
  masterclassEDNi: string
  spe360Hypo: string
  unessDone: boolean
  martingaleDone: boolean
  collegeDone: boolean
  resumeDone: boolean
}

export function calculateRevisionDates(startDate: Date): Revision[] {
  return J_INTERVALS.map((j) => ({
    j,
    date: addDays(startDate, j - 1),
    isDone: false,
  }))
}

export const COLLEGES = [
  { name: "PNEUMOLOGIE", color: "#3b82f6" },
  { name: "CARDIOLOGIE", color: "#ef4444" },
  { name: "HGE - CHIR DIGESTIVE", color: "#8b4513" },
  { name: "ORL", color: "#f97316" },
  { name: "GYNECOLOGIE OBSTETRIQUE", color: "#ec4899" },
  { name: "NEUROLOGIE", color: "#8b5cf6" },
  { name: "RHUMATOLOGIE", color: "#10b981" },
  { name: "HEMATOLOGIE", color: "#991b1b" },
  { name: "ENDOCRINOLOGIE", color: "#fbbf24" },
  { name: "PSYCHIATRIE", color: "#14b8a6" },
  { name: "CHIRURGIE VASCULAIRE", color: "#475569" },
  { name: "CMF", color: "#a855f7" },
]
