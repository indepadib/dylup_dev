"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Play,
  Plus,
  Mail,
  Clock,
  Users,
  GitBranch,
  Settings,
  Zap,
  Target,
  Calendar,
  Video,
  FileText,
  Share2,
  BarChart3,
  Workflow,
} from "lucide-react"

interface WorkflowStep {
  id: string
  module: string
  type: "trigger" | "action" | "condition" | "delay"
  title: string
  description: string
  config: Record<string, any>
  position: { x: number; y: number }
}

const moduleConfig = {
  crm: {
    icon: Users,
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    actions: [
      { value: "create_contact", label: "Créer contact" },
      { value: "update_score", label: "Mettre à jour score" },
      { value: "add_to_segment", label: "Ajouter au segment" },
      { value: "create_task", label: "Créer tâche" },
    ],
  },
  campaigns: {
    icon: Mail,
    color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    actions: [
      { value: "send_email", label: "Envoyer email" },
      { value: "create_campaign", label: "Créer campagne" },
      { value: "add_to_sequence", label: "Ajouter à séquence" },
      { value: "schedule_send", label: "Programmer envoi" },
    ],
  },
  webinars: {
    icon: Video,
    color: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
    actions: [
      { value: "register_contact", label: "Inscrire au webinaire" },
      { value: "send_reminder", label: "Envoyer rappel" },
      { value: "create_webinar", label: "Créer webinaire" },
      { value: "send_replay", label: "Envoyer replay" },
    ],
  },
  content: {
    icon: FileText,
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
    actions: [
      { value: "create_post", label: "Créer publication" },
      { value: "schedule_content", label: "Programmer contenu" },
      { value: "generate_content", label: "Générer contenu IA" },
      { value: "publish_blog", label: "Publier article" },
    ],
  },
  social: {
    icon: Share2,
    color: "bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400",
    actions: [
      { value: "post_social", label: "Publier sur réseaux" },
      { value: "schedule_post", label: "Programmer publication" },
      { value: "engage_followers", label: "Engager followers" },
      { value: "track_mentions", label: "Suivre mentions" },
    ],
  },
  analytics: {
    icon: BarChart3,
    color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400",
    actions: [
      { value: "track_event", label: "Suivre événement" },
      { value: "create_report", label: "Créer rapport" },
      { value: "send_insights", label: "Envoyer insights" },
      { value: "update_dashboard", label: "Mettre à jour dashboard" },
    ],
  },
}

const triggerTypes = [
  { value: "contact_created", label: "Contact créé", module: "crm" },
  { value: "email_opened", label: "Email ouvert", module: "campaigns" },
  { value: "webinar_registered", label: "Inscription webinaire", module: "webinars" },
  { value: "content_published", label: "Contenu publié", module: "content" },
  { value: "social_engagement", label: "Engagement social", module: "social" },
  { value: "goal_reached", label: "Objectif atteint", module: "analytics" },
]

