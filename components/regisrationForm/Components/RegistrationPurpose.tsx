import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dispatch, SetStateAction } from "react"
import { useTranslation } from "react-i18next"

type RegistrationPurposeProps = {
  formData: RegistrationData,
  setFormData: Dispatch<SetStateAction<RegistrationData>>
}

export const RegistrationPurpose = (props: RegistrationPurposeProps) => {
  const { t } = useTranslation(['registration']);
  const { formData, setFormData } = props

  return <div className="space-y-6">
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
}
