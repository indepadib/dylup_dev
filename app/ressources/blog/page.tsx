// app/ressources/blog/page.tsx
export const metadata = { title: "Blog | Dylup" };
export default function BlogPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">Blog</h1>
      <p className="mt-4 text-muted-foreground">Guides, études de cas, nouveautés produit.</p>
    </main>
  );
}
