import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Mail, MessageSquare, Zap, BarChart3, Users, Workflow } from "lucide-react"
import Link from "next/link"

export default function ProduitsPage() {
  const products = [
    {
      icon: <Mail className="w-8 h-8 text-primary" />,
      title: "Email Marketing",
      description: "Créez et envoyez des campagnes email personnalisées avec des templates professionnels",
      features: ["Templates responsive", "Personnalisation avancée", "A/B Testing", "Analytics détaillées"],
      badge: "Populaire",
    },
    {
      icon: <Workflow className="w-8 h-8 text-primary" />,
      title: "Automation Marketing",
      description: "Automatisez vos campagnes avec des workflows intelligents basés sur le comportement",
      features: ["Triggers comportementaux", "Séquences automatisées", "Scoring de leads", "Intégrations CRM"],
      badge: "Nouveau",
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Gestion d'Audience",
      description: "Segmentez et gérez vos contacts avec des outils de ciblage avancés",
      features: ["Segmentation dynamique", "Import/Export", "Nettoyage automatique", "RGPD compliant"],
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-primary" />,
      title: "Analytics & Reporting",
      description: "Analysez les performances de vos campagnes avec des rapports détaillés",
      features: ["Tableaux de bord", "ROI tracking", "Rapports personnalisés", "Alertes intelligentes"],
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-primary" />,
      title: "SMS Marketing",
      description: "Atteignez vos clients directement sur mobile avec des campagnes SMS ciblées",
      features: ["Envoi en masse", "Personnalisation", "Opt-out automatique", "Delivery tracking"],
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "API & Intégrations",
      description: "Connectez DYLUP à vos outils existants avec notre API REST complète",
      features: ["API REST", "Webhooks", "Zapier", "Intégrations natives"],
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
              Nos <span className="text-primary">Produits</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Découvrez notre suite complète d'outils marketing pour automatiser, personnaliser et optimiser vos
              campagnes
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <Link href="/auth/signup">Essayer Gratuitement</Link>
            </Button>
          </div>
        </section>

        {/* Products Grid */}
        <section className="container mx-auto px-4 py-16">
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
                      <li key={featureIndex} className="flex items-center space-x-2">
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

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="glass-card p-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Prêt à transformer votre marketing ?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Commencez votre essai gratuit de 14 jours et découvrez comment DYLUP peut révolutionner vos campagnes
              marketing
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/auth/signup">Commencer l'essai gratuit</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/tarifs">Voir les tarifs</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
