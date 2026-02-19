"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"
import type { Session } from "@supabase/supabase-js"
import { getSupabaseBrowserClient } from "@/lib/supabase-client"

type Role = "patient" | "doctor" | "admin" | null

interface AuthContextValue {
  session: Session | null
  role: Role
  initializing: boolean
  login: (session: Session | null) => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function deriveRoleFromSession(session: Session | null): Role {
  const metadataRole = session?.user?.user_metadata?.role as Role | undefined
  if (metadataRole === "patient" || metadataRole === "doctor" || metadataRole === "admin") {
    return metadataRole
  }
  return null
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [role, setRole] = useState<Role>(null)
  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    const supabase = getSupabaseBrowserClient()

    let isMounted = true

    const syncInitialSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (!isMounted) return
      const s = data.session ?? null
      setSession(s)
      setRole(deriveRoleFromSession(s))
      setInitializing(false)
    }

    void syncInitialSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, updatedSession) => {
      setSession(updatedSession)
      setRole(deriveRoleFromSession(updatedSession))
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  const login = useCallback((newSession: Session | null) => {
    setSession(newSession)
    setRole(deriveRoleFromSession(newSession))
  }, [])

  const logout = useCallback(async () => {
    const supabase = getSupabaseBrowserClient()
    await supabase.auth.signOut()
    setSession(null)
    setRole(null)
  }, [])

  return (
    <AuthContext.Provider value={{ session, role, initializing, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return ctx
}
