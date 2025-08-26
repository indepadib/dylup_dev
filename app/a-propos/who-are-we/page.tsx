// app/a-propos/who-are-we/page.tsx
export const metadata = {
  title: "Who are we | Dylup",
  description: "Rencontrez l’équipe et découvrez notre histoire.",
};

export default function WhoAreWePage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">Who are we</h1>
      <p className="mt-4 text-muted-foreground">
        Nous sommes une équipe de builders produit, marketeurs et ingénieurs, obsédés par l’impact.
      </p>
    </main>
  );
}
