import { AxiosInstance } from 'axios'
import { HTTP_CODE_PRECONDITION_FAILED, HTTP_CODE_UNPROCESSABLE_ENTITY } from '@/constants/http-codes'
import { setAuthTokensConfig, getAuthTokens, clearAuthTokens } from '@/helpers/authentication-manager'

const refreshAccessToken = async (refreshToken: string, axiosInstance: AxiosInstance) => {
  try {
    const { data } = await axiosInstance.put('/students/refresh-token', {
      refreshToken,
    })
    return data
  } catch (error: any) {
    console.error('[v0] Token refresh failed:', error)
    if (error.response && error.response.status === HTTP_CODE_UNPROCESSABLE_ENTITY) {
      // Clear tokens and redirect to login
      clearAuthTokens()
      delete axiosInstance.defaults.headers.common['Authorization']
      
      // Redirect to login page
      if (typeof window !== 'undefined') {
        window.location.href = '/login'
      }
    }
    throw error
  }
}

let isRefreshing = false
let failedQueue: Array<{
  resolve: (token: string) => void
  reject: (error: any) => void
}> = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token!)
    }
  })

  failedQueue = []
}

export const applyJWTResponseInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config

      // Handle 412 Precondition Failed (token expired)
      if (
        error.response &&
        error.response.status === HTTP_CODE_PRECONDITION_FAILED &&
        !originalRequest._retry
      ) {
        if (isRefreshing) {
          // Queue the request while token is being refreshed
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject })
          })
            .then(token => {
              originalRequest.headers['Authorization'] = 'Bearer ' + token
              return axiosInstance(originalRequest)
            })
            .catch(err => {
              return Promise.reject(err)
            })
        }

        originalRequest._retry = true
        isRefreshing = true

        const { refreshToken } = getAuthTokens()

        if (!refreshToken) {
          // No refresh token available, redirect to login
          clearAuthTokens()
          if (typeof window !== 'undefined') {
            window.location.href = '/login'
          }
          return Promise.reject(error)
        }

        return new Promise(function (resolve, reject) {
          refreshAccessToken(refreshToken, axiosInstance)
            .then(data => {
              // Save new tokens
              setAuthTokensConfig(data)
              
              // Update default headers
              axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + data.token
              originalRequest.headers['Authorization'] = 'Bearer ' + data.token
              
              // Process queued requests
              processQueue(null, data.token)
              
              // Retry original request
              resolve(axiosInstance(originalRequest))
            })
            .catch(err => {
              processQueue(err, null)
              reject(err)
            })
            .finally(() => {
              isRefreshing = false
            })
        })
      }

      return Promise.reject(error)
    },
  )

  return axiosInstance
}
