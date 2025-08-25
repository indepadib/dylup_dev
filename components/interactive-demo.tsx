"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Users, Mail, Zap } from "lucide-react"

const demoSteps = [
  {
    id: "audience",
    title: "Build Your Audience",
    icon: Users,
    description: "Import and segment your contacts with AI-powered insights",
    metrics: { contacts: "12,847", segments: "8", growth: "+23%" },
  },
  {
    id: "campaign",
    title: "Create Campaigns",
    icon: Mail,
    description: "Design beautiful emails with our AI-assisted editor",
    metrics: { campaigns: "24", openRate: "34.2%", clickRate: "8.7%" },
  },
  {
    id: "automate",
    title: "Automate Workflows",
    icon: Zap,
    description: "Set up intelligent automation that responds to user behavior",
    metrics: { workflows: "12", automated: "89%", conversion: "+45%" },
  },
  {
    id: "analyze",
    title: "Analyze Results",
    icon: BarChart3,
    description: "Get actionable insights with comprehensive analytics",
    metrics: { revenue: "$47,892", roi: "312%", improvement: "+67%" },
  },
]

export function InteractiveDemo() {
  const [activeStep, setActiveStep] = useState("audience")

  const currentStep = demoSteps.find((step) => step.id === activeStep) || demoSteps[0]
  const Icon = currentStep.icon

  return (
    <section id="demo" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">See DYLUP in Action</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience how our platform transforms your marketing workflow in just a few clicks
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Demo Controls */}
          <div className="space-y-4">
            {demoSteps.map((step) => (
              <Card
                key={step.id}
                className={`cursor-pointer transition-all duration-300 ${
                  activeStep === step.id ? "glass-card border-primary/50 shadow-lg" : "hover:shadow-md"
                }`}
                onClick={() => setActiveStep(step.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg ${
                        activeStep === step.id ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <step.icon size={20} />
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Demo Visualization */}
          <div className="glass-card rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon size={32} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">{currentStep.title}</h3>
              <p className="text-muted-foreground">{currentStep.description}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {Object.entries(currentStep.metrics).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">{value}</div>
                  <div className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}</div>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <Button className="bg-primary hover:bg-primary/90">Try This Feature</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
