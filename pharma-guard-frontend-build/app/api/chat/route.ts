import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"

const SYSTEM_PROMPT = `You are PharmaGuard AI, an expert pharmacogenomics assistant embedded in the PharmaGuard precision medicine platform. Your role is to help patients, doctors, and admins understand:

1. **Pharmacogenomics**: How genetic variants (SNPs, alleles) affect drug metabolism and response
2. **Drug-Gene Interactions**: Specific genes like CYP2C9, CYP2C19, CYP2D6, SLCO1B1, VKORC1, TPMT, DPYD, UGT1A1 and their clinical significance
3. **CPIC Guidelines**: Clinical Pharmacogenomics Implementation Consortium recommendations for dosing
4. **Drug Risk Levels**: Understanding "safe", "adjust dose", "avoid", and "toxic" risk classifications
5. **Genetic Phenotypes**: Explaining terms like Poor Metabolizer, Intermediate Metabolizer, Normal Metabolizer, Rapid Metabolizer, Ultrarapid Metabolizer
6. **Platform Usage**: How to use PharmaGuard dashboards (patient analysis, doctor review, admin controls)
7. **Common Medications**: Warfarin, Clopidogrel, Simvastatin, SSRIs, Codeine, Tamoxifen, etc.

Be concise, accurate, and compassionate. Always remind users that AI responses are informational and that clinical decisions should always involve a qualified healthcare professional.

If asked about completely unrelated topics (sports, cooking, politics etc.), politely redirect: "I'm specialized in pharmacogenomics and precision medicine. I'd be happy to help with drug-gene interactions, CPIC guidelines, or how to use PharmaGuard!"

Format responses with markdown for clarity when helpful. Keep responses concise — 2-4 paragraphs max.`

export async function POST(request: Request) {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
        return NextResponse.json(
            { error: "Gemini API key not configured." },
            { status: 500 }
        )
    }

    const { message, history } = await request.json() as {
        message: string
        history: { role: "user" | "model"; parts: { text: string }[] }[]
    }

    if (!message?.trim()) {
        return NextResponse.json({ error: "Message is required." }, { status: 400 })
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey)
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            systemInstruction: SYSTEM_PROMPT,
        })

        const chat = model.startChat({
            history: history ?? [],
            generationConfig: {
                maxOutputTokens: 1024,
                temperature: 0.7,
            },
        })

        const result = await chat.sendMessage(message)
        const text = result.response.text()

        return NextResponse.json({ reply: text })
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error"
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
