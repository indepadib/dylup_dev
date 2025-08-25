import { createClient } from "@/lib/supabase/server"

export async function getProfile(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error) throw error
  return data
}

export async function updateProfile(
  userId: string,
  updates: {
    first_name?: string
    last_name?: string
    company?: string
    phone?: string
    avatar_url?: string
  },
) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("profiles")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteProfile(userId: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("profiles").delete().eq("id", userId)

  if (error) throw error
}

export async function getAudiences(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("audiences")
    .select(`
      *,
      contacts(count)
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function createAudience(
  userId: string,
  audience: {
    name: string
    description: string
    tags: string[]
  },
) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("audiences")
    .insert({
      user_id: userId,
      name: audience.name,
      description: audience.description,
      tags: audience.tags,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateAudience(
  audienceId: string,
  updates: {
    name?: string
    description?: string
    tags?: string[]
  },
) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("audiences")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", audienceId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteAudience(audienceId: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("audiences").delete().eq("id", audienceId)

  if (error) throw error
}

export async function getCampaigns(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("campaigns")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function createCampaign(
  userId: string,
  campaign: {
    name: string
    subject: string
    type: string
    audience_ids: string[]
  },
) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("campaigns")
    .insert({
      user_id: userId,
      name: campaign.name,
      subject: campaign.subject,
      type: campaign.type,
      audience_ids: campaign.audience_ids,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateCampaign(
  campaignId: string,
  updates: {
    name?: string
    subject?: string
    content?: string
    status?: string
    scheduled_at?: string
  },
) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("campaigns")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", campaignId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteCampaign(campaignId: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("campaigns").delete().eq("id", campaignId)

  if (error) throw error
}

export async function duplicateCampaign(campaignId: string, userId: string) {
  const supabase = await createClient()

  // Get original campaign
  const { data: original, error: fetchError } = await supabase
    .from("campaigns")
    .select("*")
    .eq("id", campaignId)
    .single()

  if (fetchError) throw fetchError

  // Create duplicate
  const { data, error } = await supabase
    .from("campaigns")
    .insert({
      user_id: userId,
      name: `${original.name} (Copy)`,
      subject: original.subject,
      content: original.content,
      type: original.type,
      audience_ids: original.audience_ids,
      status: "draft",
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getWorkflows(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("workflows")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function createWorkflow(
  userId: string,
  workflow: {
    name: string
    description: string
    trigger_type: string
    trigger_config: any
  },
) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("workflows")
    .insert({
      user_id: userId,
      name: workflow.name,
      description: workflow.description,
      trigger_type: workflow.trigger_type,
      trigger_config: workflow.trigger_config,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateWorkflow(
  workflowId: string,
  updates: {
    name?: string
    description?: string
    status?: string
    trigger_type?: string
    trigger_config?: any
    steps?: any[]
  },
) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("workflows")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", workflowId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteWorkflow(workflowId: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("workflows").delete().eq("id", workflowId)

  if (error) throw error
}

export async function getDashboardMetrics(userId: string) {
  const supabase = await createClient()

  // Get total contacts across all audiences
  const { data: contactsData } = await supabase
    .from("contacts")
    .select("id, audiences!inner(user_id)")
    .eq("audiences.user_id", userId)

  // Get campaigns count
  const { data: campaignsData } = await supabase
    .from("campaigns")
    .select("id, status, delivered_count, opened_count, clicked_count")
    .eq("user_id", userId)

  // Get workflows count
  const { data: workflowsData } = await supabase.from("workflows").select("id, status").eq("user_id", userId)

  // Calculate metrics
  const totalContacts = contactsData?.length || 0
  const activeCampaigns = campaignsData?.filter((c) => c.status === "sending" || c.status === "scheduled").length || 0
  const totalDelivered = campaignsData?.reduce((sum, c) => sum + (c.delivered_count || 0), 0) || 0
  const totalOpened = campaignsData?.reduce((sum, c) => sum + (c.opened_count || 0), 0) || 0
  const openRate = totalDelivered > 0 ? (totalOpened / totalDelivered) * 100 : 0

  return {
    totalContacts,
    activeCampaigns,
    openRate: openRate.toFixed(1),
    totalRevenue: 47892, // This would come from billing/subscription data
  }
}

export async function getRecentCampaigns(userId: string, limit = 4) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("campaigns")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

export async function getUserSubscription(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from("subscriptions").select("*").eq("user_id", userId).single()

  if (error && error.code !== "PGRST116") throw error
  return data
}

export async function getUserUsage(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("usage_tracking")
    .select("*")
    .eq("user_id", userId)
    .gte("period_start", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())
    .order("created_at", { ascending: false })

  if (error) throw error
  return data || []
}

export async function getContacts(audienceId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .eq("audience_id", audienceId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function createContact(
  audienceId: string,
  contact: {
    email: string
    first_name?: string
    last_name?: string
    phone?: string
    metadata?: any
  },
) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("contacts")
    .insert({
      audience_id: audienceId,
      email: contact.email,
      first_name: contact.first_name,
      last_name: contact.last_name,
      phone: contact.phone,
      metadata: contact.metadata,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateContact(
  contactId: string,
  updates: {
    email?: string
    first_name?: string
    last_name?: string
    phone?: string
    status?: string
    metadata?: any
  },
) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("contacts")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", contactId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteContact(contactId: string) {
  const supabase = await createClient()
  const { error } = await supabase.from("contacts").delete().eq("id", contactId)

  if (error) throw error
}

export async function getCampaignAnalytics(campaignId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("campaign_analytics")
    .select("*")
    .eq("campaign_id", campaignId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function getWorkflowAnalytics(workflowId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("workflow_analytics")
    .select("*")
    .eq("workflow_id", workflowId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function getAnalyticsMetrics(userId: string, timeRange = "30d") {
  const supabase = await createClient()

  // Calculate date range
  const now = new Date()
  const daysBack = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : timeRange === "90d" ? 90 : 365
  const startDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000)

  // Get campaign metrics
  const { data: campaigns } = await supabase
    .from("campaigns")
    .select("delivered_count, opened_count, clicked_count, revenue, created_at")
    .eq("user_id", userId)
    .gte("created_at", startDate.toISOString())

  // Get total contacts
  const { data: contacts } = await supabase
    .from("contacts")
    .select("id, audiences!inner(user_id)")
    .eq("audiences.user_id", userId)

  // Calculate metrics
  const totalSent = campaigns?.reduce((sum, c) => sum + (c.delivered_count || 0), 0) || 0
  const totalOpened = campaigns?.reduce((sum, c) => sum + (c.opened_count || 0), 0) || 0
  const totalClicked = campaigns?.reduce((sum, c) => sum + (c.clicked_count || 0), 0) || 0
  const totalRevenue = campaigns?.reduce((sum, c) => sum + (c.revenue || 0), 0) || 0

  const openRate = totalSent > 0 ? (totalOpened / totalSent) * 100 : 0
  const clickRate = totalOpened > 0 ? (totalClicked / totalOpened) * 100 : 0

  return {
    totalRevenue,
    totalSent,
    openRate: openRate.toFixed(1),
    clickRate: clickRate.toFixed(1),
    totalContacts: contacts?.length || 0,
  }
}

export async function getCampaignPerformanceData(userId: string, timeRange = "30d") {
  const supabase = await createClient()

  const daysBack = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : timeRange === "90d" ? 90 : 365
  const startDate = new Date(Date.now() - daysBack * 24 * 60 * 60 * 1000)

  const { data, error } = await supabase
    .from("campaigns")
    .select("delivered_count, opened_count, clicked_count, revenue, created_at")
    .eq("user_id", userId)
    .gte("created_at", startDate.toISOString())
    .order("created_at", { ascending: true })

  if (error) throw error

  // Group by month/week depending on time range
  const groupedData =
    data?.reduce((acc: any[], campaign) => {
      const date = new Date(campaign.created_at)
      const key =
        timeRange === "7d"
          ? date.toLocaleDateString("en-US", { weekday: "short" })
          : date.toLocaleDateString("en-US", { month: "short" })

      const existing = acc.find((item) => item.name === key)
      if (existing) {
        existing.sent += campaign.delivered_count || 0
        existing.opened += campaign.opened_count || 0
        existing.clicked += campaign.clicked_count || 0
        existing.revenue += campaign.revenue || 0
      } else {
        acc.push({
          name: key,
          sent: campaign.delivered_count || 0,
          opened: campaign.opened_count || 0,
          clicked: campaign.clicked_count || 0,
          revenue: campaign.revenue || 0,
        })
      }
      return acc
    }, []) || []

  return groupedData
}

export async function getAudienceGrowthData(userId: string, timeRange = "30d") {
  const supabase = await createClient()

  const daysBack = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : timeRange === "90d" ? 90 : 365
  const startDate = new Date(Date.now() - daysBack * 24 * 60 * 60 * 1000)

  const { data, error } = await supabase
    .from("contacts")
    .select("created_at, status, audiences!inner(user_id)")
    .eq("audiences.user_id", userId)
    .gte("created_at", startDate.toISOString())
    .order("created_at", { ascending: true })

  if (error) throw error

  // Group by time period
  const groupedData =
    data?.reduce((acc: any[], contact) => {
      const date = new Date(contact.created_at)
      const key =
        timeRange === "7d"
          ? date.toLocaleDateString("en-US", { weekday: "short" })
          : date.toLocaleDateString("en-US", { month: "short" })

      const existing = acc.find((item) => item.name === key)
      if (existing) {
        existing.subscribers += 1
        if (contact.status === "active") existing.active += 1
      } else {
        acc.push({
          name: key,
          subscribers: 1,
          active: contact.status === "active" ? 1 : 0,
        })
      }
      return acc
    }, []) || []

  return groupedData
}

export async function getTopCampaigns(userId: string, limit = 4) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("campaigns")
    .select("name, delivered_count, opened_count, clicked_count, revenue, status")
    .eq("user_id", userId)
    .order("revenue", { ascending: false })
    .limit(limit)

  if (error) throw error

  return (
    data?.map((campaign) => ({
      name: campaign.name,
      sent: campaign.delivered_count || 0,
      openRate:
        campaign.delivered_count > 0
          ? (((campaign.opened_count || 0) / campaign.delivered_count) * 100).toFixed(1)
          : "0.0",
      clickRate:
        campaign.opened_count > 0 ? (((campaign.clicked_count || 0) / campaign.opened_count) * 100).toFixed(1) : "0.0",
      revenue: campaign.revenue || 0,
      status: campaign.status === "sent" ? "completed" : campaign.status,
    })) || []
  )
}

export async function getDeviceBreakdown(userId: string) {
  const supabase = await createClient()

  // This would typically come from campaign analytics tracking
  // For now, return mock data that would be calculated from real tracking
  const { data: campaigns } = await supabase.from("campaigns").select("id").eq("user_id", userId)

  // In a real implementation, you'd have device tracking data
  // For now, return proportional mock data
  const totalCampaigns = campaigns?.length || 0

  return [
    { name: "Desktop", value: Math.round(totalCampaigns * 0.45) || 45, color: "hsl(var(--primary))" },
    { name: "Mobile", value: Math.round(totalCampaigns * 0.35) || 35, color: "hsl(var(--secondary))" },
    { name: "Tablet", value: Math.round(totalCampaigns * 0.2) || 20, color: "hsl(var(--muted))" },
  ]
}
