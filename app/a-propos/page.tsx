import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Users, Zap, Heart, Award, Globe } from "lucide-react"
import Link from "next/link"

export default function AProposPage() {
  const values = [
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Innovation",
      description: "Nous repoussons constamment les limites du marketing automation avec des technologies de pointe",
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Centré Client",
      description: "Chaque fonctionnalité est pensée pour répondre aux besoins réels de nos utilisateurs",
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Performance",
      description: "Nous nous engageons à délivrer des résultats mesurables et un ROI exceptionnel",
    },
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Simplicité",
      description: "La technologie complexe rendue simple et accessible à tous les marketeurs",
    },
  ]

  const team = [
    {
      name: "Marie Dubois",
      role: "CEO & Co-fondatrice",
      bio: "15 ans d'expérience en marketing digital, ex-Google",
      image: "/professional-woman-ceo.png",
    },
    {
      name: "Thomas Martin",
      role: "CTO & Co-fondateur",
      bio: "Expert en IA et automation, ex-Microsoft",
      image: "/professional-man-cto.png",
    },
    {
      name: "Sophie Laurent",
      role: "VP Product",
      bio: "Spécialiste UX/UI, passionnée par l'expérience utilisateur",
      image: "/professional-woman-vp.png",
    },
    {
      name: "Alexandre Chen",
      role: "VP Engineering",
      bio: "Architecte logiciel senior, expert en scalabilité",
      image: "/professional-engineer.png",
    },
  ]

  const stats = [
    { number: "10K+", label: "Clients actifs" },
    { number: "50M+", label: "Emails envoyés/mois" },
    { number: "99.9%", label: "Uptime garanti" },
    { number: "24/7", label: "Support client" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/10">

      <main className="pt-24">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4">Fondé en 2020</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              À propos de <span className="text-primary">DYLUP</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Nous démocratisons le marketing automation en rendant les outils professionnels accessibles à toutes les
              entreprises
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Notre Mission</h2>
              <p className="text-muted-foreground mb-6 text-lg">
                Chez DYLUP, nous croyons que chaque entreprise, quelle que soit sa taille, mérite d'avoir accès aux
                meilleurs outils de marketing automation.
              </p>
              <p className="text-muted-foreground mb-6">
                Notre plateforme combine la puissance de l'intelligence artificielle avec une interface intuitive pour
                permettre aux marketeurs de créer des campagnes personnalisées qui génèrent des résultats exceptionnels.
              </p>
              <p className="text-muted-foreground">
                Nous ne nous contentons pas de fournir des outils - nous accompagnons nos clients dans leur
                transformation digitale avec des ressources, du support et une communauté active.
              </p>
            </div>
            <div className="relative">
              <div className="glass-card p-8">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Nos Valeurs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Les principes qui guident chacune de nos décisions et innovations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="glass-card text-center">
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Notre Équipe</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Des experts passionnés qui travaillent chaque jour pour révolutionner le marketing automation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="glass-card text-center">
                <CardContent className="p-6">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary text-sm mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-xs">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recognition Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Reconnaissances</h2>
            <p className="text-muted-foreground">Nos récompenses et certifications</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass-card text-center">
              <CardContent className="p-6">
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">SaaS Awards 2023</h3>
                <p className="text-sm text-muted-foreground">Meilleure solution Marketing Automation</p>
              </CardContent>
            </Card>

            <Card className="glass-card text-center">
              <CardContent className="p-6">
                <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">RGPD Compliant</h3>
                <p className="text-sm text-muted-foreground">Certification sécurité et confidentialité</p>
              </CardContent>
            </Card>

            <Card className="glass-card text-center">
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Top Employer 2024</h3>
                <p className="text-sm text-muted-foreground">Certifié Great Place to Work</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="glass-card p-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Rejoignez l'aventure DYLUP</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Que vous soyez un futur client ou un talent à la recherche de nouveaux défis, nous serions ravis
              d'échanger avec vous
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/auth/signup">Essayer DYLUP</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/ressources">Nous contacter</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
