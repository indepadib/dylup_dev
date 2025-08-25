"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Eye, MessageSquare, Clock, TrendingUp, Play, UserCheck } from "lucide-react"

interface WebinarAnalyticsProps {
  webinarId: string
}

const mockAnalytics = {
  overview: {
    registrations: 247,
    attendees: 168,
    attendanceRate: 68,
    avgWatchTime: 42,
    peakViewers: 189,
    chatMessages: 156,
    questions: 23,
    pollResponses: 134,
  },
  timeline: [
    { time: "14:00", viewers: 45, event: "Début du webinaire" },
    { time: "14:05", viewers: 89, event: "Introduction" },
    { time: "14:15", viewers: 156, event: "Présentation principale" },
    { time: "14:30", viewers: 189, event: "Pic d'audience" },
    { time: "14:45", viewers: 167, event: "Q&A" },
    { time: "15:00", viewers: 134, event: "Fin du webinaire" },
  ],
  sources: [
    { source: "Email", registrations: 98, percentage: 40 },
    { source: "LinkedIn", registrations: 74, percentage: 30 },
    { source: "Site web", registrations: 49, percentage: 20 },
    { source: "Autres", registrations: 26, percentage: 10 },
  ],
  engagement: {
    chatParticipation: 45,
    questionAskers: 18,
    pollParticipation: 78,
    replayViews: 89,
  },
}

export function WebinarAnalytics({ webinarId }: WebinarAnalyticsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics Webinaire</h2>
          <p className="text-muted-foreground">Marketing Automation 2024 • 15 janvier 2024</p>
        </div>
        <Badge variant="outline" className="bg-green-100 text-green-800">
          Terminé
        </Badge>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inscrits</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.overview.registrations}</div>
            <p className="text-xs text-muted-foreground">Total des inscriptions</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.overview.attendees}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{mockAnalytics.overview.attendanceRate}%</span> taux de présence
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temps Moyen</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.overview.avgWatchTime}min</div>
            <p className="text-xs text-muted-foreground">Durée de visionnage</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pic d'Audience</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.overview.peakViewers}</div>
            <p className="text-xs text-muted-foreground">Viewers simultanés max</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="sources">Sources</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Statistiques de Participation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Taux de présence</span>
                    <span className="font-medium">{mockAnalytics.overview.attendanceRate}%</span>
                  </div>
                  <Progress value={mockAnalytics.overview.attendanceRate} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Participation au chat</span>
                    <span className="font-medium">{mockAnalytics.engagement.chatParticipation}%</span>
                  </div>
                  <Progress value={mockAnalytics.engagement.chatParticipation} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Participation aux sondages</span>
                    <span className="font-medium">{mockAnalytics.engagement.pollParticipation}%</span>
                  </div>
                  <Progress value={mockAnalytics.engagement.pollParticipation} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Interactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <MessageSquare className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{mockAnalytics.overview.chatMessages}</div>
                    <div className="text-sm text-muted-foreground">Messages chat</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Eye className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{mockAnalytics.overview.questions}</div>
                    <div className="text-sm text-muted-foreground">Questions posées</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{mockAnalytics.overview.pollResponses}</div>
                    <div className="text-sm text-muted-foreground">Réponses sondages</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Play className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{mockAnalytics.engagement.replayViews}</div>
                    <div className="text-sm text-muted-foreground">Vues replay</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Timeline de l'Audience</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalytics.timeline.map((point, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-mono">{point.time}</div>
                      <div className="text-sm">{point.event}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{point.viewers}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Sources d'Inscription</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalytics.sources.map((source, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{source.source}</span>
                      <span className="font-medium">
                        {source.registrations} ({source.percentage}%)
                      </span>
                    </div>
                    <Progress value={source.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Détails d'Engagement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Participation Active</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Ont écrit dans le chat</span>
                      <span className="font-medium">
                        {Math.round(
                          (mockAnalytics.overview.attendees * mockAnalytics.engagement.chatParticipation) / 100,
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Ont posé des questions</span>
                      <span className="font-medium">{mockAnalytics.engagement.questionAskers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Ont répondu aux sondages</span>
                      <span className="font-medium">
                        {Math.round(
                          (mockAnalytics.overview.attendees * mockAnalytics.engagement.pollParticipation) / 100,
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Post-Webinaire</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Vues du replay</span>
                      <span className="font-medium">{mockAnalytics.engagement.replayViews}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Taux de replay</span>
                      <span className="font-medium">
                        {Math.round(
                          (mockAnalytics.engagement.replayViews / mockAnalytics.overview.registrations) * 100,
                        )}
                        %
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
