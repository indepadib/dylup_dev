"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Users,
  Mail,
  TrendingUp,
  ArrowUpRight,
  Activity,
  AlertCircle,
  Zap,
  Target,
  Calendar,
  UserPlus,
  Lightbulb,
  BarChart3,
  Sparkles,
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { useAuth } from "@/lib/auth"
import { getDashboardMetrics, getRecentCampaigns } from "@/lib/supabase/client-queries"

interface DashboardMetrics {
  totalContacts: number
  activeCampaigns: number
  openRate: string
  totalRevenue: number
}

interface Campaign {
  id: string
  name: string
  status: string
  created_at: string
  delivered_count: number
  opened_count: number
  clicked_count: number
}

const weeklyPerformanceData = [
  { name: "Lun", emails: 25, conversions: 5 },
  { name: "Mar", emails: 32, conversions: 8 },
  { name: "Mer", emails: 28, conversions: 6 },
  { name: "Jeu", emails: 45, conversions: 12 },
  { name: "Ven", emails: 38, conversions: 10 },
  { name: "Sam", emails: 22, conversions: 4 },
  { name: "Dim", emails: 15, conversions: 2 },
]

const automationWorkflows = [
  { name: "Scoring Automatique", type: "Scoring", executions: 67, status: "active" },
  { name: "Nurturing Leads Tièdes", type: "Nurturing", executions: 32, status: "active" },
  { name: "Onboarding Nouveaux Clients", type: "Onboarding", executions: 15, status: "active" },
]

const recentActivities = [
  {
    type: "campaign",
    title: "Campagne 'Offre Spéciale' lancée",
    time: "Il y a 2 heures",
    icon: Mail,
  },
  {
    type: "contacts",
    title: "5 nouveaux contacts ajoutés",
    time: "Il y a 4 heures",
    icon: UserPlus,
  },
  {
    type: "automation",
    title: "Séquence de nurturing activée",
    time: "Hier",
    icon: Zap,
  },
  {
    type: "webinar",
    title: "Webinaire planifié pour demain",
    time: "Il y a 1 jour",
    icon: Calendar,
  },
]

const suggestedActions = [
  {
    title: "Optimiser campagne email",
    description: "Améliorer le taux d'ouverture de 15%",
    icon: Target,
    color: "text-blue-500",
  },
  {
    title: "Créer segment leads chauds",
    description: "23 contacts prêts à convertir",
    icon: Users,
    color: "text-green-500",
  },
  {
    title: "Planifier webinaire",
    description: "Moment optimal détecté",
    icon: Calendar,
    color: "text-purple-500",
  },
]

const quickActions = [
  {
    title: "Nouvelle campagne",
    description: "Email, social ou pub",
    icon: Mail,
    color: "bg-blue-500",
  },
  {
    title: "Ajouter contact",
    description: "Import ou manuel",
    icon: UserPlus,
    color: "bg-green-500",
  },
  {
    title: "Planifier webinaire",
    description: "Avec landing page",
    icon: Calendar,
    color: "bg-purple-500",
  },
  {
    title: "Automatisation IA",
    description: "Séquence intelligente",
    icon: Sparkles,
    color: "bg-orange-500",
  },
]

