// config/nav.ts
export type NavItem = { label: string; href: string; desc?: string };
export type NavSection = { label: string; href?: string; items?: NavItem[] };

export const NAV: NavSection[] = [
  {
    label: "Produits",
    href: "/produits",
    items: [
      { label: "CRM", href: "/produits/crm", desc: "Contacts, pipelines, scoring" },
      { label: "Webinars / Events", href: "/produits/webinars", desc: "Planif, inscriptions, replay" },
      { label: "Réseaux sociaux", href: "/produits/reseaux-sociaux", desc: "Planif, inbox, listening" },
      { label: "Voir tous les produits →", href: "/produits", desc: "Automation, Emailing, Analytics…" },
    ],
  },
  { label: "Solutions", href: "/solutions" },
  {
    label: "Ressources",
    href: "/ressources",
    items: [
      { label: "Blog", href: "/ressources/blog", desc: "Guides, études, nouveautés" },
      { label: "Glossaires", href: "/ressources/glossaires", desc: "Termes & concepts marketing" },
      { label: "Events", href: "/ressources/events", desc: "Webinars & ateliers à venir" },
    ],
  },
  {
    label: "À propos",
    href: "/a-propos",
    items: [
      { label: "À propos de Dylup", href: "/a-propos", desc: "Vision, mission, valeurs" },
      { label: "Who are we", href: "/a-propos/who-are-we", desc: "L’équipe & notre histoire" },
    ],
  },
  { label: "Tarifs", href: "/tarifs" },
];
