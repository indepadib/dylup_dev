"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { FileText, Save, Send, Eye, Sparkles, Hash, Calendar, Globe, Type } from "lucide-react"

interface ContentData {
  title: string
  content: string
  excerpt: string
  type: "blog" | "social" | "email" | "landing"
  status: "draft" | "scheduled" | "published"
  tags: string[]
  seoTitle: string
  seoDescription: string
  publishDate?: Date
  socialPlatforms: {
    linkedin: boolean
    twitter: boolean
    facebook: boolean
    instagram: boolean
  }
}

export function ContentEditor() {
  const [contentData, setContentData] = useState<ContentData>({
    title: "",
    content: "",
    excerpt: "",
    type: "blog",
    status: "draft",
    tags: [],
    seoTitle: "",
    seoDescription: "",
    socialPlatforms: {
      linkedin: false,
      twitter: false,
      facebook: false,
      instagram: false,
    },
  })

  const [isGeneratingWithAI, setIsGeneratingWithAI] = useState(false)
  const [tagInput, setTagInput] = useState("")

  const handleAIGenerate = async () => {
    setIsGeneratingWithAI(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setContentData((prev) => ({
      ...prev,
      title: "Les 7 Stratégies de Marketing Automation qui Transforment les PME",
      content: `# Introduction

Le marketing automation n'est plus réservé aux grandes entreprises. Aujourd'hui, les PME peuvent également tirer parti de ces technologies pour automatiser leurs processus marketing et booster leur croissance.

## 1. Segmentation Intelligente des Contacts

La segmentation est la base de toute stratégie d'automation réussie. En divisant votre base de contacts selon des critères précis (comportement, démographie, engagement), vous pouvez créer des campagnes ultra-personnalisées.

**Avantages :**
- Taux d'ouverture +45%
- Taux de conversion +35%
- ROI amélioré de 60%

## 2. Nurturing Automatisé des Leads

Créez des séquences d'emails automatiques qui accompagnent vos prospects tout au long de leur parcours d'achat.

## 3. Scoring Prédictif des Prospects

Utilisez l'IA pour identifier automatiquement vos prospects les plus chauds et prioriser vos actions commerciales.

## Conclusion

L'automation marketing est un investissement rentable pour toute PME souhaitant optimiser ses processus et accélérer sa croissance.`,
      excerpt:
        "Découvrez comment les PME peuvent utiliser le marketing automation pour automatiser leurs processus et multiplier leur croissance par 3.",
      seoTitle: "Marketing Automation PME : 7 Stratégies pour Tripler sa Croissance",
      seoDescription:
        "Guide complet du marketing automation pour PME. 7 stratégies éprouvées pour automatiser vos processus marketing et booster vos conversions de 35%.",
      tags: ["marketing automation", "PME", "growth hacking", "lead nurturing", "conversion"],
    }))

    setIsGeneratingWithAI(false)
  }

  const addTag = () => {
    if (tagInput.trim() && !contentData.tags.includes(tagInput.trim())) {
      setContentData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }))
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setContentData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Éditeur de Contenu</h2>
          <p className="text-muted-foreground">Créez du contenu optimisé pour tous vos canaux</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleAIGenerate}
            disabled={isGeneratingWithAI}
            className="gap-2 bg-transparent"
          >
            <Sparkles className="h-4 w-4" />
            {isGeneratingWithAI ? "Génération..." : "Générer avec IA"}
          </Button>
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Aperçu
          </Button>
          <Button variant="outline">
            <Save className="h-4 w-4 mr-2" />
            Sauvegarder
          </Button>
          <Button>
            <Send className="h-4 w-4 mr-2" />
            Publier
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">Contenu</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Contenu Principal
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre</Label>
                    <Input
                      id="title"
                      value={contentData.title}
                      onChange={(e) => setContentData((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="Titre accrocheur de votre contenu..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Extrait</Label>
                    <Textarea
                      id="excerpt"
                      value={contentData.excerpt}
                      onChange={(e) => setContentData((prev) => ({ ...prev, excerpt: e.target.value }))}
                      placeholder="Résumé engageant qui donne envie de lire..."
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Contenu</Label>
                    <Textarea
                      id="content"
                      value={contentData.content}
                      onChange={(e) => setContentData((prev) => ({ ...prev, content: e.target.value }))}
                      placeholder="Rédigez votre contenu ici... (Markdown supporté)"
                      className="min-h-[400px] font-mono text-sm"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Type className="h-5 w-5" />
                    Type de Contenu
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select
                    value={contentData.type}
                    onValueChange={(value: ContentData["type"]) => setContentData((prev) => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blog">Article de Blog</SelectItem>
                      <SelectItem value="social">Post Social</SelectItem>
                      <SelectItem value="email">Email Newsletter</SelectItem>
                      <SelectItem value="landing">Landing Page</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={contentData.status}
                    onValueChange={(value: ContentData["status"]) =>
                      setContentData((prev) => ({ ...prev, status: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Brouillon</SelectItem>
                      <SelectItem value="scheduled">Programmé</SelectItem>
                      <SelectItem value="published">Publié</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hash className="h-5 w-5" />
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ajouter un tag..."
                      className="flex-1"
                    />
                    <Button onClick={addTag} size="sm">
                      Ajouter
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {contentData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                        {tag} ×
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Statistiques Prédictives</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Score SEO</span>
                      <span className="font-medium text-green-600">85/100</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Lisibilité</span>
                      <span className="font-medium text-blue-600">Bonne</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Engagement estimé</span>
                      <span className="font-medium text-purple-600">Élevé</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: "90%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Optimisation SEO
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seoTitle">Titre SEO</Label>
                <Input
                  id="seoTitle"
                  value={contentData.seoTitle}
                  onChange={(e) => setContentData((prev) => ({ ...prev, seoTitle: e.target.value }))}
                  placeholder="Titre optimisé pour les moteurs de recherche..."
                />
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="outline">{contentData.seoTitle.length}/60</Badge>
                  {contentData.seoTitle.length > 60 && (
                    <span className="text-yellow-600">Titre trop long - risque de troncature</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="seoDescription">Meta Description</Label>
                <Textarea
                  id="seoDescription"
                  value={contentData.seoDescription}
                  onChange={(e) => setContentData((prev) => ({ ...prev, seoDescription: e.target.value }))}
                  placeholder="Description qui apparaîtra dans les résultats de recherche..."
                  className="min-h-[100px]"
                />
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="outline">{contentData.seoDescription.length}/160</Badge>
                  {contentData.seoDescription.length > 160 && (
                    <span className="text-yellow-600">Description trop longue - risque de troncature</span>
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Aperçu Google</h4>
                <div className="p-4 border rounded-lg bg-muted/20">
                  <div className="text-blue-600 text-lg hover:underline cursor-pointer">
                    {contentData.seoTitle || contentData.title || "Titre de votre contenu"}
                  </div>
                  <div className="text-green-600 text-sm">https://votre-site.com/blog/article</div>
                  <div className="text-gray-600 text-sm mt-1">
                    {contentData.seoDescription || contentData.excerpt || "Description de votre contenu..."}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Diffusion Sociale
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Plateformes de publication</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-sm font-bold">
                        in
                      </div>
                      <div>
                        <div className="font-medium">LinkedIn</div>
                        <div className="text-sm text-muted-foreground">Réseau professionnel</div>
                      </div>
                    </div>
                    <Switch
                      checked={contentData.socialPlatforms.linkedin}
                      onCheckedChange={(checked) =>
                        setContentData((prev) => ({
                          ...prev,
                          socialPlatforms: { ...prev.socialPlatforms, linkedin: checked },
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-400 rounded flex items-center justify-center text-white text-sm font-bold">
                        T
                      </div>
                      <div>
                        <div className="font-medium">Twitter</div>
                        <div className="text-sm text-muted-foreground">Microblogging</div>
                      </div>
                    </div>
                    <Switch
                      checked={contentData.socialPlatforms.twitter}
                      onCheckedChange={(checked) =>
                        setContentData((prev) => ({
                          ...prev,
                          socialPlatforms: { ...prev.socialPlatforms, twitter: checked },
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-700 rounded flex items-center justify-center text-white text-sm font-bold">
                        f
                      </div>
                      <div>
                        <div className="font-medium">Facebook</div>
                        <div className="text-sm text-muted-foreground">Réseau social</div>
                      </div>
                    </div>
                    <Switch
                      checked={contentData.socialPlatforms.facebook}
                      onCheckedChange={(checked) =>
                        setContentData((prev) => ({
                          ...prev,
                          socialPlatforms: { ...prev.socialPlatforms, facebook: checked },
                        }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded flex items-center justify-center text-white text-sm font-bold">
                        IG
                      </div>
                      <div>
                        <div className="font-medium">Instagram</div>
                        <div className="text-sm text-muted-foreground">Contenu visuel</div>
                      </div>
                    </div>
                    <Switch
                      checked={contentData.socialPlatforms.instagram}
                      onCheckedChange={(checked) =>
                        setContentData((prev) => ({
                          ...prev,
                          socialPlatforms: { ...prev.socialPlatforms, instagram: checked },
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Aperçu des posts</h4>
                {contentData.socialPlatforms.linkedin && (
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
                        in
                      </div>
                      <span className="font-medium text-sm">LinkedIn</span>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">{contentData.title}</p>
                      <p className="text-muted-foreground mt-1">{contentData.excerpt}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Paramètres de Publication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Date de publication</Label>
                <Input type="datetime-local" />
              </div>

              <div className="space-y-2">
                <Label>Catégorie</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="automation">Automation</SelectItem>
                    <SelectItem value="growth">Growth Hacking</SelectItem>
                    <SelectItem value="strategy">Stratégie</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Auteur</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un auteur" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marie">Marie Dupont</SelectItem>
                    <SelectItem value="jean">Jean Martin</SelectItem>
                    <SelectItem value="sophie">Sophie Bernard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
