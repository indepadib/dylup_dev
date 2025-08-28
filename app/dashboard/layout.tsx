// app/dashboard/layout.tsx
import type React from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { EnhancedLayout } from "@/components/dashboard/enhanced-layout"

// 👉 ajoute ces 2 lignes :
export const dynamic = "force-dynamic"
export const revalidate = 0

export default function DashboardLayoutPage({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <EnhancedLayout module="overview">{children}</EnhancedLayout>
    </ProtectedRoute>
  )
}
