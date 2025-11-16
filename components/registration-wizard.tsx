"use client"

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from "framer-motion"
import { PatternFormat } from "react-number-format"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { translations, type Language } from "@/lib/translations"
import { useUniversitiesList, useStudentRegistration } from "@/hooks/use-registration"
import { AuthApi } from "@/api/domains/auth-api"

const GREETING_VIDEO_URL = "/videos/greeting.mp4" // Replace with your video URL

export function RegistrationWizard() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("userLanguage") as Language) || "ru"
    }
    return "ru"
  })

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    registrationGoal: "internship" as "internship" | "work" | "internship_work",
    userStatus: "student" as "student" | "graduate" | "applicant",
    university: "",
    universityId: 0,
    course: "1",
    phone: "",
    verificationCode: "",
    isPhoneVerified: false,
  })

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    university: false,
    course: false,
    phone: false,
  })

  const [isSendingCode, setIsSendingCode] = useState(false)
  const [codeSent, setCodeSent] = useState(false)
  const [timer, setTimer] = useState(0)
  const [sendCodeError, setSendCodeError] = useState<string>("")

  const [apiError, setApiError] = useState<string>("")

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

  const [searchQuery, setSearchQuery] = useState("")
  const [showUniversityDropdown, setShowUniversityDropdown] = useState(false)
  const { universities = [], isLoading: universitiesLoading } = useUniversitiesList()
  const registrationMutation = useStudentRegistration()

  const t = (key: keyof (typeof translations)["ru"]) => translations[selectedLanguage][key]

  const totalSteps = 7

  const filteredUniversities = universities.filter((uni) =>
    uni.universityName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleLanguageSelect = (lang: Language) => {
    setSelectedLanguage(lang)
    localStorage.setItem("userLanguage", lang)
  }

  const handleSendCode = async () => {
    if (!formData.phone || !isPhoneValid()) return

    setIsSendingCode(true)
    setCodeSent(false)
    setSendCodeError("")

    try {
      const phoneDigits = formData.phone.replace(/\D/g, "")
      console.log("[v0] Sending verification code to:", phoneDigits)
      await AuthApi.sendVerificationCode({ phoneNumber: phoneDigits })

      console.log("[v0] Verification code sent successfully")
      setCodeSent(true)
      setTimer(60)
    } catch (error: any) {
      console.error("[v0] Send code error:", error)
      console.error("[v0] Error response:", error.response)
      console.error("[v0] Error data:", error.response?.data)

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

  const validateStep = () => {
    const newErrors = { ...errors }
    let isValid = true

    switch (currentStep) {
      case 2:
        if (!formData.firstName.trim()) {
          newErrors.firstName = true
          isValid = false
        }
        if (!formData.lastName.trim()) {
          newErrors.lastName = true
          isValid = false
        }
        break
      case 4:
        if (!formData.university) {
          newErrors.university = true
          isValid = false
        }
        if (!formData.course) {
          newErrors.course = true
          isValid = false
        }
        break
      case 5:
        if (!formData.isPhoneVerified) {
          isValid = false
        }
        break
    }

    setErrors(newErrors)
    return isValid
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return true
      case 1:
        return true
      case 2:
        return formData.firstName.trim() !== "" && formData.lastName.trim() !== ""
      case 3:
        return true
      case 4:
        return formData.university !== "" && formData.course !== ""
      case 5:
        return formData.isPhoneVerified
      case 6:
        return true
      default:
        return false
    }
  }

  const handleNext = () => {
    if (!validateStep()) {
      return
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setErrors({
        firstName: false,
        lastName: false,
        university: false,
        course: false,
        phone: false,
      })
    }
  }

  const handleSubmit = () => {
    const registrationData = {
      name: `${formData.firstName} ${formData.lastName}`,
      phoneNumber: formData.phone,
      purpose: formData.registrationGoal,
      status: formData.userStatus,
      universityCourse: Number.parseInt(formData.course),
      universityId: formData.universityId,
    }

    setApiError("")

    registrationMutation.mutate(registrationData, {
      onSuccess: (data) => {
        console.log("[v0] Registration successful:", data)
        localStorage.setItem("registrationData", JSON.stringify(data))
        router.push("/profile")
      },
      onError: (error) => {
        console.error("[v0] Registration failed:", error)
        setApiError(t("registrationError"))
      },
    })
  }

  const handleVerifyCode = () => {
    if (formData.verificationCode === "1234") {
      setFormData({ ...formData, isPhoneVerified: true })
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">{t("languageSelection")}</h2>
            <div className="grid grid-cols-3 gap-4">
              {(["ru", "uz", "en"] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageSelect(lang)}
                  className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                    selectedLanguage === lang
                      ? "bg-blue-600 text-white shadow-lg scale-105"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">{t("greeting")}</h2>
            <p className="text-gray-600">{t("greetingText")}</p>
            <div className="rounded-lg overflow-hidden bg-black">
              <video className="w-full h-auto" controls poster="/images/video-poster.jpg">
                <source src={GREETING_VIDEO_URL} type="video/mp4" />
                <p className="text-white p-4">Your browser does not support the video tag.</p>
              </video>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">{t("nameAndSurname")}</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="firstName" className="mb-2 block">
                  {t("firstName")} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => {
                    setFormData({ ...formData, firstName: e.target.value })
                    setErrors({ ...errors, firstName: false })
                  }}
                  placeholder={t("firstName")}
                  className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && <p className="text-sm text-red-500 mt-1">{t("firstNameRequired")}</p>}
              </div>
              <div>
                <Label htmlFor="lastName" className="mb-2 block">
                  {t("lastName")} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => {
                    setFormData({ ...formData, lastName: e.target.value })
                    setErrors({ ...errors, lastName: false })
                  }}
                  placeholder={t("lastName")}
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && <p className="text-sm text-red-500 mt-1">{t("lastNameRequired")}</p>}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">{t("registrationGoal")}</h3>
              <RadioGroup
                value={formData.registrationGoal}
                onValueChange={(value) =>
                  setFormData({ ...formData, registrationGoal: value as typeof formData.registrationGoal })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="internship" id="internship" />
                  <Label htmlFor="internship">{t("internship")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="work" id="work" />
                  <Label htmlFor="work">{t("work")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="internship_work" id="internship_work" />
                  <Label htmlFor="internship_work">{t("internshipAndWork")}</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">{t("userStatus")}</h3>
              <RadioGroup
                value={formData.userStatus}
                onValueChange={(value) => setFormData({ ...formData, userStatus: value as typeof formData.userStatus })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student">{t("student")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="graduate" id="graduate" />
                  <Label htmlFor="graduate">{t("graduate")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="applicant" id="applicant" />
                  <Label htmlFor="applicant">{t("applicant")}</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">{t("universityAndCourse")}</h2>
            {!universitiesLoading && universities.length === 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                {t("universitiesFetchError")}
              </div>
            )}
            <div className="space-y-4">
              <div>
                <Label className="mb-2 block">
                  {t("universitySelection")} <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    placeholder={t("searchUniversity")}
                    value={formData.university}
                    onChange={(e) => {
                      const value = e.target.value
                      setFormData({
                        ...formData,
                        university: value,
                        universityId: 0,
                      })
                      setShowUniversityDropdown(true)
                      setErrors({ ...errors, university: false })
                    }}
                    onFocus={() => setShowUniversityDropdown(true)}
                    onBlur={() => {
                      setTimeout(() => setShowUniversityDropdown(false), 200)
                    }}
                    className={errors.university ? "border-red-500" : ""}
                  />
                  {showUniversityDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {universitiesLoading ? (
                        <div className="p-3 text-sm text-gray-500">Loading...</div>
                      ) : filteredUniversities.length > 0 ? (
                        filteredUniversities.map((uni) => (
                          <button
                            key={uni.universityId}
                            type="button"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                university: uni.universityName,
                                universityId: uni.universityId,
                              })
                              setShowUniversityDropdown(false)
                              setErrors({ ...errors, university: false })
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-sm"
                          >
                            {uni.universityName}
                          </button>
                        ))
                      ) : (
                        <div className="p-3 text-sm text-gray-500">
                          No universities found. You can type your own university name.
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {errors.university && <p className="text-sm text-red-500 mt-1">{t("universityRequired")}</p>}
              </div>
              <div>
                <Label className="mb-2 block">
                  {t("courseSelection")} <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.course}
                  onValueChange={(value) => {
                    setFormData({ ...formData, course: value })
                    setErrors({ ...errors, course: false })
                  }}
                >
                  <SelectTrigger className={errors.course ? "border-red-500" : ""}>
                    <SelectValue placeholder={t("selectCourse")} />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((course) => (
                      <SelectItem key={course} value={course.toString()}>
                        {course} {t("course")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.course && <p className="text-sm text-red-500 mt-1">{t("courseRequired")}</p>}
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
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
                  className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                    !isPhoneValid() && formData.phone.length > 0 ? "border-red-500" : ""
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
        )

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">{t("completion")}</h2>
            <p className="text-gray-600">{t("completionText")}</p>
            {apiError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">{apiError}</div>
            )}
            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
              <h3 className="font-semibold text-gray-800">{t("yourData")}:</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">{t("language")}:</span> {selectedLanguage.toUpperCase()}
                </p>
                <p>
                  <span className="font-medium">{t("name")}:</span> {formData.firstName} {formData.lastName}
                </p>
                <p>
                  <span className="font-medium">{t("goal")}:</span> {t(formData.registrationGoal as any)}
                </p>
                <p>
                  <span className="font-medium">{t("status")}:</span> {t(formData.userStatus as any)}
                </p>
                <p>
                  <span className="font-medium">{t("university")}:</span> {formData.university}
                </p>
                <p>
                  <span className="font-medium">{t("course")}:</span> {formData.course}
                </p>
                <p>
                  <span className="font-medium">{t("phone")}:</span> {formData.phone}
                </p>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl"
      >
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-500">
              {t("step")} {currentStep + 1} {t("of")} {totalSteps}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-blue-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-8">
          <Button onClick={handleBack} disabled={currentStep === 0} variant="outline">
            {t("back")}
          </Button>
          <Button onClick={handleNext} disabled={registrationMutation.isPending || !canProceed()}>
            {currentStep === totalSteps - 1 ? t("register") : t("next")}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
