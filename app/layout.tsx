// app/layout.tsx
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ClientShell } from "./client-shell.tsx";

export const metadata = {
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/favicon-180.png", sizes: "180x180", type: "image/png" }],
  },
};


export const metadata: Metadata = {
  title: "DYLUP - AI-Powered Marketing Automation",
  description: "Transform your marketing with intelligent automation that drives real results",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body className="min-h-dvh bg-background text-foreground">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}


/*import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { AuthProvider } from "@/lib/auth"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import MainNav from "@/components/site/main-nav.tsx"

export const metadata: Metadata = {
  title: "DYLUP - AI-Powered Marketing Automation",
  description: "Transform your marketing with intelligent automation that drives real results",
  generator: "v0.app",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      // applique les variables de fonts au root (évite le <style> dans <head>)
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
          storageKey="dylup-theme"
          themes={["light", "dark"]}
        >
          <header className="sticky top-0 z-40 w-full border-b backdrop-blur overflow-visible">
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

          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}*/
