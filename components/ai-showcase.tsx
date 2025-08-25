import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, MessageSquare, Target, TrendingUp } from "lucide-react"

const aiFeatures = [
  {
    icon: Brain,
    title: "Smart Content Generation",
    description: "AI creates compelling email copy, subject lines, and social media posts tailored to your audience.",
    badge: "AI-Powered",
  },
  {
    icon: Target,
    title: "Predictive Segmentation",
    description: "Automatically identify high-value customer segments based on behavior patterns and preferences.",
    badge: "Machine Learning",
  },
  {
    icon: MessageSquare,
    title: "Intelligent Personalization",
    description: "Deliver personalized experiences at scale with AI-driven content recommendations.",
    badge: "Dynamic",
  },
  {
    icon: TrendingUp,
    title: "Performance Optimization",
    description: "AI continuously optimizes send times, content, and targeting for maximum engagement.",
    badge: "Auto-Optimize",
  },
]

export function AIShowcase() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Artificial Intelligence</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">AI That Actually Works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our advanced AI doesn't just automate tasks—it makes intelligent decisions that improve your marketing
            performance over time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiFeatures.map((feature, index) => (
            <Card key={index} className="glass-card hover:shadow-lg transition-all duration-300 group">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon size={24} className="text-white" />
                </div>
                <Badge variant="secondary" className="mb-2">
                  {feature.badge}
                </Badge>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 glass-card rounded-2xl p-8 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">87%</div>
              <div className="text-muted-foreground">Improvement in open rates with AI optimization</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">3.2x</div>
              <div className="text-muted-foreground">Faster campaign creation with AI assistance</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">45%</div>
              <div className="text-muted-foreground">Increase in conversion rates through personalization</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
