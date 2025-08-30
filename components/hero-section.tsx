// components/hero-section.tsx
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Play, Shield, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-gradient-to-br from-[#4F7DFF33] to-[#7A5BFF33] blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-[#5B8CFF22] to-[#8C6BFF22] blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid items-center gap-10 pt-24 pb-16 md:grid-cols-2 md:gap-12 md:pt-28">
          {/* Left: copy */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
              <span className="inline-block h-2 w-2 rounded-full bg-primary" />
              Nouveau : IA marketing unifiée 13-en-1
            </div>

            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
              Toute votre stack marketing —{" "}
              <span className="bg-gradient-to-r from-[#4F7DFF] to-[#7A5BFF] bg-clip-text text-transparent">
                Réinventée par l’IA
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-lg text-muted-foreground md:text-xl">
              Webinaires, emails, automatisations, CRM et analytics en temps réel — réunis dans une seule plateforme
              ultrarapide, 100% propulsée par l’IA.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full border px-3 py-1">
                60% de temps gagné
              </span>
              <span className="rounded-full border px-3 py-1">
                90% de coûts en moins
              </span>
              <span className="rounded-full border px-3 py-1">
                100% plus intelligent
              </span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/demo">
                <Button className="gap-2">
                  <Play className="h-4 w-4" />
                  Voir la démo interactive
                </Button>
              </Link>
              <Link href="/waitlist">
                <Button variant="outline" className="gap-2">
                  Rejoindre la waitlist
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <Shield className="h-4 w-4" /> Données sécurisées
              </span>
              <span className="inline-flex items-center gap-2">
                <Timer className="h-4 w-4" /> Mise en place &lt; 2 min
              </span>
            </div>

            {/* Trust strip */}
            <div className="mt-10">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Déjà adopté par 1 000+ équipes
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-6 opacity-80">
                {/* Remplace par de vrais logos quand tu veux */}
                <div className="h-6 w-24 rounded bg-foreground/10 dark:bg-foreground/20" />
                <div className="h-6 w-20 rounded bg-foreground/10 dark:bg-foreground/20" />
                <div className="h-6 w-28 rounded bg-foreground/10 dark:bg-foreground/20" />
                <div className="h-6 w-16 rounded bg-foreground/10 dark:bg-foreground/20" />
              </div>
            </div>
          </div>

          {/* Right: mockup card */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl border bg-background/70 shadow-2xl ring-1 ring-black/5 backdrop-blur">
              {/* gradient edge */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
              <Image
                src="/images/hero-preview.png" // remplace par ton visuel
                alt="Aperçu Dylup"
                width={1200}
                height={800}
                priority
                sizes="(min-width: 1024px) 640px, 100vw"
                className="block h-auto w-full"
              />
            </div>

            {/* Glow behind card */}
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] bg-gradient-to-br from-[#4F7DFF55] to-[#7A5BFF55] blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
