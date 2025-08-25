"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  CreditCard,
  Download,
  Calendar,
  Users,
  Mail,
  Workflow,
  Check,
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
} from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: 29,
    interval: "month",
    features: ["Up to 1,000 contacts", "5,000 emails per month", "Basic templates", "Email support", "Basic analytics"],
    limits: {
      contacts: 1000,
      emails: 5000,
      workflows: 3,
    },
  },
  {
    name: "Professional",
    price: 79,
    interval: "month",
    popular: true,
    features: [
      "Up to 10,000 contacts",
      "50,000 emails per month",
      "Advanced templates",
      "Priority support",
      "Advanced analytics",
      "A/B testing",
      "Automation workflows",
    ],
    limits: {
      contacts: 10000,
      emails: 50000,
      workflows: 25,
    },
  },
  {
    name: "Enterprise",
    price: 199,
    interval: "month",
    features: [
      "Unlimited contacts",
      "Unlimited emails",
      "Custom templates",
      "24/7 phone support",
      "Advanced analytics",
      "A/B testing",
      "Unlimited workflows",
      "Custom integrations",
      "Dedicated account manager",
    ],
    limits: {
      contacts: "unlimited",
      emails: "unlimited",
      workflows: "unlimited",
    },
  },
]

const mockSubscription = {
  plan: "Professional",
  status: "active",
  currentPeriodStart: "2024-01-01",
  currentPeriodEnd: "2024-02-01",
  cancelAtPeriodEnd: false,
  trialEndsAt: null,
}

const mockUsage = {
  contacts: { used: 3247, limit: 10000 },
  emails: { used: 12450, limit: 50000 },
  workflows: { used: 8, limit: 25 },
}

const mockInvoices = [
  {
    id: "inv_001",
    date: "2024-01-01",
    amount: 79,
    status: "paid",
    downloadUrl: "#",
  },
  {
    id: "inv_002",
    date: "2023-12-01",
    amount: 79,
    status: "paid",
    downloadUrl: "#",
  },
  {
    id: "inv_003",
    date: "2023-11-01",
    amount: 79,
    status: "paid",
    downloadUrl: "#",
  },
]

const mockPaymentMethods = [
  {
    id: "pm_001",
    type: "card",
    brand: "visa",
    last4: "4242",
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true,
  },
  {
    id: "pm_002",
    type: "card",
    brand: "mastercard",
    last4: "5555",
    expiryMonth: 8,
    expiryYear: 2026,
    isDefault: false,
  },
]

