"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Mail,
  DollarSign,
  Download,
  Filter,
  Users,
  Target,
  Zap,
  BarChart3,
  Activity,
} from "lucide-react"

const reportTypes = [
  { value: "overview", label: "Vue d'ensemble", icon: BarChart3 },
  { value: "campaigns", label: "Campagnes", icon: Mail },
  { value: "audiences", label: "Audiences", icon: Users },
  { value: "revenue", label: "Revenus", icon: DollarSign },
  { value: "engagement", label: "Engagement", icon: Activity },
  { value: "conversion", label: "Conversions", icon: Target },
]

const timeRanges = [
  { value: "7d", label: "7 derniers jours" },
  { value: "30d", label: "30 derniers jours" },
  { value: "90d", label: "3 derniers mois" },
  { value: "6m", label: "6 derniers mois" },
  { value: "1y", label: "Dernière année" },
  { value: "custom", label: "Période personnalisée" },
]

// Mock data for comprehensive analytics
const campaignFunnelData = [
  { stage: "Envoyés", value: 10000, percentage: 100 },
  { stage: "Livrés", value: 9800, percentage: 98 },
  { stage: "Ouverts", value: 3920, percentage: 40 },
  { stage: "Cliqués", value: 588, percentage: 6 },
  { stage: "Convertis", value: 118, percentage: 1.2 },
]

const audienceSegmentData = [
  { name: "Nouveaux clients", value: 35, color: "#8b5cf6" },
  { name: "Clients fidèles", value: 28, color: "#06b6d4" },
  { name: "Prospects chauds", value: 22, color: "#10b981" },
  { name: "Inactifs", value: 15, color: "#f59e0b" },
]

const revenueByChannelData = [
  { channel: "Email", revenue: 45000, campaigns: 12, roi: 340 },
  { channel: "Social", revenue: 28000, campaigns: 8, roi: 280 },
  { channel: "Webinaires", revenue: 35000, campaigns: 5, roi: 420 },
  { channel: "Contenu", revenue: 18000, campaigns: 15, roi: 190 },
]

const engagementTrendData = [
  { date: "Jan", opens: 42, clicks: 6.2, unsubscribes: 0.8 },
  { date: "Fév", opens: 45, clicks: 6.8, unsubscribes: 0.6 },
  { date: "Mar", opens: 38, clicks: 5.9, unsubscribes: 1.2 },
  { date: "Avr", opens: 48, clicks: 7.1, unsubscribes: 0.4 },
  { date: "Mai", opens: 52, clicks: 8.3, unsubscribes: 0.5 },
  { date: "Jun", opens: 49, clicks: 7.8, unsubscribes: 0.7 },
]

