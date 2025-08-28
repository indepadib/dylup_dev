"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/theme-toggle"

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-secondary grid place-items-center text-white font-bold">
              D
            </div>
            <span className="text-lg font-semibold tracking-tight">DYLUP</span>
          </Link>

          {/* NAV DESKTOP */}
          <nav className="hidden md:flex items-center gap-6">
            {/* Produits + dropdown */}
            <div className="relative group">
              <Link href="/produits" className="text-foreground/90 hover:text-foreground transition-colors">
                Produits
              </Link>
              <div
                className="
                  pointer-events-none invisible opacity-0 group-hover:visible group-hover:opacity-100
                  absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[640px]
                  rounded-2xl border bg-white/95 dark:bg-neutral-950/95 shadow-xl ring-1 ring-black/5
                  backdrop-blur transition
                "
              >
                <div className="grid grid-cols-2 gap-2 p-3">
                  {[
                    { href: "/produits/crm", title: "CRM", desc: "Centralisez et scorez vos leads" },
                    { href: "/produits/email", title: "Email Automation", desc: "Campagnes auto-optimisées" },
                    { href: "/produits/webinaires", title: "Webinaires", desc: "Inscription, live, replay" },
                    { href: "/produits/automations", title: "Automations", desc: "Workflows IA en drag-and-drop" },
                    { href: "/produits/analytics", title: "Analytics", desc: "KPI unifiés et prédictifs" },
                    { href: "/produits/rs", title: "RS", desc: "Planification & insights réseaux" },
                  ].map((i) => (
                    <Link
                      key={i.href}
                      href={i.href}
                      className="rounded-xl p-3 hover:bg-neutral-100/80 dark:hover:bg-neutral-900/80 transition"
                    >
                      <div className="font-medium">{i.title}</div>
                      <div className="text-sm text-muted-foreground">{i.desc}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/solutions" className="text-foreground/90 hover:text-foreground transition-colors">
              Solutions
            </Link>

            {/* Ressources + dropdown */}
            <div className="relative group">
              <button
                className="text-foreground/90 hover:text-foreground transition-colors"
                // évite le focus loss en keyboard nav
                onMouseDown={(e) => e.preventDefault()}
              >
                Ressources
              </button>
              <div
                className="
                  pointer-events-none invisible opacity-0 group-hover:visible group-hover:opacity-100
                  absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[560px]
                  rounded-2xl border bg-white/95 dark:bg-neutral-950/95 shadow-xl ring-1 ring-black/5
                  backdrop-blur transition
                "
              >
                <div className="grid grid-cols-1 gap-2 p-4">
                  {[
                    { href: "/blog", title: "Blog", desc: "Guides, études, nouveautés" },
                    { href: "/glossaires", title: "Glossaires", desc: "Termes & concepts marketing" },
                    { href: "/events", title: "Events", desc: "Webinars & ateliers à venir" },
                  ].map((i) => (
                    <Link
                      key={i.href}
                      href={i.href}
                      className="rounded-xl p-3 hover:bg-neutral-100/80 dark:hover:bg-neutral-900/80 transition"
                    >
                      <div className="font-medium">{i.title}</div>
                      <div className="text-sm text-muted-foreground">{i.desc}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/a-propos" className="text-foreground/90 hover:text-foreground transition-colors">
              À propos
            </Link>

            <Link href="/tarifs" className="text-foreground/90 hover:text-foreground transition-colors">
              Tarifs
            </Link>
          </nav>

          {/* CTA + Theme (desktop) */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/auth/signin"
              className="text-sm px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900"
            >
              Sign in
            </Link>
            <Link
              href="/auth/signup"
              className="text-sm px-3 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90"
            >
              Start free trial
            </Link>
          </div>

          {/* Burger (mobile) */}
          <button className="md:hidden p-2" onClick={() => setOpen((v) => !v)} aria-label="Ouvrir le menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* NAV MOBILE */}
        {open && (
          <div className="md:hidden border-t mt-3 pt-3 space-y-3">
            <div className="grid gap-2">
              <Link href="/produits" className="px-1 py-2 hover:text-primary">Produits</Link>
              <Link href="/solutions" className="px-1 py-2 hover:text-primary">Solutions</Link>
              <Link href="/blog" className="px-1 py-2 hover:text-primary">Blog</Link>
              <Link href="/glossaires" className="px-1 py-2 hover:text-primary">Glossaires</Link>
              <Link href="/events" className="px-1 py-2 hover:text-primary">Events</Link>
              <Link href="/a-propos" className="px-1 py-2 hover:text-primary">À propos</Link>
              <Link href="/tarifs" className="px-1 py-2 hover:text-primary">Tarifs</Link>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <ThemeToggle />
              <Link href="/auth/signin" className="text-sm px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900">
                Sign in
              </Link>
              <Link
                href="/auth/signup"
                className="text-sm px-3 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90"
              >
                Start free trial
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

  
