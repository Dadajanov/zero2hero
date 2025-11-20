'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface User {
  id: number
  name: string
  phoneNumber: string
  email?: string
  purpose?: "internship" | "work" | "internship_work"
  status?: "applicant" | "student" | "graduate"
  universityCourse?: number
  universityId?: number
  [key: string]: any
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  clearUser: () => void
  isAuthenticated: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load user data from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        try {
          setUserState(JSON.parse(storedUser))
        } catch (error) {
          console.error('[v0] Failed to parse user data from localStorage:', error)
          localStorage.removeItem('user')
        }
      }
      setIsLoaded(true)
    }
  }, [])

  // Save user data to localStorage whenever it changes
  const setUser = (userData: User | null) => {
    setUserState(userData)
    if (typeof window !== 'undefined') {
      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData))
      } else {
        localStorage.removeItem('user')
      }
    }
  }

  const clearUser = () => {
    setUserState(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user')
    }
  }

  const value: UserContextType = {
    user,
    setUser,
    clearUser,
    isAuthenticated: !!user,
  }

  // Don't render children until we've loaded user data from localStorage
  if (!isLoaded) {
    return null
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

// Kept for backward compatibility but will be removed
export {}
