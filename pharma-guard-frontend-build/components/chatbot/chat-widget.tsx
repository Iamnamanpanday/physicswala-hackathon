"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Message = {
    id: string
    role: "user" | "assistant"
    content: string
}

// ─── Predefined Q&A knowledge base ────────────────────────────────────────────
const QA: { keywords: string[]; answer: string }[] = [
    {
        keywords: ["cyp2c19", "cyp 2c19"],
        answer:
            "**CYP2C19** is a liver enzyme that metabolizes many common drugs including clopidogrel (Plavix), certain antidepressants (SSRIs), and proton pump inhibitors (PPIs).\n\nYour CYP2C19 gene variant determines if you are a *Poor Metabolizer* (drugs stay longer, higher risk), *Normal Metabolizer*, or *Ultrarapid Metabolizer* (drugs clear too fast, reduced effect).\n\n> Always discuss your results with your doctor before changing any medication.",
    },
    {
        keywords: ["cyp2c9", "cyp 2c9"],
        answer:
            "**CYP2C9** metabolizes warfarin (a blood thinner), NSAIDs like ibuprofen, and several diabetes medications.\n\nVariants like *1/*3 (Intermediate Metabolizer) reduce enzyme activity by ~80%, causing drugs to accumulate. CPIC guidelines recommend dose reductions for warfarin in CYP2C9 poor metabolizers.\n\n> Clinical decisions should always be made with your healthcare provider.",
    },
    {
        keywords: ["cyp2d6", "cyp 2d6"],
        answer:
            "**CYP2D6** metabolizes ~25% of all medications including codeine, tamoxifen, many antidepressants (SSRIs/TCAs), and antipsychotics.\n\nPoor Metabolizers cannot activate codeine into morphine (reduced pain relief), while Ultrarapid Metabolizers convert it dangerously fast. CPIC recommends avoiding codeine in both extremes.",
    },
    {
        keywords: ["warfarin", "blood thinner", "anticoagulant"],
        answer:
            "**Warfarin** dosing is heavily influenced by two genes:\n- **CYP2C9** — affects how fast warfarin is metabolized\n- **VKORC1** — determines sensitivity to warfarin's effect\n\nPharmaGuard analyzes both to help predict optimal starting doses. Too much warfarin causes bleeding; too little causes clotting. CPIC Level A evidence supports gene-guided dosing.",
    },
    {
        keywords: ["clopidogrel", "plavix"],
        answer:
            "**Clopidogrel (Plavix)** is a prodrug — it must be activated by **CYP2C19** to work. CYP2C19 *Poor Metabolizers* (*2/*2) have significantly reduced active metabolite, leading to inadequate platelet inhibition and higher cardiovascular event risk.\n\nCPIC recommends alternative antiplatelet therapy (prasugrel or ticagrelor) for poor metabolizers.",
    },
    {
        keywords: ["simvastatin", "statin", "slco1b1"],
        answer:
            "**Simvastatin** (and other statins) are transported into liver cells by the **SLCO1B1** protein. The SLCO1B1 521C variant reduces transporter function, increasing statin blood levels and risk of myopathy (muscle damage).\n\nPharmaGuard reports SLCO1B1 521TT (Normal Function) as 'Safe' for standard statin doses.",
    },
    {
        keywords: ["poor metabolizer", "poor metab"],
        answer:
            "A **Poor Metabolizer** has reduced or absent enzyme activity due to genetic variants. This means:\n- Drugs that need the enzyme for clearance accumulate → **toxicity risk**\n- Prodrugs that need the enzyme for activation may not work → **reduced efficacy**\n\nExample: CYP2C19 Poor Metabolizer + clopidogrel = inadequate antiplatelet effect.",
    },
    {
        keywords: ["ultrarapid", "ultra rapid", "rapid metabolizer"],
        answer:
            "An **Ultrarapid Metabolizer** has extra enzyme copies (gene duplication), breaking down drugs much faster than normal. This can:\n- Reduce drug effectiveness (drug clears before it works)\n- Cause dangerous effects with prodrugs (e.g., codeine converts to morphine too rapidly)\n\nCPIC guidelines flag ultrarapid metabolizers for dose adjustments or drug switches.",
    },
    {
        keywords: ["cpic", "guideline", "guidelines"],
        answer:
            "**CPIC (Clinical Pharmacogenomics Implementation Consortium)** publishes evidence-based guidelines for using genetic test results to guide drug therapy.\n\nCPIC levels:\n- **Level A** — strong evidence, strong recommendation to change prescribing\n- **Level B** — moderate evidence\n- **Level C/D** — limited evidence\n\nPharmaGuard uses CPIC Level A & B guidelines for all risk assessments.",
    },
    {
        keywords: ["vcf", "vcf file", "genomic", "genome", "dna", "genetic test"],
        answer:
            "**VCF (Variant Call Format)** files contain your genetic variant data from genome sequencing or genotyping arrays.\n\nIn PharmaGuard, you upload a VCF file in the **Patient Analysis** dashboard. The platform extracts relevant pharmacogene variants (CYP2C9, CYP2C19, SLCO1B1, etc.) and matches them against CPIC guidelines to generate drug risk reports.",
    },
    {
        keywords: ["risk", "risk level", "safe", "toxic", "adjust", "avoid"],
        answer:
            "PharmaGuard assigns four **risk levels** based on your genetic profile:\n- 🟢 **Safe** — standard dosing is appropriate\n- 🟡 **Adjust** — dose modification recommended\n- 🔴 **Avoid** — alternative drug strongly recommended\n- ⛔ **Toxic** — serious adverse reaction risk; do not use\n\nThese are derived from CPIC evidence-based guidelines.",
    },
    {
        keywords: ["patient", "patient dashboard", "patient analysis"],
        answer:
            "The **Patient Analysis Dashboard** allows you to:\n1. Upload your VCF genomic data file\n2. Select the drugs you are taking or being prescribed\n3. Enter basic patient information\n4. Click **Run Analysis** to get drug-gene risk predictions\n\nResults show each drug's risk level, the relevant gene, your phenotype, and a clinical recommendation.",
    },
    {
        keywords: ["doctor", "doctor dashboard", "physician"],
        answer:
            "The **Doctor Dashboard** gives clinicians an overview of patient analyses, risk alerts, and pharmacogenomic analytics across their patient cohort.\n\nDoctors can review flagged high-risk cases and send alerts directly through the platform.",
    },
    {
        keywords: ["admin", "administrator", "admin dashboard"],
        answer:
            "The **Admin Dashboard** provides platform-wide oversight including:\n- Active clinician count\n- Security event monitoring\n- Total analyses performed\n- Role-based access control (RBAC) management",
    },
    {
        keywords: ["pharmaguard", "what is pharmaguard", "about"],
        answer:
            "**PharmaGuard** is an AI-powered pharmacogenomic risk prediction platform for precision medicine.\n\nIt uses your genomic data (VCF files) and CPIC guidelines to predict how your unique genetic makeup affects your response to medications — helping clinicians make safer, personalized prescribing decisions.",
    },
    {
        keywords: ["hello", "hi", "hey", "greet"],
        answer:
            "Hi there! 👋 I'm **PharmaGuard AI**, your pharmacogenomics assistant.\n\nI can help you understand drug-gene interactions, explain your risk results, or guide you through using the platform. What would you like to know?",
    },
    {
        keywords: ["thank", "thanks", "thank you"],
        answer:
            "You're welcome! 😊 Feel free to ask anything else about pharmacogenomics, your drug-gene results, or how to use PharmaGuard.",
    },
    {
        keywords: ["forgot password", "reset password", "password"],
        answer:
            "To reset your password:\n1. Go to the **Login** page\n2. Click **\"Forgot password?\"** link\n3. Enter your email address\n4. Check your inbox for the reset link\n5. Click the link and set your new password",
    },
    {
        keywords: ["register", "sign up", "create account"],
        answer:
            "To create a PharmaGuard account:\n1. Go to **[/register](/register)**\n2. Enter your email, password, and select your role (Patient / Doctor / Admin)\n3. Click **Create Account**\n4. You can sign in immediately — no email confirmation required!",
    },
]

