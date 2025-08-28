"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative">
      {/* halo doux en background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1200px_500px_at_20%_10%,rgba(120,119,198,0.10),transparent),radial-gradient(800px_400px_at_90%_20%,rgba(56,189,248,0.10),transparent)]"
      />

      <div className="container mx-auto px-4">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Colonne gauche */}
          <div>
            {/* Badge confiance */}
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-sm text-foreground/80 shadow-sm backdrop-blur dark:bg-neutral-900/60 dark:border-white/10">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              Déjà adopté par plus de 1 000 équipes ambitieuses
            </div>

            <div className="mt-6 flex items-center gap-3">
              <span className="text-3xl leading-none">🚀</span>
              <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Toute votre stack marketing
                <br />
                —{" "}
                <span className="bg-gradient-to-r from-[#6D4AFF] to-[#9B6CFF] bg-clip-text text-transparent">
                  Réinventée par l’IA
                </span>
              </h1>
            </div>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80">
              Centralisez vos webinaires, emails, automatisations, CRM et analytics en temps réel — dans une seule
              plateforme ultrarapide, 100% propulsée par l’IA.
            </p>

            <p className="mt-4 font-semibold text-foreground">
              60% de temps gagné. 90% de coûts en moins. 100% plus intelligent.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                className="bg-primary hover:bg-primary/90"
                onClick={() => (window.location.href = "/waitlist")}
              >
                Rejoindre la liste d’attente
              </Button>

              <Button
                variant="secondary"
                className="bg-foreground text-background hover:bg-foreground/90"
                onClick={() => (window.location.href = "/demo")}
              >
                Voir la démo interactive
              </Button>
            </div>
          </div>

          {/* Colonne droite : visuel net, sans overlay sombre */}
          <div className="relative">
            <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-black/10 bg-white/70 shadow-xl ring-1 ring-black/5 backdrop-blur dark:bg-neutral-900/60 dark:border-white/10 dark:ring-white/10">
              <Image
                src="/images/hero-preview.png" // mets ton vrai chemin
                alt="Mockup Dylup avec analyse IA en temps réel"
                width={1200}
                height={800}
                priority
                className="h-auto w-full object-cover"
              />
            </div>
            <p className="mt-3 text-center text-sm text-foreground/60">
              Mockup dynamique de l’interface Dylup avec analyse IA en temps réel
            </p>
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
