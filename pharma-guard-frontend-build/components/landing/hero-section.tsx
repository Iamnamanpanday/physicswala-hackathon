"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { DnaBackground } from "@/components/dna-background"
import { ArrowRight, Shield } from "lucide-react"
import Link from "next/link"

function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = glowRef.current?.parentElement
    if (!section) return

    const handleMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(56,189,248,0.10) 0%, rgba(16,185,129,0.07) 30%, transparent 70%)`
      }
    }

    const handleLeave = () => {
      if (glowRef.current) {
        glowRef.current.style.background = "transparent"
      }
    }

    section.addEventListener("mousemove", handleMove)
    section.addEventListener("mouseleave", handleLeave)
    return () => {
      section.removeEventListener("mousemove", handleMove)
      section.removeEventListener("mouseleave", handleLeave)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className="pointer-events-none absolute inset-0 z-0 transition-[background] duration-150"
    />
  )
}

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950">
      <DnaBackground />

      {/* Mouse-following interactive glow */}
      <MouseGlow />

      {/* Static ambient glow ring */}
      <div className="pointer-events-none absolute inset-0 opacity-60 z-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[conic-gradient(from_190deg_at_50%_50%,rgba(56,189,248,0.12),rgba(16,185,129,0.28),rgba(129,140,248,0.22),transparent_70%)] blur-3xl" />
      </div>

      {/* Floating particle orbs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {[
          { w: 320, h: 320, x: "10%", y: "20%", c: "rgba(16,185,129,0.06)", dur: 8 },
          { w: 240, h: 240, x: "75%", y: "60%", c: "rgba(56,189,248,0.07)", dur: 11 },
          { w: 180, h: 180, x: "55%", y: "10%", c: "rgba(129,140,248,0.07)", dur: 9 },
          { w: 200, h: 200, x: "20%", y: "70%", c: "rgba(56,189,248,0.05)", dur: 13 },
        ].map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{ width: orb.w, height: orb.h, left: orb.x, top: orb.y, background: orb.c }}
            animate={{ y: [0, -24, 0], x: [0, 10, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: orb.dur, repeat: Infinity, ease: "easeInOut", delay: i * 1.5 }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-slate-900/60 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-emerald-300/90 shadow-[0_0_22px_rgba(16,185,129,0.45)] backdrop-blur-md"
        >
          <Shield className="h-4 w-4" />
          Precision Medicine Platform
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-balance text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl"
        >
          AI-Powered Pharmacogenomic
          <br />
          <span className="bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_32px_rgba(56,189,248,0.65)]">
            Risk Prediction
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-pretty text-[15px] leading-relaxed text-slate-300/90"
        >
          Leverage genomic data and CPIC guidelines to predict drug-gene interactions
          in real time. PharmaGuard helps clinicians make informed, personalized
          treatment decisions with explainable AI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="gap-2 px-8 text-[15px] font-semibold tracking-tight bg-gradient-to-r from-emerald-400 via-sky-500 to-indigo-500 text-slate-950 shadow-[0_0_28px_rgba(56,189,248,0.9)] transition-all hover:-translate-y-[2px] hover:shadow-[0_0_40px_rgba(56,189,248,1)]"
          >
            <Link href="/patient">
              Analyze Patient
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2 px-8 text-[15px] font-medium border border-sky-400/70 bg-slate-950/40 text-sky-100 shadow-[0_0_24px_rgba(56,189,248,0.55)] backdrop-blur hover:bg-slate-900/80"
          >
            <Link href="/doctor">
              Doctor Dashboard
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 flex items-center justify-center gap-8 text-xs text-slate-400"
        >
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(16,185,129,0.9)]" />
            HIPAA Compliant
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_14px_rgba(56,189,248,0.9)]" />
            CPIC Certified
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_14px_rgba(129,140,248,0.9)]" />
            FDA Guidelines
          </div>
        </motion.div>
      </div>
    </section>
  )
}
