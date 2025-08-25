"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Target, GitBranch, Clock, Plus, Trash2, Settings, ArrowDown } from "lucide-react"

interface WorkflowNode {
  id: string
  type: "trigger" | "action" | "condition" | "delay"
  module: string
  title: string
  description: string
  position: { x: number; y: number }
  config: Record<string, any>
}

interface WorkflowConnection {
  id: string
  from: string
  to: string
  condition?: string
}

interface WorkflowCanvasProps {
  nodes: WorkflowNode[]
  connections: WorkflowConnection[]
  onNodeSelect: (nodeId: string) => void
  onNodeUpdate: (nodeId: string, updates: Partial<WorkflowNode>) => void
  onNodeDelete: (nodeId: string) => void
  onConnectionCreate: (from: string, to: string) => void
  selectedNodeId?: string
}

const nodeTypeConfig = {
  trigger: {
    icon: Zap,
    color: "bg-green-100 text-green-800 border-green-200",
    darkColor: "dark:bg-green-900/20 dark:text-green-400 dark:border-green-800",
  },
  action: {
    icon: Target,
    color: "bg-blue-100 text-blue-800 border-blue-200",
    darkColor: "dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800",
  },
  condition: {
    icon: GitBranch,
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    darkColor: "dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800",
  },
  delay: {
    icon: Clock,
    color: "bg-purple-100 text-purple-800 border-purple-200",
    darkColor: "dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800",
  },
}

export function WorkflowCanvas({
  nodes,
  connections,
  onNodeSelect,
  onNodeUpdate,
  onNodeDelete,
  onConnectionCreate,
  selectedNodeId,
}: WorkflowCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [draggedNode, setDraggedNode] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, nodeId: string) => {
      const node = nodes.find((n) => n.id === nodeId)
      if (!node) return

      const rect = e.currentTarget.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
      setDraggedNode(nodeId)
      onNodeSelect(nodeId)
    },
    [nodes, onNodeSelect],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!draggedNode || !canvasRef.current) return

      const canvasRect = canvasRef.current.getBoundingClientRect()
      const newPosition = {
        x: e.clientX - canvasRect.left - dragOffset.x,
        y: e.clientY - canvasRect.top - dragOffset.y,
      }

      onNodeUpdate(draggedNode, { position: newPosition })
    },
    [draggedNode, dragOffset, onNodeUpdate],
  )

  const handleMouseUp = useCallback(() => {
    setDraggedNode(null)
  }, [])

  const renderNode = (node: WorkflowNode) => {
    const config = nodeTypeConfig[node.type]
    const IconComponent = config.icon
    const isSelected = selectedNodeId === node.id

    return (
      <div
        key={node.id}
        className={`absolute cursor-move transition-all duration-200 ${isSelected ? "z-10" : "z-0"}`}
        style={{
          left: node.position.x,
          top: node.position.y,
          transform: isSelected ? "scale(1.05)" : "scale(1)",
        }}
        onMouseDown={(e) => handleMouseDown(e, node.id)}
      >
        <Card
          className={`w-64 ${config.color} ${config.darkColor} border-2 ${
            isSelected ? "ring-2 ring-primary shadow-lg" : "shadow-md"
          } hover:shadow-lg transition-all duration-200`}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded bg-white/50">
                  <IconComponent className="h-4 w-4" />
                </div>
                <Badge variant="outline" className="text-xs">
                  {node.module}
                </Badge>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-white/20"
                  onClick={(e) => {
                    e.stopPropagation()
                    onNodeSelect(node.id)
                  }}
                >
                  <Settings className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
                  onClick={(e) => {
                    e.stopPropagation()
                    onNodeDelete(node.id)
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="font-medium text-sm leading-tight">{node.title}</h4>
              <p className="text-xs opacity-80 leading-tight">{node.description}</p>
            </div>

            <div className="flex items-center justify-between mt-3">
              <Badge variant="secondary" className="text-xs capitalize">
                {node.type}
              </Badge>
              {Object.keys(node.config).length > 0 && (
                <Badge variant="outline" className="text-xs">
                  Configuré
                </Badge>
              )}
            </div>

            {/* Connection points */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center">
                <ArrowDown className="h-2 w-2 text-gray-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderConnections = () => {
    return connections.map((connection) => {
      const fromNode = nodes.find((n) => n.id === connection.from)
      const toNode = nodes.find((n) => n.id === connection.to)

      if (!fromNode || !toNode) return null

      const fromX = fromNode.position.x + 128 // Half of node width
      const fromY = fromNode.position.y + 120 // Bottom of node
      const toX = toNode.position.x + 128
      const toY = toNode.position.y

      return (
        <svg key={connection.id} className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }}>
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="rgb(156 163 175)" />
            </marker>
          </defs>
          <path
            d={`M ${fromX} ${fromY} Q ${fromX} ${fromY + 50} ${toX} ${toY}`}
            stroke="rgb(156 163 175)"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowhead)"
          />
        </svg>
      )
    })
  }

  return (
    <div
      ref={canvasRef}
      className="relative w-full h-full min-h-[600px] bg-muted/10 rounded-lg border-2 border-dashed border-muted overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {renderConnections()}

      {nodes.map(renderNode)}

      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Plus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Canvas vide</h3>
            <p className="text-muted-foreground">Ajoutez des étapes pour construire votre workflow</p>
          </div>
        </div>
      )}

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle, #94a3b8 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      />
    </div>
  )
}
