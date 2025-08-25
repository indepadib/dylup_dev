"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, MoreHorizontal, Mail, Phone, Building, Star, TrendingUp } from "lucide-react"

interface Contact {
  id: string
  email: string
  first_name: string
  last_name: string
  phone?: string
  company?: string
  status: "active" | "unsubscribed" | "bounced"
  tags: string[]
  score?: number
  last_activity?: string
  created_at: string
}

const mockContacts: Contact[] = [
  {
    id: "1",
    email: "marie.dupont@example.com",
    first_name: "Marie",
    last_name: "Dupont",
    phone: "+33 6 12 34 56 78",
    company: "TechCorp",
    status: "active",
    tags: ["lead", "qualified"],
    score: 85,
    last_activity: "2024-01-15",
    created_at: "2024-01-10",
  },
  {
    id: "2",
    email: "jean.martin@startup.fr",
    first_name: "Jean",
    last_name: "Martin",
    company: "StartupXYZ",
    status: "active",
    tags: ["prospect", "hot"],
    score: 92,
    last_activity: "2024-01-14",
    created_at: "2024-01-08",
  },
  {
    id: "3",
    email: "sophie.bernard@corp.com",
    first_name: "Sophie",
    last_name: "Bernard",
    phone: "+33 6 98 76 54 32",
    company: "BigCorp",
    status: "unsubscribed",
    tags: ["customer", "churned"],
    score: 45,
    last_activity: "2024-01-05",
    created_at: "2023-12-20",
  },
]

export function ContactsTable() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || contact.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "unsubscribed":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "bounced":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Contacts ({filteredContacts.length})
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Statut
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>Tous</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("active")}>Actifs</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("unsubscribed")}>Désabonnés</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("bounced")}>Bounced</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Contact</TableHead>
              <TableHead>Entreprise</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Score IA</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Dernière activité</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`/placeholder-32px.png?height=32&width=32`} />
                      <AvatarFallback>
                        {contact.first_name[0]}
                        {contact.last_name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">
                        {contact.first_name} {contact.last_name}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        {contact.email}
                        {contact.phone && (
                          <>
                            <Phone className="h-3 w-3 ml-2" />
                            {contact.phone}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {contact.company && (
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      {contact.company}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(contact.status)}>{contact.status}</Badge>
                </TableCell>
                <TableCell>
                  {contact.score && (
                    <div className="flex items-center gap-2">
                      <Star className={`h-4 w-4 ${getScoreColor(contact.score)}`} />
                      <span className={`font-medium ${getScoreColor(contact.score)}`}>{contact.score}/100</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {contact.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  {contact.last_activity && (
                    <div className="text-sm text-muted-foreground">
                      {new Date(contact.last_activity).toLocaleDateString()}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Voir profil</DropdownMenuItem>
                      <DropdownMenuItem>Éditer</DropdownMenuItem>
                      <DropdownMenuItem>Envoyer email</DropdownMenuItem>
                      <DropdownMenuItem>Ajouter à campagne</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Supprimer</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
