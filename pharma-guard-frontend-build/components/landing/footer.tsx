import { Shield } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/30 bg-gradient-to-b from-card/50 to-background">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-xs">
                P
              </div>
              <span className="font-bold tracking-tight text-foreground">
                PharmaGuard
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Precision pharmacogenomics for personalized medicine.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-xs font-semibold text-foreground mb-4 uppercase tracking-wide">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Platform
                </Link>
              </li>
              <li>
                <Link href="/patient" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Patient Analysis
                </Link>
              </li>
              <li>
                <Link href="/doctor" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Doctor Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance */}
          <div>
            <h3 className="text-xs font-semibold text-foreground mb-4 uppercase tracking-wide">Compliance</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  HIPAA
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  CPIC Standards
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  FDA Aligned
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold text-foreground mb-4 uppercase tracking-wide">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/30 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row text-xs text-muted-foreground">
            <p>
              {'PharmaGuard \u00A9 2026. All rights reserved.'}
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="transition-colors hover:text-foreground">Documentation</a>
              <a href="#" className="transition-colors hover:text-foreground">Status</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
