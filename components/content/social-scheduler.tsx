"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Clock, Send, Plus, Edit, Trash2, Eye, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

interface SocialPost {
  id: string
  content: string
  platforms: string[]
  scheduledDate: Date
  status: "scheduled" | "published" | "failed"
  engagement?: {
    likes: number
    shares: number
    comments: number
  }
}

const mockPosts: SocialPost[] = [
  {
    id: "1",
    content:
      "🚀 Découvrez comment automatiser 80% de vos tâches marketing avec notre nouveau guide ! #MarketingAutomation #Growth",
    platforms: ["linkedin", "twitter"],
    scheduledDate: new Date("2024-01-25T14:00:00"),
    status: "scheduled",
  },
  {
    id: "2",
    content:
      "Les 5 erreurs à éviter en marketing automation 👇\n\n1. Ne pas segmenter ses contacts\n2. Oublier la personnalisation\n3. Négliger les tests A/B\n4. Ignorer les métriques\n5. Automatiser sans stratégie",
    platforms: ["linkedin", "facebook"],
    scheduledDate: new Date("2024-01-24T10:30:00"),
    status: "published",
    engagement: {
      likes: 47,
      shares: 12,
      comments: 8,
    },
  },
]

const platforms = [
  { id: "linkedin", name: "LinkedIn", color: "bg-blue-600", icon: "in" },
  { id: "twitter", name: "Twitter", color: "bg-blue-400", icon: "T" },
  { id: "facebook", name: "Facebook", color: "bg-blue-700", icon: "f" },
  { id: "instagram", name: "Instagram", color: "bg-gradient-to-r from-purple-500 to-pink-500", icon: "IG" },
]

export function SocialScheduler() {
  const [posts, setPosts] = useState<SocialPost[]>(mockPosts)
  const [newPost, setNewPost] = useState({
    content: "",
    platforms: [] as string[],
    scheduledDate: new Date(),
    time: "14:00",
  })
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "published":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "scheduled":
        return "Programmé"
      case "published":
        return "Publié"
      case "failed":
        return "Échec"
      default:
        return status
    }
  }

  const togglePlatform = (platformId: string) => {
    setNewPost((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platformId)
        ? prev.platforms.filter((p) => p !== platformId)
        : [...prev.platforms, platformId],
    }))
  }

  const schedulePost = () => {
    const post: SocialPost = {
      id: Date.now().toString(),
      content: newPost.content,
      platforms: newPost.platforms,
      scheduledDate: new Date(`${format(newPost.scheduledDate, "yyyy-MM-dd")}T${newPost.time}`),
      status: "scheduled",
    }

    setPosts([post, ...posts])
    setNewPost({
      content: "",
      platforms: [],
      scheduledDate: new Date(),
      time: "14:00",
    })
  }

  const deletePost = (id: string) => {
    setPosts(posts.filter((post) => post.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Planificateur Social</h2>
          <p className="text-muted-foreground">Programmez et gérez vos publications sur tous vos réseaux</p>
        </div>
      </div>

      <Tabs defaultValue="schedule" className="space-y-6">
        <TabsList>
          <TabsTrigger value="schedule">Programmer</TabsTrigger>
          <TabsTrigger value="calendar">Calendrier</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* New Post Form */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Nouveau Post
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Contenu</label>
                  <Textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost((prev) => ({ ...prev, content: e.target.value }))}
                    placeholder="Rédigez votre post..."
                    className="min-h-[120px]"
                  />
                  <div className="text-xs text-muted-foreground text-right">
                    {newPost.content.length}/280 caractères
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Plateformes</label>
                  <div className="grid grid-cols-2 gap-2">
                    {platforms.map((platform) => (
                      <Button
                        key={platform.id}
                        variant={newPost.platforms.includes(platform.id) ? "default" : "outline"}
                        size="sm"
                        onClick={() => togglePlatform(platform.id)}
                        className="justify-start gap-2"
                      >
                        <div
                          className={`w-5 h-5 ${platform.color} rounded text-white text-xs flex items-center justify-center`}
                        >
                          {platform.icon}
                        </div>
                        {platform.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {format(newPost.scheduledDate, "PPP", { locale: fr })}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={newPost.scheduledDate}
                          onSelect={(date) => date && setNewPost((prev) => ({ ...prev, scheduledDate: date }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Heure</label>
                    <Input
                      type="time"
                      value={newPost.time}
                      onChange={(e) => setNewPost((prev) => ({ ...prev, time: e.target.value }))}
                    />
                  </div>
                </div>

                <Button
                  onClick={schedulePost}
                  disabled={!newPost.content || newPost.platforms.length === 0}
                  className="w-full"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Programmer le post
                </Button>
              </CardContent>
            </Card>

            {/* Posts List */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Posts Programmés ({posts.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div key={post.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm">{post.content}</p>
                          <div className="flex items-center gap-2 mt-2">
                            {post.platforms.map((platformId) => {
                              const platform = platforms.find((p) => p.id === platformId)
                              return platform ? (
                                <div
                                  key={platformId}
                                  className={`w-5 h-5 ${platform.color} rounded text-white text-xs flex items-center justify-center`}
                                >
                                  {platform.icon}
                                </div>
                              ) : null
                            })}
                            <Badge className={getStatusColor(post.status)}>{getStatusLabel(post.status)}</Badge>
                          </div>
                        </div>
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
                            <DropdownMenuItem className="text-destructive" onClick={() => deletePost(post.id)}>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          {format(post.scheduledDate, "PPP à HH:mm", { locale: fr })}
                        </div>
                        {post.engagement && (
                          <div className="flex items-center gap-3">
                            <span>❤️ {post.engagement.likes}</span>
                            <span>🔄 {post.engagement.shares}</span>
                            <span>💬 {post.engagement.comments}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {posts.length === 0 && (
                    <div className="text-center py-8">
                      <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">Aucun post programmé</h3>
                      <p className="text-muted-foreground">Créez votre premier post pour commencer</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Calendrier Editorial</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
                <div className="space-y-4">
                  <h4 className="font-medium">
                    Posts du {selectedDate ? format(selectedDate, "PPP", { locale: fr }) : "jour sélectionné"}
                  </h4>
                  <div className="space-y-2">
                    {posts
                      .filter((post) => {
                        if (!selectedDate) return false
                        return format(post.scheduledDate, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
                      })
                      .map((post) => (
                        <div key={post.id} className="p-3 border rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{format(post.scheduledDate, "HH:mm")}</span>
                            <Badge className={getStatusColor(post.status)} size="sm">
                              {getStatusLabel(post.status)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">{post.content}</p>
                        </div>
                      ))}
                    {posts.filter((post) => {
                      if (!selectedDate) return false
                      return format(post.scheduledDate, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
                    }).length === 0 && (
                      <p className="text-muted-foreground text-sm">Aucun post programmé pour cette date</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Posts Publiés</CardTitle>
                <Send className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{posts.filter((p) => p.status === "published").length}</div>
                <p className="text-xs text-muted-foreground">Ce mois</p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engagement Moyen</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.2%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+0.8%</span> vs mois dernier
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Meilleure Heure</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">14h-16h</div>
                <p className="text-xs text-muted-foreground">Pic d'engagement</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
