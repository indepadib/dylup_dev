import type React from "react"
import { EnhancedLayout } from "@/components/dashboard/enhanced-layout"

export default function AdsLayoutPage({
  children,
}: {
  children: React.ReactNode
}) {
  return <EnhancedLayout module="ads">{children}</EnhancedLayout>
}
