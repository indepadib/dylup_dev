import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnalyticsDashboard } from "@/components/dashboard/analytics-dashboard"
import { AdvancedReports } from "@/components/analytics/advanced-reports"
import { PredictiveInsights } from "@/components/analytics/predictive-insights"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="reports">Rapports Avancés</TabsTrigger>
          <TabsTrigger value="insights">Insights IA</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <AnalyticsDashboard />
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <AdvancedReports />
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <PredictiveInsights />
        </TabsContent>
      </Tabs>
    </div>
  )
}
