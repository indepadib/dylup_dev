/*import { Header } from "@/components/header"*/
import  HeroSection from "@/components/hero-section"
import { InteractiveDemo } from "@/components/interactive-demo"
import { AIShowcase } from "@/components/ai-showcase"
import { ROICalculator } from "@/components/roi-calculator"
import { Footer } from "@/components/footer"
import { ComparisonSection } from "@/components/comparison-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/10">
      <main>
        <HeroSection />
        <InteractiveDemo />
        <AIShowcase />
        <ROICalculator />
        <ComparisonSection />
      </main>
      <Footer />
    </div>
  )
}
