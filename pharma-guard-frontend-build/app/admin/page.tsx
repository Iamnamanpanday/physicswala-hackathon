"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Activity, ShieldCheck, Users } from "lucide-react"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"

export default function AdminDashboard() {
  const { session, role, initializing, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (initializing) return
    if (!session) {
      router.replace("/login?from=/admin")
    } else if (role && role !== "admin") {
      router.replace(role === "patient" ? "/patient" : "/doctor")
    }
  }, [initializing, session, role, router])

  if (initializing || !session || role !== "admin") {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Spinner className="h-4 w-4" />
          Checking admin access…
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex items-center justify-between border-b border-border bg-card/80 px-8 py-4 backdrop-blur">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Admin Control Center</h1>
          <p className="text-xs text-muted-foreground">
            Manage roles, security, and platform-wide analytics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            AD
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">Platform Admin</p>
            <p className="text-xs text-muted-foreground">admin@pharmaguard.local</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="ml-2"
            onClick={() => {
              logout()
              router.push("/login")
            }}
          >
            Sign out
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 md:grid-cols-3"
          >
            <Card className="border border-border/80 bg-card/95 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Active clinicians
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-foreground">34</p>
                  <p className="mt-1 text-xs text-emerald-500">+3 this week</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                  <Users className="h-5 w-5" />
                </div>
              </div>
            </Card>

            <Card className="border border-border/80 bg-card/95 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Security events (24h)
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-foreground">0</p>
                  <p className="mt-1 text-xs text-emerald-500">All systems nominal</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/10 text-sky-500">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </div>
            </Card>

            <Card className="border border-border/80 bg-card/95 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Analyses today
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-foreground">128</p>
                  <p className="mt-1 text-xs text-muted-foreground">Across all patient cohorts</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Activity className="h-5 w-5" />
                </div>
              </div>
            </Card>
          </motion.div>

          <Card className="border border-border/80 bg-card/95 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-sm font-semibold text-foreground">
                  Role-based access control (RBAC)
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  This demo environment enforces three logical roles:
                  patients, doctors, and administrators. Each dashboard is restricted
                  to its corresponding role.
                </p>
              </div>
              <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Role mappings</span>
                <span>Patient → `/patient`</span>
                <span>Doctor → `/doctor`</span>
                <span>Admin → `/admin` (this page)</span>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}

