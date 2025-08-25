import type React from "react"
import { EnhancedLayout } from "@/components/dashboard/enhanced-layout"

export default function CampaignsLayoutPage({
  children,
}: {
  children: React.ReactNode
}) {
  return <EnhancedLayout module="campaigns">{children}</EnhancedLayout>
}
