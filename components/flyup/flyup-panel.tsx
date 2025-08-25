"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Zap, Settings, AlertCircle, TrendingUp, Users } from "lucide-react"

interface FlyUpPanelProps {
  module: string
  className?: string
}

interface Suggestion {
  id: string
  text: string
  action: string
  priority: "high" | "medium" | "low"
}

interface Insight {
  id: string
  type: "alert" | "opportunity" | "anomaly"
  title: string
  description: string
  action?: string
}

const MODULE_SUGGESTIONS: Record<string, Suggestion[]> = {
  overview: [
    {
      id: "1",
      text: "Relancer 62 leads inactifs depuis 30 jours",
      action: "create_reactivation_campaign",
      priority: "high",
    },
    { id: "2", text: "Optimiser les campagnes avec CTR < 2%", action: "optimize_campaigns", priority: "medium" },
    {
      id: "3",
      text: "Créer segment leads chauds pour nurturing",
      action: "create_hot_leads_segment",
      priority: "medium",
    },
  ],
  crm: [
    { id: "1", text: "Segmenter automatiquement par score IA", action: "auto_segment_by_score", priority: "high" },
    {
      id: "2",
      text: "Identifier les comptes à fort potentiel",
      action: "identify_high_value_accounts",
      priority: "high",
    },
    { id: "3", text: "Nettoyer les doublons de contacts", action: "clean_duplicates", priority: "low" },
  ],
  campaigns: [
    { id: "1", text: "Générer objet email optimisé A/B", action: "generate_ab_subject", priority: "high" },
    { id: "2", text: "Programmer envoi au moment optimal", action: "schedule_optimal_time", priority: "medium" },
    {
      id: "3",
      text: "Créer séquence de nurturing automatique",
      action: "create_nurturing_sequence",
      priority: "medium",
    },
  ],
}

const MODULE_INSIGHTS: Record<string, Insight[]> = {
  overview: [
    {
      id: "1",
      type: "alert",
      title: "Baisse d'activité détectée",
      description: "15% de contacts inactifs depuis 30 jours",
      action: "Lancer campagne de réactivation",
    },
    {
      id: "2",
      type: "opportunity",
      title: "Segment haute valeur identifié",
      description: "47 contacts montrent des signaux d'achat fort",
      action: "Créer une campagne ciblée",
    },
  ],
  crm: [
    {
      id: "1",
      type: "opportunity",
      title: "Taux d'engagement en hausse",
      description: "Vos emails personnalisés génèrent 34% d'engagement en plus",
      action: "Appliquer à toutes les campagnes",
    },
  ],
}

export function FlyUpPanel({ module, className = "" }: FlyUpPanelProps) {
  const [mode, setMode] = useState<"manual" | "semi-assisted" | "automated">("manual")
  const [prompt, setPrompt] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const suggestions = MODULE_SUGGESTIONS[module] || []
  const insights = MODULE_INSIGHTS[module] || []

  const handlePromptSubmit = async () => {
    if (!prompt.trim()) return

    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setPrompt("")
  }

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setPrompt(suggestion.text)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "opportunity":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "anomaly":
        return <Users className="h-4 w-4 text-yellow-500" />
      default:
        return <Sparkles className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <Card className={`glass-card ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-primary" />
          FlyUp AI
        </CardTitle>

        <div className="flex gap-1 p-1 bg-muted rounded-lg">
          {(["manual", "semi-assisted", "automated"] as const).map((m) => (
            <Button
              key={m}
              variant={mode === m ? "default" : "ghost"}
              size="sm"
              onClick={() => setMode(m)}
              className="flex-1 text-xs"
            >
              {m === "manual" && <Settings className="h-3 w-3 mr-1" />}
              {m === "semi-assisted" && <Zap className="h-3 w-3 mr-1" />}
              {m === "automated" && <Sparkles className="h-3 w-3 mr-1" />}
              {m === "manual" ? "Manuel" : m === "semi-assisted" ? "Semi-assisté" : "Automatisé"}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Textarea
            placeholder="Décrivez ce que vous souhaitez faire..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[80px] resize-none"
          />
          <Button onClick={handlePromptSubmit} disabled={!prompt.trim() || isProcessing} className="w-full">
            {isProcessing ? "Traitement..." : "Exécuter"}
          </Button>
        </div>

        {suggestions.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Suggestions contextuelles</h4>
            <div className="space-y-2">
              {suggestions.map((suggestion) => (
                <Button
                  key={suggestion.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full justify-between text-left h-auto p-3"
                >
                  <span className="text-sm">{suggestion.text}</span>
                  <Badge className={getPriorityColor(suggestion.priority)}>{suggestion.priority}</Badge>
                </Button>
              ))}
            </div>
          </div>
        )}

        {insights.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Insights</h4>
            <div className="space-y-2">
              {insights.map((insight) => (
                <div key={insight.id} className="p-3 rounded-lg bg-muted/50 space-y-2">
                  <div className="flex items-start gap-2">
                    {getInsightIcon(insight.type)}
                    <div className="flex-1 min-w-0">
                      <h5 className="text-sm font-medium">{insight.title}</h5>
                      <p className="text-xs text-muted-foreground">{insight.description}</p>
                    </div>
                  </div>
                  {insight.action && (
                    <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                      {insight.action} →
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
