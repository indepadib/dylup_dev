"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CreditCard, Crown, TrendingUp, Calendar, Users, Mail, Zap } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { getUserSubscription, getUserUsage } from "@/lib/supabase/client-queries"

interface Subscription {
  id: string
  plan: string
  status: string
  current_period_start: string
  current_period_end: string
  cancel_at_period_end: boolean
}

interface Usage {
  metric_type: string
  metric_value: number
}

export function SubscriptionInfo() {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [usage, setUsage] = useState<Usage[]>([])
  const [loading, setLoading] = useState(true)
  const { user, profile } = useAuth()

  useEffect(() => {
    async function fetchSubscriptionData() {
      if (!user?.id) return

      try {
        const [subData, usageData] = await Promise.all([getUserSubscription(user.id), getUserUsage(user.id)])

        setSubscription(subData)
        setUsage(usageData)
      } catch (error) {
        console.error("Error fetching subscription data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSubscriptionData()
  }, [user?.id])

  const planLimits = {
    starter: { contacts: 1000, emails: 5000, workflows: 3 },
    professional: { contacts: 10000, emails: 50000, workflows: 10 },
    enterprise: { contacts: -1, emails: -1, workflows: -1 },
  }

  const currentPlan = profile?.subscription_plan || "starter"
  const limits = planLimits[currentPlan as keyof typeof planLimits]

  const getUsageValue = (type: string) => {
    const usageItem = usage.find((u) => u.metric_type === type)
    return usageItem?.metric_value || 0
  }

  const getUsagePercentage = (current: number, limit: number) => {
    if (limit === -1) return 0 // Unlimited
    return Math.min((current / limit) * 100, 100)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-48 bg-muted rounded-lg animate-pulse"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Crown size={20} />
            <span>Current Plan</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold capitalize">{currentPlan}</h3>
              <p className="text-muted-foreground">
                {profile?.subscription_status === "trial" ? "Free Trial" : "Active Subscription"}
              </p>
            </div>
            <Badge
              variant={profile?.subscription_status === "active" ? "default" : "secondary"}
              className="text-sm px-3 py-1"
            >
              {profile?.subscription_status}
            </Badge>
          </div>

          {subscription && (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Billing Period</p>
                <p className="font-medium">
                  {new Date(subscription.current_period_start).toLocaleDateString()} -{" "}
                  {new Date(subscription.current_period_end).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Next Billing</p>
                <p className="font-medium">
                  {subscription.cancel_at_period_end
                    ? "Cancelled"
                    : new Date(subscription.current_period_end).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}

          <div className="flex space-x-3">
            <Button className="bg-primary hover:bg-primary/90">
              <TrendingUp size={16} className="mr-2" />
              Upgrade Plan
            </Button>
            <Button variant="outline" className="bg-transparent">
              <CreditCard size={16} className="mr-2" />
              Billing History
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Usage Statistics */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp size={20} />
            <span>Usage This Month</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Contacts Usage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users size={16} className="text-primary" />
                <span className="font-medium">Contacts</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {getUsageValue("contacts_stored").toLocaleString()} /{" "}
                {limits.contacts === -1 ? "Unlimited" : limits.contacts.toLocaleString()}
              </span>
            </div>
            <Progress value={getUsagePercentage(getUsageValue("contacts_stored"), limits.contacts)} className="h-2" />
          </div>

          {/* Emails Usage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-primary" />
                <span className="font-medium">Emails Sent</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {getUsageValue("emails_sent").toLocaleString()} /{" "}
                {limits.emails === -1 ? "Unlimited" : limits.emails.toLocaleString()}
              </span>
            </div>
            <Progress value={getUsagePercentage(getUsageValue("emails_sent"), limits.emails)} className="h-2" />
          </div>

          {/* Workflows Usage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Zap size={16} className="text-primary" />
                <span className="font-medium">Active Workflows</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {getUsageValue("workflows_active")} / {limits.workflows === -1 ? "Unlimited" : limits.workflows}
              </span>
            </div>
            <Progress value={getUsagePercentage(getUsageValue("workflows_active"), limits.workflows)} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Trial Information */}
      {profile?.subscription_status === "trial" && (
        <Card className="glass-card border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-primary">
              <Calendar size={20} />
              <span>Free Trial</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Trial ends in</h4>
                  <p className="text-sm text-muted-foreground">
                    {profile?.trial_ends_at
                      ? `${Math.ceil(
                          (new Date(profile.trial_ends_at).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                        )} days`
                      : "Unknown"}
                  </p>
                </div>
                <Button className="bg-primary hover:bg-primary/90">Upgrade Now</Button>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm">
                  Upgrade to continue using DYLUP after your trial ends. Choose the plan that fits your needs.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
