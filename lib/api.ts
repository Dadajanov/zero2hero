import { applyHeadersRequestInterceptor } from "@/helpers/headers-request-interceptor"
import { applyJWTResponseInterceptor } from "@/helpers/jwt-interceptor"
import { applyUnauthenticatedResponseInterceptor } from "@/helpers/unauthorized-response-interceptor"
import axios, { type AxiosError, type AxiosResponse } from "axios"

// ----------------------------------------------------------------------

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://95.130.227.234:8000/v1"

// Extend Axios types to include custom config
declare module "axios" {
  export interface AxiosRequestConfig {
    shouldReturnOriginalResponse?: boolean
  }

  export interface AxiosDefaults {
    shouldReturnOriginalResponse?: boolean
  }
}

// ----------------------------------------------------------------------
// Request Interceptor
// ----------------------------------------------------------------------


// ----------------------------------------------------------------------
// Response Interceptor
// ----------------------------------------------------------------------

const extractResponse = (response: AxiosResponse) => {
  if (!!response.config.shouldReturnOriginalResponse) {
    return response
  }

  // Check if response has data property and is valid JSON
  if (response.data && typeof response.data === "object") {
    // Return the response object with data intact
    return response
  }

  // If data is not an object (e.g., HTML string), keep original response
  console.warn("[v0] Response data is not an object:", typeof response.data)
  return response
}

const extractErrorResponse = async (error: AxiosError) => {
  console.error("[v0] API Error:", error)
  console.error("[v0] Error response:", error.response)
  console.error("[v0] Error response data:", error.response?.data)
  console.error("[v0] Error status:", error.response?.status)

  // Don't transform error responses, just log and reject
  return Promise.reject(error)
}

// ----------------------------------------------------------------------
// Create HTTP Client
// ----------------------------------------------------------------------

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30 * 1000,
  withCredentials: true,
})

applyHeadersRequestInterceptor(httpClient)

  // Apply response interceptor
  ; (httpClient.defaults as any).shouldReturnOriginalResponse = false
httpClient.interceptors.response.use(extractResponse, extractErrorResponse)

applyJWTResponseInterceptor(httpClient)
applyUnauthenticatedResponseInterceptor(httpClient)

// Export httpClient for custom requests
export { httpClient as axiosInstance }
