import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Social Media - DYLUP",
  description: "Manage your social media presence and campaigns",
}

export default function SocialPage() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-violet-200/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">✨</span>
            </div>
            <h3 className="font-semibold text-foreground">FlyUp AI - Social Media</h3>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-xs bg-violet-100 text-violet-700 rounded-full">Manuel</button>
            <button className="px-3 py-1 text-xs bg-violet-500 text-white rounded-full">Semi-assisté</button>
            <button className="px-3 py-1 text-xs bg-violet-100 text-violet-700 rounded-full">Auto</button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Optimisez votre présence sur les réseaux sociaux avec des suggestions intelligentes
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">Programmer 5 posts LinkedIn</span>
          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">Analyser engagement Twitter</span>
          <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">Créer contenu viral</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="font-semibold mb-4">Publications programmées</h3>
          <div className="text-3xl font-bold text-primary mb-2">12</div>
          <p className="text-sm text-muted-foreground">Cette semaine</p>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="font-semibold mb-4">Engagement moyen</h3>
          <div className="text-3xl font-bold text-green-600 mb-2">4.2%</div>
          <p className="text-sm text-muted-foreground">+0.8% vs mois dernier</p>
        </div>

        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="font-semibold mb-4">Nouveaux followers</h3>
          <div className="text-3xl font-bold text-blue-600 mb-2">+247</div>
          <p className="text-sm text-muted-foreground">Ce mois-ci</p>
        </div>
      </div>

      <div className="bg-card rounded-xl p-6 border border-border">
        <h3 className="font-semibold mb-4">Calendrier de publication</h3>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i} className="p-3 bg-muted/50 rounded-lg text-center">
              <div className="text-sm font-medium">{["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"][i]}</div>
              <div className="text-xs text-muted-foreground mt-1">{2 + i} posts</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
