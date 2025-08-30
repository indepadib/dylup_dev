import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, ShoppingCart, Briefcase, GraduationCap, Heart, Plane } from "lucide-react"
import Link from "next/link"

export default function SolutionsPage() {
  const solutions = [
    {
      icon: <ShoppingCart className="w-8 h-8 text-primary" />,
      title: "E-commerce",
      description: "Boostez vos ventes en ligne avec des campagnes personnalisées et des workflows d'abandon de panier",
      features: [
        "Récupération de panier",
        "Recommandations produits",
        "Segmentation comportementale",
        "Intégration Shopify/WooCommerce",
      ],
      badge: "Populaire",
      stats: { increase: "+45%", metric: "de conversion" },
    },
    {
      icon: <Building2 className="w-8 h-8 text-primary" />,
      title: "B2B & SaaS",
      description: "Générez et nurturez vos leads B2B avec des campagnes sophistiquées et du lead scoring",
      features: ["Lead scoring", "Nurturing automatisé", "CRM sync", "Account-based marketing"],
      stats: { increase: "+60%", metric: "de leads qualifiés" },
    },
    {
      icon: <Briefcase className="w-8 h-8 text-primary" />,
      title: "Services Professionnels",
      description: "Fidélisez vos clients et développez votre activité avec des communications personnalisées",
      features: ["Onboarding client", "Newsletters", "Rappels RDV", "Témoignages automatisés"],
      stats: { increase: "+35%", metric: "de rétention client" },
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-primary" />,
      title: "Éducation & Formation",
      description: "Engagez vos étudiants et prospects avec des parcours d'apprentissage personnalisés",
      features: ["Parcours d'onboarding", "Rappels de cours", "Certification tracking", "Engagement étudiant"],
      badge: "Nouveau",
      stats: { increase: "+50%", metric: "d'engagement" },
    },
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Santé & Bien-être",
      description: "Accompagnez vos patients avec des rappels personnalisés et du contenu éducatif",
      features: ["Rappels RDV", "Suivi patient", "Contenu éducatif", "Conformité RGPD"],
      stats: { increase: "+40%", metric: "de satisfaction patient" },
    },
    {
      icon: <Plane className="w-8 h-8 text-primary" />,
      title: "Voyage & Tourisme",
      description: "Inspirez et convertissez vos voyageurs avec des campagnes saisonnières ciblées",
      features: ["Offres saisonnières", "Géolocalisation", "Upselling", "Avis clients automatisés"],
      stats: { increase: "+55%", metric: "de réservations" },
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/10">

      <main className="pt-24">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Solutions par <span className="text-primary">Secteur</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Des solutions marketing adaptées à votre secteur d'activité pour maximiser vos résultats
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <Link href="/auth/signup">Découvrir ma solution</Link>
            </Button>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} className="glass-card hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    {solution.icon}
                    {solution.badge && (
                      <Badge variant={solution.badge === "Populaire" ? "default" : "secondary"}>{solution.badge}</Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl">{solution.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{solution.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 p-3 bg-primary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{solution.stats.increase}</div>
                    <div className="text-sm text-muted-foreground">{solution.stats.metric}</div>
                  </div>
                  <ul className="space-y-2">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Success Stories */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ils nous font confiance</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez comment nos clients transforment leur marketing avec DYLUP
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">+250%</div>
                  <div className="text-sm text-muted-foreground mb-4">ROI sur les campagnes email</div>
                  <p className="text-sm italic">"DYLUP a révolutionné notre approche marketing"</p>
                  <p className="text-xs text-muted-foreground mt-2">- TechStart, SaaS B2B</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">-60%</div>
                  <div className="text-sm text-muted-foreground mb-4">temps passé sur les campagnes</div>
                  <p className="text-sm italic">"L'automatisation nous fait gagner un temps précieux"</p>
                  <p className="text-xs text-muted-foreground mt-2">- BeautyShop, E-commerce</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">+180%</div>
                  <div className="text-sm text-muted-foreground mb-4">engagement client</div>
                  <p className="text-sm italic">"Nos clients sont plus engagés que jamais"</p>
                  <p className="text-xs text-muted-foreground mt-2">- WellnessCorp, Santé</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="glass-card p-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Votre secteur mérite une solution sur mesure</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Parlons de vos défis spécifiques et découvrons ensemble comment DYLUP peut transformer votre marketing
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/auth/signup">Essai gratuit 14 jours</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/a-propos">Demander une démo</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
