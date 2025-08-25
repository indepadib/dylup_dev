"use client"

import { useState } from "react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Workflow,
  Plus,
  Search,
  MoreHorizontal,
  Filter,
  Eye,
  Edit,
  Copy,
  Trash2,
  Play,
  Pause,
  Mail,
  Clock,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const workflowTemplates = [
  {
    name: "Welcome Series",
    description: "Onboard new subscribers with a 5-email sequence",
    steps: 5,
    category: "Onboarding",
  },
  {
    name: "Abandoned Cart",
    description: "Recover lost sales with targeted reminders",
    steps: 3,
    category: "E-commerce",
  },
  {
    name: "Lead Nurturing",
    description: "Convert leads into customers over time",
    steps: 6,
    category: "Sales",
  },
  {
    name: "Customer Retention",
    description: "Keep customers engaged and reduce churn",
    steps: 4,
    category: "Retention",
  },
  {
    name: "Cross-Module Automation",
    description: "Orchestrate complex workflows across all modules",
    steps: 8,
    category: "Advanced",
  },
]

const statusColors = {
  draft: "bg-gray-100 text-gray-800",
  active: "bg-green-100 text-green-800",
  paused: "bg-yellow-100 text-yellow-800",
  archived: "bg-red-100 text-red-800",
}

