import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { WorkflowManagement } from "@/components/dashboard/workflow-management"

export default function WorkflowsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <WorkflowManagement />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
