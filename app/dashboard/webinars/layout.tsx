import type React from "react"
import { EnhancedLayout } from "@/components/dashboard/enhanced-layout"

export default function WebinarsLayoutPage({
  children,
}: {
  children: React.ReactNode
}) {
  return <EnhancedLayout module="webinars">{children}</EnhancedLayout>
}