export function WorkflowManagement() {
  const [workflows, setWorkflows] = useState([
    {
      id: "1",
      name: "Welcome Series",
      description: "Automated welcome sequence for new subscribers",
      status: "active",
      triggerType: "signup",
      totalEnrolled: 1247,
      activeEnrolled: 892,
      completedCount: 355,
      steps: 5,
      createdAt: "2024-01-15",
      lastUpdated: "2024-01-20",
    },
    {
      id: "2",
      name: "Abandoned Cart Recovery",
      description: "Re-engage users who abandoned their shopping cart",
      status: "active",
      triggerType: "abandoned_cart",
      totalEnrolled: 567,
      activeEnrolled: 234,
      completedCount: 333,
      steps: 3,
      createdAt: "2024-01-10",
      lastUpdated: "2024-01-21",
    },
    {
      id: "3",
      name: "Product Education",
      description: "Educate users about product features over time",
      status: "paused",
      triggerType: "trial_start",
      totalEnrolled: 891,
      activeEnrolled: 0,
      completedCount: 456,
      steps: 7,
      createdAt: "2024-01-12",
      lastUpdated: "2024-01-18",
    },
    {
      id: "4",
      name: "Re-engagement Campaign",
      description: "Win back inactive subscribers",
      status: "draft",
      triggerType: "inactivity",
      totalEnrolled: 0,
      activeEnrolled: 0,
      completedCount: 0,
      steps: 4,
      createdAt: "2024-01-21",
      lastUpdated: "2024-01-21",
    },
  ])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false)
  const [newWorkflow, setNewWorkflow] = useState({
    name: "",
    description: "",
    triggerType: "",
  })

  const filteredWorkflows = workflows.filter((workflow) => {
    const matchesSearch =
      workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workflow.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || workflow.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleCreateWorkflow = () => {
    const workflow = {
      id: Date.now().toString(),
      name: newWorkflow.name,
      description: newWorkflow.description,
      status: "draft" as const,
      triggerType: newWorkflow.triggerType,
      totalEnrolled: 0,
      activeEnrolled: 0,
      completedCount: 0,
      steps: 1,
      createdAt: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
    }

    setWorkflows([workflow, ...workflows])
    setNewWorkflow({ name: "", description: "", triggerType: "" })
    setIsCreateDialogOpen(false)
  }

  const handleDeleteWorkflow = (id: string) => {
    setWorkflows(workflows.filter((workflow) => workflow.id !== id))
  }

  const handleToggleWorkflow = (id: string) => {
    setWorkflows(
      workflows.map((workflow) =>
        workflow.id === id ? { ...workflow, status: workflow.status === "active" ? "paused" : "active" } : workflow,
      ),
    )
  }

  const getCompletionRate = (workflow: any) => {
    if (workflow.totalEnrolled === 0) return "0%"
    return `${((workflow.completedCount / workflow.totalEnrolled) * 100).toFixed(1)}%`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Workflows</h1>
          <p className="text-muted-foreground mt-1">Automate your marketing with intelligent workflows</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Button variant="outline" className="bg-transparent">
            <Workflow size={16} className="mr-2" />
            Cross-Module
          </Button>
          <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-transparent">
                <Filter size={16} className="mr-2" />
                Templates
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Workflow Templates</DialogTitle>
                <DialogDescription>Choose from pre-built templates to get started quickly.</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                {workflowTemplates.map((template, index) => (
                  <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{template.name}</CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          {template.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{template.steps} steps</span>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          Use Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus size={16} className="mr-2" />
                New Workflow
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Workflow</DialogTitle>
                <DialogDescription>Create a custom workflow to automate your marketing.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="workflowName">Workflow Name</Label>
                  <Input
                    id="workflowName"
                    placeholder="e.g., Welcome Series"
                    value={newWorkflow.name}
                    onChange={(e) => setNewWorkflow({ ...newWorkflow, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe this workflow..."
                    value={newWorkflow.description}
                    onChange={(e) => setNewWorkflow({ ...newWorkflow, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="trigger">Trigger</Label>
                  <Select
                    value={newWorkflow.triggerType}
                    onValueChange={(value) => setNewWorkflow({ ...newWorkflow, triggerType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a trigger" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="signup">User Signup</SelectItem>
                      <SelectItem value="purchase">Purchase Made</SelectItem>
                      <SelectItem value="abandoned_cart">Abandoned Cart</SelectItem>
                      <SelectItem value="trial_start">Trial Started</SelectItem>
                      <SelectItem value="inactivity">User Inactivity</SelectItem>
                      <SelectItem value="date_based">Date/Time Based</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateWorkflow} disabled={!newWorkflow.name || !newWorkflow.triggerType}>
                  Create Workflow
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
            placeholder="Search workflows..."
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
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Workflows Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredWorkflows.map((workflow) => (
          <Card key={workflow.id} className="glass-card hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <CardTitle className="text-lg font-semibold">{workflow.name}</CardTitle>
                  <Badge className={statusColors[workflow.status as keyof typeof statusColors]}>
                    {workflow.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{workflow.description}</p>
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
                    Edit Workflow
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Copy size={14} className="mr-2" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleToggleWorkflow(workflow.id)}>
                    {workflow.status === "active" ? (
                      <>
                        <Pause size={14} className="mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play size={14} className="mr-2" />
                        Activate
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteWorkflow(workflow.id)}>
                    <Trash2 size={14} className="mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-primary">{workflow.totalEnrolled.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Total Enrolled</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">{workflow.activeEnrolled.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Active</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-secondary">{getCompletionRate(workflow)}</div>
                  <div className="text-xs text-muted-foreground">Completion</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Mail size={12} />
                  <span>{workflow.steps} steps</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={12} />
                  <span>Updated {new Date(workflow.lastUpdated).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1 bg-primary hover:bg-primary/90" size="sm">
                  <Edit size={14} className="mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  size="sm"
                  onClick={() => handleToggleWorkflow(workflow.id)}
                >
                  {workflow.status === "active" ? (
                    <>
                      <Pause size={14} className="mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play size={14} className="mr-2" />
                      Activate
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredWorkflows.length === 0 && (
        <div className="text-center py-12">
          <Workflow size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No workflows found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || statusFilter !== "all"
              ? "Try adjusting your search or filter criteria"
              : "Create your first workflow to automate your marketing"}
          </p>
          {!searchTerm && statusFilter === "all" && (
            <div className="flex justify-center space-x-3">
              <Button onClick={() => setIsTemplateDialogOpen(true)} variant="outline" className="bg-transparent">
                Browse Templates
              </Button>
              <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-primary hover:bg-primary/90">
                <Plus size={16} className="mr-2" />
                Create Workflow
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
