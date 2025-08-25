"use client"

import { Button } from "@/components/ui/button"
import { Check, X, Clock, DollarSign, Zap } from "lucide-react"

export function ComparisonSection() {
  const features = [
    {
      name: "AI-Native Automation",
      description: "Built from ground up with AI",
      dylup: "check",
      hubspot: "partial",
      adobe: "no",
      mailchimp: "partial",
    },
    {
      name: "Setup Time",
      description: "Time to get started",
      dylup: "2 minutes",
      hubspot: "2-4 weeks",
      adobe: "6-8 weeks",
      mailchimp: "1-2 days",
    },
    {
      name: "Built-in Webinars",
      description: "Native webinar platform",
      dylup: "check",
      hubspot: "no",
      adobe: "no",
      mailchimp: "no",
    },
    {
      name: "Real-time Analytics",
      description: "Live performance tracking",
      dylup: "check",
      hubspot: "partial",
      adobe: "check",
      mailchimp: "partial",
    },
    {
      name: "Starting Price",
      description: "Per month, basic plan",
      dylup: "$29",
      hubspot: "$800+",
      adobe: "$1,200+",
      mailchimp: "$299",
    },
    {
      name: "Customer Support",
      description: "Response time & quality",
      dylup: "24/7 AI + Human",
      hubspot: "Business hours",
      adobe: "Premium only",
      mailchimp: "Email only",
    },
  ]

  const renderCell = (value: string, competitor: string) => {
    if (value === "check") {
      return (
        <div className="flex justify-center">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              competitor === "dylup"
                ? "bg-emerald-500"
                : competitor === "hubspot"
                  ? "bg-orange-500"
                  : competitor === "adobe"
                    ? "bg-red-500"
                    : "bg-orange-500"
            }`}
          >
            <Check className="w-4 h-4 text-white" />
          </div>
        </div>
      )
    }
    if (value === "partial") {
      return (
        <div className="flex justify-center">
          <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        </div>
      )
    }
    if (value === "no") {
      return (
        <div className="flex justify-center">
          <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
            <X className="w-4 h-4 text-white" />
          </div>
        </div>
      )
    }
    return (
      <div
        className={`text-center font-medium ${competitor === "dylup" ? "text-emerald-400" : "text-muted-foreground"}`}
      >
        {value}
      </div>
    )
  }

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-pink-500/10 border border-violet-500/20 mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full" />
            <span className="text-sm font-medium text-violet-300">The Comparison</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose Dylup Over{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">The Rest?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how Dylup outperforms industry leaders with AI-native design, faster setup, and unbeatable value.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-3xl p-8 mb-16">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-6 text-muted-foreground font-medium">Features</th>
                  <th className="text-center py-4 px-6">
                    <div className="bg-gradient-to-r from-violet-500 to-blue-500 text-white px-4 py-2 rounded-lg font-semibold">
                      Dylup
                    </div>
                  </th>
                  <th className="text-center py-4 px-6 text-muted-foreground font-medium">HubSpot</th>
                  <th className="text-center py-4 px-6 text-muted-foreground font-medium">Adobe Campaign</th>
                  <th className="text-center py-4 px-6 text-muted-foreground font-medium">Mailchimp</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-6 px-6">
                      <div>
                        <div className="font-semibold text-foreground mb-1">{feature.name}</div>
                        <div className="text-sm text-muted-foreground">{feature.description}</div>
                      </div>
                    </td>
                    <td className="py-6 px-6">{renderCell(feature.dylup, "dylup")}</td>
                    <td className="py-6 px-6">{renderCell(feature.hubspot, "hubspot")}</td>
                    <td className="py-6 px-6">{renderCell(feature.adobe, "adobe")}</td>
                    <td className="py-6 px-6">{renderCell(feature.mailchimp, "mailchimp")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">10x Faster Setup</h3>
            <p className="text-muted-foreground">
              While competitors take weeks, you're live in minutes with AI-guided onboarding.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">90% Cost Savings</h3>
            <p className="text-muted-foreground">
              Get enterprise-level features at a fraction of the cost of traditional platforms.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">AI-First Experience</h3>
            <p className="text-muted-foreground">
              Built for the AI era, not retrofitted. Every feature is designed with intelligence at its core.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Make the Switch?</h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the hundreds of teams who've already migrated from legacy platforms to Dylup's AI-powered marketing
            ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white px-8"
            >
              <Zap className="w-5 h-5 mr-2" />
              See Dylup in Action
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 px-8 bg-transparent">
              Compare Pricing
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
