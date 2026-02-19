import { Shield } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Shield className="h-4 w-4" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-foreground">
              PharmaGuard
            </span>
          </div>

          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">
              Platform
            </Link>
            <Link href="/patient" className="transition-colors hover:text-foreground">
              Patient Analysis
            </Link>
            <Link href="/doctor" className="transition-colors hover:text-foreground">
              Doctor Dashboard
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            {'PharmaGuard \u00A9 2026. All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  )
}
