"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="text-xl font-bold text-foreground">DYLUP</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/produits" className="text-foreground hover:text-primary transition-colors">
              Produits
            </Link>
            <Link href="/solutions" className="text-foreground hover:text-primary transition-colors">
              Solutions
            </Link>
            <Link href="/ressources" className="text-foreground hover:text-primary transition-colors">
              Ressources
            </Link>
            <Link href="/a-propos" className="text-foreground hover:text-primary transition-colors">
              À propos
            </Link>
            <Link href="/tarifs" className="text-foreground hover:text-primary transition-colors">
              Tarifs
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              className="text-foreground hover:text-primary cursor-pointer z-10 relative"
              onClick={() => {
                console.log("[v0] Sign In button clicked")
                window.location.href = "/auth/signin"
              }}
            >
              Sign In
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 cursor-pointer z-10 relative"
              onClick={() => {
                console.log("[v0] Start Free Trial header button clicked")
                window.location.href = "/auth/signup"
              }}
            >
              Start Free Trial
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button className="p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border/20">
            <div className="flex flex-col space-y-4 pt-4">
              <Link href="/produits" className="text-foreground hover:text-primary transition-colors">
                Produits
              </Link>
              <Link href="/solutions" className="text-foreground hover:text-primary transition-colors">
                Solutions
              </Link>
              <Link href="/ressources" className="text-foreground hover:text-primary transition-colors">
                Ressources
              </Link>
              <Link href="/a-propos" className="text-foreground hover:text-primary transition-colors">
                À propos
              </Link>
              <Link href="/tarifs" className="text-foreground hover:text-primary transition-colors">
                Tarifs
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Button
                  variant="ghost"
                  className="justify-start cursor-pointer"
                  onClick={() => {
                    console.log("[v0] Mobile Sign In button clicked")
                    window.location.href = "/auth/signin"
                  }}
                >
                  Sign In
                </Button>
                <Button
                  className="bg-primary hover:bg-primary/90 cursor-pointer"
                  onClick={() => {
                    console.log("[v0] Mobile Start Free Trial button clicked")
                    window.location.href = "/auth/signup"
                  }}
                >
                  Start Free Trial
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
