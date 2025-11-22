import { ExperienceApi } from "@/api/domains/experiences-api"
import { useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"

export const useExperiencesList = () => {
  const { i18n } = useTranslation()
  const { data: experiencesList = [], isLoading: experiencesListLoading, refetch: refetchExperiencesList } = useQuery({
    queryKey: ["experience-list", i18n.language],
    queryFn: async () => {
      const result = await ExperienceApi.fetchExperiences()

      // Ensure we return an array
      if (Array.isArray(result)) {
        return result
      }
      return []
    },
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
  })

  return { experiencesList, experiencesListLoading, refetchExperiencesList }
}

