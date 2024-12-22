'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type User = {
  name: string
  email: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check if user is logged in (e.g., by checking local storage or a token)
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Here you would typically make an API call to authenticate the user
    // For this example, we'll just simulate a successful login
    const user = { name: 'John Doe', email }
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const register = async (email: string, password: string) => {
    // Here you would typically make an API call to register the user
    // For this example, we'll just simulate a successful registration
    const user = { name: 'John Doe', email }
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
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

