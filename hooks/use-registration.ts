"use client"

import { AuthApi } from "@/api/domains/auth-api"
import { UniversityApi } from "@/api/domains/university-api"
import { StudentRegistrationRequest } from "@/api/types/auth-api"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

export const useUniversitiesList = () => {
  const [locale, setLocale] = useState("ru")

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "ru"
    setLocale(savedLang)
  }, [])

  const { data: universities = [], isLoading } = useQuery({
    queryKey: ["universities-list", locale],
    queryFn: async () => {
      const result = await UniversityApi.fetchUniversities()

      // Ensure we return an array
      if (Array.isArray(result)) {
        return result
      }
      return []
    },
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
  })

  return { universities, isLoading }
}

export const useStudentRegistration = () => {
  const mutation = useMutation({
    mutationFn: (data: StudentRegistrationRequest) => AuthApi.registerStudent(data),
  })

  return mutation
}
