"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getSupabaseBrowserClient } from "@/lib/supabase-client"

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [sent, setSent] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSubmitting(true)

        try {
            const supabase = getSupabaseBrowserClient()
            const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/reset-password`,
            })

            if (resetError) {
                setError(resetError.message)
                return
            }

            setSent(true)
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
                            Reset your password
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Enter your email and we&apos;ll send a reset link.
                        </p>
                    </div>
                </div>

                <Card className="border border-border/80 bg-card/95 p-6 shadow-lg backdrop-blur">
                    {sent ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center gap-3 py-4 text-center"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                                <Shield className="h-5 w-5" />
                            </div>
                            <p className="text-sm font-medium text-foreground">Check your inbox!</p>
                            <p className="text-xs text-muted-foreground">
                                A password reset link has been sent to <strong>{email}</strong>.<br />
                                Click the link in the email to set a new password.
                            </p>
                            <Link href="/login" className="mt-2 text-xs text-primary underline-offset-4 hover:underline">
                                Back to sign in
                            </Link>
                        </motion.div>
                    ) : (
                        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                            <div className="space-y-1.5">
                                <Label htmlFor="email">Email address</Label>
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

                            {error && <p className="text-sm text-destructive">{error}</p>}

                            <Button type="submit" className="mt-1 w-full" size="lg" disabled={submitting}>
                                {submitting ? "Sending…" : "Send Reset Link"}
                            </Button>
                        </form>
                    )}

                    {!sent && (
                        <p className="mt-4 text-center text-xs text-muted-foreground">
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline"
                            >
                                <ArrowLeft className="h-3 w-3" />
                                Back to sign in
                            </Link>
                        </p>
                    )}
                </Card>
            </motion.div>
        </div>
    )
}
