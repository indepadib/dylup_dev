// components/site/footer.tsx (ou où tu l’importes)
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Twitter, Linkedin, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background text-foreground">
      <div className="container mx-auto px-4 py-16 text-sm">
        <div className="grid gap-8 md:grid-cols-4 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="text-xl font-bold">DYLUP</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Transform your marketing with AI-powered automation that drives real results.
            </p>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-foreground">
                <Twitter size={18} />
              </Button>
              <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-foreground">
                <Linkedin size={18} />
              </Button>
              <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-foreground">
                <Github size={18} />
              </Button>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide">Produit</h4>
            <ul className="space-y-2">
              <li><Link href="/produits" className="text-muted-foreground hover:text-foreground">Features</Link></li>
              <li><Link href="/tarifs" className="text-muted-foreground hover:text-foreground">Pricing</Link></li>
              <li><Link href="/integrations" className="text-muted-foreground hover:text-foreground">Integrations</Link></li>
              <li><Link href="/api" className="text-muted-foreground hover:text-foreground">API</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide">Société</h4>
            <ul className="space-y-2">
              <li><Link href="/a-propos" className="text-muted-foreground hover:text-foreground">À propos</Link></li>
              <li><Link href="/ressources/blog" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
              <li><Link href="/carriere" className="text-muted-foreground hover:text-foreground">Carrières</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide">Restez informé</h4>
            <p className="text-muted-foreground mb-4">
              Get the latest marketing automation tips and product updates.
            </p>
            <form className="flex gap-2">
              <label htmlFor="footer-email" className="sr-only">Email</label>
              <Input
                id="footer-email"
                type="email"
                placeholder="Votre email"
                className="bg-background text-foreground placeholder:text-muted-foreground"
                required
              />
              <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90">
                <Mail size={16} />
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 flex flex-col md:flex-row items-center justify-between text-muted-foreground">
          <p>© {new Date().getFullYear()} DYLUP. Tous droits réservés.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/legal/confidentialite" className="hover:text-foreground">Confidentialité</Link>
            <Link href="/legal/cgu" className="hover:text-foreground">Conditions</Link>
            <Link href="/legal/cookies" className="hover:text-foreground">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
