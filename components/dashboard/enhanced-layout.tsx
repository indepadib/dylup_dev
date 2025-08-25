"use client"

import type React from "react"

import { EnhancedSidebar } from "./enhanced-sidebar"
import { EnhancedTopbar } from "./enhanced-topbar"
import { FlyUpPanel } from "@/components/flyup/flyup-panel"

interface EnhancedLayoutProps {
  children: React.ReactNode
  module?: string
}

export function EnhancedLayout({ children, module = "overview" }: EnhancedLayoutProps) {
  return (
    <div className="h-screen flex bg-background">
      <EnhancedSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <EnhancedTopbar />

        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6">{children}</main>

          <aside className="w-80 border-l border-border p-4 overflow-y-auto">
            <FlyUpPanel module={module} />
          </aside>
        </div>
      </div>
    </div>
  )
}
