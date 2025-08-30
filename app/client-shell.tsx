"use client";

import Link from "next/link";
import Image from "next/image";                 // ⟵ AJOUTER CETTE LIGNE
import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/auth";
import MainNav from "@/components/site/main-nav";
import ThemeToggle from "@/components/theme-toggle";

export function ClientShell({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="dylup-theme">
      <AuthProvider>
        <header
          className="
            sticky top-0 z-[2000] w-full border-b
            bg-background/95
            supports-[backdrop-filter]:bg-background/70 backdrop-blur
            transition-colors
          "
        >
          <div className="container mx-auto flex h-14 items-center justify-between px-4 gap-4">
            <Link href="/" className="flex items-center gap-2">
              {/* clair */}
              <Image
                src="/brand/logo-lockup-light.png"
                alt="Dylup"
                width={132}
                height={28}
                className="h-7 w-auto dark:hidden"
                priority
              />
              {/* sombre */}
              <Image
                src="/brand/logo-lockup-dark.png"
                alt="Dylup"
                width={132}
                height={28}
                className="hidden h-7 w-auto dark:inline"
                priority
              />
            </Link>

            <MainNav />

            <div className="flex items-center gap-2 shrink-0">
              <ThemeToggle />
              <Link
                href="/auth/signin"
                className="text-sm px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/auth/signup"
                className="text-sm px-3 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Start free trial
              </Link>
            </div>
          </div>
        </header>

        <main className="min-h-dvh">{children}</main>
      </AuthProvider>
    </ThemeProvider>
  );
}




/*"use client"

import Link from "next/link"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth"
import MainNav from "@/components/site/main-nav"
import ThemeToggle from "@/components/theme-toggle"

export function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="dylup-theme">
      <AuthProvider>
        <header className="sticky top-0 z-[200] w-full border-b bg-white/90 dark:bg-neutral-950/90 supports-[backdrop-filter]:backdrop-blur">
          <div className="container mx-auto flex h-14 items-center justify-between px-4">
            <Link href="/" className="font-semibold tracking-tight">Dylup</Link>
            <MainNav />
            <div className="flex items-center gap-2">
              {/* Bouton accessibilité / sombre *//*}
              <ThemeToggle />
              {/* CTAs demandés uniquement *//*}
              <Link
                href="/auth/signin"
                className="text-sm px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900"
              >
                Sign in
              </Link>
              <Link
                href="/auth/signup"
                className="text-sm px-3 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90"
              >
                Start free trial
              </Link>
            </div>
          </div>
        </header>
        <main className="min-h-dvh">{children}</main>
      </AuthProvider>
    </ThemeProvider>
  )
}*/
