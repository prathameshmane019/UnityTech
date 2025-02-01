"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { fetchWithErrorHandling } from "@/app/libs/api"
import { toast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  login: (token: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      setIsAuthenticated(false)
      setIsLoading(false)
      return
    }

    try {
      await fetchWithErrorHandling("/api/auth/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setIsAuthenticated(true)
    } catch (error) {
      setIsAuthenticated(false)
      localStorage.removeItem("token")
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (token: string) => {
    if (!token) {
      toast({
        title: "Login failed",
        description: "Invalid credentials",
        variant: "destructive",
      })
      return
    }

    localStorage.setItem("token", token)
    setIsAuthenticated(true)
    router.push("/admin")
    toast({ title: "Signed in successfully" })
  }

  const logout = () => {
    localStorage.removeItem("token")
    setIsAuthenticated(false)
    toast({
      title: "Logged out successfully",
    })
    router.push("/signin")
  }

  return <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
    {children}<Toaster /> </AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

