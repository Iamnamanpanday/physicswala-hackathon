"use client"

import { Sun, Moon, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const MODES = [
    { id: "light", icon: Sun, label: "Light" },
    { id: "dark", icon: Moon, label: "Dark" },
    { id: "system", icon: Monitor, label: "System" },
] as const

export function DarkModeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Avoid hydration mismatch
    useEffect(() => { setMounted(true) }, [])
    if (!mounted) return null

    const current = MODES.find((m) => m.id === theme) ?? MODES[1]
    const Icon = current.icon

    // Cycle: dark → light → system → dark
    const cycle = () => {
        const idx = MODES.findIndex((m) => m.id === theme)
        const next = MODES[(idx + 1) % MODES.length]
        setTheme(next.id)
    }

    return (
        <div className="fixed bottom-6 left-6 z-50">
            <motion.button
                onClick={cycle}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-card/95 text-muted-foreground shadow-lg backdrop-blur hover:text-foreground transition-colors"
                aria-label={`Switch theme (current: ${current.label})`}
                title={`Current: ${current.label} — click to cycle`}
            >
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                        key={theme}
                        initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 30, opacity: 0, scale: 0.7 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-center"
                    >
                        <Icon className="h-5 w-5" />
                    </motion.span>
                </AnimatePresence>
            </motion.button>
        </div>
    )
}
