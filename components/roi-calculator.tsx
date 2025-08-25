"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Calculator, Building2, TrendingUp } from "lucide-react"

export function ROICalculator() {
  const [inputs, setInputs] = useState({
    companySize: "startup",
    industry: "",
    monthlySpend: 5000,
    currentTools: [] as string[],
    teamSize: 3,
  })

  const [results, setResults] = useState({
    timeSaved: 54,
    monthlySavings: 1500,
    revenueIncrease: 33,
    roiYear1: 286,
    currentCosts: 18000,
    dylupCost: 4480,
    timeSavingsValue: 12960,
    revenueIncrease: 19800,
    totalBenefit: 47280,
  })

  const calculateROI = () => {
    const baseMultiplier =
      {
        startup: 1,
        small: 1.5,
        medium: 2.5,
        enterprise: 4,
      }[inputs.companySize] || 1

    const toolSavings = inputs.currentTools.length * 200 * baseMultiplier
    const timeSavings = Math.min(inputs.teamSize * 800 * baseMultiplier, inputs.monthlySpend * 0.6)
    const revenueBoost = inputs.monthlySpend * 0.33 * baseMultiplier

    const monthlySavings = toolSavings + timeSavings / 12
    const annualSavings = monthlySavings * 12
    const dylupAnnualCost = 4480 * baseMultiplier
    const totalBenefit = annualSavings + revenueBoost * 12
    const roi = ((totalBenefit - dylupAnnualCost) / dylupAnnualCost) * 100

    setResults({
      timeSaved: Math.min(Math.round((timeSavings / (inputs.monthlySpend * 0.1)) * 100), 75),
      monthlySavings: Math.round(monthlySavings),
      revenueIncrease: Math.min(Math.round((revenueBoost / inputs.monthlySpend) * 100), 50),
      roiYear1: Math.round(roi),
      currentCosts: inputs.monthlySpend * 12,
      dylupCost: dylupAnnualCost,
      timeSavingsValue: Math.round(timeSavings),
      revenueIncrease: Math.round(revenueBoost * 12),
      totalBenefit: Math.round(totalBenefit),
    })
  }

  const handleToolChange = (tool: string, checked: boolean) => {
    setInputs((prev) => ({
      ...prev,
      currentTools: checked ? [...prev.currentTools, tool] : prev.currentTools.filter((t) => t !== tool),
    }))
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Calculator size={16} />
            <span className="text-sm font-medium">ROI Calculator</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Calculate Your <span className="text-primary">Marketing</span> <span className="text-secondary">ROI</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tell us about your business and see personalized projections of time saved, costs reduced, and revenue
            increased with Dylup's AI automation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 size={24} className="text-primary" />
                <span>Tell Us About Your Business</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-sm font-medium mb-3 block">Company Size</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "startup", label: "Startup", desc: "1-10 employees" },
                    { value: "small", label: "Small", desc: "11-50 employees" },
                    { value: "medium", label: "Medium", desc: "51-200 employees" },
                    { value: "enterprise", label: "Enterprise", desc: "200+ employees" },
                  ].map((size) => (
                    <button
                      key={size.value}
                      onClick={() => setInputs((prev) => ({ ...prev, companySize: size.value }))}
                      className={`p-3 text-left rounded-lg border transition-all ${
                        inputs.companySize === size.value
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="font-medium">{size.label}</div>
                      <div className="text-xs text-muted-foreground">{size.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="industry">Industry</Label>
                <Select
                  value={inputs.industry}
                  onValueChange={(value) => setInputs((prev) => ({ ...prev, industry: value }))}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="saas">SaaS</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="real-estate">Real Estate</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="monthlySpend">Monthly Marketing Spend</Label>
                <div className="relative mt-2">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="monthlySpend"
                    type="number"
                    value={inputs.monthlySpend}
                    onChange={(e) => setInputs((prev) => ({ ...prev, monthlySpend: Number(e.target.value) || 0 }))}
                    className="pl-8"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Current Marketing Tools (select all that apply)
                </Label>
                <div className="space-y-3">
                  {[
                    "Email Marketing (Mailchimp, Constant Contact, etc.)",
                    "CRM (HubSpot, Salesforce, etc.)",
                    "Webinar Platform (Zoom, GoToWebinar, etc.)",
                    "Marketing Automation (Zapier, Marketo, etc.)",
                  ].map((tool) => (
                    <div key={tool} className="flex items-center space-x-2">
                      <Checkbox
                        id={tool}
                        checked={inputs.currentTools.includes(tool)}
                        onCheckedChange={(checked) => handleToolChange(tool, checked as boolean)}
                      />
                      <Label htmlFor={tool} className="text-sm">
                        {tool}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">Marketing Team Size</Label>
                <div className="px-3">
                  <Slider
                    value={[inputs.teamSize]}
                    onValueChange={(value) => setInputs((prev) => ({ ...prev, teamSize: value[0] }))}
                    max={20}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>1 person</span>
                    <span className="font-medium text-primary">{inputs.teamSize} people</span>
                    <span>20+ people</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                  <TrendingUp size={16} />
                </div>
                <div>
                  <div className="text-white">Your ROI Projection</div>
                  <div className="text-sm text-slate-300 font-normal">Based on your company profile</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-teal-400 mb-1">{results.timeSaved}%</div>
                  <div className="text-sm text-slate-300">Time Saved</div>
                  <div className="text-xs text-slate-400">Per week on manual tasks</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400 mb-1">
                    ${results.monthlySavings.toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-300">Monthly Savings</div>
                  <div className="text-xs text-slate-400">Tool consolidation + efficiency</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-1">+{results.revenueIncrease}%</div>
                  <div className="text-sm text-slate-300">Revenue Increase</div>
                  <div className="text-xs text-slate-400">Better targeting & automation</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-pink-400 mb-1">{results.roiYear1}%</div>
                  <div className="text-sm text-slate-300">ROI in Year 1</div>
                  <div className="text-xs text-slate-400">Return on investment</div>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-sm font-medium text-white mb-3">Annual Impact Breakdown</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Current Tool Costs</span>
                    <span className="text-white">${results.currentCosts.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Dylup Cost</span>
                    <span className="text-teal-400">${results.dylupCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Time Savings Value</span>
                    <span className="text-blue-400">${results.timeSavingsValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Revenue Increase</span>
                    <span className="text-yellow-400">${results.revenueIncrease.toLocaleString()}</span>
                  </div>
                  <hr className="border-slate-600" />
                  <div className="flex justify-between font-bold">
                    <span className="text-white">Total Annual Benefit</span>
                    <span className="text-green-400">${results.totalBenefit.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="text-center text-sm text-slate-300 mb-4">Ready to unlock these gains?</div>

              <div className="space-y-3">
                <Button onClick={calculateROI} className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                  Start Free Trial
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                >
                  Schedule Strategy Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
