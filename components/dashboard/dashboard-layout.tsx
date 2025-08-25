"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth"
import {
  LayoutDashboard,
  Users,
  Mail,
  BarChart3,
  CreditCard,
  Settings,
  Menu,
  X,
  Bell,
  Search,
  LogOut,
  User,
  Calendar,
  FileText,
  Target,
  Share2,
  Plus,
  ChevronDown,
  ChevronRight,
  UserPlus,
  Building,
  Zap,
  PieChart,
  TrendingUp,
  Globe,
  Megaphone,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/ui/theme-toggle"

const navigation = [
  {
    name: "Accueil",
    href: "/dashboard",
    icon: LayoutDashboard,
    badge: null,
    subsections: [],
  },
  {
    name: "CRM",
    href: "/dashboard/crm",
    icon: Users,
    badge: "247",
    subsections: [
      { name: "Contacts", href: "/dashboard/crm", icon: UserPlus },
      { name: "Entreprises", href: "/dashboard/crm/companies", icon: Building },
      { name: "Segments", href: "/dashboard/crm/segments", icon: Target },
    ],
  },
  {
    name: "Campagnes",
    href: "/dashboard/campaigns",
    icon: Mail,
    badge: "3",
    subsections: [
      { name: "Email", href: "/dashboard/campaigns", icon: Mail },
      { name: "Workflows", href: "/dashboard/campaigns/workflows", icon: Zap },
      { name: "Templates", href: "/dashboard/campaigns/templates", icon: FileText },
    ],
  },
  {
    name: "Webinaires",
    href: "/dashboard/webinars",
    icon: Calendar,
    badge: null,
    subsections: [
      { name: "Événements", href: "/dashboard/webinars", icon: Calendar },
      { name: "Enregistrements", href: "/dashboard/webinars/recordings", icon: FileText },
    ],
  },
  {
    name: "Contenu",
    href: "/dashboard/content",
    icon: FileText,
    badge: null,
    subsections: [
      { name: "Articles", href: "/dashboard/content", icon: FileText },
      { name: "Médias", href: "/dashboard/content/media", icon: FileText },
    ],
  },
  {
    name: "Ads",
    href: "/dashboard/ads",
    icon: Target,
    badge: null,
    subsections: [
      { name: "Google Ads", href: "/dashboard/ads/google", icon: Globe },
      { name: "Facebook Ads", href: "/dashboard/ads/facebook", icon: Megaphone },
    ],
  },
  {
    name: "Social",
    href: "/dashboard/social",
    icon: Share2,
    badge: null,
    subsections: [
      { name: "Publications", href: "/dashboard/social", icon: Share2 },
      { name: "Calendrier", href: "/dashboard/social/calendar", icon: Calendar },
    ],
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    badge: null,
    subsections: [
      { name: "Vue d'ensemble", href: "/dashboard/analytics", icon: PieChart },
      { name: "Rapports", href: "/dashboard/analytics/reports", icon: TrendingUp },
    ],
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    badge: null,
    subsections: [],
  },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const { user, signOut } = useAuth()
  const pathname = usePathname()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.log("[v0] Sign out error:", error)
    }
  }

  const toggleSection = (sectionName: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionName) ? prev.filter((name) => name !== sectionName) : [...prev, sectionName],
    )
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-background via-muted/30 to-secondary/10">
      <div className="flex-1 flex min-h-0">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          </div>
        )}

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:relative lg:flex lg:flex-shrink-0 ${
            sidebarCollapsed ? "w-16" : "w-64"
          } ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex h-full flex-col glass-card border-r border-border/20">
            {/* Logo */}
            <div className="flex h-16 items-center justify-between px-6 border-b border-border/20 flex-shrink-0">
              {!sidebarCollapsed && (
                <Link href="/dashboard" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">D</span>
                  </div>
                  <span className="text-xl font-bold text-foreground">DYLUP</span>
                </Link>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="hidden lg:flex"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                <X size={20} className={`transition-transform ${sidebarCollapsed ? "rotate-180" : ""}`} />
              </Button>
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
                <X size={20} />
              </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                const isExpanded = expandedSections.includes(item.name)
                const hasSubsections = item.subsections.length > 0

                return (
                  <div key={item.name}>
                    <div
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center space-x-3 flex-1"
                        onClick={() => setSidebarOpen(false)}
                        title={sidebarCollapsed ? item.name : undefined}
                      >
                        <item.icon size={18} />
                        {!sidebarCollapsed && (
                          <>
                            <span className="flex-1 truncate">{item.name}</span>
                            {item.badge && (
                              <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full flex-shrink-0">
                                {item.badge}
                              </span>
                            )}
                          </>
                        )}
                      </Link>
                      {hasSubsections && !sidebarCollapsed && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-0 h-auto w-4"
                          onClick={() => toggleSection(item.name)}
                        >
                          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </Button>
                      )}
                    </div>

                    {hasSubsections && isExpanded && !sidebarCollapsed && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.subsections.map((subsection) => {
                          const isSubActive = pathname === subsection.href
                          return (
                            <Link
                              key={subsection.name}
                              href={subsection.href}
                              className={`flex items-center space-x-3 px-3 py-1.5 rounded-md text-xs transition-colors ${
                                isSubActive
                                  ? "bg-primary/10 text-primary"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                              }`}
                              onClick={() => setSidebarOpen(false)}
                            >
                              <subsection.icon size={14} />
                              <span className="truncate">{subsection.name}</span>
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>

            {/* User info */}
            {!sidebarCollapsed && (
              <div className="border-t border-border/20 p-4 flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src={user?.avatarUrl || "/placeholder.svg"} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user?.firstName?.[0]}
                      {user?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">Mohammed bou-saber</p>
                    <p className="text-xs text-muted-foreground truncate">bou.saber.mohammed@gmail...</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header className="flex-shrink-0 glass border-b border-border/20">
            <div className="flex h-16 items-center justify-between px-4 sm:px-6">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                  <Menu size={20} />
                </Button>

                {/* Search */}
                <div className="relative hidden sm:block">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  />
                  <Input placeholder="Rechercher..." className="pl-9 w-64 bg-background/50" />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Create button */}
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus size={16} className="mr-2" />
                  Créer
                </Button>

                {/* Language toggle */}
                <Button variant="ghost" size="sm" className="text-sm font-medium">
                  FR
                </Button>

                {/* Theme toggle button */}
                <ThemeToggle />

                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell size={18} />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </Button>

                {/* User menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatarUrl || "/placeholder.svg"} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user?.firstName?.[0]}
                          {user?.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Mohammed bou-saber</p>
                        <p className="text-xs leading-none text-muted-foreground">bou.saber.mohammed@gmail.com</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/settings">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/billing">
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Billing</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Page content - removed duplicate navigation */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
