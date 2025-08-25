"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Building, Phone, Camera, Save, Loader2 } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { updateProfile } from "@/lib/supabase/client-queries"

export function UserProfile() {
  const { user, profile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    company: "",
    phone: "",
  })

  useEffect(() => {
    if (user && profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        email: user.email || "",
        company: profile.company || "",
        phone: profile.phone || "",
      })
    }
  }, [user, profile])

  const handleSave = async () => {
    if (!user?.id) return

    setIsSaving(true)
    setMessage(null)

    try {
      await updateProfile(user.id, {
        first_name: formData.first_name,
        last_name: formData.last_name,
        company: formData.company,
        phone: formData.phone,
      })

      setMessage({ type: "success", text: "Profile updated successfully!" })
      setIsEditing(false)
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update profile. Please try again." })
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    if (user && profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        email: user.email || "",
        company: profile.company || "",
        phone: profile.phone || "",
      })
    }
    setIsEditing(false)
    setMessage(null)
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User size={20} />
          <span>Profile Information</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {message && (
          <Alert variant={message.type === "error" ? "destructive" : "default"}>
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        {/* Avatar Section */}
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg">
              {formData.first_name?.[0]}
              {formData.last_name?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">
              {formData.first_name} {formData.last_name}
            </h3>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Camera size={14} className="mr-2" />
              Change Photo
            </Button>
          </div>
        </div>

        <Separator />

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input id="email" value={formData.email} disabled className="pl-9" />
            </div>
            <p className="text-xs text-muted-foreground">Email cannot be changed from here</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <div className="relative">
              <Phone size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
                className="pl-9"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="company">Company</Label>
            <div className="relative">
              <Building
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              />
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                disabled={!isEditing}
                className="pl-9"
                placeholder="Your company name"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90">
                {isSaving ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} className="mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="bg-primary hover:bg-primary/90">
              Edit Profile
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
