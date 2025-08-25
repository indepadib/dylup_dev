"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-secondary/20 text-secondary-foreground px-4 py-2 rounded-full mb-8">
            <Sparkles size={16} className="text-primary" />
            <span className="text-sm font-medium">AI-Powered Marketing Automation</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Transform Your
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {" "}
              Marketing{" "}
            </span>
            with AI
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            DYLUP combines powerful automation with intelligent AI to help you create, manage, and optimize marketing
            campaigns that drive real results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-lg px-8 py-4 cursor-pointer z-10 relative"
              onClick={() => {
                console.log("[v0] Start Free Trial button clicked")
                window.location.href = "/auth/signup"
              }}
            >
              Start Free Trial
              <ArrowRight size={20} className="ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4 bg-transparent cursor-pointer z-10 relative"
              onClick={() => {
                console.log("[v0] Watch Demo button clicked")
                // Add demo functionality here
              }}
            >
              Watch Demo
            </Button>
          </div>

          <div className="glass-card rounded-2xl p-8 max-w-3xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[12px] border-b-primary ml-1"></div>
                </div>
                <p className="text-muted-foreground">Interactive Platform Preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
