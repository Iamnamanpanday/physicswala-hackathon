"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useTheme } from "next-themes"

type ThemeColor = "teal" | "purple" | "blue" | "orange"

const COLOR_CLASSES: Record<ThemeColor, string> = {
    teal: "",
    purple: "theme-purple",
    blue: "theme-blue",
    orange: "theme-orange",
}

interface ThemeColorContextValue {
    color: ThemeColor
    setColor: (c: ThemeColor) => void
}

const ThemeColorContext = createContext<ThemeColorContextValue>({
    color: "teal",
    setColor: () => { },
})

export function ThemeColorProvider({ children }: { children: React.ReactNode }) {
    const [color, setColorState] = useState<ThemeColor>("teal")
    const { resolvedTheme } = useTheme()

    const applyColor = (c: ThemeColor, mode?: string) => {
        const html = document.documentElement
        // Remove all color theme classes
        Object.values(COLOR_CLASSES).forEach((cls) => { if (cls) html.classList.remove(cls) })
        // Apply new color class
        if (COLOR_CLASSES[c]) html.classList.add(COLOR_CLASSES[c])
    }

    const setColor = (c: ThemeColor) => {
        setColorState(c)
        localStorage.setItem("pharma-theme-color", c)
        applyColor(c)
    }

    // Restore persisted color on mount
    useEffect(() => {
        const saved = (localStorage.getItem("pharma-theme-color") as ThemeColor) ?? "teal"
        setColorState(saved)
        applyColor(saved)
    }, [])

    // Re-apply color class whenever dark/light mode changes (next-themes may re-set html classes)
    useEffect(() => {
        applyColor(color)
    }, [resolvedTheme, color])

    return (
        <ThemeColorContext.Provider value={{ color, setColor }}>
            {children}
        </ThemeColorContext.Provider>
    )
}

export function useThemeColor() {
    return useContext(ThemeColorContext)
}
