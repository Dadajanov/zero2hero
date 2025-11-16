"use client"

import { useState, useEffect } from "react"
import { useQuery, useMutation } from "@tanstack/react-query"
import { AuthApi, type StudentRegistrationRequest } from "@/api/domains/auth-api"
import { UniversityApi } from "@/api/domains/university-api"

export const useUniversitiesList = () => {
  const [locale, setLocale] = useState("ru")

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "ru"
    setLocale(savedLang)
  }, [])

  const { data: universities = [], isLoading } = useQuery({
    queryKey: ["universities-list", locale],
    queryFn: async () => {
      console.log("[v0] Fetching universities...")
      const result = await UniversityApi.fetchUniversities()
      console.log("[v0] Universities response:", result)
      console.log("[v0] Universities is array:", Array.isArray(result))

      // Ensure we return an array
      if (Array.isArray(result)) {
        console.log("[v0] Universities length:", result.length)
        return result
      }

      console.error("[v0] Universities response is not an array:", typeof result)
      return []
    },
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
  })

  console.log("[v0] Universities in hook:", universities)
  console.log("[v0] Universities in hook is array:", Array.isArray(universities))

  return { universities, isLoading }
}

export const useStudentRegistration = () => {
  const mutation = useMutation({
    mutationFn: (data: StudentRegistrationRequest) => AuthApi.registerStudent(data),
  })

  return mutation
}
