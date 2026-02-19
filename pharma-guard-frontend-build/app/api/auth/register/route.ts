import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

type Role = "patient" | "doctor" | "admin"

export async function POST(request: Request) {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

    if (!serviceRoleKey || !supabaseUrl) {
        return NextResponse.json(
            { error: "Server is not configured with a service role key. Please add SUPABASE_SERVICE_ROLE_KEY to .env.local" },
            { status: 500 }
        )
    }

    const { email, password, role } = await request.json() as {
        email: string
        password: string
        role: Role
    }

    if (!email || !password || !role) {
        return NextResponse.json({ error: "Email, password, and role are required." }, { status: 400 })
    }

    // Admin client — server-side only, uses service_role key
    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false },
    })

    // Create user with email_confirm: true — bypasses confirmation email entirely
    const { data, error } = await adminClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true,       // ← confirms immediately, no email sent
        user_metadata: { role },
    })

    if (error) {
        // If user already exists, return a clear message
        if (error.message.toLowerCase().includes("already been registered") ||
            error.message.toLowerCase().includes("already registered") ||
            error.message.toLowerCase().includes("user already exists")) {
            return NextResponse.json({ error: "This email is already registered. Please sign in." }, { status: 409 })
        }
        return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, userId: data.user?.id })
}
