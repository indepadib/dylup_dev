// components/site/main-nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV, type NavSection } from "@/config/nav";

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

function Dropdown({ section }: { section: NavSection }) {
  if (!section.items?.length) return <NavLink href={section.href ?? "#"}>{section.label}</NavLink>;
  return (
    <div className="group relative">
      <button
        className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground"
        aria-haspopup="menu"
        type="button"
      >
        {section.label}
      </button>
      <div
        className={[
          "absolute left-0 top-full z-50 mt-2 min-w-[280px] rounded-lg border bg-background p-3 shadow-xl",
          "opacity-0 translate-y-2 pointer-events-none",
          "group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto",
          "transition-all duration-150 ease-out",
        ].join(" ")}
      >
        <div className={section.items.length > 3 ? "grid grid-cols-2 gap-3" : "grid gap-2"}>
          {section.items.map((item) => (
            <Link key={item.href} className="rounded-md p-2 hover:bg-muted" href={item.href}>
              <div className="text-sm font-semibold">{item.label}</div>
              {item.desc && <p className="text-xs text-muted-foreground">{item.desc}</p>}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MainNav() {
  return (
    <nav className="hidden md:flex items-center gap-2">
      {NAV.map((section) => (
        <Dropdown key={section.label} section={section} />
      ))}
    </nav>
  );
}
