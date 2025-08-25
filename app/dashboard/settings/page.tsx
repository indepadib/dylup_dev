import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { UserProfile } from "@/components/dashboard/user-profile"
import { AccountSecurity } from "@/components/dashboard/account-security"
import { SubscriptionInfo } from "@/components/dashboard/subscription-info"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <UserProfile />
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <AccountSecurity />
            </TabsContent>

            <TabsContent value="subscription" className="space-y-6">
              <SubscriptionInfo />
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
