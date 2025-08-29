"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
// évite de mettre l'extension .ts pour rester clean dans Next
import { NAV, type NavSection } from "@/config/nav";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");
  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "text-foreground"
          : "text-foreground/70 hover:text-foreground"
      )}
    >
      {children}
    </Link>
  );
}

function Dropdown({ section }: { section: NavSection }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const hasItems = !!section.items?.length;

  // Fermer si on clique hors du menu
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Fermer sur changement de route
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Si pas de sous-éléments, simple lien
  if (!hasItems) {
    return <NavLink href={section.href ?? "#"}>{section.label}</NavLink>;
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Lien parent cliquable + caret */}
      <Link
        href={section.href ?? "#"}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground"
      >
        {section.label}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            open && "rotate-180"
          )}
          aria-hidden
        />
      </Link>

      {/* Panneau dropdown (opaque, au-dessus, cliquable) */}
      <div
        className={cn(
          "absolute left-0 top-full mt-3 z-[400] origin-top transition-all duration-150",
          open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        <div
          className="
            pointer-events-auto w-[680px] min-w-[280px]
            rounded-2xl border bg-white text-neutral-900 shadow-2xl ring-1 ring-black/5
            dark:bg-neutral-900 dark:text-neutral-100
          "
          role="menu"
          aria-label={section.label}
        >
          <div className={section.items!.length > 3 ? "grid grid-cols-2 gap-3 p-3" : "grid gap-2 p-3"}>
            {section.items!.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                className="rounded-md p-3 hover:bg-neutral-50 focus:bg-neutral-50 focus:outline-none dark:hover:bg-neutral-800/60 dark:focus:bg-neutral-800/60"
                onClick={() => setOpen(false)}
              >
                <div className="text-sm font-semibold">{item.label}</div>
                {item.desc && (
                  <p className="text-xs text-neutral-600 dark:text-neutral-300">
                    {item.desc}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MainNav() {
  return (
    <nav className="hidden md:flex items-center gap-2 z-[350]">
      {NAV.map((section) => (
        <Dropdown key={section.label} section={section} />
      ))}
    </nav>
  );
}

