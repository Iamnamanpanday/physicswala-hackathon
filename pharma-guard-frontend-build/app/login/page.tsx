"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { motion } from "framer-motion"
import { Shield } from "lucide-react"
import Link from "next/link"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getSupabaseBrowserClient } from "@/lib/supabase-client"

type RoleOption = "patient" | "doctor" | "admin"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<RoleOption | undefined>(undefined)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const supabase = getSupabaseBrowserClient()
    setSubmitting(true)

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        if (signInError.message.toLowerCase().includes("email not confirmed")) {
          setError(
            `Please confirm your email address first. Check your inbox at ${email} for a confirmation link from Supabase.`
          )
        } else {
          setError(signInError.message)
        }
        return
      }

      const session = data.session

      // If the user's metadata doesn't have a role yet (e.g. created externally),
      // save the selected role now so the auth-provider picks it up.
      const existingRole = session?.user?.user_metadata?.role as RoleOption | undefined
      if (!existingRole && role) {
        await supabase.auth.updateUser({ data: { role } })
        // Refresh session to get updated metadata
        const { data: refreshed } = await supabase.auth.getSession()
        login(refreshed.session ?? null)
      } else {
        login(session ?? null)
      }

      const sessionRole =
        (session?.user?.user_metadata?.role as RoleOption | undefined) ?? role ?? "patient"

      const target =
        searchParams.get("from") ??
        (sessionRole === "doctor" ? "/doctor" : sessionRole === "admin" ? "/admin" : "/patient")

      router.push(target)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-background/80 px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              Sign in to PharmaGuard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Choose your role to access the appropriate dashboard.
            </p>
          </div>
        </div>

        <Card className="border border-border/80 bg-card/95 p-6 shadow-lg backdrop-blur">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label>Sign in as</Label>
              <Select value={role} onValueChange={(value: RoleOption) => setRole(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient">Patient</SelectItem>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                If your account already has a role, this will be used as a fallback only.
              </p>
            </div>

            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-xs text-muted-foreground underline-offset-4 hover:text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <Button
              type="submit"
              className="mt-1 w-full"
              size="lg"
              disabled={!role || submitting}
            >
              {submitting ? "Signing in…" : "Continue"}
            </Button>
          </form>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary underline-offset-4 hover:underline">
              Create one
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  )
}

import { Suspense } from "react"

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