export function AdvancedReports() {
  const [selectedReport, setSelectedReport] = useState("overview")
  const [timeRange, setTimeRange] = useState("30d")
  const [showFilters, setShowFilters] = useState(false)

  const renderOverviewReport = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">ROI Moyen</p>
                <p className="text-2xl font-bold text-green-600">324%</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp size={12} className="mr-1" />
                  +18% vs période précédente
                </p>
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <TrendingUp className="text-green-600" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Taux Conversion</p>
                <p className="text-2xl font-bold text-primary">1.18%</p>
                <p className="text-xs text-red-600 flex items-center">
                  <TrendingDown size={12} className="mr-1" />
                  -0.2% vs période précédente
                </p>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="text-primary" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Score Engagement</p>
                <p className="text-2xl font-bold text-blue-600">8.7/10</p>
                <p className="text-xs text-blue-600 flex items-center">
                  <TrendingUp size={12} className="mr-1" />
                  +0.3 vs période précédente
                </p>
              </div>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Zap className="text-blue-600" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Croissance Audience</p>
                <p className="text-2xl font-bold text-purple-600">+12.5%</p>
                <p className="text-xs text-purple-600 flex items-center">
                  <TrendingUp size={12} className="mr-1" />
                  +2.1% vs période précédente
                </p>
              </div>
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Users className="text-purple-600" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Funnel */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="mr-2" size={20} />
            Entonnoir de Conversion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaignFunnelData.map((stage, index) => (
              <div key={stage.stage} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{stage.stage}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">{stage.value.toLocaleString()}</span>
                    <Badge variant="outline">{stage.percentage}%</Badge>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
                    style={{ width: `${stage.percentage}%` }}
                  />
                </div>
                {index < campaignFunnelData.length - 1 && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-muted-foreground/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Revenue by Channel */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Revenus par Canal</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueByChannelData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="channel" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )

  const renderEngagementReport = () => (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Tendances d'Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={engagementTrendData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="opens"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                name="Taux d'ouverture (%)"
              />
              <Line
                type="monotone"
                dataKey="clicks"
                stroke="hsl(var(--secondary))"
                strokeWidth={3}
                name="Taux de clic (%)"
              />
              <Line type="monotone" dataKey="unsubscribes" stroke="#ef4444" strokeWidth={2} name="Désabonnements (%)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Segmentation Audience</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={audienceSegmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {audienceSegmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {audienceSegmentData.map((segment, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }} />
                    <span>{segment.name}</span>
                  </div>
                  <span className="font-medium">{segment.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Performance par Canal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueByChannelData.map((channel, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{channel.channel}</h4>
                    <Badge variant="outline">{channel.campaigns} campagnes</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Revenus:</span>
                      <span className="ml-2 font-medium text-green-600">${channel.revenue.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">ROI:</span>
                      <span className="ml-2 font-medium text-primary">{channel.roi}%</span>
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

  const renderReportContent = () => {
    switch (selectedReport) {
      case "overview":
        return renderOverviewReport()
      case "engagement":
        return renderEngagementReport()
      case "campaigns":
        return <div className="text-center py-8 text-muted-foreground">Rapport campagnes en développement</div>
      case "audiences":
        return <div className="text-center py-8 text-muted-foreground">Rapport audiences en développement</div>
      case "revenue":
        return <div className="text-center py-8 text-muted-foreground">Rapport revenus en développement</div>
      case "conversion":
        return <div className="text-center py-8 text-muted-foreground">Rapport conversions en développement</div>
      default:
        return renderOverviewReport()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Rapports Avancés</h2>
          <p className="text-muted-foreground">Analyses approfondies et insights personnalisés</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="bg-transparent">
            <Filter size={16} className="mr-2" />
            Filtres
          </Button>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button className="bg-primary hover:bg-primary/90">
            <Download size={16} className="mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div>
                <Label htmlFor="campaign-filter">Campagne</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les campagnes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les campagnes</SelectItem>
                    <SelectItem value="email">Email uniquement</SelectItem>
                    <SelectItem value="social">Social uniquement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="audience-filter">Audience</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les audiences" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les audiences</SelectItem>
                    <SelectItem value="new">Nouveaux clients</SelectItem>
                    <SelectItem value="loyal">Clients fidèles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="date-from">Date de début</Label>
                <Input type="date" id="date-from" />
              </div>
              <div>
                <Label htmlFor="date-to">Date de fin</Label>
                <Input type="date" id="date-to" />
              </div>
              <div className="flex items-end">
                <Button variant="outline" className="w-full bg-transparent">
                  Appliquer les filtres
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Report Type Selector */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {reportTypes.map((type) => (
          <Button
            key={type.value}
            variant={selectedReport === type.value ? "default" : "outline"}
            onClick={() => setSelectedReport(type.value)}
            className="flex flex-col items-center p-4 h-auto bg-transparent"
          >
            <type.icon size={20} className="mb-2" />
            <span className="text-sm">{type.label}</span>
          </Button>
        ))}
      </div>

      {/* Report Content */}
      {renderReportContent()}
    </div>
  )
}
