"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { DoctorSidebar } from "@/components/doctor/doctor-sidebar"
import { DoctorMobileHeader } from "@/components/doctor/doctor-mobile-header"
import { StatsCards } from "@/components/doctor/stats-cards"
import { PatientTable } from "@/components/doctor/patient-table"
import { AnalyticsCharts } from "@/components/doctor/analytics-charts"
import { Toaster, toast } from "sonner"
import { useAuth } from "@/components/auth-provider"
import { Spinner } from "@/components/ui/spinner"

export default function DoctorDashboard() {
  const { session, role, initializing } = useAuth()
  const router = useRouter()

  const [, setAlertsSent] = useState<string[]>([])

  useEffect(() => {
    if (initializing) return
    if (!session) {
      router.replace("/login?from=/doctor")
    } else if (role && role !== "doctor") {
      router.replace(role === "patient" ? "/patient" : "/admin")
    }
  }, [initializing, session, role, router])

  if (initializing || !session || role !== "doctor") {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Spinner className="h-4 w-4" />
          Checking doctor access…
        </div>
      </div>
    )
  }

  const handleSendAlert = (patientId: string) => {
    setAlertsSent((prev) => [...prev, patientId])
    toast.success("Alert sent successfully", {
      description: `Email alert sent for patient ${patientId}`,
    })
  }

  return (
    <div className="flex h-screen bg-background">
      <DoctorSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <DoctorMobileHeader title="Doctor Dashboard" />

        {/* Top bar (desktop) */}
        <header className="hidden h-16 items-center justify-between border-b border-border bg-card px-8 lg:flex">
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              Doctor Dashboard
            </h1>
            <p className="text-xs text-muted-foreground">
              Monitor patient pharmacogenomic analyses and risk alerts
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              DR
            </div>
            <span className="text-sm font-medium text-foreground">
              Dr. Smith
            </span>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-8"
            >
              <StatsCards />
              <div id="patients">
                <PatientTable onSendAlert={handleSendAlert} />
              </div>
              <div id="analytics">
                <AnalyticsCharts />
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      <Toaster position="bottom-right" richColors />
    </div>
  )
}
