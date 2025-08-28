"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    // Remplace "glass" par un fond clair translucide + blur + fine bordure
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-neutral-900/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-black/10 dark:border-white/10">
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
            <Link href="/produits"   className="text-foreground/80 hover:text-foreground transition-colors">Produits</Link>
            <Link href="/solutions"  className="text-foreground/80 hover:text-foreground transition-colors">Solutions</Link>
            <Link href="/ressources" className="text-foreground/80 hover:text-foreground transition-colors">Ressources</Link>
            <Link href="/a-propos"   className="text-foreground/80 hover:text-foreground transition-colors">À propos</Link>
            <Link href="/tarifs"     className="text-foreground/80 hover:text-foreground transition-colors">Tarifs</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              className="text-foreground hover:text-primary cursor-pointer"
              onClick={() => (window.location.href = "/auth/signin")}
            >
              Sign In
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 cursor-pointer"
              onClick={() => (window.location.href = "/auth/signup")}
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
          <nav
            className="md:hidden mt-4 pb-4 border-t border-black/10 dark:border-white/10
                       bg-white/85 dark:bg-neutral-900/80 backdrop-blur rounded-lg"
          >
            <div className="flex flex-col space-y-4 pt-4 px-2">
              <Link href="/produits"   className="text-foreground hover:text-primary transition-colors">Produits</Link>
              <Link href="/solutions"  className="text-foreground hover:text-primary transition-colors">Solutions</Link>
              <Link href="/ressources" className="text-foreground hover:text-primary transition-colors">Ressources</Link>
              <Link href="/a-propos"   className="text-foreground hover:text-primary transition-colors">À propos</Link>
              <Link href="/tarifs"     className="text-foreground hover:text-primary transition-colors">Tarifs</Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Button
                  variant="ghost"
                  className="justify-start cursor-pointer"
                  onClick={() => (window.location.href = "/auth/signin")}
                >
                  Sign In
                </Button>
                <Button
                  className="bg-primary hover:bg-primary/90 cursor-pointer"
                  onClick={() => (window.location.href = "/auth/signup")}
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
