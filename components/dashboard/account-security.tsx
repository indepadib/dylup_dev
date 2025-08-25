"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Key, Mail, Trash2, Loader2, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { createClient } from "@/lib/supabase/client"

export function AccountSecurity() {
  const { user, signOut } = useAuth()
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  })
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handlePasswordChange = async () => {
    if (passwordData.new !== passwordData.confirm) {
      setMessage({ type: "error", text: "New passwords do not match" })
      return
    }

    if (passwordData.new.length < 8) {
      setMessage({ type: "error", text: "Password must be at least 8 characters long" })
      return
    }

    setIsChangingPassword(true)
    setMessage(null)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({
        password: passwordData.new,
      })

      if (error) throw error

      setMessage({ type: "success", text: "Password updated successfully!" })
      setPasswordData({ current: "", new: "", confirm: "" })
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update password. Please try again." })
    } finally {
      setIsChangingPassword(false)
    }
  }

  const handleSendPasswordReset = async () => {
    if (!user?.email) return

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) throw error

      setMessage({ type: "success", text: "Password reset email sent!" })
    } catch (error) {
      setMessage({ type: "error", text: "Failed to send password reset email." })
    }
  }

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return
    }

    setIsDeleting(true)

    try {
      // In a real implementation, you would call an API endpoint to handle account deletion
      // This would involve deleting user data and then the auth user
      setMessage({ type: "error", text: "Account deletion is not yet implemented. Please contact support." })
    } catch (error) {
      setMessage({ type: "error", text: "Failed to delete account. Please contact support." })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Password Change */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Key size={20} />
            <span>Change Password</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {message && (
            <Alert variant={message.type === "error" ? "destructive" : "default"}>
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPasswords.current ? "text" : "password"}
                  value={passwordData.current}
                  onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                  placeholder="Enter current password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                >
                  {showPasswords.current ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPasswords.new ? "text" : "password"}
                  value={passwordData.new}
                  onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                  placeholder="Enter new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                >
                  {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPasswords.confirm ? "text" : "password"}
                  value={passwordData.confirm}
                  onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                  placeholder="Confirm new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                >
                  {showPasswords.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={handleSendPasswordReset} className="bg-transparent">
              <Mail size={16} className="mr-2" />
              Send Reset Email
            </Button>
            <Button
              onClick={handlePasswordChange}
              disabled={isChangingPassword || !passwordData.current || !passwordData.new || !passwordData.confirm}
              className="bg-primary hover:bg-primary/90"
            >
              {isChangingPassword ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Security */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield size={20} />
            <span>Account Security</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
              <Button variant="outline" className="bg-transparent">
                Enable 2FA
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <h4 className="font-medium">Login Sessions</h4>
                <p className="text-sm text-muted-foreground">Manage your active login sessions</p>
              </div>
              <Button variant="outline" className="bg-transparent">
                View Sessions
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="glass-card border-destructive/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-destructive">
            <Trash2 size={20} />
            <span>Danger Zone</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
              <h4 className="font-medium text-destructive mb-2">Delete Account</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="bg-destructive hover:bg-destructive/90"
              >
                {isDeleting ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} className="mr-2" />
                    Delete Account
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
