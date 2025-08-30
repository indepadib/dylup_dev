import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Twitter, Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/30 dark:bg-neutral-950 text-foreground border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {/* logo clair */}
              <Image
                src="/brand/logo-lockup-light.png"
                alt="Dylup"
                width={132}
                height={28}
                className="h-7 w-auto dark:hidden"
                priority
              />
              {/* logo sombre */}
              <Image
                src="/brand/logo-lockup-dark.png"
                alt="Dylup"
                width={132}
                height={28}
                className="hidden h-7 w-auto dark:inline"
                priority
              />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
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
            <h4 className="font-semibold mb-4">Produit</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/produits" className="hover:text-foreground">Fonctionnalités</a></li>
              <li><a href="/tarifs" className="hover:text-foreground">Tarifs</a></li>
              <li><a href="/integrations" className="hover:text-foreground">Intégrations</a></li>
              <li><a href="/api" className="hover:text-foreground">API</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Entreprise</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/a-propos" className="hover:text-foreground">À propos</a></li>
              <li><a href="/ressources/blog" className="hover:text-foreground">Blog</a></li>
              <li><a href="/carriere" className="hover:text-foreground">Carrières</a></li>
              <li><a href="/contact" className="hover:text-foreground">Contact</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Restez informé·e</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Recevez nos derniers guides et nouveautés produit.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Votre email"
                className="bg-background border-input"
              />
              <Button size="sm" className="bg-primary text-primary-foreground hover:opacity-90">
                <Mail size={16} />
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Dylup. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="/legal/privacy" className="hover:text-foreground">Confidentialité</a>
            <a href="/legal/terms" className="hover:text-foreground">Conditions</a>
            <a href="/legal/cookies" className="hover:text-foreground">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