export function DashboardOverview() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [recentCampaigns, setRecentCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    async function fetchDashboardData() {
      if (!user?.id) return

      try {
        console.log("[v0] Fetching dashboard data for user:", user.id)
        const [metricsData, campaignsData] = await Promise.all([
          getDashboardMetrics(user.id),
          getRecentCampaigns(user.id),
        ])

        console.log("[v0] Dashboard data fetched successfully")
        setMetrics(metricsData)
        setRecentCampaigns(campaignsData)
        setError(null)
      } catch (error) {
        console.error("[v0] Error fetching dashboard data:", error)
        setError("Unable to load dashboard data. Please make sure the database tables are set up.")
        setMetrics({
          totalContacts: 5,
          activeCampaigns: 1,
          openRate: "34",
          totalRevenue: 0,
        })
        setRecentCampaigns([])
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [user?.id])

  const metricsCards = [
    {
      title: "Contacts",
      value: metrics?.totalContacts.toString() || "0",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Campagnes actives",
      value: metrics?.activeCampaigns.toString() || "0",
      change: "+8%",
      trend: "up",
      icon: Mail,
      color: "text-green-500",
    },
    {
      title: "Automatisations",
      value: "3",
      change: "+25%",
      trend: "up",
      icon: Zap,
      color: "text-purple-500",
    },
    {
      title: "Conversions",
      value: "72",
      change: "+15%",
      trend: "up",
      icon: TrendingUp,
      color: "text-orange-500",
    },
  ]

  if (error && metrics?.totalContacts === 0) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Bienvenue ! Voici ce qui se passe avec vos campagnes.</p>
          </div>
        </div>

        <Card className="glass-card">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertCircle size={48} className="text-yellow-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Configuration de la base de données requise</h3>
            <p className="text-muted-foreground text-center mb-4 max-w-md">{error}</p>
            <p className="text-sm text-muted-foreground text-center mb-6">
              Veuillez exécuter les scripts SQL dans le dossier /scripts pour créer les tables de base de données
              requises :
            </p>
            <div className="text-sm text-muted-foreground space-y-1 mb-6">
              <div>• scripts/02-create-audiences-table.sql</div>
              <div>• scripts/03-create-campaigns-table.sql</div>
              <div>• scripts/04-create-workflows-table.sql</div>
              <div>• scripts/05-create-billing-table.sql</div>
            </div>
            <Button onClick={() => window.location.reload()} className="bg-primary hover:bg-primary/90">
              Réessayer le chargement du tableau de bord
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-48 mb-2"></div>
          <div className="h-4 bg-muted rounded w-96"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-foreground">Bonjour ! 👋</h1>
            <p className="text-muted-foreground truncate">Votre assistant IA FlyUp a analysé vos données</p>
          </div>
        </div>
        <Button className="bg-primary hover:bg-primary/90 mt-4 sm:mt-0 flex-shrink-0">
          <UserPlus size={16} className="mr-2" />
          Nouveau contact
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricsCards.map((metric, index) => (
          <Card key={index} className="glass-card overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    index === 0
                      ? "bg-blue-100 dark:bg-blue-900"
                      : index === 1
                        ? "bg-green-100 dark:bg-green-900"
                        : index === 2
                          ? "bg-purple-100 dark:bg-purple-900"
                          : "bg-orange-100 dark:bg-orange-900"
                  }`}
                >
                  <metric.icon className={`w-5 h-5 ${metric.color}`} />
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                  <div className="flex items-center justify-end space-x-1 text-xs">
                    <ArrowUpRight size={12} className="text-green-500" />
                    <span className="text-green-500">{metric.change}</span>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <div className="text-sm font-medium text-muted-foreground truncate">{metric.title}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* AI Recommendations - Fixed text overflow */}
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center space-y-0 pb-4">
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <CardTitle className="truncate">Recommandation IA du jour</CardTitle>
                  <p className="text-sm text-muted-foreground truncate">Analyses et recommandations personnalisées</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <h4 className="font-medium text-green-800 dark:text-green-200 truncate">
                    Taux d'engagement en hausse
                  </h4>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300 mb-3 break-words">
                  Vos emails personnalisés génèrent 34% d'engagement en plus
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-green-600 border-green-200 hover:bg-green-50 bg-transparent w-full sm:w-auto"
                >
                  <span className="truncate">Appliquer à toutes les campagnes →</span>
                </Button>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 truncate">
                    Segment haute valeur identifié
                  </h4>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-3 break-words">
                  47 contacts montrent des signaux d'achat fort
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent w-full sm:w-auto"
                >
                  <span className="truncate">Créer une campagne ciblée →</span>
                </Button>
              </div>

              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
                  <h4 className="font-medium text-orange-800 dark:text-orange-200 truncate">
                    Baisse d'activité détectée
                  </h4>
                </div>
                <p className="text-sm text-orange-700 dark:text-orange-300 mb-3 break-words">
                  15% de contacts inactifs depuis 30 jours
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-orange-600 border-orange-200 hover:bg-orange-50 bg-transparent w-full sm:w-auto"
                >
                  <span className="truncate">Lancer campagne de réactivation →</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Performance Chart */}
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center space-y-0 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <CardTitle>Performance hebdomadaire</CardTitle>
                  <p className="text-sm text-muted-foreground">Emails envoyés vs conversions</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Bar dataKey="emails" fill="#3b82f6" radius={4} />
                  <Bar dataKey="conversions" fill="#10b981" radius={4} />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-center space-x-6 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Emails</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Conversions</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity - Fixed text overflow */}
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center space-y-0 pb-4">
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <Activity className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <CardTitle className="truncate">Activité récente</CardTitle>
                  <p className="text-sm text-muted-foreground truncate">Dernières actions sur votre compte</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activity.type === "campaign"
                          ? "bg-blue-100 dark:bg-blue-900"
                          : activity.type === "contacts"
                            ? "bg-green-100 dark:bg-green-900"
                            : activity.type === "automation"
                              ? "bg-purple-100 dark:bg-purple-900"
                              : "bg-orange-100 dark:bg-orange-900"
                      }`}
                    >
                      <activity.icon
                        className={`w-4 h-4 ${
                          activity.type === "campaign"
                            ? "text-blue-600 dark:text-blue-400"
                            : activity.type === "contacts"
                              ? "text-green-600 dark:text-green-400"
                              : activity.type === "automation"
                                ? "text-purple-600 dark:text-purple-400"
                                : "text-orange-600 dark:text-orange-400"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{activity.title}</p>
                      <p className="text-sm text-muted-foreground truncate">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Automations - Fixed text overflow */}
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <Zap className="w-5 h-5 text-purple-500 flex-shrink-0" />
                <CardTitle className="truncate">Automatisations</CardTitle>
              </div>
              <Button variant="ghost" size="sm" className="text-primary flex-shrink-0">
                Voir tout
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {automationWorkflows.map((workflow, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-foreground text-sm truncate flex-1">{workflow.name}</h4>
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{workflow.type}</p>
                    <p className="text-xs text-muted-foreground truncate">{workflow.executions} exécutions</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Insights - Fixed text overflow */}
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center space-y-0 pb-4">
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <Sparkles className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <CardTitle className="truncate">Insights</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <h4 className="font-medium text-red-800 dark:text-red-200 text-sm truncate">
                    Baisse d'activité détectée
                  </h4>
                </div>
                <p className="text-xs text-red-700 dark:text-red-300 mb-2 break-words">
                  15% de contacts inactifs depuis 30 jours
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent text-xs h-7 w-full"
                >
                  <span className="truncate">Lancer campagne de réactivation →</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
