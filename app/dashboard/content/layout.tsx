import type React from "react"
import { EnhancedLayout } from "@/components/dashboard/enhanced-layout"

export default function ContentLayoutPage({
  children,
}: {
  children: React.ReactNode
}) {
  return <EnhancedLayout module="content">{children}</EnhancedLayout>
}
