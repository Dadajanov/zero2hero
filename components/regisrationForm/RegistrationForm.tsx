"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useTranslation } from "react-i18next"

import { AboutUniversity } from "@/components/regisrationForm/Components/AboutUniversity"
import { ChoosingLanguage } from "@/components/regisrationForm/Components/ChoosingLanguage"
import { FormConclusion } from "@/components/regisrationForm/Components/FormConclusion"
import { NameForm } from "@/components/regisrationForm/Components/NameForm"
import { PhoneNumber } from "@/components/regisrationForm/Components/PhoneNumber"
import { RegistrationPurpose } from "@/components/regisrationForm/Components/RegistrationPurpose"
import { WelcomeVideo } from "@/components/regisrationForm/Components/WelcomeVideo"
import { Button } from "@/components/ui/button"
import { setAccountId } from "@/helpers/authentication-manager"
import { useStudentRegistration } from "@/hooks/use-registration"
import { useUserStore } from "@/stores/user-store"
import { Language } from "@/types/common.type"

const GREETING_VIDEO_URL = "/videos/greeting.mp4" // Replace with your video URL

export function RegistrationForm() {
  const { t } = useTranslation(['registration', 'common'])
  const router = useRouter()
  const setUser = useUserStore((state) => state.setUser)
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("userLanguage") as Language) || "ru"
    }
    return "ru"
  })

  const [formData, setFormData] = useState<RegistrationData>({
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

  const [errors, setErrors] = useState<RegistrationError>({
    firstName: false,
    lastName: false,
    university: false,
    course: false,
    phone: false,
  })

  const [apiError, setApiError] = useState<string>("")

  const registrationMutation = useStudentRegistration()

  const totalSteps = 7

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
        const userData = {
          accountId: data.accountId || data.id,
          phoneNumber: data.phoneNumber,
          firstName: formData.firstName,
          lastName: formData.lastName,
          purpose: formData.registrationGoal,
          status: formData.userStatus,
          universityCourse: Number.parseInt(formData.course),
          universityId: formData.universityId,
          ...data,
        }

        setUser(userData)

        if (data.accountId || data.id) {
          setAccountId(data.accountId || data.id)
        }

        localStorage.setItem("isAuthenticated", "true")
        router.push("/profile")
      },
      onError: (error) => {
        console.error("[v0] Registration failed:", error)
        setApiError(t("registrationError"))
      },
    })
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <ChoosingLanguage selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
        )

      case 1:
        return (
          <WelcomeVideo videoUrl={GREETING_VIDEO_URL} />
        )
      case 2:
        return (
          <NameForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        )

      case 3:
        return (
          <RegistrationPurpose formData={formData} setFormData={setFormData} />
        )

      case 4:
        return (
          <AboutUniversity
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        )

      case 5:
        return (
          <PhoneNumber
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        )

      case 6:
        return (
          <FormConclusion apiError={apiError} formData={formData} />
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
            {t("back", { ns: "common" })}
          </Button>
          <Button onClick={handleNext} disabled={registrationMutation.isLoading || !canProceed()}>
            {t(currentStep === totalSteps - 1 ? "register" : "next", { ns: 'common' })}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
