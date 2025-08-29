"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV, type NavSection } from "@/config/nav"; // <-- pas d'extension

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
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const hasItems = !!section.items?.length;

  // Fermer si clic en dehors
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDocClick);
    return () => document.removeEventListener("pointerdown", onDocClick);
  }, []);

  // Fermer au changement de route
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (!hasItems) {
    return <NavLink href={section.href ?? "#"}>{section.label}</NavLink>;
  }

  return (
    <div
      ref={ref}
      className="relative z-[500]"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Parent cliquable + caret */}
      <Link
        href={section.href ?? "#"}
        className="group flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground focus:outline-none"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => {
          // Permet d'ouvrir au clic sans empêcher l'accès au lien parent
          e.preventDefault();
          setOpen((v) => !v);
        }}
      >
        {section.label}
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </Link>

      {/* Panneau dropdown */}
      <div
        className={cn(
          "absolute left-0 top-full mt-3 origin-top transition-all duration-150",
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        <div
          role="menu"
          aria-label={section.label}
          className={cn(
            // Couche + surface totalement opaques
            "z-[600] w-[680px] min-w-[280px] rounded-2xl border shadow-2xl ring-1 ring-black/5",
            "bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100",
            "pointer-events-auto"
          )}
        >
          <div className={section.items!.length > 3 ? "grid grid-cols-2 gap-2 p-3" : "grid gap-2 p-3"}>
            {section.items!.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                  // support optionnel pour un item “mise en avant”
                  (item as any).emphasis
                    ? "bg-primary/10 text-primary hover:bg-primary/15 dark:bg-primary/20 dark:hover:bg-primary/25"
                    : "hover:bg-neutral-50 dark:hover:bg-neutral-800/60"
                )}
              >
                <div className={cn("text-sm font-semibold", (item as any).emphasis && "text-primary")}>
                  {item.label}
                </div>
                {item.desc && <p className="text-xs text-neutral-600 dark:text-neutral-300">{item.desc}</p>}
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
