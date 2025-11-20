export interface ApiResponse<T> {
  code: number
  data: T
  message: string
  meta: any
}

export interface JwtToken {
  accessToken: string
  expiresAt: number,
  refreshToken: string
}

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

export interface ConfirmOptResponce {
  isNewUser: boolean,
  userId: number,
  phoneNumber: string,
  jwt: {
    accessToken: string
    refreshToken: string,
    expiresAt: number
  }
}

export interface SendVerificationCodeRequest {
  phoneNumber: string
}

export interface SendVerificationCodeResponse {
  phoneNumber: string;
  sessionExpiresAt: number
  sessionId: string
}

export interface LoginRequest {
  phoneNumber: string
}

export interface LoginVerifyRequest {
  sessionId: string
  otpCode: string
}

export interface ResendOtpCodeRequest {
  sessionId: string
}

export interface LoginResponse {
  isNewUser: boolean
  jwt?: JwtToken
  refreshToken?: string
  phoneNumber: string
  userId?: string
}