const FALLBACK =
    "I'm not sure about that specific question. I can help with topics like **CYP genes** (CYP2C19, CYP2C9, CYP2D6), **drug interactions** (warfarin, clopidogrel, simvastatin), **metabolizer types**, **CPIC guidelines**, or **how to use PharmaGuard**. Try asking one of those!"

function findAnswer(input: string): string {
    const lower = input.toLowerCase().trim()
    for (const qa of QA) {
        if (qa.keywords.some((kw) => lower.includes(kw))) {
            return qa.answer
        }
    }
    return FALLBACK
}

// ─── Suggestion chips ────────────────────────────────────────────────────────
const SUGGESTIONS = [
    "What is CYP2C19?",
    "What does Poor Metabolizer mean?",
    "How does warfarin work with genes?",
    "What is PharmaGuard?",
]

const WELCOME: Message = {
    id: "welcome",
    role: "assistant",
    content:
        "Hi! I'm **PharmaGuard AI** 🧬\n\nI can help you understand pharmacogenomics, drug-gene interactions, CPIC guidelines, and how to use this platform.\n\nWhat would you like to know?",
}

// ─── Simple markdown renderer (bold + line breaks) ───────────────────────────
function SimpleMarkdown({ text }: { text: string }) {
    const parts = text.split(/(\*\*[^*]+\*\*)/g)
    return (
        <span>
            {parts.map((part, i) =>
                part.startsWith("**") && part.endsWith("**") ? (
                    <strong key={i}>{part.slice(2, -2)}</strong>
                ) : (
                    <span key={i}>
                        {part.split("\n").map((line, j, arr) => (
                            <span key={j}>
                                {line}
                                {j < arr.length - 1 && <br />}
                            </span>
                        ))}
                    </span>
                )
            )}
        </span>
    )
}

