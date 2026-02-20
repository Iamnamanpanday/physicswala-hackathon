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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-card/30">
      <DnaBackground />
      <MouseGlow />

      {/* Premium gradient accent - top */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-full max-w-2xl -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/20 via-primary/5 to-transparent blur-3xl opacity-70" />

      {/* Animated accent orbs - refined motion */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {[
          { w: 280, h: 280, x: "5%", y: "15%", c: "from-primary/15 to-transparent", dur: 8 },
          { w: 220, h: 220, x: "80%", y: "55%", c: "from-accent/10 to-transparent", dur: 12 },
          { w: 160, h: 160, x: "50%", y: "5%", c: "from-primary/8 to-transparent", dur: 10 },
        ].map((orb, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full blur-3xl bg-gradient-to-b ${orb.c}`}
            style={{ width: orb.w, height: orb.h, left: orb.x, top: orb.y }}
            animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: orb.dur, repeat: Infinity, ease: "easeInOut", delay: i * 2 }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-20 text-center md:py-32">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary/90 backdrop-blur-sm"
        >
          <Shield className="h-3.5 w-3.5" />
          Precision Medicine Platform
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-balance text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl leading-tight"
        >
          AI-Powered
          <br />
          <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
            Pharmacogenomic Intelligence
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-8 max-w-3xl text-lg text-muted-foreground leading-relaxed"
        >
          Leverage genomic data and CPIC evidence to predict drug-gene interactions in real time. 
          PharmaGuard empowers clinicians with transparent, actionable insights for personalized treatment decisions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="gap-2.5 px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
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
            className="gap-2.5 px-8 text-base font-medium"
          >
            <Link href="/doctor">
              Doctor Dashboard
            </Link>
          </Button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 grid grid-cols-3 gap-6 border-t border-border/50 pt-12 md:flex md:justify-center md:gap-12"
        >
          <div className="flex flex-col items-center gap-1">
            <div className="text-sm font-semibold text-foreground">HIPAA</div>
            <div className="text-xs text-muted-foreground">Compliant</div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="text-sm font-semibold text-foreground">CPIC</div>
            <div className="text-xs text-muted-foreground">Certified</div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="text-sm font-semibold text-foreground">FDA</div>
            <div className="text-xs text-muted-foreground">Aligned</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
