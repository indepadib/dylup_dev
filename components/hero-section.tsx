"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlayCircle } from "lucide-react"

function HeroSection() {
  return (
    <section className="relative z-0 overflow-hidden">
      {/* halos décoratifs – ne capturent pas la souris */}
      <div aria-hidden className="pointer-events-none absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-primary/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 h-[420px] w-[420px] rounded-full bg-violet-400/15 dark:bg-violet-500/10 blur-3xl" />

      <div className="container mx-auto px-4 pt-24 pb-14 lg:pb-20">
        {/* Badge confiance */}
        <div className="inline-flex items-center gap-2 rounded-full border bg-white/90 dark:bg-neutral-900/90 px-3 py-1 text-sm text-neutral-700 dark:text-neutral-200 shadow-sm ring-1 ring-black/5 backdrop-blur">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
          Déjà adopté par plus de 1 000 équipes ambitieuses
        </div>

        <div className="mt-6 grid items-center gap-10 lg:grid-cols-2">
          {/* Texte */}
          <div>
            <h1 className="text-4xl/tight sm:text-5xl/tight font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
              Toute votre stack marketing<br />
              <span className="text-neutral-900 dark:text-neutral-100">— </span>
              <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
                Réinventée par l’IA
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base text-neutral-700 dark:text-neutral-300">
              Centralisez vos webinaires, emails, automatisations, CRM et analytics en temps réel — dans une seule
              plateforme ultrarapide, 100% propulsée par l’IA.
            </p>

            <p className="mt-3 font-semibold text-neutral-900 dark:text-neutral-100">
              60% de temps gagné. 90% de coûts en moins. 100% plus intelligent.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild><Link href="/waitlist">Rejoindre la liste d’attente</Link></Button>
              <Button asChild variant="secondary" className="bg-neutral-900/5 hover:bg-neutral-900/10 dark:bg-white/10 dark:hover:bg-white/20">
                <Link href="/demo">Voir la démo interactive</Link>
              </Button>
            </div>
          </div>

          {/* Visuel (placeholder lisible) */}
          <div className="relative z-10">
            <div className="rounded-2xl border bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900 ring-1 ring-black/5 shadow-xl overflow-hidden">
              {/* bloc ratio pour garder la taille sans image */}
              <div className="aspect-[16/10] relative">
                <div className="absolute inset-0 grid place-content-center text-neutral-700 dark:text-neutral-300">
                  <PlayCircle className="h-12 w-12 mb-3 opacity-80" />
                  <p className="text-sm font-medium">Mockup dynamique (aperçu)</p>
                </div>
                {/* Lorsque tu auras un visuel, dé-commente l’Image ci-dessous
                <Image
                  src="/hero-mock.png"
                  alt="Mockup Dylup avec analyse IA en temps réel"
                  fill
                  className="object-cover"
                  priority
                />
                */}
              </div>
            </div>
            <p className="mt-2 text-center text-sm text-neutral-600 dark:text-neutral-300">
              Mockup dynamique de l’interface Dylup avec analyse IA en temps réel
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
export { HeroSection }



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