export function CrossModuleBuilder() {
  const [steps, setSteps] = useState<WorkflowStep[]>([])
  const [selectedStep, setSelectedStep] = useState<string | null>(null)
  const [workflowName, setWorkflowName] = useState("Nouveau Workflow Cross-Module")
  const [selectedModule, setSelectedModule] = useState<string>("")

  const addStep = (module: string, type: WorkflowStep["type"]) => {
    const newStep: WorkflowStep = {
      id: Date.now().toString(),
      module,
      type,
      title: `Nouvelle action ${module}`,
      description: "Configuration requise",
      config: {},
      position: { x: 100, y: 100 + steps.length * 150 },
    }
    setSteps([...steps, newStep])
  }

  const getModuleIcon = (module: string) => {
    const config = moduleConfig[module as keyof typeof moduleConfig]
    if (!config) return <Workflow className="h-4 w-4" />
    const IconComponent = config.icon
    return <IconComponent className="h-4 w-4" />
  }

  const getModuleColor = (module: string) => {
    const config = moduleConfig[module as keyof typeof moduleConfig]
    return config?.color || "bg-gray-100 text-gray-800"
  }

  const getStepIcon = (type: WorkflowStep["type"]) => {
    switch (type) {
      case "trigger":
        return <Zap className="h-4 w-4" />
      case "action":
        return <Target className="h-4 w-4" />
      case "condition":
        return <GitBranch className="h-4 w-4" />
      case "delay":
        return <Clock className="h-4 w-4" />
      default:
        return <Settings className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Workflow Cross-Module</h2>
          <p className="text-muted-foreground">Orchestrez des automatisations complexes entre tous vos modules</p>
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
                      <span>0 exécutions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4" />
                      <span>0% taux de succès</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Workflow className="h-4 w-4" />
                      <span>{steps.length} étapes</span>
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
                          <div className={`p-2 rounded-lg ${getModuleColor(step.module)}`}>
                            {getModuleIcon(step.module)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{step.title}</h4>
                              <Badge variant="outline" className="text-xs">
                                {step.module}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="p-1 rounded bg-muted">{getStepIcon(step.type)}</div>
                            <Badge variant="secondary" className="capitalize text-xs">
                              {step.type}
                            </Badge>
                          </div>
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
                    <Workflow className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Créez votre workflow cross-module</h3>
                    <p className="text-muted-foreground mb-4">
                      Commencez par sélectionner un module et ajouter un déclencheur
                    </p>
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
                Ajouter une Action
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Module</Label>
                <Select value={selectedModule} onValueChange={setSelectedModule}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un module" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(moduleConfig).map(([key, config]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          <config.icon className="h-4 w-4" />
                          <span className="capitalize">{key}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedModule && (
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 h-auto p-3 bg-transparent"
                    onClick={() => addStep(selectedModule, "trigger")}
                  >
                    <div className="p-1 rounded bg-green-100 text-green-800">
                      <Zap className="h-4 w-4" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Déclencheur</div>
                      <div className="text-xs text-muted-foreground">Démarre le workflow</div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 h-auto p-3 bg-transparent"
                    onClick={() => addStep(selectedModule, "action")}
                  >
                    <div className="p-1 rounded bg-blue-100 text-blue-800">
                      <Target className="h-4 w-4" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Action</div>
                      <div className="text-xs text-muted-foreground">Exécute une tâche</div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 h-auto p-3 bg-transparent"
                    onClick={() => addStep(selectedModule, "condition")}
                  >
                    <div className="p-1 rounded bg-yellow-100 text-yellow-800">
                      <GitBranch className="h-4 w-4" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Condition</div>
                      <div className="text-xs text-muted-foreground">Branche conditionnelle</div>
                    </div>
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 h-auto p-3 bg-transparent"
                    onClick={() => addStep(selectedModule, "delay")}
                  >
                    <div className="p-1 rounded bg-purple-100 text-purple-800">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Délai</div>
                      <div className="text-xs text-muted-foreground">Attend avant de continuer</div>
                    </div>
                  </Button>
                </div>
              )}
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

                  const moduleActions = moduleConfig[step.module as keyof typeof moduleConfig]?.actions || []

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
                        <Label>Action</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une action..." />
                          </SelectTrigger>
                          <SelectContent>
                            {step.type === "trigger"
                              ? triggerTypes
                                  .filter((t) => t.module === step.module)
                                  .map((trigger) => (
                                    <SelectItem key={trigger.value} value={trigger.value}>
                                      {trigger.label}
                                    </SelectItem>
                                  ))
                              : moduleActions.map((action) => (
                                  <SelectItem key={action.value} value={action.value}>
                                    {action.label}
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

                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={step.description}
                          onChange={(e) => {
                            setSteps(
                              steps.map((s) => (s.id === selectedStep ? { ...s, description: e.target.value } : s)),
                            )
                          }}
                          placeholder="Décrivez cette étape..."
                        />
                      </div>
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
                  <span>Exécutions totales</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Taux de succès</span>
                  <span className="font-medium">—</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Temps moyen</span>
                  <span className="font-medium">—</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Modules impliqués</span>
                  <span className="font-medium">{new Set(steps.map((s) => s.module)).size}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
