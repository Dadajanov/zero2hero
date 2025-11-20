interface AuthTokens {
  accessToken: string
  refreshToken: string
  expireAt: number
}

interface AuthTokensConfig {
  token: string
  refreshToken: string
  expireAt: number
}

export const setAuthTokensConfig = (data: AuthTokensConfig) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', data.token)
    localStorage.setItem('refreshToken', data.refreshToken)
    localStorage.setItem('expireAt', data.expireAt.toString())
  }
}

export const getAuthTokens = (): AuthTokens => {
  if (typeof window !== 'undefined') {
    return {
      accessToken: localStorage.getItem('accessToken') || '',
      refreshToken: localStorage.getItem('refreshToken') || '',
      expireAt: parseInt(localStorage.getItem('expireAt') || '0', 10),
    }
  }
  return { accessToken: '', refreshToken: '', expireAt: 0 }
}

export const clearAuthTokens = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('expireAt')
    localStorage.removeItem('accountId')
  }
}

export const removeAuthTokens = clearAuthTokens

export const getAccessToken = (): string => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken') || ''
  }
  return ''
}

export const setAccountId = (accountId: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accountId', accountId)
  }
}

export const getAccountId = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accountId')
  }
  return null
}

export const getAuthenticatedState = (): boolean => {
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem('accessToken')
  }
  return false
}
