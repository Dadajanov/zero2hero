"use client"

import { useState, useEffect } from "react"
import { AuthApi, type StudentRegistrationRequest } from "@/api/domains/auth-api"
import { UniversityApi } from "@/api/domains/university-api"

export const useUniversitiesList = () => {
  const [locale, setLocale] = useState("ru")
  const [universities, setUniversities] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "ru"
    setLocale(savedLang)
  }, [])

  useEffect(() => {
    const fetchUniversities = async () => {
      setIsLoading(true)
      try {
        console.log("[v0] Fetching universities...")
        const result = await UniversityApi.fetchUniversities()
        console.log("[v0] Universities response:", result)
        console.log("[v0] Universities is array:", Array.isArray(result))

        if (Array.isArray(result)) {
          console.log("[v0] Universities length:", result.length)
          setUniversities(result)
        } else {
          console.error("[v0] Universities response is not an array:", typeof result)
          setUniversities([])
        }
      } catch (error) {
        console.error("[v0] Error fetching universities:", error)
        setUniversities([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchUniversities()
  }, [locale])

  return { universities, isLoading }
}

export const useStudentRegistration = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const mutate = async (
    data: StudentRegistrationRequest,
    options?: {
      onSuccess?: (data: any) => void
      onError?: (error: Error) => void
    }
  ) => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await AuthApi.registerStudent(data)
      options?.onSuccess?.(result)
      return result
    } catch (err) {
      const error = err as Error
      setError(error)
      options?.onError?.(error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return { mutate, isLoading, error }
}
