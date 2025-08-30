"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
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
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const hasItems = !!section.items?.length;

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

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
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground"
        onClick={() => setOpen((v) => !v)}
      >
        {section.label}
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} aria-hidden />
      </button>

      {/* wrapper non cliquable pour ne pas bloquer le reste, puis panneau cliquable */}
      <div
        className={cn(
          "absolute left-0 top-full mt-2 z-[1200] origin-top transition-all duration-150 pointer-events-none",
          open ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}
      >
        <div
          className="
            pointer-events-auto w-[720px] min-w-[280px]
            rounded-2xl border bg-white text-neutral-900 shadow-2xl ring-1 ring-black/5
            dark:bg-neutral-900 dark:text-neutral-50
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
                className="rounded-md p-3 hover:bg-neutral-50 focus:bg-neutral-50 dark:hover:bg-neutral-800/60 dark:focus:bg-neutral-800/60 focus:outline-none"
                onClick={() => setOpen(false)}
              >
                <div className="text-sm font-semibold">{item.label}</div>
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
    <nav
      className="
        hidden md:flex items-center gap-3
        flex-1 justify-center
        overflow-visible
      "
    >
      {NAV.map((section) => (
        <Dropdown key={section.label} section={section} />
      ))}
    </nav>
  );
}

