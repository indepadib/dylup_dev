import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, Zap, Crown, Rocket } from "lucide-react"
import Link from "next/link"

export default function TarifsPage() {
  const plans = [
    {
      name: "Starter",
      icon: <Zap className="w-6 h-6" />,
      price: "29",
      period: "/mois",
      description: "Parfait pour débuter avec le marketing automation",
      badge: null,
      features: [
        { name: "Jusqu'à 1,000 contacts", included: true },
        { name: "5,000 emails/mois", included: true },
        { name: "Templates email de base", included: true },
        { name: "Formulaires de capture", included: true },
        { name: "Analytics de base", included: true },
        { name: "Support email", included: true },
        { name: "Workflows avancés", included: false },
        { name: "A/B Testing", included: false },
        { name: "Intégrations CRM", included: false },
        { name: "Support prioritaire", included: false },
      ],
      cta: "Commencer l'essai gratuit",
      popular: false,
    },
    {
      name: "Professional",
      icon: <Crown className="w-6 h-6" />,
      price: "79",
      period: "/mois",
      description: "Pour les équipes qui veulent automatiser leur marketing",
      badge: "Populaire",
      features: [
        { name: "Jusqu'à 10,000 contacts", included: true },
        { name: "50,000 emails/mois", included: true },
        { name: "Templates premium", included: true },
        { name: "Workflows avancés", included: true },
        { name: "A/B Testing", included: true },
        { name: "Segmentation avancée", included: true },
        { name: "Analytics détaillées", included: true },
        { name: "Intégrations CRM", included: true },
        { name: "Support chat", included: true },
        { name: "API access", included: false },
      ],
      cta: "Commencer l'essai gratuit",
      popular: true,
    },
    {
      name: "Enterprise",
      icon: <Rocket className="w-6 h-6" />,
      price: "199",
      period: "/mois",
      description: "Solution complète pour les grandes entreprises",
      badge: "Complet",
      features: [
        { name: "Contacts illimités", included: true },
        { name: "Emails illimités", included: true },
        { name: "Templates personnalisés", included: true },
        { name: "Workflows illimités", included: true },
        { name: "A/B Testing avancé", included: true },
        { name: "IA prédictive", included: true },
        { name: "Analytics personnalisées", included: true },
        { name: "Toutes les intégrations", included: true },
        { name: "Support dédié", included: true },
        { name: "API complète", included: true },
      ],
      cta: "Demander une démo",
      popular: false,
    },
  ]

  const addons = [
    {
      name: "SMS Marketing",
      price: "0.05",
      unit: "/SMS",
      description: "Ajoutez le SMS à vos campagnes",
    },
    {
      name: "Contacts supplémentaires",
      price: "10",
      unit: "/1000 contacts",
      description: "Dépassez les limites de votre plan",
    },
    {
      name: "Formation personnalisée",
      price: "500",
      unit: "/session",
      description: "Formation sur mesure pour votre équipe",
    },
  ]

  const faqs = [
    {
      question: "Puis-je changer de plan à tout moment ?",
      answer:
        "Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements prennent effet immédiatement.",
    },
    {
      question: "Y a-t-il des frais de configuration ?",
      answer: "Non, aucun frais de configuration. Vous ne payez que votre abonnement mensuel.",
    },
    {
      question: "Que se passe-t-il si je dépasse mes limites ?",
      answer:
        "Nous vous préviendrons avant d'atteindre vos limites. Vous pourrez alors upgrader ou acheter des add-ons.",
    },
    {
      question: "Proposez-vous des remises annuelles ?",
      answer: "Oui, économisez 20% en choisissant la facturation annuelle sur tous nos plans.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/10">
  

      <main className="pt-24">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Tarifs <span className="text-primary">Transparents</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Choisissez le plan qui correspond à vos besoins. Tous les plans incluent un essai gratuit de 14 jours.
            </p>
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className="text-muted-foreground">Mensuel</span>
              <div className="relative">
                <input type="checkbox" className="sr-only" />
                <div className="w-12 h-6 bg-muted rounded-full cursor-pointer"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
              </div>
              <span className="text-foreground">Annuel</span>
              <Badge variant="secondary">-20%</Badge>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`glass-card relative ${plan.popular ? "ring-2 ring-primary" : ""}`}>
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-white">{plan.badge}</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    {plan.icon}
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  </div>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-foreground">{plan.price}€</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <CardDescription className="text-center">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        {feature.included ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <X className="w-4 h-4 text-muted-foreground" />
                        )}
                        <span className={`text-sm ${feature.included ? "text-foreground" : "text-muted-foreground"}`}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : ""}`}
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link href="/auth/signup">{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Add-ons Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Options Supplémentaires</h2>
            <p className="text-muted-foreground">Personnalisez votre plan avec nos add-ons</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {addons.map((addon, index) => (
              <Card key={index} className="glass-card text-center">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{addon.name}</h3>
                  <div className="mb-3">
                    <span className="text-2xl font-bold text-primary">{addon.price}€</span>
                    <span className="text-muted-foreground">{addon.unit}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{addon.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Questions Fréquentes</h2>
            <p className="text-muted-foreground">Tout ce que vous devez savoir sur nos tarifs</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="glass-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
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
              Commencez votre essai gratuit de 14 jours. Aucune carte de crédit requise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/auth/signup">Essai gratuit 14 jours</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/a-propos">Demander une démo</Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Support client 24/7 • Pas d'engagement • Annulation à tout moment
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
