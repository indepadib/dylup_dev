import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { BillingManagement } from "@/components/dashboard/billing-management"

export default function BillingPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <BillingManagement />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
