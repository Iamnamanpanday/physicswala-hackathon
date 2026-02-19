"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Palette } from "lucide-react"
import { useState } from "react"
import { useThemeColor } from "@/components/theme-color-provider"

const THEMES = [
    { id: "teal", label: "Teal", color: "#2dd4bf" },
    { id: "purple", label: "Purple", color: "#a855f7" },
    { id: "blue", label: "Blue", color: "#3b82f6" },
    { id: "orange", label: "Amber", color: "#f59e0b" },
] as const

export function ThemePicker() {
    const { color, setColor } = useThemeColor()
    const [open, setOpen] = useState(false)

    return (
        <div className="fixed bottom-24 left-6 z-50 flex flex-col items-start gap-2">
            {/* Color swatches */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="flex flex-col gap-2 rounded-2xl border border-border/80 bg-card/95 p-3 shadow-xl backdrop-blur"
                    >
                        {THEMES.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => { setColor(t.id); setOpen(false) }}
                                className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 text-left text-xs font-medium text-foreground hover:bg-muted transition-colors"
                                title={t.label}
                            >
                                <span
                                    className="h-5 w-5 rounded-full border-2 transition-transform"
                                    style={{
                                        backgroundColor: t.color,
                                        borderColor: color === t.id ? t.color : "transparent",
                                        transform: color === t.id ? "scale(1.2)" : "scale(1)",
                                        boxShadow: color === t.id ? `0 0 0 2px ${t.color}55` : "none",
                                    }}
                                />
                                {t.label}
                                {color === t.id && (
                                    <span className="ml-auto text-[10px] text-muted-foreground">Active</span>
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle button */}
            <motion.button
                onClick={() => setOpen((v) => !v)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-card/95 text-muted-foreground shadow-lg backdrop-blur hover:text-foreground transition-colors"
                aria-label="Change theme colour"
            >
                <Palette className="h-5 w-5" />
            </motion.button>
        </div>
    )
}
