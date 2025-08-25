import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Megaphone, Plus, DollarSign, Target, TrendingUp } from "lucide-react"

export default function AdsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-violet-200/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">✨</span>
            </div>
            <h3 className="font-semibold text-foreground">FlyUp AI - Ads Manager</h3>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-xs bg-violet-100 text-violet-700 rounded-full">Manuel</button>
            <button className="px-3 py-1 text-xs bg-violet-500 text-white rounded-full">Semi-assisté</button>
            <button className="px-3 py-1 text-xs bg-violet-100 text-violet-700 rounded-full">Auto</button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Optimisez vos campagnes publicitaires avec l'intelligence artificielle
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">Optimiser budget LinkedIn</span>
          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">Améliorer CTR Meta</span>
          <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">Créer audiences similaires</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Ads Manager</h1>
          <p className="text-muted-foreground">Gérez vos campagnes publicitaires multi-plateformes</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nouvelle campagne
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€12,450</div>
            <p className="text-xs text-muted-foreground">Ce mois</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impressions</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4M</div>
            <p className="text-xs text-muted-foreground">+18% vs mois dernier</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CTR Moyen</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground">Au-dessus de la moyenne</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROAS</CardTitle>
            <Megaphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2x</div>
            <p className="text-xs text-muted-foreground">Retour sur investissement</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Campagnes Actives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">Lead Gen B2B - LinkedIn</h4>
                  <p className="text-sm text-muted-foreground truncate">€2,450 • CTR: 4.1%</p>
                </div>
                <Button variant="outline" size="sm" className="flex-shrink-0 ml-3 bg-transparent">
                  Gérer
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">Retargeting - Meta</h4>
                  <p className="text-sm text-muted-foreground truncate">€1,890 • CTR: 2.8%</p>
                </div>
                <Button variant="outline" size="sm" className="flex-shrink-0 ml-3 bg-transparent">
                  Gérer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Performance par Plateforme</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">Graphique de performance à implémenter</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
