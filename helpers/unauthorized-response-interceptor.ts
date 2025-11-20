import { HTTP_CODE_UNAUTHORIZED } from '@/constants/http-codes'
import { removeAuthTokens } from '@/helpers/authentication-manager'
import { useUserStore } from '@/stores/user-store'
import type { AxiosInstance, AxiosError } from 'axios'

// ----------------------------------------------------------------------
// Unauthorized Response Interceptor
// ----------------------------------------------------------------------

export const unauthenticatedResponseInterceptor = (error: AxiosError) => {
  if (error.response?.status === HTTP_CODE_UNAUTHORIZED) {
    removeAuthTokens()
    
    if (typeof window !== 'undefined') {
      useUserStore.getState().clearUser()
      window.location.href = '/login'
    }
  }

  return Promise.reject(error)
}

// ----------------------------------------------------------------------
// Apply Unauthorized Response Interceptor
// ----------------------------------------------------------------------

export const applyUnauthenticatedResponseInterceptor = (axiosInstance: AxiosInstance) => {
  if (typeof window !== 'undefined') {
    axiosInstance.interceptors.response.use(
      response => response,
      error => unauthenticatedResponseInterceptor(error),
    )
  }

  return axiosInstance
}
