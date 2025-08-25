import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Video, FileText, Headphones, Users, Download } from "lucide-react"
import Link from "next/link"

export default function RessourcesPage() {
  const resourceCategories = [
    {
      icon: <BookOpen className="w-8 h-8 text-primary" />,
      title: "Guides & Tutoriels",
      description: "Apprenez les meilleures pratiques du marketing automation",
      count: "25+ guides",
      resources: [
        "Guide complet de l'email marketing",
        "Automatisation pour débutants",
        "Segmentation avancée",
        "A/B Testing efficace",
      ],
    },
    {
      icon: <Video className="w-8 h-8 text-primary" />,
      title: "Webinaires & Vidéos",
      description: "Formations vidéo et sessions live avec nos experts",
      count: "15+ heures",
      badge: "Nouveau",
      resources: ["Masterclass automation", "Cas d'usage sectoriels", "Q&A mensuels", "Démonstrations produit"],
    },
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: "Templates & Modèles",
      description: "Templates prêts à l'emploi pour vos campagnes",
      count: "50+ templates",
      resources: [
        "Templates email responsive",
        "Workflows pré-configurés",
        "Séquences d'onboarding",
        "Campagnes saisonnières",
      ],
    },
    {
      icon: <Headphones className="w-8 h-8 text-primary" />,
      title: "Support & Documentation",
      description: "Aide technique et documentation complète",
      count: "24/7 support",
      resources: ["Documentation API", "Centre d'aide", "Chat support", "Base de connaissances"],
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Communauté",
      description: "Échangez avec d'autres utilisateurs DYLUP",
      count: "2000+ membres",
      badge: "Populaire",
      resources: ["Forum communautaire", "Groupes sectoriels", "Événements networking", "Success stories"],
    },
    {
      icon: <Download className="w-8 h-8 text-primary" />,
      title: "Outils & Calculateurs",
      description: "Outils gratuits pour optimiser vos campagnes",
      count: "10+ outils",
      resources: [
        "Calculateur ROI",
        "Audit email gratuit",
        "Générateur de subject lines",
        "Planificateur de campagnes",
      ],
    },
  ]

  const featuredResources = [
    {
      type: "Guide",
      title: "Le Guide Ultime de l'Email Marketing en 2024",
      description: "Tout ce que vous devez savoir pour créer des campagnes email performantes",
      readTime: "15 min",
      badge: "Populaire",
    },
    {
      type: "Webinaire",
      title: "Automatisation Marketing : De Zéro à Héros",
      description: "Masterclass complète sur la mise en place d'workflows efficaces",
      readTime: "45 min",
      badge: "Nouveau",
    },
    {
      type: "Template",
      title: "Pack Templates E-commerce",
      description: "10 templates optimisés pour booster vos ventes en ligne",
      readTime: "Téléchargement",
      badge: "Gratuit",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/10">
      <Header />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Centre de <span className="text-primary">Ressources</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Guides, templates, formations et outils pour maîtriser le marketing automation
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <Link href="#resources">Explorer les ressources</Link>
            </Button>
          </div>
        </section>

        {/* Featured Resources */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ressources à la Une</h2>
            <p className="text-muted-foreground">Les contenus les plus populaires de notre communauté</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {featuredResources.map((resource, index) => (
              <Card key={index} className="glass-card hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{resource.type}</Badge>
                    <Badge
                      variant={
                        resource.badge === "Populaire"
                          ? "default"
                          : resource.badge === "Nouveau"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {resource.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{resource.readTime}</span>
                    <Button size="sm" variant="outline">
                      {resource.type === "Template" ? "Télécharger" : "Lire"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Resource Categories */}
        <section id="resources" className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Toutes nos Ressources</h2>
            <p className="text-muted-foreground">Explorez notre bibliothèque complète de contenus</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resourceCategories.map((category, index) => (
              <Card key={index} className="glass-card hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    {category.icon}
                    {category.badge && (
                      <Badge variant={category.badge === "Populaire" ? "default" : "secondary"}>{category.badge}</Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{category.description}</CardDescription>
                  <div className="text-sm font-medium text-primary">{category.count}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {category.resources.map((resource, resourceIndex) => (
                      <li key={resourceIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-sm text-muted-foreground">{resource}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full bg-transparent">
                    Explorer
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="glass-card p-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Restez informé des dernières ressources</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Recevez chaque semaine nos nouveaux guides, templates et conseils d'experts directement dans votre boîte
              mail
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-2 rounded-lg border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="bg-primary hover:bg-primary/90">S'abonner</Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">Pas de spam, désabonnement en un clic</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
