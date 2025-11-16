import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"

// Example hook for fetching vacancies
export function useVacancies() {
  return useQuery({
    queryKey: ["vacancies"],
    queryFn: api.getVacancies,
  })
}

// Example hook for fetching courses
export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: api.getCourses,
  })
}

// Example hook for fetching user profile
export function useUserProfile(userId: string) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => api.getUserProfile(userId),
    enabled: !!userId, // Only fetch if userId exists
  })
}

// Example mutation hook for updating user profile
export function useUpdateUserProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: any }) => api.updateUserProfile(userId, data),
    onSuccess: (_, variables) => {
      // Invalidate and refetch user profile after successful update
      queryClient.invalidateQueries({ queryKey: ["user", variables.userId] })
    },
  })
}

// Example mutation hook for registration
export function useRegistration() {
  return useMutation({
    mutationFn: api.submitRegistration,
    onSuccess: (data) => {
      console.log("[v0] Registration successful:", data)
    },
    onError: (error) => {
      console.error("[v0] Registration failed:", error)
    },
  })
}
