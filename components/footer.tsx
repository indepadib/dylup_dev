import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Twitter, Linkedin, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="text-xl font-bold">DYLUP</span>
            </div>
            <p className="text-background/70 leading-relaxed">
              Transform your marketing with AI-powered automation that drives real results.
            </p>
            <div className="flex space-x-4">
              <Button size="sm" variant="ghost" className="text-background/70 hover:text-background">
                <Twitter size={18} />
              </Button>
              <Button size="sm" variant="ghost" className="text-background/70 hover:text-background">
                <Linkedin size={18} />
              </Button>
              <Button size="sm" variant="ghost" className="text-background/70 hover:text-background">
                <Github size={18} />
              </Button>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-background/70">
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Integrations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  API
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-background/70">
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-background/70 mb-4 text-sm">
              Get the latest marketing automation tips and product updates.
            </p>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter your email"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
              />
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Mail size={16} />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-background/70 text-sm">© 2024 DYLUP. All rights reserved.</p>
          <div className="flex space-x-6 text-sm text-background/70 mt-4 md:mt-0">
            <a href="#" className="hover:text-background transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-background transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-background transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
