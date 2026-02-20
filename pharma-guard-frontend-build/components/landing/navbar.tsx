"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"
import Link from "next/link"

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b border-border/30 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary via-primary/80 to-accent text-primary-foreground font-semibold text-sm">
            P
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground hidden sm:inline">
            PharmaGuard
          </span>
        </Link>

        {/* Navigation links */}
        <div className="hidden items-center gap-1 md:flex">
          <Link
            href="/"
            className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-md hover:bg-secondary/50"
          >
            Platform
          </Link>
          <Link
            href="/patient"
            className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-md hover:bg-secondary/50"
          >
            Patient Analysis
          </Link>
          <Link
            href="/doctor"
            className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-md hover:bg-secondary/50"
          >
            Doctor Dashboard
          </Link>
        </div>

        {/* Auth buttons */}
        <div className="flex items-center gap-2.5">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-xs font-medium"
          >
            <Link href="/login">Sign In</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="text-xs font-semibold shadow-md hover:shadow-lg transition-all"
          >
            <Link href="/login">Get Started</Link>
          </Button>
        </div>
      </nav>
    </motion.header>
  )
}
