"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
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
  AreaChart,
  Area,
} from "recharts"
import { TrendingUp, TrendingDown, Mail, DollarSign, MousePointer, Eye, Download } from "lucide-react"
import { useAuth } from "@/lib/auth"
import {
  getAnalyticsMetrics,
  getCampaignPerformanceData,
  getAudienceGrowthData,
  getTopCampaigns,
  getDeviceBreakdown,
} from "@/lib/supabase/client-queries"

const timeRanges = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "1y", label: "Last year" },
]

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("30d")
  const [loading, setLoading] = useState(true)
  const [metrics, setMetrics] = useState<any>(null)
  const [campaignData, setCampaignData] = useState<any[]>([])
  const [audienceData, setAudienceData] = useState<any[]>([])
  const [topCampaigns, setTopCampaigns] = useState<any[]>([])
  const [deviceData, setDeviceData] = useState<any[]>([])
  const { user } = useAuth()

  useEffect(() => {
    async function fetchAnalytics() {
      if (!user?.id) return

      try {
        setLoading(true)
        const [metricsData, campaignPerformance, audienceGrowth, topCampaignsData, deviceBreakdown] = await Promise.all(
          [
            getAnalyticsMetrics(user.id, timeRange),
            getCampaignPerformanceData(user.id, timeRange),
            getAudienceGrowthData(user.id, timeRange),
            getTopCampaigns(user.id, 4),
            getDeviceBreakdown(user.id),
          ],
        )

        setMetrics(metricsData)
        setCampaignData(campaignPerformance)
        setAudienceData(audienceGrowth)
        setTopCampaigns(topCampaignsData)
        setDeviceData(deviceBreakdown)
      } catch (error) {
        console.error("Error fetching analytics:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [user?.id, timeRange])

  const overviewMetrics = metrics
    ? [
        {
          title: "Total Revenue",
          value: `$${metrics.totalRevenue.toLocaleString()}`,
          change: "+18.2%", // This would be calculated from previous period
          trend: "up" as const,
          icon: DollarSign,
          description: "Revenue from email campaigns",
        },
        {
          title: "Email Sent",
          value: metrics.totalSent.toLocaleString(),
          change: "+12.5%",
          trend: "up" as const,
          icon: Mail,
          description: "Total emails delivered",
        },
        {
          title: "Open Rate",
          value: `${metrics.openRate}%`,
          change: "+2.1%",
          trend: "up" as const,
          icon: Eye,
          description: "Average open rate",
        },
        {
          title: "Click Rate",
          value: `${metrics.clickRate}%`,
          change: "-0.3%",
          trend: "down" as const,
          icon: MousePointer,
          description: "Average click-through rate",
        },
      ]
    : []

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-80 bg-muted rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-1">Deep insights into your marketing performance</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
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
          <Button variant="outline" className="bg-transparent">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewMetrics.map((metric, index) => (
          <Card key={index} className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
              <metric.icon size={16} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <div className="flex items-center space-x-1 text-xs mt-1">
                {metric.trend === "up" ? (
                  <TrendingUp size={12} className="text-green-500" />
                ) : (
                  <TrendingDown size={12} className="text-red-500" />
                )}
                <span className={metric.trend === "up" ? "text-green-500" : "text-red-500"}>{metric.change}</span>
                <span className="text-muted-foreground">vs last period</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign Performance */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={campaignData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Bar dataKey="sent" fill="hsl(var(--muted))" radius={4} />
                <Bar dataKey="opened" fill="hsl(var(--primary))" radius={4} />
                <Bar dataKey="clicked" fill="hsl(var(--secondary))" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Trend */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={campaignData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Audience Growth */}
        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <CardTitle>Audience Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={audienceData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Line
                  type="monotone"
                  dataKey="subscribers"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="active"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--secondary))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Device Breakdown */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Device Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {deviceData.map((device, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: device.color }} />
                    <span>{device.name}</span>
                  </div>
                  <span className="font-medium">{device.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Campaigns */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Top Performing Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topCampaigns.map((campaign, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-foreground">{campaign.name}</h4>
                    <Badge variant={campaign.status === "active" ? "default" : "secondary"} className="text-xs">
                      {campaign.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{campaign.sent.toLocaleString()} recipients</p>
                </div>
                <div className="grid grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-lg font-bold text-primary">{campaign.openRate}%</div>
                    <div className="text-xs text-muted-foreground">Open Rate</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-secondary">{campaign.clickRate}%</div>
                    <div className="text-xs text-muted-foreground">Click Rate</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">${campaign.revenue.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Revenue</div>
                  </div>
                  <div>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {topCampaigns.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Mail size={32} className="mx-auto mb-2 opacity-50" />
              <p>No campaign data available yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
