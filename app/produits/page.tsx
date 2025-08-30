"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Check,
  Mail,
  MessageSquare,
  Zap,
  BarChart3,
  Users,
  Workflow,
  ShieldCheck,
  Sparkles,
  Plug,
  Globe2,
  Lock,
  Database,
  FileText,
  Cpu,
  Star,
  Quote
} from "lucide-react"

export default function ProduitsPage() {
  const products = [
    {
      icon: <Mail className="w-8 h-8 text-primary" />,
      title: "Email Marketing",
      description: "Créez et envoyez des campagnes email personnalisées avec des templates professionnels.",
      features: ["Templates responsive", "Personnalisation avancée", "A/B Testing", "Analytics détaillées"],
      badge: "Populaire",
    },
    {
      icon: <Workflow className="w-8 h-8 text-primary" />,
      title: "Automation Marketing",
      description: "Orchestrez des scénarios basés sur les signaux clients en temps réel.",
      features: ["Triggers comportementaux", "Séquences multi-canales", "Lead scoring", "Intégrations CRM"],
      badge: "Nouveau",
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Gestion d'Audience",
      description: "Segmentez vos contacts avec des filtres dynamiques et des listes intelligentes.",
      features: ["Segments dynamiques", "Import/Export", "Hygiène des données", "RGPD compliant"],
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-primary" />,
      title: "Analytics & Reporting",
      description: "Mesurez l’impact marketing et le ROI sur un seul tableau de bord.",
      features: ["Dashboards personnalisés", "Attribution & ROI", "Rapports programmés", "Alertes intelligentes"],
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-primary" />,
      title: "SMS Marketing",
      description: "Touchez vos audiences sur mobile avec des campagnes ciblées.",
      features: ["Envoi en masse", "Personnalisation", "Opt-out automatique", "Delivery tracking"],
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "API & Intégrations",
      description: "Connectez Dylup à votre stack via API, webhooks et connecteurs natifs.",
      features: ["API REST", "Webhooks", "Zapier & Make", "Intégrations natives"],
    },
  ]

  const solutions = [
    {
      title: "Génération de leads B2B",
      desc: "Capturez, qualifiez et nourrissez vos leads à grande échelle.",
      bullets: ["Formulaires + Landing pages", "Nurturing automatique", "Score MQL/SQL", "Passerelles CRM"],
    },
    {
      title: "Lancement de webinaires",
      desc: "De l’inscription au replay, tout est synchronisé.",
      bullets: ["Emails + SMS + Rappels", "Pages d’inscription", "No-show retargeting", "Reporting de session"],
    },
    {
      title: "E-commerce & rétention",
      desc: "Automations transactionnelles & fidélisation multicanale.",
      bullets: ["Abandon panier", "Upsell/Cross-sell", "Segments RFM", "Coupons & offres"],
    },
    {
      title: "Activation self-serve",
      desc: "Accélérez l’onboarding et la conversion sans friction.",
      bullets: ["Guides produits", "Checkpoints in-app", "Emails d’activation", "Cycles d’essai intelligents"],
    },
  ]

  const integrations = [
    "Stripe", "Supabase", "HubSpot", "Salesforce", "LinkedIn", "Google Ads", "Meta Ads", "Resend", "Slack", "Zapier"
  ]

  const faqs = [
    {
      q: "Dylup est-il bilingue (FR/EN) ?",
      a: "Oui, l’interface, les templates et l’IA FlyUp fonctionnent en français et en anglais."
    },
    {
      q: "Comment fonctionne l’essai gratuit ?",
      a: "Vous disposez de 14 jours avec toutes les fonctionnalités principales. Aucune carte requise pour démarrer."
    },
    {
      q: "Puis-je connecter mon CRM existant ?",
      a: "Oui. Des connecteurs natifs et l’API REST permettent de synchroniser contacts, deals et événements."
    },
    {
      q: "Quelles garanties RGPD ?",
      a: "Stockage UE (via vos choix d’infra), contrôle granulaire des consentements et outils d’export/suppression."
    },
  ]

  const testimonials = [
    {
      author: "Camille L.",
      role: "Head of Marketing, SaaS B2B",
      quote: "On a réuni emails, SMS, webinaires et analytics dans un seul hub. Les MQL ont augmenté de 42% en 3 mois.",
    },
    {
      author: "Yassine B.",
      role: "Growth Manager, E-commerce",
      quote: "Les automations RFM et l’IA FlyUp nous ont fait gagner un temps fou et un +28% de récurrence.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/10">

      {/* --- Bannière Offre Wishlist globale --- */}
      <div className="container mx-auto px-4 mt-2">
        <Link
          href="/tarifs?offer=wishlist"
          className="block text-center text-sm rounded-xl px-4 py-2 bg-primary/10 border border-primary/30"
        >
          <span className="font-medium">🎁 Offre Wishlist</span> — <b>30 jours d’essai</b> + <b>-30% pendant 3 mois</b> pour les inscrits à la wishlist. <span className="underline">En profiter</span>
        </Link>
      </div>

      <main className="pt-20">
        {/* HERO */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              La suite <span className="text-primary">Produits Dylup</span>
              <span className="ml-2 align-middle text-xs px-2 py-1 rounded-full border bg-background/70">🎁 Offre Wishlist</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Centralisez vos campagnes, automatisez vos workflows et pilotez la performance — en Français et en Anglais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/tarifs?offer=wishlist">Activer l’offre wishlist</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/tarifs">Voir les tarifs</Link>
              </Button>
            </div>
            <div className="mt-6 flex items-center justify-center gap-3 text-sm text-muted-foreground">
              <ShieldCheck className="w-4 h-4" />
              <span>RGPD • Chiffrement en transit & au repos • SSO à venir</span>
            </div>
          </div>
        </section>

        {/* MODULES / PRODUITS */}
        <section id="modules" className="container mx-auto px-4 py-16">
          <div className="mb-10 text-center">
            <Badge variant="secondary" className="mb-3">Modules</Badge>
            <h2 className="text-3xl font-bold mb-2">Tout ce qu’il faut pour exécuter</h2>
            <p className="text-muted-foreground">Des briques simples à combiner, propulsées par l’IA FlyUp.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Card key={index} className="glass-card hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    {product.icon}
                    {product.badge && (
                      <Badge variant={product.badge === "Populaire" ? "default" : "secondary"}>{product.badge}</Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl">{product.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {product.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* SOLUTIONS PAR CAS D’USAGE */}
        <section id="solutions" className="container mx-auto px-4 py-16">
          <div className="mb-10 text-center">
            <Badge variant="secondary" className="mb-3">Solutions</Badge>
            <h2 className="text-3xl font-bold mb-2">Conçues pour vos objectifs</h2>
            <p className="text-muted-foreground">Choisissez un pack d’actions, Dylup orchestre le reste.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {solutions.map((s, i) => (
              <Card key={i} className="glass-card hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">{s.title}</CardTitle>
                  <CardDescription>{s.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {s.bullets.map((b, bi) => (
                      <li key={bi} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-green-500" /> {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/demo">Voir un exemple</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FLYUP (IA) */}
        <section id="flyup" className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge variant="secondary" className="mb-3">IA intégrée</Badge>
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <Sparkles className="w-7 h-7 text-primary" /> FlyUp — votre copilote marketing
              </h2>
              <p className="text-muted-foreground mb-6">
                FlyUp analyse votre historique, votre CRM et vos performances pour proposer des plans d’action,
                générer des contenus (FR/EN), et automatiser vos scénarios. En mode manuel, assisté ou autonome.
              </p>
              <ul className="space-y-3 text-sm">
                {[
                  "Génération de contenus (emails, posts, landing pages) contextualisés.",
                  "Recommandations d’optimisation (heures d’envoi, segments, canaux).",
                  "Scénarios prêts-à-l’emploi par objectif (activation, rétention, upsell).",
                ].map((x, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Cpu className="w-4 h-4 mt-1 text-primary" />
                    <span className="text-muted-foreground">{x}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex gap-3">
                <Button asChild>
                  <Link href="/demo">Lancer la démo interactive</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/docs/flyup">Lire la doc FlyUp</Link>
                </Button>
              </div>
            </div>
            <div className="glass-card p-6">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Globe2 className="w-4 h-4 text-primary" /> Bilingue FR/EN
                    </CardTitle>
                    <CardDescription>Détection auto de langue</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" /> Templates IA
                    </CardTitle>
                    <CardDescription>Emails, posts, pages</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Database className="w-4 h-4 text-primary" /> Connecté données
                    </CardTitle>
                    <CardDescription>CRM & analytics</CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Lock className="w-4 h-4 text-primary" /> Privacy-first
                    </CardTitle>
                    <CardDescription>RGPD & contrôle</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* INTÉGRATIONS */}
        <section id="integrations" className="container mx-auto px-4 py-16">
          <div className="glass-card p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <Badge variant="secondary" className="mb-3">Écosystème</Badge>
                <h3 className="text-2xl font-bold">S’intègre à votre stack</h3>
                <p className="text-muted-foreground">API, webhooks et connecteurs plug-and-play.</p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/integrations">
                  <Plug className="w-4 h-4 mr-2" /> Voir toutes les intégrations
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {integrations.map((name) => (
                <div key={name} className="border rounded-xl px-4 py-3 text-center text-sm text-muted-foreground">
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SÉCURITÉ & CONFORMITÉ */}
        <section id="security" className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" /> Sécurité & Conformité
                </CardTitle>
                <CardDescription>Conçu pour la confiance et l’échelle.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Chiffrement TLS/at-rest, permissions fines, export/suppression des données, consentements RGPD,
                journaux d’audit, et hébergement UE selon vos choix d’infra.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Contrôles</CardTitle>
                <CardDescription>Ce qui est activé par défaut</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    "Chiffrement en transit et au repos",
                    "Gestion des rôles & accès (RBAC)",
                    "Journalisation des événements",
                    "Modèle data minimization",
                  ].map((x) => (
                    <li key={x} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" /> {x}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Roadmap sécurité</CardTitle>
                <CardDescription>Bientôt disponible</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    "SSO (SAML / OIDC)",
                    "SCIM provisioning",
                    "Archivage légal & rétention",
                    "Conformité ISO 27001",
                  ].map((x) => (
                    <li key={x} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" /> {x}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* TÉMOIGNAGES */}
        <section id="testimonials" className="container mx-auto px-4 py-16">
          <div className="mb-10 text-center">
            <Badge variant="secondary" className="mb-3">Ils nous font confiance</Badge>
            <h2 className="text-3xl font-bold mb-2">Des résultats concrets</h2>
            <p className="text-muted-foreground">Dylup accélère la mise en marché et la performance.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <Card key={i} className="glass-card">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Quote className="w-5 h-5 text-primary mt-1" />
                    <p className="text-foreground">{t.quote}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="w-4 h-4" />
                    <span>{t.author} — {t.role}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="container mx-auto px-4 py-16">
          <div className="mb-10 text-center">
            <Badge variant="secondary" className="mb-3">FAQ</Badge>
            <h2 className="text-3xl font-bold mb-2">Questions fréquentes</h2>
            <p className="text-muted-foreground">Tout ce qu’il faut pour démarrer sereinement.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((f, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-lg">{f.q}</CardTitle>
                  <CardDescription className="text-base">{f.a}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA FINAL */}
        <section id="cta" className="container mx-auto px-4 py-16">
          <div className="glass-card p-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Prêt à transformer votre marketing ?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Lancez votre essai <b>spécial Wishlist</b> et laissez FlyUp orchestrer vos premières campagnes en moins de 10 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/tarifs?offer=wishlist">Activer l’offre wishlist (30 jours + -30% / 3 mois)</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/tarifs">Comparer les offres</Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              * Offre réservée aux emails présents dans la wishlist. Non cumulable. Valable pour une première souscription.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
