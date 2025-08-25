"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Textarea } from "@/components/ui/textarea"
import { Users, Plus, Search, MoreHorizontal, Upload, Download, Filter, Eye, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth"
import { getAudiences, createAudience } from "@/lib/supabase/client-queries"

interface Audience {
  id: string
  name: string
  description: string
  tags: string[]
  total_contacts: number
  active_contacts: number
  created_at: string
  updated_at: string
}

export function AudienceManagement() {
  const [audiences, setAudiences] = useState<Audience[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newAudience, setNewAudience] = useState({
    name: "",
    description: "",
    tags: "",
  })
  const { user } = useAuth()

  useEffect(() => {
    async function fetchAudiences() {
      if (!user?.id) return

      try {
        const data = await getAudiences(user.id)
        setAudiences(data || [])
      } catch (error) {
        console.error("Error fetching audiences:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAudiences()
  }, [user?.id])

  const filteredAudiences = audiences.filter(
    (audience) =>
      audience.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      audience.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreateAudience = async () => {
    if (!user?.id) return

    try {
      const audienceData = {
        name: newAudience.name,
        description: newAudience.description,
        tags: newAudience.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      }

      const createdAudience = await createAudience(user.id, audienceData)
      setAudiences([createdAudience, ...audiences])
      setNewAudience({ name: "", description: "", tags: "" })
      setIsCreateDialogOpen(false)
    } catch (error) {
      console.error("Error creating audience:", error)
    }
  }

  const handleDeleteAudience = (id: string) => {
    setAudiences(audiences.filter((audience) => audience.id !== id))
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-48 mb-2"></div>
          <div className="h-4 bg-muted rounded w-96"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-muted rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Audiences</h1>
          <p className="text-muted-foreground mt-1">Manage your contact lists and segments</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Button variant="outline" className="bg-transparent">
            <Upload size={16} className="mr-2" />
            Import
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus size={16} className="mr-2" />
                New Audience
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Audience</DialogTitle>
                <DialogDescription>
                  Create a new audience to organize your contacts and improve targeting.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Audience Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Newsletter Subscribers"
                    value={newAudience.name}
                    onChange={(e) => setNewAudience({ ...newAudience, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe this audience..."
                    value={newAudience.description}
                    onChange={(e) => setNewAudience({ ...newAudience, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    placeholder="e.g., newsletter, active, customers"
                    value={newAudience.tags}
                    onChange={(e) => setNewAudience({ ...newAudience, tags: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateAudience} disabled={!newAudience.name}>
                  Create Audience
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
            placeholder="Search audiences..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" className="bg-transparent">
          <Filter size={16} className="mr-2" />
          Filter
        </Button>
      </div>

      {/* Audiences Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAudiences.map((audience) => (
          <Card key={audience.id} className="glass-card hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
              <div className="flex-1">
                <CardTitle className="text-lg font-semibold">{audience.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{audience.description}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye size={14} className="mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit size={14} className="mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download size={14} className="mr-2" />
                    Export
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteAudience(audience.id)}>
                    <Trash2 size={14} className="mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{audience.total_contacts.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Total Contacts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{audience.active_contacts.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Active</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {audience.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="text-xs text-muted-foreground">
                <div>Created: {new Date(audience.created_at).toLocaleDateString()}</div>
                <div>Updated: {new Date(audience.updated_at).toLocaleDateString()}</div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90" size="sm">
                <Users size={14} className="mr-2" />
                Manage Contacts
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAudiences.length === 0 && (
        <div className="text-center py-12">
          <Users size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No audiences found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm ? "Try adjusting your search terms" : "Create your first audience to get started"}
          </p>
          {!searchTerm && (
            <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-primary hover:bg-primary/90">
              <Plus size={16} className="mr-2" />
              Create Audience
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
