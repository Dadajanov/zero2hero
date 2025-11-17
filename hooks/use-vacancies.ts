import { useState, useEffect } from "react"
import { api } from "@/lib/api"

export function useVacancies() {
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const result = await api.getVacancies()
        setData(result)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  return { data, isLoading, error }
}

export function useCourses() {
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const result = await api.getCourses()
        setData(result)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  return { data, isLoading, error }
}

export function useUserProfile(userId: string) {
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!userId) return

    const fetchData = async () => {
      setIsLoading(true)
      try {
        const result = await api.getUserProfile(userId)
        setData(result)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [userId])

  return { data, isLoading, error }
}

export function useUpdateUserProfile() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const mutate = async ({ userId, data }: { userId: string; data: any }) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await api.updateUserProfile(userId, data)
      return result
    } catch (err) {
      const error = err as Error
      setError(error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return { mutate, isLoading, error }
}

export function useRegistration() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const mutate = async (data: any) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await api.submitRegistration(data)
      console.log("[v0] Registration successful:", result)
      return result
    } catch (err) {
      const error = err as Error
      setError(error)
      console.error("[v0] Registration failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return { mutate, isLoading, error }
}
