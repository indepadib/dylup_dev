// components/site/main-nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");
  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-2 text-sm font-medium hover:text-foreground/90",
        active ? "text-foreground" : "text-foreground/70"
      )}
    >
      {children}
    </Link>
  );
}

export default function MainNav() {
  return (
    <nav className="hidden md:flex items-center gap-1">
      {/* Produits (dropdown) */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Produits</NavigationMenuTrigger>
            <NavigationMenuContent className="p-4">
              <div className="grid min-w-[440px] grid-cols-2 gap-3">
                <Link href="/produits/crm" legacyBehavior passHref>
                  <NavigationMenuLink className="block rounded-md p-3 hover:bg-muted">
                    <div className="text-sm font-semibold">CRM</div>
                    <p className="text-sm text-muted-foreground">Contacts, pipelines, scoring</p>
                  </NavigationMenuLink>
                </Link>
                <Link href="/produits/webinars" legacyBehavior passHref>
                  <NavigationMenuLink className="block rounded-md p-3 hover:bg-muted">
                    <div className="text-sm font-semibold">Webinars / Events</div>
                    <p className="text-sm text-muted-foreground">Planif, inscriptions, replays</p>
                  </NavigationMenuLink>
                </Link>
                <Link href="/produits/reseaux-sociaux" legacyBehavior passHref>
                  <NavigationMenuLink className="block rounded-md p-3 hover:bg-muted">
                    <div className="text-sm font-semibold">Réseaux sociaux</div>
                    <p className="text-sm text-muted-foreground">Planif, inbox, listening</p>
                  </NavigationMenuLink>
                </Link>
                <Link href="/produits" legacyBehavior passHref>
                  <NavigationMenuLink className="block rounded-md p-3 hover:bg-muted">
                    <div className="text-sm font-semibold">Voir tous les produits →</div>
                    <p className="text-sm text-muted-foreground">Automation, Emailing, Analytics…</p>
                  </NavigationMenuLink>
                </Link>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Solutions (lien simple, tu as dit que c’est bon) */}
          <NavigationMenuItem>
            <NavLink href="/solutions">Solutions</NavLink>
          </NavigationMenuItem>

          {/* Ressources (dropdown) */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Ressources</NavigationMenuTrigger>
            <NavigationMenuContent className="p-4">
              <div className="grid min-w-[360px] gap-2">
                <Link href="/ressources/blog" legacyBehavior passHref>
                  <NavigationMenuLink className="block rounded-md p-3 hover:bg-muted">
                    <div className="text-sm font-semibold">Blog</div>
                    <p className="text-sm text-muted-foreground">Guides, études, nouveautés</p>
                  </NavigationMenuLink>
                </Link>
                <Link href="/ressources/glossaires" legacyBehavior passHref>
                  <NavigationMenuLink className="block rounded-md p-3 hover:bg-muted">
                    <div className="text-sm font-semibold">Glossaires</div>
                    <p className="text-sm text-muted-foreground">Termes & concepts marketing</p>
                  </NavigationMenuLink>
                </Link>
                <Link href="/ressources/events" legacyBehavior passHref>
                  <NavigationMenuLink className="block rounded-md p-3 hover:bg-muted">
                    <div className="text-sm font-semibold">Events</div>
                    <p className="text-sm text-muted-foreground">Webinars & ateliers à venir</p>
                  </NavigationMenuLink>
                </Link>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* À propos (dropdown) */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>À propos</NavigationMenuTrigger>
            <NavigationMenuContent className="p-4">
              <div className="grid min-w-[360px] gap-2">
                <Link href="/a-propos" legacyBehavior passHref>
                  <NavigationMenuLink className="block rounded-md p-3 hover:bg-muted">
                    <div className="text-sm font-semibold">À propos de Dylup</div>
                    <p className="text-sm text-muted-foreground">Vision, mission, valeurs</p>
                  </NavigationMenuLink>
                </Link>
                <Link href="/a-propos/who-are-we" legacyBehavior passHref>
                  <NavigationMenuLink className="block rounded-md p-3 hover:bg-muted">
                    <div className="text-sm font-semibold">Who are we</div>
                    <p className="text-sm text-muted-foreground">L’équipe derrière la plateforme</p>
                  </NavigationMenuLink>
                </Link>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Tarifs (lien simple) */}
          <NavigationMenuItem>
            <NavLink href="/tarifs">Tarifs</NavLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
