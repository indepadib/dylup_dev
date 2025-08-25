"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Eye, Send, Save, Smartphone, Monitor, Palette, Type, ImageIcon, Link, Sparkles, Mail } from "lucide-react"

interface EmailEditorProps {
  campaignId?: string
  initialData?: {
    subject: string
    preheader: string
    content: string
  }
}

export function EmailEditor({ campaignId, initialData }: EmailEditorProps) {
  const [subject, setSubject] = useState(initialData?.subject || "")
  const [preheader, setPreheader] = useState(initialData?.preheader || "")
  const [content, setContent] = useState(initialData?.content || "")
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop")
  const [isGeneratingWithAI, setIsGeneratingWithAI] = useState(false)

  const handleAIGenerate = async () => {
    setIsGeneratingWithAI(true)
    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setContent(`
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <h1 style="color: #6b5b9a; text-align: center;">Boostez vos ventes avec notre offre spéciale !</h1>
        <p>Cher(e) client(e),</p>
        <p>Nous avons une offre exceptionnelle pour vous ! Profitez de <strong>30% de réduction</strong> sur tous nos produits premium.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="#" style="background: #6b5b9a; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Profiter de l'offre</a>
        </div>
        <p>Cette offre est valable jusqu'au 31 janvier 2024.</p>
        <p>Cordialement,<br>L'équipe DYLUP</p>
      </div>
    `)
    setIsGeneratingWithAI(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Éditeur d'Email</h2>
          <p className="text-muted-foreground">Créez et personnalisez votre campagne email</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setPreviewMode(previewMode === "desktop" ? "mobile" : "desktop")}>
            {previewMode === "desktop" ? <Smartphone className="h-4 w-4 mr-2" /> : <Monitor className="h-4 w-4 mr-2" />}
            {previewMode === "desktop" ? "Vue Mobile" : "Vue Desktop"}
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
            Envoyer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor Panel */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="h-5 w-5" />
                Paramètres de l'Email
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Objet de l'email</Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Entrez l'objet de votre email..."
                />
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="outline">{subject.length}/100</Badge>
                  {subject.length > 50 && <span className="text-yellow-600">Objet long - risque de troncature</span>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preheader">Texte de prévisualisation</Label>
                <Input
                  id="preheader"
                  value={preheader}
                  onChange={(e) => setPreheader(e.target.value)}
                  placeholder="Texte affiché dans la prévisualisation..."
                />
                <div className="text-xs text-muted-foreground">
                  Ce texte apparaît après l'objet dans la boîte de réception
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Contenu de l'Email
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAIGenerate}
                  disabled={isGeneratingWithAI}
                  className="gap-2 bg-transparent"
                >
                  <Sparkles className="h-4 w-4" />
                  {isGeneratingWithAI ? "Génération..." : "Générer avec IA"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="html" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="html">HTML</TabsTrigger>
                  <TabsTrigger value="visual">Éditeur Visuel</TabsTrigger>
                  <TabsTrigger value="blocks">Blocs</TabsTrigger>
                </TabsList>

                <TabsContent value="html" className="space-y-4">
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Entrez le contenu HTML de votre email..."
                    className="min-h-[400px] font-mono text-sm"
                  />
                </TabsContent>

                <TabsContent value="visual" className="space-y-4">
                  <div className="border rounded-lg p-4 min-h-[400px] bg-muted/20">
                    <p className="text-center text-muted-foreground">Éditeur visuel à implémenter</p>
                  </div>
                </TabsContent>

                <TabsContent value="blocks" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                      <Type className="h-6 w-6" />
                      Texte
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                      <ImageIcon className="h-6 w-6" />
                      Image
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                      <Link className="h-6 w-6" />
                      Bouton
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                      <Separator className="h-6 w-6" />
                      Séparateur
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Aperçu {previewMode === "desktop" ? "Desktop" : "Mobile"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`border rounded-lg overflow-hidden ${previewMode === "mobile" ? "max-w-[320px] mx-auto" : ""}`}
              >
                {/* Email Header Preview */}
                <div className="bg-muted p-3 border-b text-sm">
                  <div className="font-medium truncate">{subject || "Objet de l'email"}</div>
                  <div className="text-muted-foreground text-xs truncate">
                    {preheader || "Texte de prévisualisation"}
                  </div>
                </div>

                {/* Email Content Preview */}
                <div className="p-4 bg-white min-h-[300px]">
                  {content ? (
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                  ) : (
                    <div className="text-center text-muted-foreground py-12">
                      <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Votre contenu apparaîtra ici</p>
                    </div>
                  )}
                </div>
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
                  <span>Taux d'ouverture estimé</span>
                  <span className="font-medium">24.5%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "24.5%" }}></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Taux de clic estimé</span>
                  <span className="font-medium">3.2%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-secondary h-2 rounded-full" style={{ width: "32%" }}></div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Score de délivrabilité</span>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    Excellent
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Optimisation mobile</span>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    Bonne
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
