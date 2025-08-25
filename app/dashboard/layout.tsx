import type React from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { EnhancedLayout } from "@/components/dashboard/enhanced-layout"

export default function DashboardLayoutPage({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <EnhancedLayout module="overview">{children}</EnhancedLayout>
    </ProtectedRoute>
  )
}
