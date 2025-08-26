// components/site/main-nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV, type NavSection } from "@/config/nav.ts";
import { useEffect, useRef, useState } from "react";

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

  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // close on outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)} // also open by click
        className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground focus:outline-none"
      >
        {section.label}
      </button>

      <div
        className={cn(
          "absolute left-0 top-full z-50 min-w-[280px] rounded-lg border bg-background p-3 shadow-xl",
          "transition-all duration-150 ease-out origin-top",
          open ? "opacity-100 scale-100 pointer-events-auto"
               : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        <div className={section.items.length > 3 ? "grid grid-cols-2 gap-3" : "grid gap-2"}>
          {section.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md p-2 hover:bg-muted focus:bg-muted focus:outline-none"
              onClick={() => setOpen(false)}
            >
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
