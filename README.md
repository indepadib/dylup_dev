# Dylup Dev — Project File Map & Editing Guide

This document explains what each key file/folder in your Next.js app does, how it’s built, and where to edit things without breaking builds (especially on Netlify).

---

## 1) Stack & Runtime

* **Framework:** Next.js (App Router)
* **Language:** TypeScript / TSX
* **UI:** Tailwind CSS + shadcn/ui + lucide-react icons
* **Auth/Data:** Supabase (client & server clients)
* **Deploy:** Netlify with `@netlify/plugin-nextjs`

> ✅ Next.js (App Router) renders HTML at build/runtime — there is no root `index.html` file.

---

## 2) Root (repository) — What lives here

### `package.json`

Scripts & dependencies for the whole app.

* **Common scripts:**

  * `dev`: local dev server
  * `build`: production build (used by Netlify)
  * `start`: run the compiled server
* **Edit if:** you add/remove libraries or custom scripts.

### `next.config.mjs`

Global Next.js configuration.

* **Typical settings:** image handling (`unoptimized: true` for Netlify), experimental flags, domains.
* **Do not set** `output: 'export'` (keeps SSR working).

### `netlify.toml`

Netlify build settings.

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "20"
```

* **Edit if:** you change build output or need extra plugins.

### `middleware.ts`

Edge middleware that runs before route handling.

* **Use for:** auth guards, redirects, session refresh.
* **Be careful:** runs on the edge; keep it lightweight and server-compatible.

### `components.json`

shadcn/ui configuration (aliases, theming). Edited by shadcn’s CLI or manually.

### `README.md`, `DEPLOY-NETLIFY.md`

Developer docs (local run + deploy steps).

---

## 3) `app/` — Routes, Layouts, Pages (App Router)

### `app/layout.tsx`

Root layout. Loads global styles, fonts, and providers (Theme, Auth). Server component by default.

* **Edit:** metadata (SEO), wrapper providers, global shells.

### `app/globals.css`

Global CSS + design tokens (CSS variables used by shadcn/Tailwind).

* **Edit:** brand colors, radii, text defaults, background.

  * Use this for Dylup’s gradient palette (blue → mauve), e.g. `--primary`, `--accent`.

### `app/page.tsx`

Landing page (home). Server component (renders fast, SEO-friendly).

* **Edit:** Hero, Features, ROI, Testimonials…
* **If you need DOM APIs:** move that part into a client component and import it here.

### Marketing routes

* `app/a-propos/page.tsx`, `app/produits/page.tsx`, `app/solutions/page.tsx`, `app/ressources/page.tsx`, `app/tarifs/page.tsx`

  * **Edit:** static content/sections, per-page metadata.

### Dashboard (the application area)

* `app/dashboard/layout.tsx` — shell (sidebar/topbar), shared UI for all dashboard pages.
* `app/dashboard/page.tsx` — dashboard home.
* Feature modules (each has its own folder):

  * `app/dashboard/ads`, `analytics`, `audiences`, `billing`, `campaigns`, `content`, `crm`, `settings`, `social`, `webinars`, `workflows`.
  * Each typically contains a `page.tsx` and optional client components.

> **Client vs Server pattern (important):**
>
> * If a page needs **DOM APIs/hooks** (`window`, `useEffect`, etc.), put the heavy UI into a **client component** (file starting with `"use client"`).
> * Keep `page.tsx` as a **server component** and export:
>
>   ```ts
>   export const dynamic = 'force-dynamic';
>   export const revalidate = 0;
>   ```
>
>   This prevents static export errors on Netlify.
>
> **Example:** `app/dashboard/webinars/page.tsx` (server) renders `WebinarBuilder.tsx` (client).

---

## 4) `components/` — Reusable UI

### `components/ui/*`

shadcn/ui primitives (Button, Card, Tabs, Input, Popover, Select, etc.).

* **Edit:** small style tweaks or props. For global look-and-feel, prefer changing CSS variables in `app/globals.css`.

### Themed/feature components

* `components/analytics/*`, `components/campaigns/*`, `components/webinars/*`, `components/workflows/*`, etc.
* **Edit:** feature-specific UI blocks (charts, builders, canvases).

### Theme

* `components/theme-provider.tsx`, `components/theme-toggle.tsx`
* **Edit:** how themes are loaded/saved, or the toggle control.

---

## 5) `lib/` — Logic, Helpers, Data Access

### `lib/auth.tsx`

Client-side Auth provider (React context) and helpers (e.g., `getAudiences`, `deleteUser`). Talks to Supabase client.

* **Edit:** auth flows, user context shape, client-side data fetch.

### `lib/utils.ts`

Tiny utilities (e.g., `cn` for class merging, formatters).

### `lib/supabase/*`

Supabase clients & queries.

* `client.ts` / `server.ts` — create Supabase clients for browser/server.
* `middleware.ts` — cookie/session helpers.
* `client-queries.ts` / `queries.ts` — typed queries (contacts, campaigns, audiences, metrics).
* **Edit:** table names, joins, RLS-safe patterns.

> **Netlify env vars (set in Site settings → Environment variables):**
>
> * `NEXT_PUBLIC_SUPABASE_URL`
> * `NEXT_PUBLIC_SUPABASE_ANON_KEY`
> * *(server only, if needed)* `SUPABASE_SERVICE_ROLE_KEY` (secret)

---

## 6) `public/` — Static assets

Images, logos, favicons, etc.

* **Edit:** replace placeholders with your final Dylup logo, product screenshots, etc.

---

## 7) `styles/`

* `styles/globals.css` (if present): extra global overrides. Prefer `app/globals.css` for the main theme tokens.

---

## 8) `scripts/` — SQL / Infra

SQL files to bootstrap Supabase schema:

* `01-create-profiles-table.sql`, `02-create-audiences-table.sql`, `03-create-campaigns-table.sql`, `04-create-workflows-table.sql`, `05-create-billing-table.sql`, `06-create-cross-module-workflows-table.sql`, etc.
* **Edit:** columns, indexes, constraints, Row Level Security (RLS). Run in Supabase SQL editor.

---

## 9) Where to change what (quick answers)

* **Brand colors / gradient (blue→mauve):** `app/globals.css` (CSS variables like `--primary`, `--accent`). Apply gradient on text with `bg-gradient-to-r ... bg-clip-text text-transparent`.
* **Navbar / Hero / Landing content:** `app/page.tsx` (+ any extracted components in `components/`), images in `public/`.
* **Feature pages (marketing):** `app/<route>/page.tsx`.
* **Dashboard modules:** `app/dashboard/<module>/page.tsx` (server) + client components inside the same folder. Add `dynamic/revalidate` on the page if needed.
* **Supabase queries:** `lib/supabase/*.ts` (client/server), or `lib/auth.tsx` for client-side conveniences.
* **Icons:** `lucide-react` imports inside your components.

---

## 10) Netlify deployment checklist

* `netlify.toml` present (as above).
* Netlify settings:

  * **Build command:** `npm run build`
  * **Publish directory:** `.next`
  * **Base directory:** *(empty)*
  * **Environment:** `NODE_VERSION = 20` and Supabase keys
* If a page fails at build due to DOM/API usage, use the pattern:

  * put DOM logic in a **client** component
  * keep the **page** as server and export:

    ```ts
    export const dynamic = 'force-dynamic';
    export const revalidate = 0;
    ```

---

## 11) Tips to avoid build errors

* **Local prod check:** `npm ci && NODE_ENV=production npm run build`
* **Don’t use DOM APIs in server files.** If needed, use `"use client"` and keep them inside `useEffect`.
* **Dynamic imports for DOM-only libs:**

  ```tsx
  'use client'
  import dynamic from 'next/dynamic'
  const Chart = dynamic(() => import('./Chart'), { ssr: false })
  ```
* **Keep middleware light** and server-safe.

---

## 12) Need exact file paths to edit a feature?

Tell me the section (e.g., “Hero gradient title”, “ROI form logic”, “Dashboard → Webinars → Tabs copy”), and I’ll give you the exact file(s) + ready-to-paste code blocks.

