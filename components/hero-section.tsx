// components/hero-section.tsx
export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent"
        aria-hidden="true"
      />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
              ✅ Déjà adopté par plus de 1 000 équipes ambitieuses
            </div>

            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              🚀 <span className="block">Toute votre stack marketing</span>
              <span className="block bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                — Réinventée par l’IA
              </span>
            </h1>

            <p className="text-lg text-muted-foreground">
              Centralisez vos webinaires, emails, automatisations, CRM et analytics en temps réel — dans une
              seule plateforme ultrarapide, 100% propulsée par l’IA.
            </p>

            <p className="text-sm font-medium">
              <strong>60% de temps gagné.</strong> <strong>90% de coûts en moins.</strong> <strong>100% plus intelligent.</strong>
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="/waitlist"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                Rejoindre la liste d’attente
              </a>
              <a
                href="/demo"
                className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900"
              >
                Voir la démo interactive
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[28px] bg-gradient-to-r from-primary/20 to-purple-500/20 blur-2xl" />
            <div className="rounded-2xl border bg-background/80 p-3 shadow-xl backdrop-blur">
              <img
                src="/images/hero-preview.png"
                alt="Mockup Dylup avec analyse IA en temps réel"
                className="rounded-lg"
              />
            </div>
            <div className="mt-3 text-center text-xs text-muted-foreground">
              Mockup dynamique de l’interface Dylup avec analyse IA en temps réel
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}



/*"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-secondary/20 text-secondary-foreground px-4 py-2 rounded-full mb-8">
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm font-medium">AI-Powered Marketing Automation</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Transform Your
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {" "}
              Marketing{" "}
            </span>
            with AI
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            DYLUP combines powerful automation with intelligent AI to help you create, manage, and optimize marketing
            campaigns that drive real results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-lg px-8 py-4 cursor-pointer z-10 relative"
              onClick={() => {
                console.log("[v0] Start Free Trial button clicked")
                window.location.href = "/auth/signup"
              }}
            >
              Start Free Trial
              <ArrowRight size={20} className="ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4 bg-transparent cursor-pointer z-10 relative"
              onClick={() => {
                console.log("[v0] Watch Demo button clicked")
                // Add demo functionality here
              }}
            >
              Watch Demo
            </Button>
          </div>

          <div className="glass-card rounded-2xl p-8 max-w-3xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[12px] border-b-primary ml-1"></div>
                </div>
                <p className="text-muted-foreground">Interactive Platform Preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}*/
