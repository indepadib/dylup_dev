import Image from "next/image"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* halo doux uniquement dans le hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-20 -left-32 h-[520px] w-[520px] rounded-full blur-3xl opacity-30
                        bg-gradient-to-br from-[#4F86FF] to-[#9B5CFF]" />
        <div className="absolute -bottom-32 -right-20 h-[480px] w-[480px] rounded-full blur-3xl opacity-20
                        bg-gradient-to-tr from-[#9B5CFF] to-[#4F86FF]" />
      </div>

      <div className="container mx-auto px-4 py-20 lg:py-28">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10
                        bg-white/70 dark:bg-neutral-900/60 px-3 py-1 text-xs text-neutral-700 dark:text-neutral-300 backdrop-blur">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
          Déjà adopté par plus de 1 000 équipes ambitieuses
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Texte */}
          <div>
            <div className="mb-3 text-5xl/tight font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-6xl">
              <span className="mr-2">🚀 Toute votre stack marketing</span>
              <br />
              <span className="text-neutral-900 dark:text-neutral-50">— </span>
              <span className="bg-gradient-to-r from-[#4F86FF] to-[#9B5CFF] bg-clip-text text-transparent">
                Réinventée par l’IA
              </span>
            </div>

            <p className="mt-6 max-w-xl text-base text-neutral-600 dark:text-neutral-300">
              Centralisez vos webinaires, emails, automatisations, CRM et analytics en temps réel — dans une seule
              plateforme ultrarapide, 100% propulsée par l’IA.
            </p>

            <p className="mt-4 font-semibold text-neutral-800 dark:text-neutral-200">
              60% de temps gagné. 90% de coûts en moins. 100% plus intelligent.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/waitlist"
                className="inline-flex h-11 items-center rounded-lg px-5 text-sm font-medium text-white
                           bg-gradient-to-r from-[#4F86FF] to-[#9B5CFF] shadow-sm hover:brightness-105"
              >
                Rejoindre la liste d’attente
              </Link>
              <Link
                href="/demo"
                className="inline-flex h-11 items-center rounded-lg px-5 text-sm font-medium
                           bg-white/70 dark:bg-neutral-900/70 border border-black/10 dark:border-white/10
                           text-neutral-800 dark:text-neutral-100 backdrop-blur hover:bg-white/90 dark:hover:bg-neutral-900/90"
              >
                Voir la démo interactive
              </Link>
            </div>
          </div>

          {/* Visuel */}
          <div className="relative">
            <div className="mx-auto max-w-[640px]">
              <Image
                src="/images/hero/hero-mock.png"       // ← mets ton visuel ici
                alt="Mockup Dylup avec analyse IA en temps réel"
                width={1280}
                height={800}
                priority
                className="w-full rounded-2xl shadow-xl ring-1 ring-black/5 dark:ring-white/10
                           bg-white/60 dark:bg-neutral-900/60"
              />
              <p className="mt-3 text-center text-xs text-neutral-500 dark:text-neutral-400">
                Mockup dynamique de l’interface Dylup avec analyse IA en temps réel
              </p>
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
