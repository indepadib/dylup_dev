"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle } from "lucide-react"

export function ResetPasswordForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const { resetPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await resetPassword(email)
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || "Failed to send reset email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Check your email</h3>
          <p className="text-muted-foreground text-sm">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            setSuccess(false)
            setEmail("")
          }}
          className="w-full"
        >
          Send another email
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (error) setError("")
          }}
          required
          disabled={isLoading}
        />
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 size={16} className="mr-2 animate-spin" />
            Sending reset link...
          </>
        ) : (
          "Send Reset Link"
        )}
      </Button>

      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          You'll receive an email with instructions to reset your password. The link will expire in 24 hours.
        </p>
      </div>
    </form>
  )
}
