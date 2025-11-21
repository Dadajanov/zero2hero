import { EducationApi } from "@/api/domains/education-api"
import { useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"

export const useEducationList = () => {
  const { i18n } = useTranslation()
  const { data: educationsList = [], isLoading: educationsListLoading, refetch: refetchEducationList } = useQuery({
    queryKey: ["education-list", i18n.language],
    queryFn: async () => {
      const result = await EducationApi.fetchUserEducationsList()

      // Ensure we return an array
      if (Array.isArray(result)) {
        return result
      }
      return []
    },
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
  })

  return { educationsList, educationsListLoading, refetchEducationList }
}

