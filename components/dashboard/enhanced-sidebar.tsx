"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Users,
  Mail,
  Video,
  FileText,
  Megaphone,
  Share2,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const navigation = [
  { name: "Accueil", href: "/dashboard", icon: LayoutDashboard },
  { name: "CRM", href: "/dashboard/crm", icon: Users, badge: "247" },
  { name: "Campagnes", href: "/dashboard/campaigns", icon: Mail, badge: "3" },
  { name: "Webinaires", href: "/dashboard/webinars", icon: Video },
  { name: "Contenu", href: "/dashboard/content", icon: FileText },
  { name: "Ads", href: "/dashboard/ads", icon: Megaphone },
  { name: "Social", href: "/dashboard/social", icon: Share2 },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

interface EnhancedSidebarProps {
  className?: string
}

export function EnhancedSidebar({ className }: EnhancedSidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">D</span>
            </div>
            <span className="font-semibold text-sidebar-foreground">DYLUP</span>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="h-8 w-8 p-0">
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-10",
                  isCollapsed && "justify-center px-2",
                  isActive && "bg-sidebar-primary text-sidebar-primary-foreground",
                )}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-left">{item.name}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Button>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>MB</AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Mohammed bou-saber</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">bou.saber.mohammed@gmail.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
