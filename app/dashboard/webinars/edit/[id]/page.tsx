import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Modifier Webinaire - DYLUP",
  description: "Modifier votre webinaire et ses paramètres",
}

interface EditWebinarPageProps {
  params: {
    id: string
  }
}

export default function EditWebinarPage({ params }: EditWebinarPageProps) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-violet-200/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">✨</span>
            </div>
            <h3 className="font-semibold text-foreground">FlyUp AI - Modification Webinaire</h3>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-xs bg-violet-100 text-violet-700 rounded-full">Manuel</button>
            <button className="px-3 py-1 text-xs bg-violet-500 text-white rounded-full">Semi-assisté</button>
            <button className="px-3 py-1 text-xs bg-violet-100 text-violet-700 rounded-full">Auto</button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Optimisez votre webinaire avec des suggestions intelligentes
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">Améliorer titre</span>
          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">Optimiser horaire</span>
          <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">Personnaliser emails</span>
        </div>
      </div>

      <div className="bg-card rounded-xl p-6 border border-border">
        <h1 className="text-2xl font-bold mb-6">Modifier le webinaire #{params.id}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Titre du webinaire</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                placeholder="Titre de votre webinaire"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                className="w-full px-3 py-2 border border-border rounded-lg bg-background h-24"
                placeholder="Description du webinaire"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Date et heure</label>
              <input type="datetime-local" className="w-full px-3 py-2 border border-border rounded-lg bg-background" />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Durée (minutes)</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                placeholder="60"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Nombre maximum de participants</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                placeholder="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Statut</label>
              <select className="w-full px-3 py-2 border border-border rounded-lg bg-background">
                <option>Brouillon</option>
                <option>Programmé</option>
                <option>En cours</option>
                <option>Terminé</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button className="px-4 py-2 text-muted-foreground hover:text-foreground">Annuler</button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  )
}
