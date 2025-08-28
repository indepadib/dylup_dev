"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<string>("light")

  useEffect(() => {
    setMounted(true)
    const initialTheme = resolvedTheme || theme || "light"
    setCurrentTheme(initialTheme)

    if (!theme && !resolvedTheme) {
      setTheme("light")
    }
  }, [theme, resolvedTheme, setTheme])

  useEffect(() => {
    if (mounted) {
      const newTheme = resolvedTheme || theme || "light"
      setCurrentTheme(newTheme)
    }
  }, [resolvedTheme, theme, mounted])

  const handleThemeToggle = () => {
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    console.log("[v0] Current theme:", currentTheme, "Switching to:", newTheme)

    setTheme(newTheme)
    setCurrentTheme(newTheme)

    // Force DOM update immediately
    const html = document.documentElement
    html.classList.remove("light", "dark")
    html.classList.add(newTheme)

    console.log("[v0] HTML classes after switch:", html.classList.toString())
    console.log("[v0] Theme state after switch:", newTheme)
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleThemeToggle}
      className="w-9 h-9 p-0 hover:bg-white/10 transition-colors"
    >
      {currentTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export default ThemeToggle
