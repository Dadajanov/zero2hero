import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dispatch, SetStateAction } from "react"
import { useTranslation } from "react-i18next"

type NameFormProps = {
  formData: RegistrationData,
  errors: RegistrationError,
  setFormData: Dispatch<SetStateAction<RegistrationData>>
  setErrors: Dispatch<SetStateAction<RegistrationError>>
}

export const NameForm = (props: NameFormProps) => {
  const { t } = useTranslation(['registration'])

  const { formData, errors, setFormData, setErrors } = props

  return <div className="space-y-6">
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
}
