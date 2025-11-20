import type { AxiosInstance } from 'axios'
import { fromUnixTime, isAfter } from 'date-fns'
import { nanoid } from 'nanoid'

import { HTTP_CODE_UNPROCESSABLE_ENTITY } from '@/constants/http-codes'
import {
  getAuthTokens,
  getAuthenticatedState,
  setAuthTokensConfig
} from '@/helpers/authentication-manager'
import { buildFullURL } from './buildFullUrl.helpers'

const appVersion = process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0'

const deviceId = nanoid()

let refreshTokenPromise: Promise<any> | null = null

export const refreshAccessToken = async (refreshToken: string, axiosInstance: AxiosInstance) => {
  try {
    const { data } = await axiosInstance.put('/students/refresh-token', {
      refreshToken,
    })
    return data
  } catch (error) {
    console.error('Token refresh failed:', error)
    if ((error as any).response && (error as any).response.status === HTTP_CODE_UNPROCESSABLE_ENTITY) {
      delete axiosInstance.defaults.headers.common['Authorization']
    }
    throw error
  }
}

export const applyHeadersRequestInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(async (config: any) => {
    if (!config.headers) config.headers = {}

    const originalRequest = config

    config.url = buildFullURL(
      config.baseURL,
      config.url,
      config.params,
      config.paramsSerializer
    )

    delete config.params

    const isAuthenticated = getAuthenticatedState()

    if (isAuthenticated) {
      const { accessToken, refreshToken, expireAt } = getAuthTokens()

      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
      }

      if (
        refreshToken &&
        expireAt &&
        isAfter(new Date(), fromUnixTime(expireAt - 30)) &&
        !originalRequest._retry &&
        !refreshTokenPromise
      ) {
        (window as any).isTokenRefreshing = true

        originalRequest._retry = true
        refreshTokenPromise = refreshAccessToken(refreshToken, axiosInstance).then(
          (data) => {
            config.headers['Authorization'] = `Bearer ${data.accessToken}`
            setAuthTokensConfig(data)
            return data
          },
        )

        return refreshTokenPromise.then(() => {
          refreshTokenPromise = null
            ; (window as any).isTokenRefreshing = false
          return axiosInstance(originalRequest)
        })
      }
    }

    return config
  })

  return axiosInstance
}
