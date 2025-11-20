"use client"

import { AuthApi } from "@/api/domains/auth-api"
import { UserApi } from "@/api/domains/user.api"
import { useUserStore } from "@/stores/user-store"
import { useRouter } from 'next/navigation'
import type React from "react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { PatternFormat } from "react-number-format"

export default function LoginView() {
  const { t } = useTranslation('profile')

  const router = useRouter()
  const setUser = useUserStore((state) => state.setUser)
  const [phone, setPhone] = useState("")
  const [code, setCode] = useState("")
  const [sessionId, setSessionId] = useState("")
  const [step, setStep] = useState<"phone" | "code">("phone")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [timer])

  const formatPhoneForAPI = (formattedPhone: string): string => {
    // Remove all non-numeric characters
    return formattedPhone.replace(/[^0-9]/g, "")
  }

  const handleSendCode = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setError("")

    const cleanPhone = formatPhoneForAPI(phone)

    if (cleanPhone.length !== 12 || !cleanPhone.startsWith("998")) {
      setError(t("phoneValidation"))
      return
    }

    setIsLoading(true)

    try {
      const data = await AuthApi.loginSendCode({ phoneNumber: cleanPhone });
      const currentTime = Math.round(new Date().getTime() / 1000)

      setStep("code")
      setTimer(data.sessionExpiresAt - currentTime)
      setSessionId(data.sessionId)
      setError("")
    } catch (err: any) {
      console.error("[v0] Login send code error:", err)
      const errorMessage =
        err.response?.data?.message || err.response?.data?.error || err.message || t("sendCodeError")
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (code.length !== 4) {
      setError(t("invalidCode"))
      return
    }

    setIsLoading(true)

    try {
      const response = await AuthApi.loginVerifyCode({
        sessionId: sessionId,
        otpCode: code,
      })

      if (response) {
        const userData = await UserApi.fetchUserData()
        setUser(userData)

        localStorage.setItem("isAuthenticated", "true")

        router.push("/profile")
      } else {
        setError(response || t("loginFailed"))
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || err.response?.data?.error || err.message || t("loginFailed")
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = () => {
    if (timer === 0) {
      handleSendCode()
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex items-center justify-center p-4 py-20 flex-grow">
        <div className="w-full max-w-md">
          <div className="rounded-2xl shadow-lg p-8 bg-white">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{t("loginTitle")}</h2>

            {step === "phone" ? (
              <form onSubmit={handleSendCode} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("enterPhoneNumber")} <span className="text-red-500">*</span>
                  </label>
                  <PatternFormat
                    format="+998 (##) - ### - ## - ##"
                    mask="_"
                    value={phone}
                    onValueChange={(values) => {
                      setPhone(values.formattedValue)
                      setError("")
                    }}
                    placeholder="+998 (90) - 123 - 45 - 67"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? t("sending") : t("sendCode")}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyCode} className="space-y-4">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
                  <p className="text-sm text-green-600">{t("verificationCodeSent")}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("enterVerificationCode")} <span className="text-red-500">*</span>
                  </label>
                  <PatternFormat
                    format="####"
                    mask="_"
                    value={code}
                    onValueChange={(values) => {
                      setCode(values.value)
                      setError("")
                    }}
                    placeholder="1234"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-2xl tracking-widest"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? t("sending") : t("loginWithCode")}
                </button>

                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={timer > 0}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {timer > 0 ? `${t("resend")} (${timer}s)` : t("resend")}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep("phone")
                    setCode("")
                    setError("")
                  }}
                  className="w-full text-blue-600 hover:underline text-sm"
                >
                  {t("back")}
                </button>
              </form>
            )}

            <p className="text-center text-gray-700 mt-4">
              {t("noAccount")}{" "}
              <a href="/registration" className="text-blue-600 font-semibold hover:underline">
                {t("register")}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
