import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContactsTable } from "@/components/crm/contacts-table"
import { CompaniesTable } from "@/components/crm/companies-table"
import { AudienceManagement } from "@/components/dashboard/audience-management"
import { Users, Plus, Building, Target, TrendingUp, Star } from "lucide-react"

export default function CRMPage() {
  return (
    <div className="space-y-6">
      {/* FlyUp AI panel at the top */}
      <div className="bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-violet-200/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">✨</span>
            </div>
            <h3 className="font-semibold text-foreground">FlyUp AI - CRM & Audiences</h3>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-xs bg-violet-100 text-violet-700 rounded-full">Manuel</button>
            <button className="px-3 py-1 text-xs bg-violet-500 text-white rounded-full">Semi-assisté</button>
            <button className="px-3 py-1 text-xs bg-violet-100 text-violet-700 rounded-full">Auto</button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Optimisez votre gestion de contacts avec des insights IA personnalisés
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">Scorer 247 nouveaux contacts</span>
          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">Segmenter leads chauds</span>
          <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">Prédire conversions</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">CRM & Audiences</h1>
          <p className="text-muted-foreground">Gérez vos contacts, entreprises et segments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Building className="h-4 w-4" />
            Nouvelle entreprise
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nouveau contact
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> ce mois
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads Qualifiés</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">847</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> ce mois
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Score Moyen IA</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73/100</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5</span> points
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux Conversion</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.1%</span> vs mois dernier
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="contacts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="contacts" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Contacts
          </TabsTrigger>
          <TabsTrigger value="companies" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Entreprises
          </TabsTrigger>
          <TabsTrigger value="audiences" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Audiences
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contacts" className="space-y-6">
          <ContactsTable />
        </TabsContent>

        <TabsContent value="companies" className="space-y-6">
          <CompaniesTable />
        </TabsContent>

        <TabsContent value="audiences" className="space-y-6">
          <AudienceManagement />
        </TabsContent>
      </Tabs>
    </div>
  )
}
