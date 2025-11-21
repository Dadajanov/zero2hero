import { Check, Plus, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export const EducationSection = (props: UserInfoProps) => {
  const { t } = useTranslation('profile');
  const { setUser, user, onSave, savedSections } = props;

  return <div className="bg-white rounded-lg shadow-lg p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">6. {t("education")}</h2>
      <button
        onClick={() => onSave("education")}
        className="flex items-center gap-2 bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700"
      >
        {savedSections.education ? <Check size={16} /> : null}
        {savedSections.education ? t("saved") : t("save")}
      </button>
    </div>

    <button
      onClick={() =>
        setUser({
          ...user,
          education: [...user.education, { years: "", institution: "", degree: "", specialty: "" }],
        })
      }
      className="flex items-center gap-2 text-primary mb-4"
    >
      <Plus size={20} />
      {t("addEducationBtn")}
    </button>

    <div className="space-y-3">
      {user.education?.map((edu: any, idx: number) => (
        <div key={idx} className="border rounded-lg p-4 space-y-3">
          <input
            type="text"
            placeholder={t("yearsPlaceholder")}
            value={edu.years || ""}
            onChange={(e) => {
              const updated = [...user.education]
              updated[idx].years = e.target.value
              setUser({ ...user, education: updated })
            }}
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder={t("institutionPlaceholder")}
            value={edu.institution || ""}
            onChange={(e) => {
              const updated = [...user.education]
              updated[idx].institution = e.target.value
              setUser({ ...user, education: updated })
            }}
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder={t("degreePlaceholder")}
            value={edu.degree || ""}
            onChange={(e) => {
              const updated = [...user.education]
              updated[idx].degree = e.target.value
              setUser({ ...user, education: updated })
            }}
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder={t("specialtyPlaceholder")}
            value={edu.specialty || ""}
            onChange={(e) => {
              const updated = [...user.education]
              updated[idx].specialty = e.target.value
              setUser({ ...user, education: updated })
            }}
            className="w-full px-3 py-2 border rounded-lg"
          />
          <button
            onClick={() => setUser({ ...user, education: user.education.filter((_: any, i: number) => i !== idx) })}
            className="flex items-center gap-2 text-red-600 text-sm hover:text-red-700"
          >
            <Trash2 size={16} />
            {t("remove")}
          </button>
        </div>
      ))}
    </div>
  </div>
}
