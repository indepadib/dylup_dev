"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Mail,
  Plus,
  Search,
  MoreHorizontal,
  Filter,
  Eye,
  Edit,
  Copy,
  Trash2,
  Send,
  Calendar,
  Users,
  TrendingUp,
  Clock,
  Zap,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth"
import {
  getCampaigns,
  createCampaign,
  deleteCampaign,
  duplicateCampaign,
  getAudiences,
} from "@/lib/supabase/client-queries"
import Link from "next/link"

interface Campaign {
  id: string
  name: string
  subject: string
  content?: string
  status: "draft" | "scheduled" | "sending" | "sent" | "paused"
  type: string
  audience_ids: string[]
  scheduled_at?: string
  sent_at?: string
  delivered_count: number
  opened_count: number
  clicked_count: number
  unsubscribed_count: number
  bounced_count: number
  created_at: string
  updated_at: string
}

interface Audience {
  id: string
  name: string
}

const statusColors = {
  draft: "bg-gray-100 text-gray-800",
  scheduled: "bg-blue-100 text-blue-800",
  sending: "bg-yellow-100 text-yellow-800",
  sent: "bg-green-100 text-green-800",
  paused: "bg-orange-100 text-orange-800",
}

export function CampaignManagement() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [audiences, setAudiences] = useState<Audience[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    subject: "",
    audience: "",
    type: "email",
  })
  const { user } = useAuth()

  useEffect(() => {
    async function fetchData() {
      if (!user?.id) return

      try {
        const [campaignsData, audiencesData] = await Promise.all([getCampaigns(user.id), getAudiences(user.id)])
        setCampaigns(campaignsData || [])
        setAudiences(audiencesData || [])
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user?.id])

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleCreateCampaign = async () => {
    if (!user?.id) return

    try {
      const campaignData = {
        name: newCampaign.name,
        subject: newCampaign.subject,
        type: newCampaign.type,
        audience_ids: [newCampaign.audience],
      }

      const createdCampaign = await createCampaign(user.id, campaignData)
      setCampaigns([createdCampaign, ...campaigns])
      setNewCampaign({ name: "", subject: "", audience: "", type: "email" })
      setIsCreateDialogOpen(false)
    } catch (error) {
      console.error("Error creating campaign:", error)
    }
  }

  const handleDeleteCampaign = async (id: string) => {
    try {
      await deleteCampaign(id)
      setCampaigns(campaigns.filter((campaign) => campaign.id !== id))
    } catch (error) {
      console.error("Error deleting campaign:", error)
    }
  }

  const handleDuplicateCampaign = async (id: string) => {
    if (!user?.id) return

    try {
      const duplicated = await duplicateCampaign(id, user.id)
      setCampaigns([duplicated, ...campaigns])
    } catch (error) {
      console.error("Error duplicating campaign:", error)
    }
  }

  const getOpenRate = (campaign: Campaign) => {
    if (campaign.delivered_count === 0) return "—"
    return `${((campaign.opened_count / campaign.delivered_count) * 100).toFixed(1)}%`
  }

  const getClickRate = (campaign: Campaign) => {
    if (campaign.opened_count === 0) return "—"
    return `${((campaign.clicked_count / campaign.opened_count) * 100).toFixed(1)}%`
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-48 mb-2"></div>
          <div className="h-4 bg-muted rounded w-96"></div>
        </div>
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* FlyUp AI panel at the top */}
      <div className="bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-violet-200/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">✨</span>
            </div>
            <h3 className="font-semibold text-foreground">FlyUp AI - Campagnes</h3>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-xs bg-violet-100 text-violet-700 rounded-full">Manuel</button>
            <button className="px-3 py-1 text-xs bg-violet-500 text-white rounded-full">Semi-assisté</button>
            <button className="px-3 py-1 text-xs bg-violet-100 text-violet-700 rounded-full">Auto</button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Optimisez vos campagnes email avec des suggestions IA personnalisées
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">Améliorer taux d'ouverture</span>
          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">Optimiser horaires d'envoi</span>
          <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">Personnaliser contenu</span>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Campaigns</h1>
          <p className="text-muted-foreground mt-1">Create and manage your email campaigns</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Button variant="outline" className="bg-transparent">
            <Filter size={16} className="mr-2" />
            Templates
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus size={16} className="mr-2" />
                New Campaign
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Campaign</DialogTitle>
                <DialogDescription>Create a new email campaign to engage with your audience.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="campaignName">Campaign Name</Label>
                  <Input
                    id="campaignName"
                    placeholder="e.g., Summer Sale Newsletter"
                    value={newCampaign.name}
                    onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Email Subject</Label>
                  <Input
                    id="subject"
                    placeholder="e.g., Don't miss our summer sale!"
                    value={newCampaign.subject}
                    onChange={(e) => setNewCampaign({ ...newCampaign, subject: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="audience">Target Audience</Label>
                  <Select
                    value={newCampaign.audience}
                    onValueChange={(value) => setNewCampaign({ ...newCampaign, audience: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an audience" />
                    </SelectTrigger>
                    <SelectContent>
                      {audiences.map((audience) => (
                        <SelectItem key={audience.id} value={audience.id}>
                          {audience.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Campaign Type</Label>
                  <Select
                    value={newCampaign.type}
                    onValueChange={(value) => setNewCampaign({ ...newCampaign, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email Campaign</SelectItem>
                      <SelectItem value="sms">SMS Campaign</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateCampaign} disabled={!newCampaign.name || !newCampaign.subject}>
                  Create Campaign
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="sending">Sending</SelectItem>
            <SelectItem value="sent">Sent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id} className="glass-card hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex-1 space-y-2 min-w-0">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold text-foreground truncate">{campaign.name}</h3>
                    <Badge className={statusColors[campaign.status]}>{campaign.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{campaign.subject}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Users size={12} />
                      <span className="truncate">
                        {audiences.find((a) => campaign.audience_ids.includes(a.id))?.name || "Unknown"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Mail size={12} />
                      <span>{campaign.delivered_count.toLocaleString()} recipients</span>
                    </div>
                    {campaign.scheduled_at && (
                      <div className="flex items-center space-x-1">
                        <Calendar size={12} />
                        <span>{new Date(campaign.scheduled_at).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                {campaign.status === "sent" && (
                  <div className="grid grid-cols-4 gap-4 text-center flex-shrink-0">
                    <div>
                      <div className="text-lg font-bold text-foreground">
                        {campaign.delivered_count.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Delivered</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-primary">{getOpenRate(campaign)}</div>
                      <div className="text-xs text-muted-foreground">Open Rate</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-secondary">{getClickRate(campaign)}</div>
                      <div className="text-xs text-muted-foreground">Click Rate</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600">{campaign.clicked_count}</div>
                      <div className="text-xs text-muted-foreground">Clicks</div>
                    </div>
                  </div>
                )}

                {campaign.status === "sending" && (
                  <div className="flex items-center space-x-2 text-yellow-600 flex-shrink-0">
                    <Clock size={16} className="animate-spin" />
                    <span className="text-sm font-medium">Sending in progress...</span>
                  </div>
                )}

                <div className="flex items-center space-x-2 flex-shrink-0">
                  {campaign.status === "draft" && (
                    <>
                      <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
                        <Link href={`/dashboard/campaigns/editor/${campaign.id}`}>
                          <Edit size={14} className="mr-2" />
                          Edit
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href="/dashboard/campaigns/workflows">
                          <Zap size={14} className="mr-2" />
                          Workflow
                        </Link>
                      </Button>
                    </>
                  )}
                  {campaign.status === "sent" && (
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <TrendingUp size={14} className="mr-2" />
                      Analytics
                    </Button>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye size={14} className="mr-2" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicateCampaign(campaign.id)}>
                        <Copy size={14} className="mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      {campaign.status === "draft" && (
                        <DropdownMenuItem>
                          <Send size={14} className="mr-2" />
                          Send Now
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteCampaign(campaign.id)}>
                        <Trash2 size={14} className="mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <div className="text-center py-12">
          <Mail size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No campaigns found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || statusFilter !== "all"
              ? "Try adjusting your search or filter criteria"
              : "Create your first campaign to get started"}
          </p>
          {!searchTerm && statusFilter === "all" && (
            <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-primary hover:bg-primary/90">
              <Plus size={16} className="mr-2" />
              Create Campaign
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
