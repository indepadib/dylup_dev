"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Plus, Mail, Clock, Users, GitBranch, Settings, Zap, Target, Calendar } from "lucide-react"

interface WorkflowStep {
  id: string
  type: "trigger" | "action" | "condition" | "delay"
  title: string
  description: string
  config: Record<string, any>
  position: { x: number; y: number }
}

const stepTypes = {
  trigger: {
    icon: Zap,
    color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    options: [
      { value: "signup", label: "Inscription" },
      { value: "purchase", label: "Achat" },
      { value: "abandoned_cart", label: "Panier abandonné" },
      { value: "date_based", label: "Date spécifique" },
    ],
  },
  action: {
    icon: Mail,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    options: [
      { value: "send_email", label: "Envoyer email" },
      { value: "send_sms", label: "Envoyer SMS" },
      { value: "add_tag", label: "Ajouter tag" },
      { value: "update_score", label: "Mettre à jour score" },
    ],
  },
  condition: {
    icon: GitBranch,
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
    options: [
      { value: "opened_email", label: "A ouvert l'email" },
      { value: "clicked_link", label: "A cliqué sur lien" },
      { value: "has_tag", label: "Possède le tag" },
      { value: "score_above", label: "Score supérieur à" },
    ],
  },
  delay: {
    icon: Clock,
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
    options: [
      { value: "minutes", label: "Minutes" },
      { value: "hours", label: "Heures" },
      { value: "days", label: "Jours" },
      { value: "weeks", label: "Semaines" },
    ],
  },
}

export function WorkflowBuilder() {
  const [steps, setSteps] = useState<WorkflowStep[]>([
    {
      id: "1",
      type: "trigger",
      title: "Inscription utilisateur",
      description: "Déclenché quand un utilisateur s'inscrit",
      config: { trigger_type: "signup" },
      position: { x: 100, y: 100 },
    },
  ])
  const [selectedStep, setSelectedStep] = useState<string | null>(null)
  const [workflowName, setWorkflowName] = useState("Nouveau Workflow")

  const addStep = (type: WorkflowStep["type"]) => {
    const newStep: WorkflowStep = {
      id: Date.now().toString(),
      type,
      title: `Nouvelle ${type}`,
      description: "Configuration requise",
      config: {},
      position: { x: 100, y: 100 + steps.length * 150 },
    }
    setSteps([...steps, newStep])
  }

  const getStepIcon = (type: WorkflowStep["type"]) => {
    const IconComponent = stepTypes[type].icon
    return <IconComponent className="h-4 w-4" />
  }

  const getStepColor = (type: WorkflowStep["type"]) => {
    return stepTypes[type].color
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Constructeur de Workflow</h2>
          <p className="text-muted-foreground">Créez des séquences d'automatisation intelligentes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Paramètres
          </Button>
          <Button>
            <Play className="h-4 w-4 mr-2" />
            Activer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Workflow Canvas */}
        <div className="lg:col-span-3">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Input
                    value={workflowName}
                    onChange={(e) => setWorkflowName(e.target.value)}
                    className="text-lg font-semibold border-none p-0 h-auto bg-transparent"
                  />
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>0 inscrits</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      <span>0% taux de conversion</span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline">Brouillon</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="min-h-[500px] border-2 border-dashed border-muted rounded-lg p-4 relative bg-muted/10">
                {steps.map((step, index) => (
                  <div key={step.id} className="mb-4">
                    <Card
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedStep === step.id ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setSelectedStep(step.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${getStepColor(step.type)}`}>{getStepIcon(step.type)}</div>
                          <div className="flex-1">
                            <h4 className="font-medium">{step.title}</h4>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                          </div>
                          <Badge variant="outline" className="capitalize">
                            {step.type}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>

                    {index < steps.length - 1 && (
                      <div className="flex justify-center my-2">
                        <div className="w-px h-8 bg-border"></div>
                      </div>
                    )}
                  </div>
                ))}

                {steps.length === 0 && (
                  <div className="text-center py-12">
                    <Zap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Commencez votre workflow</h3>
                    <p className="text-muted-foreground mb-4">Ajoutez un déclencheur pour commencer</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Ajouter une Étape
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(stepTypes).map(([type, config]) => (
                <Button
                  key={type}
                  variant="outline"
                  className="w-full justify-start gap-3 h-auto p-3 bg-transparent"
                  onClick={() => addStep(type as WorkflowStep["type"])}
                >
                  <div className={`p-1 rounded ${config.color}`}>
                    <config.icon className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium capitalize">{type}</div>
                    <div className="text-xs text-muted-foreground">
                      {type === "trigger" && "Déclenche le workflow"}
                      {type === "action" && "Exécute une action"}
                      {type === "condition" && "Branche conditionnelle"}
                      {type === "delay" && "Attend avant de continuer"}
                    </div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {selectedStep && (
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(() => {
                  const step = steps.find((s) => s.id === selectedStep)
                  if (!step) return null

                  return (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Titre</Label>
                        <Input
                          value={step.title}
                          onChange={(e) => {
                            setSteps(steps.map((s) => (s.id === selectedStep ? { ...s, title: e.target.value } : s)))
                          }}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Type d'action</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner..." />
                          </SelectTrigger>
                          <SelectContent>
                            {stepTypes[step.type].options.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {step.type === "delay" && (
                        <div className="space-y-2">
                          <Label>Durée</Label>
                          <div className="flex gap-2">
                            <Input type="number" placeholder="1" className="flex-1" />
                            <Select>
                              <SelectTrigger className="w-24">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="minutes">Min</SelectItem>
                                <SelectItem value="hours">H</SelectItem>
                                <SelectItem value="days">J</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })()}
              </CardContent>
            </Card>
          )}

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Statistiques
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Contacts inscrits</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Taux de completion</span>
                  <span className="font-medium">—</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Conversions</span>
                  <span className="font-medium">0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
