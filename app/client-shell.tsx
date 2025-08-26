// app/client-shell.tsx
"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/auth";
import MainNav from "@/components/site/main-nav";

export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="dylup-theme">
      <AuthProvider>
        <header className="sticky top-0 z-[100] w-full border-b backdrop-blur overflow-visible">
          <div className="container mx-auto flex h-14 items-center justify-between px-4">
            <a href="/" className="font-semibold">Dylup</a>
            <MainNav />
            <div className="hidden md:flex items-center gap-2">
              <a href="/demo" className="text-sm px-3 py-2">Démo interactive</a>
              <a href="/waitlist" className="text-sm px-3 py-2 rounded-md bg-primary text-primary-foreground">
                Rejoindre la waitlist
              </a>
            </div>
          </div>
        </header>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}
