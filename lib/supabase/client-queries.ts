import { createBrowserClient } from "@/lib/supabase/client"

export async function getDashboardMetrics(userId: string) {
  const supabase = createBrowserClient()

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
  const supabase = createBrowserClient()
  const { data, error } = await supabase
    .from("campaigns")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) throw error
  return data || []
}

export async function getAudiences(userId: string) {
  const supabase = createBrowserClient()
  const { data, error } = await supabase
    .from("audiences")
    .select(`
      *,
      contacts(count)
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data || []
}

export async function createAudience(
  userId: string,
  audience: {
    name: string
    description: string
    tags: string[]
  },
) {
  const supabase = createBrowserClient()
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

export async function getCampaigns(userId: string) {
  const supabase = createBrowserClient()
  const { data, error } = await supabase
    .from("campaigns")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data || []
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
  const supabase = createBrowserClient()
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
  const supabase = createBrowserClient()
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

export async function getUserSubscription(userId: string) {
  const supabase = createBrowserClient()
  const { data, error } = await supabase.from("subscriptions").select("*").eq("user_id", userId).single()

  if (error && error.code !== "PGRST116") throw error
  return data
}

export async function getUserUsage(userId: string) {
  const supabase = createBrowserClient()
  const { data, error } = await supabase
    .from("usage_tracking")
    .select("*")
    .eq("user_id", userId)
    .gte("period_start", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())
    .order("created_at", { ascending: false })

  if (error) throw error
  return data || []
}

export async function deleteCampaign(campaignId: string) {
  const supabase = createBrowserClient()
  const { error } = await supabase.from("campaigns").delete().eq("id", campaignId)

  if (error) throw error
}

export async function duplicateCampaign(campaignId: string, userId: string) {
  const supabase = createBrowserClient()

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

export async function getAnalyticsMetrics(userId: string, timeRange: string) {
  const supabase = createBrowserClient()

  // Get campaigns data for metrics calculation
  const { data: campaignsData } = await supabase
    .from("campaigns")
    .select("delivered_count, opened_count, clicked_count")
    .eq("user_id", userId)

  const totalSent = campaignsData?.reduce((sum, c) => sum + (c.delivered_count || 0), 0) || 0
  const totalOpened = campaignsData?.reduce((sum, c) => sum + (c.opened_count || 0), 0) || 0
  const totalClicked = campaignsData?.reduce((sum, c) => sum + (c.clicked_count || 0), 0) || 0

  const openRate = totalSent > 0 ? ((totalOpened / totalSent) * 100).toFixed(1) : "0.0"
  const clickRate = totalSent > 0 ? ((totalClicked / totalSent) * 100).toFixed(1) : "0.0"

  return {
    totalRevenue: 47892,
    totalSent,
    openRate,
    clickRate,
  }
}

export async function getCampaignPerformanceData(userId: string, timeRange: string) {
  const supabase = createBrowserClient()
  const { data } = await supabase
    .from("campaigns")
    .select("name, delivered_count, opened_count, clicked_count")
    .eq("user_id", userId)
    .limit(6)

  return (
    data?.map((campaign) => ({
      name: campaign.name.substring(0, 10) + "...",
      sent: campaign.delivered_count || 0,
      opened: campaign.opened_count || 0,
      clicked: campaign.clicked_count || 0,
      revenue: Math.floor(Math.random() * 5000) + 1000, // Mock revenue data
    })) || []
  )
}

export async function getAudienceGrowthData(userId: string, timeRange: string) {
  // Mock data for audience growth - in real app this would come from historical data
  const mockData = [
    { name: "Week 1", subscribers: 1200, active: 980 },
    { name: "Week 2", subscribers: 1350, active: 1100 },
    { name: "Week 3", subscribers: 1480, active: 1250 },
    { name: "Week 4", subscribers: 1620, active: 1380 },
    { name: "Week 5", subscribers: 1750, active: 1500 },
    { name: "Week 6", subscribers: 1890, active: 1620 },
  ]

  return mockData
}

export async function getTopCampaigns(userId: string, limit: number) {
  const supabase = createBrowserClient()
  const { data } = await supabase
    .from("campaigns")
    .select("*")
    .eq("user_id", userId)
    .order("opened_count", { ascending: false })
    .limit(limit)

  return (
    data?.map((campaign) => ({
      name: campaign.name,
      status: campaign.status,
      sent: campaign.delivered_count || 0,
      openRate:
        campaign.delivered_count > 0
          ? (((campaign.opened_count || 0) / campaign.delivered_count) * 100).toFixed(1)
          : "0.0",
      clickRate:
        campaign.delivered_count > 0
          ? (((campaign.clicked_count || 0) / campaign.delivered_count) * 100).toFixed(1)
          : "0.0",
      revenue: Math.floor(Math.random() * 10000) + 2000, // Mock revenue data
    })) || []
  )
}

export async function getDeviceBreakdown(userId: string) {
  // Mock device breakdown data - in real app this would come from analytics tracking
  return [
    { name: "Desktop", value: 45, color: "hsl(var(--primary))" },
    { name: "Mobile", value: 35, color: "hsl(var(--secondary))" },
    { name: "Tablet", value: 20, color: "hsl(var(--muted))" },
  ]
}
