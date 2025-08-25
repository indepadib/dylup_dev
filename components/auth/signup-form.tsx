"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Loader2, Check } from "lucide-react"

export function SignUpForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const { signUp } = useAuth()
  const router = useRouter()

  const passwordRequirements = [
    { text: "At least 8 characters", met: formData.password.length >= 8 },
    { text: "Contains uppercase letter", met: /[A-Z]/.test(formData.password) },
    { text: "Contains lowercase letter", met: /[a-z]/.test(formData.password) },
    { text: "Contains number", met: /\d/.test(formData.password) },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (!agreedToTerms) {
      setError("Please agree to the terms and conditions")
      setIsLoading(false)
      return
    }

    try {
      await signUp({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        company: formData.company,
      })
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || "Failed to create account. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (error) setError("")
  }

  if (success) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <Check size={32} className="text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Check your email</h3>
          <p className="text-muted-foreground text-sm">
            We've sent a confirmation link to <strong>{formData.email}</strong>. Please check your email and click the
            link to activate your account.
          </p>
        </div>
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

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="John"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="john@company.com"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company (Optional)</Label>
        <Input
          id="company"
          placeholder="Your Company"
          value={formData.company}
          onChange={(e) => handleInputChange("company", e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            required
            disabled={isLoading}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </Button>
        </div>
        {formData.password && (
          <div className="space-y-1">
            {passwordRequirements.map((req, index) => (
              <div key={index} className="flex items-center space-x-2 text-xs">
                <Check size={12} className={req.met ? "text-green-500" : "text-muted-foreground"} />
                <span className={req.met ? "text-green-500" : "text-muted-foreground"}>{req.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
            required
            disabled={isLoading}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            disabled={isLoading}
          >
            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          id="terms"
          type="checkbox"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          className="rounded border-border text-primary focus:ring-primary"
          disabled={isLoading}
        />
        <Label htmlFor="terms" className="text-sm">
          I agree to the{" "}
          <a href="#" className="text-primary hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </Label>
      </div>

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading || !agreedToTerms}>
        {isLoading ? (
          <>
            <Loader2 size={16} className="mr-2 animate-spin" />
            Creating account...
          </>
        ) : (
          "Create Account"
        )}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <Button type="button" variant="outline" className="w-full bg-transparent" disabled={isLoading}>
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </Button>
    </form>
  )
}
