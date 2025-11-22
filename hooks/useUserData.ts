import { UserApi } from "@/api/domains/user-api"
import { useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"

export const useUserData = () => {
  const { i18n } = useTranslation()
  const isAuthenticated = localStorage.getItem('accessToken')
  const { data: userData, isLoading, refetch: refetchUserData, isError } = useQuery({
    queryKey: ["get-me", i18n.language],
    queryFn: UserApi.fetchUserData,
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
    enabled: Boolean(isAuthenticated)
  })

  if (userData && isAuthenticated) {
    console.log(userData);

  }

  return { userData, isLoading, refetchUserData, isError }
}
