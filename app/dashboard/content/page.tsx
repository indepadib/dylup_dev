import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus, Calendar, TrendingUp, Edit, Eye, MoreHorizontal, Clock } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

const mockContent = [
  {
    id: "1",
    title: "Les 7 Stratégies de Marketing Automation qui Transforment les PME",
    type: "blog",
    status: "published",
    publishedAt: "2024-01-20",
    views: 1247,
    engagement: 4.2,
    author: "Marie Dupont",
  },
  {
    id: "2",
    title: "Guide Complet : Lead Scoring avec l'IA",
    type: "blog",
    status: "draft",
    publishedAt: null,
    views: 0,
    engagement: 0,
    author: "Jean Martin",
  },
  {
    id: "3",
    title: "🚀 Automatisez 80% de vos tâches marketing",
    type: "social",
    status: "scheduled",
    publishedAt: "2024-01-25",
    views: 0,
    engagement: 0,
    author: "Sophie Bernard",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "published":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
    case "scheduled":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
    case "draft":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case "published":
      return "Publié"
    case "scheduled":
      return "Programmé"
    case "draft":
      return "Brouillon"
    default:
      return status
  }
}

const getTypeLabel = (type: string) => {
  switch (type) {
    case "blog":
      return "Article"
    case "social":
      return "Post Social"
    case "email":
      return "Email"
    case "landing":
      return "Landing Page"
    default:
      return type
  }
}

export default function ContentPage() {
  const publishedContent = mockContent.filter((c) => c.status === "published")
  const draftContent = mockContent.filter((c) => c.status === "draft")
  const scheduledContent = mockContent.filter((c) => c.status === "scheduled")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Content Hub</h1>
          <p className="text-muted-foreground">Créez et gérez votre contenu marketing</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/content/social">
              <Calendar className="h-4 w-4 mr-2" />
              Planificateur Social
            </Link>
          </Button>
          <Button className="gap-2" asChild>
            <Link href="/dashboard/content/editor">
              <Plus className="h-4 w-4" />
              Nouveau contenu
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Articles SEO</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedContent.filter((c) => c.type === "blog").length}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3</span> cette semaine
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Posts Sociaux</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockContent.filter((c) => c.type === "social").length}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12</span> cette semaine
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Planifiés</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduledContent.length}</div>
            <p className="text-xs text-muted-foreground">7 prochains jours</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+23%</div>
            <p className="text-xs text-muted-foreground">Engagement moyen</p>
          </CardContent>
        </Card>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">Tout ({mockContent.length})</TabsTrigger>
          <TabsTrigger value="published">Publié ({publishedContent.length})</TabsTrigger>
          <TabsTrigger value="scheduled">Programmé ({scheduledContent.length})</TabsTrigger>
          <TabsTrigger value="drafts">Brouillons ({draftContent.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="space-y-4">
            {mockContent.map((content) => (
              <Card key={content.id} className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{content.title}</h3>
                        <Badge variant="outline">{getTypeLabel(content.type)}</Badge>
                        <Badge className={getStatusColor(content.status)}>{getStatusLabel(content.status)}</Badge>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span>Par {content.author}</span>
                        {content.publishedAt && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {content.status === "scheduled" ? "Programmé pour le " : "Publié le "}
                            {new Date(content.publishedAt).toLocaleDateString("fr-FR")}
                          </div>
                        )}
                        {content.status === "published" && (
                          <>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {content.views.toLocaleString()} vues
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-4 w-4" />
                              {content.engagement}% engagement
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {content.status === "draft" && (
                        <Button size="sm" asChild>
                          <Link href={`/dashboard/content/editor/${content.id}`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Éditer
                          </Link>
                        </Button>
                      )}
                      {content.status === "published" && (
                        <Button variant="outline" size="sm">
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Analytics
                        </Button>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Aperçu
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem>Dupliquer</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Supprimer</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="published" className="space-y-4">
          <div className="space-y-4">
            {publishedContent.map((content) => (
              <Card key={content.id} className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{content.title}</h3>
                        <Badge variant="outline">{getTypeLabel(content.type)}</Badge>
                        <Badge className={getStatusColor(content.status)}>{getStatusLabel(content.status)}</Badge>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span>Par {content.author}</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Publié le {new Date(content.publishedAt!).toLocaleDateString("fr-FR")}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {content.views.toLocaleString()} vues
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4" />
                          {content.engagement}% engagement
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Analytics
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Voir en ligne
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem>Dupliquer</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          {scheduledContent.length === 0 ? (
            <Card className="glass-card">
              <CardContent className="text-center py-12">
                <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Aucun contenu programmé</h3>
                <p className="text-muted-foreground mb-4">
                  Planifiez vos publications pour maintenir une présence régulière
                </p>
                <Button asChild>
                  <Link href="/dashboard/content/editor">
                    <Plus className="h-4 w-4 mr-2" />
                    Créer du contenu
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {scheduledContent.map((content) => (
                <Card key={content.id} className="glass-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{content.title}</h3>
                          <Badge variant="outline">{getTypeLabel(content.type)}</Badge>
                          <Badge className={getStatusColor(content.status)}>{getStatusLabel(content.status)}</Badge>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <span>Par {content.author}</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Programmé pour le {new Date(content.publishedAt!).toLocaleDateString("fr-FR")}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" asChild>
                          <Link href={`/dashboard/content/editor/${content.id}`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Modifier
                          </Link>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Aperçu
                            </DropdownMenuItem>
                            <DropdownMenuItem>Publier maintenant</DropdownMenuItem>
                            <DropdownMenuItem>Dupliquer</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Annuler</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="drafts" className="space-y-4">
          {draftContent.length === 0 ? (
            <Card className="glass-card">
              <CardContent className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Aucun brouillon</h3>
                <p className="text-muted-foreground">Tous vos contenus sont publiés</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {draftContent.map((content) => (
                <Card key={content.id} className="glass-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{content.title}</h3>
                          <Badge variant="outline">{getTypeLabel(content.type)}</Badge>
                          <Badge className={getStatusColor(content.status)}>{getStatusLabel(content.status)}</Badge>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <span>Par {content.author}</span>
                          <span>Dernière modification il y a 2 heures</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" asChild>
                          <Link href={`/dashboard/content/editor/${content.id}`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Continuer l'édition
                          </Link>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Aperçu
                            </DropdownMenuItem>
                            <DropdownMenuItem>Dupliquer</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Supprimer</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
