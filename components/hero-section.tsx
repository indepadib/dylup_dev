"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-background">
      {/* halos doux */}
      <div aria-hidden className="pointer-events-none absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-primary/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 h-[420px] w-[420px] rounded-full bg-violet-400/15 dark:bg-violet-500/10 blur-3xl" />

      <div className="container mx-auto px-4 pt-28 pb-14 lg:pb-20">
        <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 dark:bg-neutral-900/70 px-3 py-1 text-sm text-foreground/80 backdrop-blur ring-1 ring-black/5">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
          Déjà adopté par plus de 1 000 équipes ambitieuses
        </div>

        <div className="mt-6 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl/tight sm:text-5xl/tight font-extrabold tracking-tight text-foreground">
              Toute votre stack marketing<br />
              <span className="text-foreground">— </span>
              <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
                Réinventée par l’IA
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base text-muted-foreground">
              Centralisez vos webinaires, emails, automatisations, CRM et analytics en temps réel — dans une seule
              plateforme ultrarapide, 100% propulsée par l’IA.
            </p>

            <p className="mt-3 font-medium text-foreground">
              60% de temps gagné. 90% de coûts en moins. 100% plus intelligent.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild><Link href="/waitlist">Rejoindre la liste d’attente</Link></Button>
              <Button asChild variant="secondary" className="bg-foreground/5 hover:bg-foreground/10">
                <Link href="/demo">Voir la démo interactive</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl border bg-white/70 dark:bg-neutral-950/70 ring-1 ring-black/5 shadow-xl backdrop-blur">
              <Image
                src="/hero-mock.png"  // mets ton visuel dans /public/hero-mock.png
                alt="Mockup Dylup avec analyse IA en temps réel"
                width={980}
                height={620}
                className="rounded-2xl"
                priority
              />
            </div>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Mockup dynamique de l’interface Dylup avec analyse IA en temps réel
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection       // ✅ default export
export { HeroSection }           // (optionnel) named export aussi



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
