// components/site/main-nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

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
      {/* Produits */}
      <div className="group relative">
        <NavLink href="/produits">Produits</NavLink>
        <div className="invisible group-hover:visible absolute left-0 mt-2 min-w-[320px] rounded-md border bg-background p-3 shadow-lg">
          <div className="grid grid-cols-2 gap-3">
            <Link className="rounded-md p-2 hover:bg-muted" href="/produits/crm">
              <div className="text-sm font-semibold">CRM</div>
              <p className="text-xs text-muted-foreground">Contacts, pipelines, scoring</p>
            </Link>
            <Link className="rounded-md p-2 hover:bg-muted" href="/produits/webinars">
              <div className="text-sm font-semibold">Webinars / Events</div>
              <p className="text-xs text-muted-foreground">Planif, inscriptions, replay</p>
            </Link>
            <Link className="rounded-md p-2 hover:bg-muted" href="/produits/reseaux-sociaux">
              <div className="text-sm font-semibold">Réseaux sociaux</div>
              <p className="text-xs text-muted-foreground">Planif, inbox, listening</p>
            </Link>
            <Link className="rounded-md p-2 hover:bg-muted" href="/produits">
              <div className="text-sm font-semibold">Voir tous les produits →</div>
              <p className="text-xs text-muted-foreground">Automation, Emailing, Analytics…</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Solutions */}
      <NavLink href="/solutions">Solutions</NavLink>

      {/* Ressources */}
      <div className="group relative">
        <NavLink href="/ressources">Ressources</NavLink>
        <div className="invisible group-hover:visible absolute left-0 mt-2 min-w-[260px] rounded-md border bg-background p-3 shadow-lg">
          <div className="grid gap-2">
            <Link className="rounded-md p-2 hover:bg-muted" href="/ressources/blog">
              <div className="text-sm font-semibold">Blog</div>
              <p className="text-xs text-muted-foreground">Guides, études, nouveautés</p>
            </Link>
            <Link className="rounded-md p-2 hover:bg-muted" href="/ressources/glossaires">
              <div className="text-sm font-semibold">Glossaires</div>
              <p className="text-xs text-muted-foreground">Termes & concepts marketing</p>
            </Link>
            <Link className="rounded-md p-2 hover:bg-muted" href="/ressources/events">
              <div className="text-sm font-semibold">Events</div>
              <p className="text-xs text-muted-foreground">Webinars & ateliers à venir</p>
            </Link>
          </div>
        </div>
      </div>

      {/* À propos */}
      <div className="group relative">
        <NavLink href="/a-propos">À propos</NavLink>
        <div className="invisible group-hover:visible absolute left-0 mt-2 min-w-[260px] rounded-md border bg-background p-3 shadow-lg">
          <div className="grid gap-2">
            <Link className="rounded-md p-2 hover:bg-muted" href="/a-propos">
              <div className="text-sm font-semibold">À propos de Dylup</div>
              <p className="text-xs text-muted-foreground">Vision, mission, valeurs</p>
            </Link>
            <Link className="rounded-md p-2 hover:bg-muted" href="/a-propos/who-are-we">
              <div className="text-sm font-semibold">Who are we</div>
              <p className="text-xs text-muted-foreground">L’équipe & notre histoire</p>
            </Link>
          </div>
        </div>
      </div>

      {/* Tarifs */}
      <NavLink href="/tarifs">Tarifs</NavLink>
    </nav>
  );
}
