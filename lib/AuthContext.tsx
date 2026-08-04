'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { fetchApi } from './medusa'

export interface Customer {
  id: string
  email: string
  first_name: string
  last_name: string
  phone?: string | null
  has_account: boolean
  created_at: string
  updated_at: string
}

interface AuthContextType {
  customer: Customer | null
  token: string | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, first_name: string, last_name: string) => Promise<boolean>
  logout: () => void
  updateProfile: (data: { first_name?: string; last_name?: string; phone?: string | null }) => Promise<boolean>
  clearError: () => void
  refreshCustomer: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('medusa_auth_token')
      if (storedToken) {
        setToken(storedToken)
        try {
          const res = await fetchApi<{ customer: Customer }>('/store/customers/me')
          setCustomer(res.customer)
        } catch (err) {
          console.warn("Failed to auto-login customer:", err)
          localStorage.removeItem('medusa_auth_token')
          setToken(null)
          setCustomer(null)
        }
      }
      setLoading(false)
    }
    initializeAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setError(null)
    setLoading(true)
    try {
      const res = await fetchApi<{ token: string }>('/auth/customer/emailpass', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })

      if (res.token) {
        localStorage.setItem('medusa_auth_token', res.token)
        setToken(res.token)
        const meRes = await fetchApi<{ customer: Customer }>('/store/customers/me')
        setCustomer(meRes.customer)
        setLoading(false)
        return true
      }
      throw new Error("Invalid token response")
    } catch (err: any) {
      console.error("Login failed:", err)
      setError("Invalid email or password. Please try again.")
      setLoading(false)
      return false
    }
  }

  const register = async (email: string, password: string, first_name: string, last_name: string): Promise<boolean> => {
    setError(null)
    setLoading(true)
    try {
      // 1. Register auth identity
      const regRes = await fetchApi<{ token: string }>('/auth/customer/emailpass/register', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })

      if (!regRes.token) {
        throw new Error("Failed to register credentials")
      }

      // Temporarily store the initial token in localStorage so fetchApi picks it up
      localStorage.setItem('medusa_auth_token', regRes.token)

      // 2. Create customer profile and link
      await fetchApi<{ customer: Customer }>('/store/customers', {
        method: 'POST',
        body: JSON.stringify({ email, first_name, last_name })
      })

      // 3. Log in again to get session token with actor_id
      const loginRes = await fetchApi<{ token: string }>('/auth/customer/emailpass', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })

      if (loginRes.token) {
        localStorage.setItem('medusa_auth_token', loginRes.token)
        setToken(loginRes.token)
        const meRes = await fetchApi<{ customer: Customer }>('/store/customers/me')
        setCustomer(meRes.customer)
        setLoading(false)
        return true
      }
      throw new Error("Failed to authenticate after registration")
    } catch (err: any) {
      console.error("Registration failed:", err)
      setError("Registration failed. Email may already be in use or format is invalid.")
      localStorage.removeItem('medusa_auth_token')
      setToken(null)
      setCustomer(null)
      setLoading(false)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('medusa_auth_token')
    setToken(null)
    setCustomer(null)
  }

  const updateProfile = async (data: { first_name?: string; last_name?: string; phone?: string | null }): Promise<boolean> => {
    setError(null)
    try {
      const res = await fetchApi<{ customer: Customer }>('/store/customers/me', {
        method: 'POST',
        body: JSON.stringify(data)
      })
      setCustomer(res.customer)
      return true
    } catch (err) {
      console.error("Update profile failed:", err)
      setError("Failed to update profile details. Please try again.")
      return false
    }
  }

  const clearError = () => setError(null)

  const refreshCustomer = async () => {
    try {
      const res = await fetchApi<{ customer: Customer }>('/store/customers/me')
      setCustomer(res.customer)
    } catch (err) {
      console.error("Failed to refresh customer:", err)
    }
  }

  return (
    <AuthContext.Provider value={{ customer, token, loading, error, login, register, logout, updateProfile, clearError, refreshCustomer }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
