import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Éditeur de Contenu - DYLUP",
  description: "Modifier votre contenu avec l'IA",
}

interface EditContentPageProps {
  params: {
    id: string
  }
}

export default function EditContentPage({ params }: EditContentPageProps) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-violet-200/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">✨</span>
            </div>
            <h3 className="font-semibold text-foreground">FlyUp AI - Éditeur de Contenu</h3>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-xs bg-violet-100 text-violet-700 rounded-full">Manuel</button>
            <button className="px-3 py-1 text-xs bg-violet-500 text-white rounded-full">Semi-assisté</button>
            <button className="px-3 py-1 text-xs bg-violet-100 text-violet-700 rounded-full">Auto</button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Améliorez votre contenu avec des suggestions IA personnalisées
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">Optimiser SEO</span>
          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">Améliorer engagement</span>
          <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">Générer variantes</span>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="border-b border-border p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Éditeur de Contenu #{params.id}</h1>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-xs border border-border rounded">Aperçu</button>
              <button className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded">Publier</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[600px]">
          {/* Editor Panel */}
          <div className="lg:col-span-2 p-6 border-r border-border">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Titre</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                  placeholder="Titre de votre contenu"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Contenu</label>
                <div className="border border-border rounded-lg bg-background min-h-[400px] p-4">
                  <textarea
                    className="w-full h-full resize-none border-none outline-none bg-transparent"
                    placeholder="Commencez à écrire votre contenu..."
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">Catégorie</label>
                  <select className="w-full px-3 py-2 border border-border rounded-lg bg-background">
                    <option>Blog</option>
                    <option>Social Media</option>
                    <option>Email</option>
                    <option>Landing Page</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">Statut</label>
                  <select className="w-full px-3 py-2 border border-border rounded-lg bg-background">
                    <option>Brouillon</option>
                    <option>En révision</option>
                    <option>Programmé</option>
                    <option>Publié</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* AI Suggestions Panel */}
          <div className="p-6 bg-muted/30">
            <h3 className="font-semibold mb-4">Suggestions IA</h3>

            <div className="space-y-4">
              <div className="p-3 bg-card rounded-lg border border-border">
                <h4 className="text-sm font-medium mb-2">Optimisation SEO</h4>
                <p className="text-xs text-muted-foreground mb-2">
                  Ajoutez des mots-clés pour améliorer le référencement
                </p>
                <button className="text-xs text-primary hover:underline">Appliquer</button>
              </div>

              <div className="p-3 bg-card rounded-lg border border-border">
                <h4 className="text-sm font-medium mb-2">Améliorer l'engagement</h4>
                <p className="text-xs text-muted-foreground mb-2">Ajoutez des questions pour engager votre audience</p>
                <button className="text-xs text-primary hover:underline">Appliquer</button>
              </div>

              <div className="p-3 bg-card rounded-lg border border-border">
                <h4 className="text-sm font-medium mb-2">Générer des variantes</h4>
                <p className="text-xs text-muted-foreground mb-2">Créez différentes versions de votre contenu</p>
                <button className="text-xs text-primary hover:underline">Générer</button>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-3">Métriques prédites</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Taux d'engagement</span>
                  <span className="text-green-600">+15%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Score SEO</span>
                  <span className="text-blue-600">8.2/10</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Lisibilité</span>
                  <span className="text-purple-600">Excellente</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
