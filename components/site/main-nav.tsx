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
        "px-3 py-2 text-sm font-medium transition-colors",
        active ? "text-foreground" : "text-foreground/70 hover:text-foreground"
      )}
    >
      {children}
    </Link>
  );
}

function Dropdown({
  label,
  children,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative">
      <button
        className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground"
        aria-haspopup="menu"
        aria-expanded="false"
        type="button"
      >
        {label}
      </button>
      {/* Panel */}
      <div
        className={cn(
          "absolute left-0 top-full z-50 mt-2 min-w-[280px] rounded-lg border bg-background p-3 shadow-xl",
          "opacity-0 translate-y-2 pointer-events-none",
          "group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto",
          "transition-all duration-150 ease-out"
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default function MainNav() {
  return (
    <nav className="hidden md:flex items-center gap-2">
      {/* Produits */}
      <Dropdown label="Produits">
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
      </Dropdown>

      {/* Solutions */}
      <NavLink href="/solutions">Solutions</NavLink>

      {/* Ressources */}
      <Dropdown label="Ressources">
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
      </Dropdown>

      {/* À propos */}
      <Dropdown label="À propos">
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
      </Dropdown>

      {/* Tarifs */}
      <NavLink href="/tarifs">Tarifs</NavLink>
    </nav>
  );
}
