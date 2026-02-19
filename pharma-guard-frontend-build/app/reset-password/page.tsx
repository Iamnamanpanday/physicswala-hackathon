"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getSupabaseBrowserClient } from "@/lib/supabase-client"

export default function ResetPasswordPage() {
    const router = useRouter()
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [done, setDone] = useState(false)
    const [validSession, setValidSession] = useState(false)

    // Supabase puts the access token in the URL hash when coming from the reset email
    useEffect(() => {
        const supabase = getSupabaseBrowserClient()
        supabase.auth.getSession().then(({ data }) => {
            if (data.session) setValidSession(true)
        })
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if (password !== confirmPassword) {
            setError("Passwords do not match.")
            return
        }

        setSubmitting(true)
        try {
            const supabase = getSupabaseBrowserClient()
            const { error: updateError } = await supabase.auth.updateUser({ password })

            if (updateError) {
                setError(updateError.message)
                return
            }

            setDone(true)
            setTimeout(() => router.push("/login"), 2500)
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
                    <h1 className="text-xl font-semibold tracking-tight text-foreground">Set new password</h1>
                    <p className="text-sm text-muted-foreground">Choose a strong new password for your account.</p>
                </div>

                <Card className="border border-border/80 bg-card/95 p-6 shadow-lg backdrop-blur">
                    {done ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center gap-3 py-4 text-center"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                                <Shield className="h-5 w-5" />
                            </div>
                            <p className="text-sm font-medium text-foreground">Password updated!</p>
                            <p className="text-xs text-muted-foreground">Redirecting you to sign in…</p>
                        </motion.div>
                    ) : (
                        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                            <div className="space-y-1.5">
                                <Label htmlFor="password">New Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="confirm">Confirm Password</Label>
                                <Input
                                    id="confirm"
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {error && <p className="text-sm text-destructive">{error}</p>}

                            <Button type="submit" className="mt-1 w-full" size="lg" disabled={submitting}>
                                {submitting ? "Updating…" : "Update Password"}
                            </Button>
                        </form>
                    )}
                </Card>
            </motion.div>
        </div>
    )
}
