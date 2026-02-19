"use client"

import { motion } from "framer-motion"

export function DnaBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <svg
        className="absolute top-0 left-0 w-full h-full opacity-[0.04]"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1, duration: 1 }}
          >
            <motion.circle
              cx={100 + i * 90}
              cy={200 + Math.sin(i * 0.8) * 120}
              r={6}
              fill="currentColor"
              className="text-primary"
              animate={{
                cy: [
                  200 + Math.sin(i * 0.8) * 120,
                  200 + Math.sin(i * 0.8 + Math.PI) * 120,
                  200 + Math.sin(i * 0.8) * 120,
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.15,
              }}
            />
            <motion.circle
              cx={100 + i * 90}
              cy={200 + Math.sin(i * 0.8 + Math.PI) * 120}
              r={6}
              fill="currentColor"
              className="text-accent"
              animate={{
                cy: [
                  200 + Math.sin(i * 0.8 + Math.PI) * 120,
                  200 + Math.sin(i * 0.8) * 120,
                  200 + Math.sin(i * 0.8 + Math.PI) * 120,
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.15,
              }}
            />
            <motion.line
              x1={100 + i * 90}
              y1={200 + Math.sin(i * 0.8) * 120}
              x2={100 + i * 90}
              y2={200 + Math.sin(i * 0.8 + Math.PI) * 120}
              stroke="currentColor"
              className="text-primary"
              strokeWidth={1.5}
              animate={{
                y1: [
                  200 + Math.sin(i * 0.8) * 120,
                  200 + Math.sin(i * 0.8 + Math.PI) * 120,
                  200 + Math.sin(i * 0.8) * 120,
                ],
                y2: [
                  200 + Math.sin(i * 0.8 + Math.PI) * 120,
                  200 + Math.sin(i * 0.8) * 120,
                  200 + Math.sin(i * 0.8 + Math.PI) * 120,
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.15,
              }}
            />
          </motion.g>
        ))}
      </svg>
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, oklch(0.55 0.15 195 / 0.06) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  )
}
