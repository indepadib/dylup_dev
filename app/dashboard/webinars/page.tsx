import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Video, Plus, Calendar, Users, Clock, TrendingUp, Eye, Settings, Play } from "lucide-react"
import Link from "next/link"

const mockWebinars = [
  {
    id: "1",
    title: "Marketing Automation 2024",
    description: "Découvrez les dernières stratégies d'automatisation marketing",
    date: "2024-01-25",
    time: "14:00",
    duration: 60,
    registrations: 247,
    attendees: 168,
    status: "completed" as const,
    speakers: ["Marie Dupont", "Jean Martin"],
  },
  {
    id: "2",
    title: "Lead Generation Avancée",
    description: "Techniques avancées pour générer des leads qualifiés",
    date: "2024-01-30",
    time: "10:00",
    duration: 90,
    registrations: 189,
    attendees: 0,
    status: "scheduled" as const,
    speakers: ["Sophie Bernard"],
  },
  {
    id: "3",
    title: "ROI du Marketing Digital",
    description: "Comment mesurer et optimiser le ROI de vos campagnes",
    date: "2024-02-05",
    time: "15:00",
    duration: 45,
    registrations: 0,
    attendees: 0,
    status: "draft" as const,
    speakers: [],
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
    case "scheduled":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
    case "draft":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    case "live":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case "completed":
      return "Terminé"
    case "scheduled":
      return "Planifié"
    case "draft":
      return "Brouillon"
    case "live":
      return "En direct"
    default:
      return status
  }
}

export default function WebinarsPage() {
  const completedWebinars = mockWebinars.filter((w) => w.status === "completed")
  const upcomingWebinars = mockWebinars.filter((w) => w.status === "scheduled")
  const draftWebinars = mockWebinars.filter((w) => w.status === "draft")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Webinaires & Événements</h1>
          <p className="text-muted-foreground">Organisez et gérez vos événements en ligne</p>
        </div>
        <Button className="gap-2" asChild>
          <Link href="/dashboard/webinars/create">
            <Plus className="h-4 w-4" />
            Nouveau webinaire
          </Link>
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Webinaires Planifiés</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingWebinars.length}</div>
            <p className="text-xs text-muted-foreground">Ce mois</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participants Inscrits</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockWebinars.reduce((sum, w) => sum + w.registrations, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+23%</span> vs mois dernier
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de Présence</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">Moyenne industrie: 45%</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Durée Moyenne</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42min</div>
            <p className="text-xs text-muted-foreground">Temps de visionnage</p>
          </CardContent>
        </Card>
      </div>

      {/* Webinars Tabs */}
      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList>
          <TabsTrigger value="upcoming">À venir ({upcomingWebinars.length})</TabsTrigger>
          <TabsTrigger value="completed">Terminés ({completedWebinars.length})</TabsTrigger>
          <TabsTrigger value="drafts">Brouillons ({draftWebinars.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingWebinars.length === 0 ? (
            <Card className="glass-card">
              <CardContent className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Aucun webinaire planifié</h3>
                <p className="text-muted-foreground mb-4">Créez votre premier webinaire pour commencer</p>
                <Button asChild>
                  <Link href="/dashboard/webinars/create">
                    <Plus className="h-4 w-4 mr-2" />
                    Créer un webinaire
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {upcomingWebinars.map((webinar) => (
                <Card key={webinar.id} className="glass-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{webinar.title}</h3>
                          <Badge className={getStatusColor(webinar.status)}>{getStatusLabel(webinar.status)}</Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{webinar.description}</p>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(webinar.date).toLocaleDateString("fr-FR")} à {webinar.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {webinar.duration} minutes
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {webinar.registrations} inscrits
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          Gérer
                        </Button>
                        <Button size="sm">
                          <Play className="h-4 w-4 mr-2" />
                          Démarrer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedWebinars.map((webinar) => (
            <Card key={webinar.id} className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{webinar.title}</h3>
                      <Badge className={getStatusColor(webinar.status)}>{getStatusLabel(webinar.status)}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{webinar.description}</p>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(webinar.date).toLocaleDateString("fr-FR")}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {webinar.attendees}/{webinar.registrations} participants
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        {Math.round((webinar.attendees / webinar.registrations) * 100)}% présence
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/webinars/analytics/${webinar.id}`}>
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Analytics
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Replay
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="drafts" className="space-y-4">
          {draftWebinars.length === 0 ? (
            <Card className="glass-card">
              <CardContent className="text-center py-12">
                <Video className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Aucun brouillon</h3>
                <p className="text-muted-foreground">Tous vos webinaires sont publiés</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {draftWebinars.map((webinar) => (
                <Card key={webinar.id} className="glass-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{webinar.title}</h3>
                          <Badge className={getStatusColor(webinar.status)}>{getStatusLabel(webinar.status)}</Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{webinar.description}</p>
                        <div className="text-sm text-muted-foreground">Configuration incomplète</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/webinars/edit/${webinar.id}`}>
                            <Settings className="h-4 w-4 mr-2" />
                            Configurer
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
