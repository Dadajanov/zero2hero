import { JwtToken } from "@/api/types/auth-api"

interface AuthTokens {
  accessToken: string
  refreshToken: string
  expireAt: number
}


export const setAuthTokensConfig = (data: JwtToken) => {
  localStorage.setItem('accessToken', data.accessToken)
  localStorage.setItem('refreshToken', data.refreshToken)
  localStorage.setItem('expireAt', data.expiresAt.toString())
}

export const getAuthTokens = (): AuthTokens => {
  return {
    accessToken: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
    expireAt: parseInt(localStorage.getItem('expireAt') || '0', 10),
  }
}

export const clearAuthTokens = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('expireAt')
    localStorage.removeItem('accountId')
  }
}


export const getAccessToken = (): string => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken') || ''
  }
  return ''
}


export const getAccountId = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accountId')
  }
  return null
}

export const removeAuthTokens = clearAuthTokens

export const setAccountId = (accountId: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accountId', accountId)
  }
}

export const getAuthenticatedState = (): boolean => {
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem('accessToken')
  }
  return false
}

