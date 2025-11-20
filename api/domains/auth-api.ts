import { setAuthTokensConfig } from "@/helpers/authentication-manager"
import { axiosInstance } from "@/lib/api"
import { ApiResponse, LoginRequest, LoginResponse, LoginVerifyRequest, SendVerificationCodeRequest, SendVerificationCodeResponse, StudentRegistrationRequest, StudentRegistrationResponse } from "../types/auth-api"

export class AuthApi {
  static async registerStudent(params: StudentRegistrationRequest): Promise<StudentRegistrationResponse> {
    const { data } = await axiosInstance.post<ApiResponse<StudentRegistrationResponse>>("/auth/students/sign-up", params)
    return data.data
  }

  static async sendVerificationCode(params: SendVerificationCodeRequest): Promise<SendVerificationCodeResponse> {
    const { data } = await axiosInstance.post<ApiResponse<SendVerificationCodeResponse>>("/auth/send-code", params)
    return data.data
  }

  static async loginSendCode(params: LoginRequest): Promise<SendVerificationCodeResponse> {
    const { data } = await axiosInstance.post<ApiResponse<SendVerificationCodeResponse>>("/auth/students/login", params)
    return data.data
  }

  static async loginVerifyCode(params: LoginVerifyRequest): Promise<LoginResponse> {
    const { data } = await axiosInstance.post<ApiResponse<LoginResponse>>("/auth/students/confirm-otp", params)
    const response = data.data

    if (response.jwt) {
      setAuthTokensConfig({
        token: response.jwt.accessToken,
        refreshToken: response.jwt.refreshToken,
        expireAt: response.jwt.expiresAt
      })
    }

    return response
  }
}
