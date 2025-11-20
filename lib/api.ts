import { applyHeadersRequestInterceptor } from "@/helpers/headers-request-interceptor";
import { applyJWTResponseInterceptor } from "@/helpers/jwt-interceptor";
import { applyUnauthenticatedResponseInterceptor } from "@/helpers/unauthorized-response-interceptor";
import axios, { type AxiosError, type AxiosResponse } from "axios";
import queryString from 'query-string';

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
  return response
}

const extractErrorResponse = async (error: AxiosError) => {

  // Don't transform error responses, just log and reject
  return Promise.reject(error)
}

// ----------------------------------------------------------------------
// Create HTTP Client
// ----------------------------------------------------------------------

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30 * 1000,
  paramsSerializer: params => queryString.stringify(params, { arrayFormat: 'bracket' }),
})

applyHeadersRequestInterceptor(httpClient)

  // Apply response interceptor
  ; (httpClient.defaults as any).shouldReturnOriginalResponse = false
httpClient.interceptors.response.use(extractResponse, extractErrorResponse)

applyJWTResponseInterceptor(httpClient)
applyUnauthenticatedResponseInterceptor(httpClient)

// ----------------------------------------------------------------------
// API Types
// ----------------------------------------------------------------------

export interface University {
  id: number
  name: string
  [key: string]: any
}

export interface StudentRegistrationRequest {
  name: string
  phoneNumber: string
  purpose: "internship" | "work" | "both"
  status: "applicant" | "student" | "graduate"
  universityCourse: number
  universityId: number
}

export interface StudentRegistrationResponse {
  id: number
  name: string
  phoneNumber: string
  [key: string]: any
}

// ----------------------------------------------------------------------
// API Methods
// ----------------------------------------------------------------------

export const api = {
  // Get universities list
  getUniversities: async (): Promise<University[]> => {
    const response = await httpClient.get<University[]>("/universities/get-list")
    return response.data
  },

  // Submit student registration
  registerStudent: async (data: StudentRegistrationRequest): Promise<StudentRegistrationResponse> => {
    const response = await httpClient.post<StudentRegistrationResponse>("/auth/students/sign-up", data)
    return response.data
  },

  // Get user profile
  getUserProfile: async (userId: string) => {
    const response = await httpClient.get(`/users/${userId}`)
    return response.data
  },

  // Get vacancies
  getVacancies: async () => {
    const response = await httpClient.get("/vacancies")
    return response.data
  },

  // Get courses
  getCourses: async () => {
    const response = await httpClient.get("/courses")
    return response.data
  },

  // Update user profile
  updateUserProfile: async (userId: string, data: any) => {
    const response = await httpClient.put(`/users/${userId}`, data)
    return response.data
  },
}

// Export httpClient for custom requests
export { httpClient as axiosInstance };