// ─── Main widget ─────────────────────────────────────────────────────────────
export function ChatWidget() {
    const [open, setOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([WELCOME])
    const [input, setInput] = useState("")
    const [typing, setTyping] = useState(false)
    const bottomRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 300)
    }, [open])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, typing])

    const sendMessage = (text: string) => {
        if (!text.trim() || typing) return

        const userMsg: Message = { id: Date.now().toString(), role: "user", content: text.trim() }
        setMessages((prev) => [...prev, userMsg])
        setInput("")
        setTyping(true)

        // Simulate a brief typing delay for natural feel
        setTimeout(() => {
            const answer = findAnswer(text)
            setMessages((prev) => [
                ...prev,
                { id: (Date.now() + 1).toString(), role: "assistant", content: answer },
            ])
            setTyping(false)
        }, 600)
    }

    return (
        <>
            {/* Floating button */}
            <motion.button
                onClick={() => setOpen((v) => !v)}
                className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle AI chat"
            >
                <AnimatePresence mode="wait" initial={false}>
                    {open ? (
                        <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                            <X className="h-6 w-6" />
                        </motion.span>
                    ) : (
                        <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                            <MessageCircle className="h-6 w-6" />
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Chat panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="panel"
                        initial={{ opacity: 0, y: 24, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 24, scale: 0.95 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="fixed bottom-24 right-6 z-50 flex w-[360px] flex-col rounded-2xl border border-border/80 bg-card shadow-2xl overflow-hidden"
                        style={{ maxHeight: "calc(100vh - 120px)" }}
                    >
                        {/* Header */}
                        <div className="flex items-center gap-3 border-b border-border bg-card/95 px-4 py-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Bot className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-foreground">PharmaGuard AI</p>
                                <p className="text-xs text-muted-foreground">Pharmacogenomics Assistant</p>
                            </div>
                            <div className="ml-auto h-2 w-2 rounded-full bg-green-500" title="Online" />
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 280, maxHeight: 420 }}>
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                    {msg.role === "assistant" && (
                                        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <Bot className="h-3 w-3" />
                                        </div>
                                    )}
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${msg.role === "user"
                                                ? "bg-primary text-primary-foreground rounded-tr-sm"
                                                : "bg-muted text-foreground rounded-tl-sm"
                                            }`}
                                    >
                                        <SimpleMarkdown text={msg.content} />
                                    </div>
                                </div>
                            ))}

                            {/* Typing indicator */}
                            {typing && (
                                <div className="flex gap-2">
                                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <Bot className="h-3 w-3" />
                                    </div>
                                    <div className="rounded-2xl rounded-tl-sm bg-muted px-4 py-3 flex gap-1 items-center">
                                        {[0, 1, 2].map((i) => (
                                            <motion.div
                                                key={i}
                                                className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                                                animate={{ opacity: [0.3, 1, 0.3] }}
                                                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Suggestion chips — only at start */}
                            {messages.length === 1 && !typing && (
                                <div className="flex flex-col gap-1.5 pt-1">
                                    {SUGGESTIONS.map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => sendMessage(s)}
                                            className="rounded-xl border border-border bg-background px-3 py-1.5 text-left text-xs text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors"
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <div ref={bottomRef} />
                        </div>

                        {/* Input */}
                        <form
                            onSubmit={(e) => { e.preventDefault(); sendMessage(input) }}
                            className="flex gap-2 border-t border-border bg-card/95 px-3 py-3"
                        >
                            <Input
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about drug-gene interactions…"
                                className="flex-1 h-9 text-sm"
                                disabled={typing}
                            />
                            <Button type="submit" size="icon" className="h-9 w-9 shrink-0" disabled={!input.trim() || typing}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
