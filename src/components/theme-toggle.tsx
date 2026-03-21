"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full h-12 w-12 shadow-lg border-2 bg-background"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <Moon className="h-6 w-6 text-slate-700" />
      ) : (
        <Sun className="h-6 w-6 text-yellow-400" />
      )}
      <span className="sr-only">Changer le thème</span>
    </Button>
  )
}
