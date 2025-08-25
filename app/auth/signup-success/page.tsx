import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="text-xl font-bold text-foreground">DYLUP</span>
          </Link>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Thank you for signing up!</CardTitle>
            <CardDescription className="text-center">Check your email to confirm</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              You've successfully signed up. Please check your email to confirm your account before signing in.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
