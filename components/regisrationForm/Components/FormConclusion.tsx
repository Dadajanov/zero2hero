import { useTranslation } from "react-i18next";

type FormConclusionProps = {
  apiError: string;
  formData: RegistrationData
}

export const FormConclusion = (props: FormConclusionProps) => {
  const { i18n, t } = useTranslation(['registration', 'common']);

  const { apiError, formData } = props

  return <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-800">{t("completion")}</h2>
    <p className="text-gray-600">{t("completionText")}</p>
    {apiError && (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">{apiError}</div>
    )}
    <div className="bg-gray-50 rounded-lg p-6 space-y-3">
      <h3 className="font-semibold text-gray-800">{t("yourData")}:</h3>
      <div className="space-y-2 text-sm">
        <p>
          <span className="font-medium">{t("language")}:</span> {i18n.language.toUpperCase()}
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
}