export function BillingManagement() {
  const [subscription, setSubscription] = useState(mockSubscription)
  const [usage, setUsage] = useState(mockUsage)
  const [invoices, setInvoices] = useState(mockInvoices)
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods)
  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false)
  const [isAddPaymentDialogOpen, setIsAddPaymentDialogOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState("")

  const currentPlan = plans.find((plan) => plan.name === subscription.plan)
  const daysUntilRenewal = Math.ceil(
    (new Date(subscription.currentPeriodEnd).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  )

  const getUsagePercentage = (used: number, limit: number | string) => {
    if (limit === "unlimited") return 0
    return Math.min((used / (limit as number)) * 100, 100)
  }

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return "text-red-500"
    if (percentage >= 75) return "text-yellow-500"
    return "text-green-500"
  }

  const handlePlanChange = (planName: string) => {
    console.log("[v0] Changing plan to:", planName)
    // TODO: Implement Stripe subscription update
    setSubscription({ ...subscription, plan: planName })
    setIsUpgradeDialogOpen(false)
  }

  const handleCancelSubscription = () => {
    console.log("[v0] Canceling subscription")
    // TODO: Implement Stripe subscription cancellation
    setSubscription({ ...subscription, cancelAtPeriodEnd: true })
  }

  const handleAddPaymentMethod = () => {
    console.log("[v0] Adding payment method")
    // TODO: Implement Stripe payment method creation
    setIsAddPaymentDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Billing</h1>
          <p className="text-muted-foreground mt-1">Manage your subscription and billing information</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Button variant="outline" className="bg-transparent">
            <Download size={16} className="mr-2" />
            Download Invoice
          </Button>
          <Dialog open={isUpgradeDialogOpen} onOpenChange={setIsUpgradeDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">Upgrade Plan</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Choose Your Plan</DialogTitle>
                <DialogDescription>Select the plan that best fits your needs.</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                {plans.map((plan) => (
                  <Card
                    key={plan.name}
                    className={`cursor-pointer transition-all duration-300 ${
                      plan.popular ? "ring-2 ring-primary" : ""
                    } ${selectedPlan === plan.name ? "ring-2 ring-secondary" : ""}`}
                    onClick={() => setSelectedPlan(plan.name)}
                  >
                    <CardHeader className="text-center">
                      {plan.popular && (
                        <Badge className="w-fit mx-auto mb-2 bg-primary text-primary-foreground">Most Popular</Badge>
                      )}
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <div className="text-3xl font-bold text-primary">
                        ${plan.price}
                        <span className="text-sm text-muted-foreground">/{plan.interval}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <Check size={14} className="text-green-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="w-full mt-4"
                        variant={plan.name === subscription.plan ? "outline" : "default"}
                        onClick={() => handlePlanChange(plan.name)}
                      >
                        {plan.name === subscription.plan ? "Current Plan" : "Select Plan"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Current Subscription */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Current Subscription</span>
            <Badge
              variant={subscription.status === "active" ? "default" : "secondary"}
              className={subscription.status === "active" ? "bg-green-100 text-green-800" : ""}
            >
              {subscription.status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{currentPlan?.name} Plan</h3>
              <div className="text-2xl font-bold text-primary mb-1">
                ${currentPlan?.price}
                <span className="text-sm text-muted-foreground">/{currentPlan?.interval}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {subscription.cancelAtPeriodEnd
                  ? `Cancels on ${new Date(subscription.currentPeriodEnd).toLocaleDateString()}`
                  : `Renews in ${daysUntilRenewal} days`}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Plan Features</h4>
              <ul className="space-y-1 text-sm">
                {currentPlan?.features.slice(0, 4).map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Check size={12} className="text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Actions</h4>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => setIsUpgradeDialogOpen(true)}
                >
                  Change Plan
                </Button>
                {!subscription.cancelAtPeriodEnd ? (
                  <Button variant="outline" className="w-full bg-transparent" onClick={handleCancelSubscription}>
                    Cancel Subscription
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => setSubscription({ ...subscription, cancelAtPeriodEnd: false })}
                  >
                    Resume Subscription
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Overview */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Usage Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users size={16} className="text-primary" />
                  <span className="font-medium">Contacts</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {usage.contacts.used.toLocaleString()} / {usage.contacts.limit.toLocaleString()}
                </span>
              </div>
              <Progress value={getUsagePercentage(usage.contacts.used, usage.contacts.limit)} className="h-2" />
              <p className={`text-sm ${getUsageColor(getUsagePercentage(usage.contacts.used, usage.contacts.limit))}`}>
                {getUsagePercentage(usage.contacts.used, usage.contacts.limit).toFixed(1)}% used
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail size={16} className="text-primary" />
                  <span className="font-medium">Emails</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {usage.emails.used.toLocaleString()} / {usage.emails.limit.toLocaleString()}
                </span>
              </div>
              <Progress value={getUsagePercentage(usage.emails.used, usage.emails.limit)} className="h-2" />
              <p className={`text-sm ${getUsageColor(getUsagePercentage(usage.emails.used, usage.emails.limit))}`}>
                {getUsagePercentage(usage.emails.used, usage.emails.limit).toFixed(1)}% used
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Workflow size={16} className="text-primary" />
                  <span className="font-medium">Workflows</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {usage.workflows.used} / {usage.workflows.limit}
                </span>
              </div>
              <Progress value={getUsagePercentage(usage.workflows.used, usage.workflows.limit)} className="h-2" />
              <p
                className={`text-sm ${getUsageColor(getUsagePercentage(usage.workflows.used, usage.workflows.limit))}`}
              >
                {getUsagePercentage(usage.workflows.used, usage.workflows.limit).toFixed(1)}% used
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods & Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Methods */}
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Payment Methods</CardTitle>
            <Dialog open={isAddPaymentDialogOpen} onOpenChange={setIsAddPaymentDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  <Plus size={14} className="mr-2" />
                  Add Card
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Payment Method</DialogTitle>
                  <DialogDescription>Add a new credit or debit card to your account.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Cardholder Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddPaymentDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddPaymentMethod}>Add Card</Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CreditCard size={20} className="text-muted-foreground" />
                    <div>
                      <div className="font-medium text-foreground">
                        {method.brand.toUpperCase()} •••• {method.last4}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Expires {method.expiryMonth}/{method.expiryYear}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {method.isDefault && (
                      <Badge variant="secondary" className="text-xs">
                        Default
                      </Badge>
                    )}
                    <Button variant="ghost" size="sm">
                      <Edit size={14} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Invoices */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar size={16} className="text-muted-foreground" />
                    <div>
                      <div className="font-medium text-foreground">${invoice.amount}</div>
                      <div className="text-sm text-muted-foreground">{new Date(invoice.date).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={invoice.status === "paid" ? "default" : "secondary"}
                      className={invoice.status === "paid" ? "bg-green-100 text-green-800" : ""}
                    >
                      {invoice.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Download size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Warnings */}
      {Object.entries(usage).some(([key, value]) => {
        const limit = currentPlan?.limits[key as keyof typeof currentPlan.limits]
        return limit !== "unlimited" && getUsagePercentage(value.used, limit as number) >= 90
      }) && (
        <Card className="glass-card border-yellow-200 bg-yellow-50/50">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle size={20} className="text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-1">Usage Limit Warning</h3>
                <p className="text-sm text-yellow-700 mb-3">
                  You're approaching your plan limits. Consider upgrading to avoid service interruption.
                </p>
                <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-white">
                  Upgrade Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
