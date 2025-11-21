import { AuthApi } from "@/api/domains/auth-api"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { PatternFormat } from "react-number-format"

export const PhoneNumber = (props: RegisrationFormProps) => {
  const { t } = useTranslation(['registration'])

  const { formData, errors, setFormData, setErrors } = props;

  const [isSendingCode, setIsSendingCode] = useState(false)
  const [codeSent, setCodeSent] = useState(false)
  const [timer, setTimer] = useState(0)
  const [sendCodeError, setSendCodeError] = useState<string>("")

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [timer])


  const isPhoneValid = () => {
    const digits = formData.phone.replace(/\D/g, "")
    return digits.length === 12 && digits.startsWith("998")
  }

  const handleSendCode = async () => {
    if (!formData.phone || !isPhoneValid()) return

    setIsSendingCode(true)
    setCodeSent(false)
    setSendCodeError("")

    try {
      const phoneDigits = formData.phone.replace(/\D/g, "")
      await AuthApi.sendVerificationCode({ phoneNumber: phoneDigits })

      setCodeSent(true)
      setTimer(60)
    } catch (error: any) {

      // Extract error message from various possible response formats
      let errorMessage = t("sendCodeError")

      if (error.response?.data) {
        // Try to get message from data.message or data.error or data itself if it's a string
        if (typeof error.response.data === "string") {
          errorMessage = error.response.data
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message
        } else if (error.response.data.error) {
          errorMessage = error.response.data.error
        }
      }

      setSendCodeError(errorMessage)
    } finally {
      setIsSendingCode(false)
    }
  }

  const handleVerifyCode = () => {
    if (formData.verificationCode === "1234") {
      setFormData({ ...formData, isPhoneVerified: true })
    }
  }

  return <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-800">{t("phoneAuthorization")}</h2>
    <div className="space-y-4">
      <div>
        <Label htmlFor="phone" className="mb-2 block">
          {t("phone")} <span className="text-red-500">*</span>
        </Label>
        <PatternFormat
          id="phone"
          format="+998#########"
          mask="_"
          value={formData.phone}
          onValueChange={(values) => {
            setFormData({ ...formData, phone: values.formattedValue })
            setErrors({ ...errors, phone: false })
            setSendCodeError("")
          }}
          placeholder="+998(XX)-XXX-XX- XX"
          disabled={formData.isPhoneVerified}
          className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${!isPhoneValid() && formData.phone.length > 0 ? "border-red-500" : ""
            }`}
        />
        {!isPhoneValid() && formData.phone.length > 0 && (
          <p className="text-sm text-red-500 mt-1">{t("phoneValidation")}</p>
        )}
      </div>
      {!formData.isPhoneVerified && (
        <>
          <Button
            onClick={handleSendCode}
            className="w-full"
            disabled={!isPhoneValid() || isSendingCode || timer > 0}
          >
            {isSendingCode
              ? t("sending")
              : timer > 0
                ? `${t("resend")} (${timer}s)`
                : codeSent
                  ? t("resend")
                  : t("sendCode")}
          </Button>

          {sendCodeError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
              {sendCodeError}
            </div>
          )}

          {codeSent && timer > 0 && !sendCodeError && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-700">
              {t("codeSent")}
            </div>
          )}

          <div>
            <Label htmlFor="code" className="mb-2 block">
              {t("enterCode")}
            </Label>
            <PatternFormat
              id="code"
              format="####"
              value={formData.verificationCode}
              onValueChange={(values) => setFormData({ ...formData, verificationCode: values.value })}
              placeholder="1234"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <p className="text-sm text-gray-500 mt-1">{t("testCode")}</p>
          </div>
          <Button onClick={handleVerifyCode} className="w-full">
            {t("verifyCode")}
          </Button>
        </>
      )}
      {formData.isPhoneVerified && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700">
          {t("phoneVerified")}
        </div>
      )}
    </div>
  </div>
}
