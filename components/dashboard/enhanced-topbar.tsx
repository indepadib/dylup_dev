"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Bell, Globe, User } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface EnhancedTopbarProps {
  className?: string
}

export function EnhancedTopbar({ className }: EnhancedTopbarProps) {
  const [locale, setLocale] = useState<"fr" | "en">("fr")

  return (
    <header
      className={`flex items-center justify-between p-4 border-b border-border bg-background/80 backdrop-blur-sm ${className}`}
    >
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher..." className="pl-10 bg-muted/50" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Create button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Créer
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Nouvelle campagne</DropdownMenuItem>
            <DropdownMenuItem>Nouveau contact</DropdownMenuItem>
            <DropdownMenuItem>Nouveau webinaire</DropdownMenuItem>
            <DropdownMenuItem>Nouveau contenu</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">3</Badge>
        </Button>

        {/* Language toggle */}
        <Button variant="ghost" size="sm" onClick={() => setLocale(locale === "fr" ? "en" : "fr")} className="gap-2">
          <Globe className="h-4 w-4" />
          {locale.toUpperCase()}
        </Button>

        {/* Theme toggle */}
        <ThemeToggle />

        {/* User menu */}
        <Button variant="ghost" size="sm">
          <User className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
