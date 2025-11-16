import { axiosInstance } from "@/lib/api"

export interface StudentRegistrationRequest {
  name: string
  phoneNumber: string
  purpose: "internship" | "work" | "internship_work"
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

export interface SendVerificationCodeRequest {
  phoneNumber: string
}

export interface SendVerificationCodeResponse {
  success: boolean
  message?: string
}

export interface LoginRequest {
  phoneNumber: string
}

export interface LoginVerifyRequest {
  phoneNumber: string
  code: string
}

export interface LoginResponse {
  success: boolean
  token?: string
  user?: {
    id: number
    name: string
    phoneNumber: string
  }
  message?: string
}

export class AuthApi {
  static async registerStudent(data: StudentRegistrationRequest): Promise<StudentRegistrationResponse> {
    const response = await axiosInstance.post<StudentRegistrationResponse>("/auth/students/sign-up", data)
    return response.data
  }

  static async sendVerificationCode(data: SendVerificationCodeRequest): Promise<SendVerificationCodeResponse> {
    const response = await axiosInstance.post<SendVerificationCodeResponse>("/auth/send-code", data)
    return response.data
  }

  static async loginSendCode(data: LoginRequest): Promise<SendVerificationCodeResponse> {
    const response = await axiosInstance.post<SendVerificationCodeResponse>("/auth/students/login", data)
    return response.data
  }

  static async loginVerifyCode(data: LoginVerifyRequest): Promise<LoginResponse> {
    const response = await axiosInstance.post<LoginResponse>("/auth/students/confitm-otp", data)
    return response.data
  }
}
