'use client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Video, Calendar as CalendarIcon, Users, Settings, Mail, Globe, Clock, Mic, Eye, Save, Send, Sparkles } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface WebinarData {
  title: string
  description: string
  date: Date | undefined
  time: string
  duration: number
  capacity: number
  speakers: Speaker[]
  settings: WebinarSettings
  landingPage: LandingPageConfig
  emailSequence: EmailConfig[]
}

interface Speaker {
  id: string
  name: string
  title: string
  bio: string
  avatar?: string
}

interface WebinarSettings {
  requireRegistration: boolean
  allowQuestions: boolean
  enableChat: boolean
  recordSession: boolean
  sendReminders: boolean
  autoGenerateReplay: boolean
}

interface LandingPageConfig {
  headline: string
  subheadline: string
  benefits: string[]
  ctaText: string
  showSpeakers: boolean
  showAgenda: boolean
}

interface EmailConfig {
  type: "invitation" | "reminder-1" | "reminder-2" | "replay"
  subject: string
  timing: string
  enabled: boolean
}

function WebinarBuilder() {
  const [webinarData, setWebinarData] = useState<WebinarData>({
    title: "",
    description: "",
    date: undefined,
    time: "14:00",
    duration: 60,
    capacity: 100,
    speakers: [],
    settings: {
      requireRegistration: true,
      allowQuestions: true,
      enableChat: true,
      recordSession: true,
      sendReminders: true,
      autoGenerateReplay: true,
    },
    landingPage: {
      headline: "",
      subheadline: "",
      benefits: [],
      ctaText: "S'inscrire maintenant",
      showSpeakers: true,
      showAgenda: true,
    },
    emailSequence: [
      { type: "invitation", subject: "", timing: "Immédiatement", enabled: true },
      { type: "reminder-1", subject: "", timing: "24h avant", enabled: true },
      { type: "reminder-2", subject: "", timing: "1h avant", enabled: true },
      { type: "replay", subject: "", timing: "2h après", enabled: true },
    ],
  })

  const [isGeneratingWithAI, setIsGeneratingWithAI] = useState(false)

  const handleAIGenerate = async () => {
    setIsGeneratingWithAI(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setWebinarData((prev) => ({
      ...prev,
      title: "Marketing Automation : Stratégies Avancées pour 2024",
      description:
        "Découvrez les dernières techniques d'automatisation marketing pour booster vos conversions et optimiser votre ROI. Session interactive avec études de cas pratiques.",
      landingPage: {
        ...prev.landingPage,
        headline: "Maîtrisez l'Art du Marketing Automation",
        subheadline:
          "Rejoignez plus de 1000 marketeurs qui ont transformé leur approche grâce à nos stratégies éprouvées",
        benefits: [
          "Automatisez 80% de vos tâches marketing répétitives",
          "Augmentez vos conversions de 35% en moyenne",
          "Créez des parcours clients personnalisés et efficaces",
          "Optimisez votre ROI avec des campagnes intelligentes",
        ],
      },
      emailSequence: prev.emailSequence.map((email) => ({
        ...email,
        subject:
          email.type === "invitation"
            ? "🚀 Transformez votre marketing avec l'automation"
            : email.type === "reminder-1"
              ? "⏰ Demain : Webinaire Marketing Automation"
              : email.type === "reminder-2"
                ? "🔴 LIVE dans 1h : Rejoignez-nous maintenant"
                : "📹 Replay disponible : Marketing Automation Masterclass",
      })),
    }))

    setIsGeneratingWithAI(false)
  }

  const addSpeaker = () => {
    const newSpeaker: Speaker = {
      id: Date.now().toString(),
      name: "",
      title: "",
      bio: "",
    }
    setWebinarData((prev) => ({
      ...prev,
      speakers: [...prev.speakers, newSpeaker],
    }))
  }

  const updateSpeaker = (id: string, field: keyof Speaker, value: string) => {
    setWebinarData((prev) => ({
      ...prev,
      speakers: prev.speakers.map((speaker) => (speaker.id === id ? { ...speaker, [field]: value } : speaker)),
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Créateur de Webinaire</h2>
          <p className="text-muted-foreground">Configurez votre événement en ligne de A à Z</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleAIGenerate}
            disabled={isGeneratingWithAI}
            className="gap-2 bg-transparent"
          >
            <Sparkles className="h-4 w-4" />
            {isGeneratingWithAI ? "Génération..." : "Générer avec IA"}
          </Button>
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Aperçu
          </Button>
          <Button variant="outline">
            <Save className="h-4 w-4 mr-2" />
            Sauvegarder
          </Button>
          <Button>
            <Send className="h-4 w-4 mr-2" />
            Publier
          </Button>
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="details">Détails</TabsTrigger>
          <TabsTrigger value="speakers">Intervenants</TabsTrigger>
          <TabsTrigger value="landing">Landing Page</TabsTrigger>
          <TabsTrigger value="emails">Emails</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Informations Générales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre du webinaire</Label>
                  <Input
                    id="title"
                    value={webinarData.title}
                    onChange={(e) => setWebinarData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Ex: Marketing Automation pour les PME"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={webinarData.description}
                    onChange={(e) => setWebinarData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Décrivez le contenu et les objectifs de votre webinaire..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Durée (minutes)</Label>
                    <Select
                      value={webinarData.duration.toString()}
                      onValueChange={(value) =>
                        setWebinarData((prev) => ({ ...prev, duration: Number.parseInt(value) }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">1 heure</SelectItem>
                        <SelectItem value="90">1h30</SelectItem>
                        <SelectItem value="120">2 heures</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Capacité</Label>
                    <Select
                      value={webinarData.capacity.toString()}
                      onValueChange={(value) =>
                        setWebinarData((prev) => ({ ...prev, capacity: Number.parseInt(value) }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">50 participants</SelectItem>
                        <SelectItem value="100">100 participants</SelectItem>
                        <SelectItem value="250">250 participants</SelectItem>
                        <SelectItem value="500">500 participants</SelectItem>
                        <SelectItem value="1000">1000 participants</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Planification
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Date du webinaire</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {webinarData.date ? format(webinarData.date, "PPP", { locale: fr }) : "Sélectionner une date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={webinarData.date}
                        onSelect={(date) => setWebinarData((prev) => ({ ...prev, date }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Heure de début</Label>
                  <Input
                    id="time"
                    type="time"
                    value={webinarData.time}
                    onChange={(e) => setWebinarData((prev) => ({ ...prev, time: e.target.value }))}
                  />
                </div>

                <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">Récapitulatif</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {webinarData.date && webinarData.time ? (
                      <>
                        <p>Date: {format(webinarData.date, "EEEE d MMMM yyyy", { locale: fr })}</p>
                        <p>Heure: {webinarData.time}</p>
                        <p>Durée: {webinarData.duration} minutes</p>
                        <p>Capacité: {webinarData.capacity} participants</p>
                      </>
                    ) : (
                      <p>Veuillez sélectionner une date et une heure</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="speakers" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Mic className="h-5 w-5" />
                  Intervenants ({webinarData.speakers.length})
                </CardTitle>
                <Button onClick={addSpeaker} size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Ajouter un intervenant
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {webinarData.speakers.length === 0 ? (
                <div className="text-center py-8">
                  <Mic className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Aucun intervenant</h3>
                  <p className="text-muted-foreground mb-4">Ajoutez des intervenants pour enrichir votre webinaire</p>
                  <Button onClick={addSpeaker}>
                    <Users className="h-4 w-4 mr-2" />
                    Ajouter le premier intervenant
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {webinarData.speakers.map((speaker, index) => (
                    <Card key={speaker.id} className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Nom complet</Label>
                            <Input
                              value={speaker.name}
                              onChange={(e) => updateSpeaker(speaker.id, "name", e.target.value)}
                              placeholder="Ex: Marie Dupont"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Titre/Fonction</Label>
                            <Input
                              value={speaker.title}
                              onChange={(e) => updateSpeaker(speaker.id, "title", e.target.value)}
                              placeholder="Ex: Directrice Marketing"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Biographie</Label>
                          <Textarea
                            value={speaker.bio}
                            onChange={(e) => updateSpeaker(speaker.id, "bio", e.target.value)}
                            placeholder="Présentez l'expertise de l'intervenant..."
                            className="min-h-[100px]"
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="landing" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Configuration Landing Page
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Titre principal</Label>
                  <Input
                    value={webinarData.landingPage.headline}
                    onChange={(e) =>
                      setWebinarData((prev) => ({
                        ...prev,
                        landingPage: { ...prev.landingPage, headline: e.target.value },
                      }))
                    }
                    placeholder="Titre accrocheur pour votre webinaire"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Sous-titre</Label>
                  <Textarea
                    value={webinarData.landingPage.subheadline}
                    onChange={(e) =>
                      setWebinarData((prev) => ({
                        ...prev,
                        landingPage: { ...prev.landingPage, subheadline: e.target.value },
                      }))
                    }
                    placeholder="Description engageante qui incite à l'inscription"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Bénéfices (un par ligne)</Label>
                  <Textarea
                    value={webinarData.landingPage.benefits.join("\n")}
                    onChange={(e) =>
                      setWebinarData((prev) => ({
                        ...prev,
                        landingPage: { ...prev.landingPage, benefits: e.target.value.split("\n").filter(Boolean) },
                      }))
                    }
                    placeholder="• Bénéfice 1&#10;• Bénéfice 2&#10;• Bénéfice 3"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Texte du bouton CTA</Label>
                  <Input
                    value={webinarData.landingPage.ctaText}
                    onChange={(e) =>
                      setWebinarData((prev) => ({
                        ...prev,
                        landingPage: { ...prev.landingPage, ctaText: e.target.value },
                      }))
                    }
                    placeholder="S'inscrire maintenant"
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Afficher les intervenants</Label>
                    <Switch
                      checked={webinarData.landingPage.showSpeakers}
                      onCheckedChange={(checked) =>
                        setWebinarData((prev) => ({
                          ...prev,
                          landingPage: { ...prev.landingPage, showSpeakers: checked },
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Afficher l'agenda</Label>
                    <Switch
                      checked={webinarData.landingPage.showAgenda}
                      onCheckedChange={(checked) =>
                        setWebinarData((prev) => ({
                          ...prev,
                          landingPage: { ...prev.landingPage, showAgenda: checked },
                        }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Aperçu Landing Page
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-6 bg-white min-h-[400px]">
                  <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold text-gray-900">
                      {webinarData.landingPage.headline || "Titre de votre webinaire"}
                    </h1>
                    <p className="text-gray-600">
                      {webinarData.landingPage.subheadline || "Description engageante de votre événement"}
                    </p>

                    {webinarData.landingPage.benefits.length > 0 && (
                      <div className="text-left max-w-md mx-auto space-y-2">
                        {webinarData.landingPage.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-gray-700">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-4">
                      <Button className="bg-primary hover:bg-primary/90">{webinarData.landingPage.ctaText}</Button>
                    </div>

                    {webinarData.date && webinarData.time && (
                      <div className="pt-4 text-sm text-gray-500">
                        📅 {format(webinarData.date, "EEEE d MMMM yyyy", { locale: fr })} à {webinarData.time}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="emails" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Séquence d'Emails Automatique
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {webinarData.emailSequence.map((email, index) => (
                  <Card key={email.type} className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Badge variant={email.enabled ? "default" : "secondary"}>
                          {email.type === "invitation" && "Invitation"}
                          {email.type === "reminder-1" && "Rappel -24h"}
                          {email.type === "reminder-2" && "Rappel -1h"}
                          {email.type === "replay" && "Replay"}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{email.timing}</span>
                      </div>
                      <Switch
                        checked={email.enabled}
                        onCheckedChange={(checked) => {
                          const newSequence = [...webinarData.emailSequence]
                          newSequence[index].enabled = checked
                          setWebinarData((prev) => ({ ...prev, emailSequence: newSequence }))
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Objet de l'email</Label>
                      <Input
                        value={email.subject}
                        onChange={(e) => {
                          const newSequence = [...webinarData.emailSequence]
                          newSequence[index].subject = e.target.value
                          setWebinarData((prev) => ({ ...prev, emailSequence: newSequence }))
                        }}
                        placeholder="Objet accrocheur pour cet email"
                        disabled={!email.enabled}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Paramètres du Webinaire
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Inscription obligatoire</Label>
                    <p className="text-sm text-muted-foreground">Les participants doivent s'inscrire pour accéder</p>
                  </div>
                  <Switch
                    checked={webinarData.settings.requireRegistration}
                    onCheckedChange={(checked) =>
                      setWebinarData((prev) => ({
                        ...prev,
                        settings: { ...prev.settings, requireRegistration: checked },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Questions & Réponses</Label>
                    <p className="text-sm text-muted-foreground">Permettre aux participants de poser des questions</p>
                  </div>
                  <Switch
                    checked={webinarData.settings.allowQuestions}
                    onCheckedChange={(checked) =>
                      setWebinarData((prev) => ({
                        ...prev,
                        settings: { ...prev.settings, allowQuestions: checked },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Chat en direct</Label>
                    <p className="text-sm text-muted-foreground">Activer le chat pendant le webinaire</p>
                  </div>
                  <Switch
                    checked={webinarData.settings.enableChat}
                    onCheckedChange={(checked) =>
                      setWebinarData((prev) => ({
                        ...prev,
                        settings: { ...prev.settings, enableChat: checked },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enregistrement automatique</Label>
                    <p className="text-sm text-muted-foreground">Enregistrer la session automatiquement</p>
                  </div>
                  <Switch
                    checked={webinarData.settings.recordSession}
                    onCheckedChange={(checked) =>
                      setWebinarData((prev) => ({
                        ...prev,
                        settings: { ...prev.settings, recordSession: checked },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Rappels automatiques</Label>
                    <p className="text-sm text-muted-foreground">Envoyer des rappels par email</p>
                  </div>
                  <Switch
                    checked={webinarData.settings.sendReminders}
                    onCheckedChange={(checked) =>
                      setWebinarData((prev) => ({
                        ...prev,
                        settings: { ...prev.settings, sendReminders: checked },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Replay automatique</Label>
                    <p className="text-sm text-muted-foreground">Générer et envoyer le replay automatiquement</p>
                  </div>
                  <Switch
                    checked={webinarData.settings.autoGenerateReplay}
                    onCheckedChange={(checked) =>
                      setWebinarData((prev) => ({
                        ...prev,
                        settings: { ...prev.settings, autoGenerateReplay: checked },
                      }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function WebinarsPage() {
  return <WebinarBuilder />
}

