import type React from "react"
import { EnhancedLayout } from "@/components/dashboard/enhanced-layout"

export default function AnalyticsLayoutPage({
  children,
}: {
  children: React.ReactNode
}) {
  return <EnhancedLayout module="analytics">{children}</EnhancedLayout>
}
