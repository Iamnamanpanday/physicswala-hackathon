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
      className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md"
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 via-sky-500 to-indigo-500 text-primary-foreground shadow-[0_0_25px_rgba(56,189,248,0.75)]">
            <div className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(15,23,42,0.85),transparent_55%)] opacity-70" />
            <Shield className="relative h-4 w-4" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            PharmaGuard
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Platform
          </Link>
          <Link
            href="/patient"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Patient Analysis
          </Link>
          <Link
            href="/doctor"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Doctor Dashboard
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="relative overflow-hidden border border-transparent bg-gradient-to-r from-slate-900/40 to-slate-900/10 text-xs font-medium text-slate-100 shadow-[0_0_18px_rgba(15,23,42,0.55)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_0%_0%,rgba(56,189,248,0.4),transparent_55%)] before:opacity-0 before:transition-opacity hover:border-sky-500/50 hover:before:opacity-100"
          >
            <Link href="/login">Sign In</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="relative overflow-hidden bg-gradient-to-r from-emerald-400 via-sky-500 to-indigo-500 text-xs font-semibold text-slate-950 shadow-[0_0_25px_rgba(56,189,248,0.85)] transition-transform hover:-translate-y-[1px] hover:shadow-[0_0_35px_rgba(56,189,248,0.95)]"
          >
            <Link href="/login">Get Started</Link>
          </Button>
        </div>
      </nav>
    </motion.header>
  )
}
