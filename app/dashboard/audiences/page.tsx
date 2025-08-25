import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AudienceManagement } from "@/components/dashboard/audience-management"

export default function AudiencesPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <AudienceManagement />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
