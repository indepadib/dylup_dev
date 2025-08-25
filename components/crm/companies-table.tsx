"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Building, MoreHorizontal, Users, DollarSign, Calendar } from "lucide-react"

interface Company {
  id: string
  name: string
  industry?: string
  size?: string
  revenue?: string
  contacts_count: number
  owner?: string
  status: "prospect" | "customer" | "partner" | "inactive"
  last_contact?: string
  created_at: string
}

const mockCompanies: Company[] = [
  {
    id: "1",
    name: "TechCorp Solutions",
    industry: "Technology",
    size: "50-200",
    revenue: "€2M-10M",
    contacts_count: 12,
    owner: "Marie Dupont",
    status: "customer",
    last_contact: "2024-01-15",
    created_at: "2023-11-20",
  },
  {
    id: "2",
    name: "StartupXYZ",
    industry: "SaaS",
    size: "10-50",
    revenue: "€500K-2M",
    contacts_count: 5,
    owner: "Jean Martin",
    status: "prospect",
    last_contact: "2024-01-14",
    created_at: "2024-01-08",
  },
  {
    id: "3",
    name: "BigCorp International",
    industry: "Manufacturing",
    size: "1000+",
    revenue: "€100M+",
    contacts_count: 28,
    owner: "Sophie Bernard",
    status: "partner",
    last_contact: "2024-01-10",
    created_at: "2023-09-15",
  },
]

export function CompaniesTable() {
  const [companies, setCompanies] = useState<Company[]>(mockCompanies)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.owner?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "customer":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "prospect":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "partner":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Entreprises ({filteredCompanies.length})
          </CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher entreprises..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Entreprise</TableHead>
              <TableHead>Secteur</TableHead>
              <TableHead>Taille</TableHead>
              <TableHead>CA Estimé</TableHead>
              <TableHead>Contacts</TableHead>
              <TableHead>Propriétaire</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Dernier contact</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCompanies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{company.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Créé le {new Date(company.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{company.industry}</TableCell>
                <TableCell>
                  {company.size && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {company.size}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {company.revenue && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      {company.revenue}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{company.contacts_count}</Badge>
                </TableCell>
                <TableCell>{company.owner}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(company.status)}>{company.status}</Badge>
                </TableCell>
                <TableCell>
                  {company.last_contact && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {new Date(company.last_contact).toLocaleDateString()}
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
                      <DropdownMenuItem>Voir détails</DropdownMenuItem>
                      <DropdownMenuItem>Éditer</DropdownMenuItem>
                      <DropdownMenuItem>Voir contacts</DropdownMenuItem>
                      <DropdownMenuItem>Ajouter note</DropdownMenuItem>
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
