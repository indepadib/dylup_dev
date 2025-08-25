"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area, Tooltip, Legend } from "recharts"
import {
  TrendingUp,
  Brain,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Users,
  Mail,
  DollarSign,
  ArrowRight,
} from "lucide-react"

// Mock predictive data
const predictiveData = [
  { month: "Jan", actual: 45000, predicted: null, confidence: null },
  { month: "Fév", actual: 52000, predicted: null, confidence: null },
  { month: "Mar", actual: 48000, predicted: null, confidence: null },
  { month: "Avr", actual: 58000, predicted: null, confidence: null },
  { month: "Mai", actual: 62000, predicted: null, confidence: null },
  { month: "Jun", actual: 59000, predicted: 61000, confidence: 85 },
  { month: "Jul", actual: null, predicted: 65000, confidence: 82 },
  { month: "Aoû", actual: null, predicted: 68000, confidence: 78 },
  { month: "Sep", actual: null, predicted: 71000, confidence: 75 },
  { month: "Oct", actual: null, predicted: 74000, confidence: 72 },
]

const insights = [
  {
    type: "opportunity",
    icon: TrendingUp,
    title: "Opportunité de croissance détectée",
    description: "Vos campagnes email du mardi génèrent 34% plus d'engagement",
    action: "Programmer plus de campagnes le mardi",
    impact: "Augmentation estimée: +15% d'engagement",
    confidence: 92,
    priority: "high",
  },
  {
    type: "warning",
    icon: AlertTriangle,
    title: "Baisse d'engagement prévue",
    description: "Risque de désengagement dans le segment 'Clients inactifs'",
    action: "Lancer une campagne de réactivation",
    impact: "Prévention de 23% de désabonnements",
    confidence: 87,
    priority: "medium",
  },
  {
    type: "success",
    icon: CheckCircle,
    title: "Objectif de revenus en bonne voie",
    description: "Vous êtes sur la bonne voie pour atteindre +20% de revenus ce trimestre",
    action: "Maintenir la stratégie actuelle",
    impact: "Objectif atteint à 89%",
    confidence: 94,
    priority: "low",
  },
  {
    type: "optimization",
    icon: Zap,
    title: "Optimisation de l'heure d'envoi",
    description: "Vos audiences sont plus actives entre 14h et 16h",
    action: "Ajuster les heures d'envoi automatiquement",
    impact: "Amélioration estimée: +8% taux d'ouverture",
    confidence: 89,
    priority: "medium",
  },
]

const recommendations = [
  {
    category: "Audience",
    icon: Users,
    title: "Segmenter les nouveaux abonnés",
    description: "Créer un parcours d'onboarding personnalisé pour les 847 nouveaux abonnés",
    estimatedImpact: "+25% engagement",
    effort: "Moyen",
    timeframe: "2 semaines",
  },
  {
    category: "Contenu",
    icon: Mail,
    title: "Optimiser les lignes d'objet",
    description: "Utiliser l'IA pour générer des variantes A/B de vos lignes d'objet",
    estimatedImpact: "+12% taux d'ouverture",
    effort: "Faible",
    timeframe: "1 semaine",
  },
  {
    category: "Revenus",
    icon: DollarSign,
    title: "Campagne de reconquête",
    description: "Cibler les 1,234 clients inactifs avec une offre spéciale",
    estimatedImpact: "+$18,500 revenus",
    effort: "Élevé",
    timeframe: "3 semaines",
  },
]

export function PredictiveInsights() {
  const [selectedInsight, setSelectedInsight] = useState<number | null>(null)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100 dark:bg-red-900/20"
      case "medium":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
      case "low":
        return "text-green-600 bg-green-100 dark:bg-green-900/20"
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-900/20"
    }
  }

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case "Faible":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "Moyen":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "Élevé":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <Brain className="mr-2 text-primary" size={24} />
            Insights Prédictifs
          </h2>
          <p className="text-muted-foreground">Intelligence artificielle pour optimiser vos performances</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Zap size={16} className="mr-2" />
          Appliquer toutes les recommandations
        </Button>
      </div>

      {/* Predictive Chart */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2" size={20} />
            Prédictions de Revenus
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={predictiveData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="actual"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.3}
                name="Revenus réels"
              />
              <Area
                type="monotone"
                dataKey="predicted"
                stroke="hsl(var(--secondary))"
                fill="hsl(var(--secondary))"
                fillOpacity={0.2}
                strokeDasharray="5 5"
                name="Prédictions"
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Prédiction pour le prochain trimestre</p>
                <p className="text-sm text-muted-foreground">Basée sur les tendances actuelles et l'historique</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">+18.5%</p>
                <p className="text-sm text-muted-foreground">Croissance prévue</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="mr-2" size={20} />
              Insights IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedInsight === index ? "border-primary bg-primary/5" : "border-border bg-muted/30"
                  }`}
                  onClick={() => setSelectedInsight(selectedInsight === index ? null : index)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${getPriorityColor(insight.priority)}`}>
                      <insight.icon size={16} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">{insight.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {insight.confidence}% confiance
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                      {selectedInsight === index && (
                        <div className="space-y-2 pt-2 border-t">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Action recommandée:</span>
                            <span className="font-medium">{insight.action}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Impact estimé:</span>
                            <span className="font-medium text-green-600">{insight.impact}</span>
                          </div>
                          <Button size="sm" className="w-full mt-2">
                            Appliquer cette recommandation
                            <ArrowRight size={14} className="ml-2" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2" size={20} />
              Recommandations Prioritaires
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <rec.icon size={16} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">{rec.title}</h4>
                        <Badge className={getEffortColor(rec.effort)}>{rec.effort}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-muted-foreground">Impact:</span>
                          <span className="ml-1 font-medium text-green-600">{rec.estimatedImpact}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Délai:</span>
                          <span className="ml-1 font-medium">{rec.timeframe}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="w-full mt-3 bg-transparent">
                        <Clock size={14} className="mr-2" />
                        Planifier cette action
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
