import { Check, Plus, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export const LanguagesSection = (props: UserInfoProps) => {
  const { t } = useTranslation('profile');
  const { setUser, user, onSave, savedSections } = props;

  return <div className="bg-white rounded-lg shadow-lg p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">4. {t("languages")}</h2>
      <button
        onClick={() => onSave("languages")}
        className="flex items-center gap-2 bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 cursor-pointer"
      >
        {savedSections.languages ? <Check size={16} /> : null}
        {savedSections.languages ? t("saved") : t("save")}
      </button>
    </div>

    <button
      onClick={() =>
        setUser({
          ...user,
          languageSkills: [...user?.languageSkills, { language: "", level: "A1" }],
        })
      }
      className="flex items-center gap-2 text-primary mb-4 cursor-pointer"
    >
      <Plus size={20} />
      {t("addLanguageBtn")}
    </button>

    <div className="space-y-4">
      {user?.languageSkills?.map((lang: any, idx: number) => (
        <div key={idx} className="border rounded-lg p-4">
          <div className="flex justify-between mb-3">
            <input
              type="text"
              placeholder={t("languagePlaceholder")}
              value={lang.language || ""}
              onChange={(e) => {
                const updated = [...user?.languageSkills]
                updated[idx].language = e.target.value
                setUser({ ...user, languageSkills: updated })
              }}
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <button
              onClick={() =>
                setUser({ ...user, languageSkills: user?.languageSkills.filter((_: any, i: number) => i !== idx) })
              }
              className="ml-2 text-red-600 cursor-pointer"
            >
              <Trash2 size={20} />
            </button>
          </div>
          <label className="block text-sm text-gray-600 mb-2">{t("proficiencyLevel")}</label>
          <select
            value={lang.level || "A1"}
            onChange={(e) => {
              const updated = [...user?.languageSkills]
              updated[idx].level = e.target.value
              setUser({ ...user, languageSkills: updated })
            }}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="A1">{t("languageLevel_A1")}</option>
            <option value="A2">{t("languageLevel_A2")}</option>
            <option value="B1">{t("languageLevel_B1")}</option>
            <option value="B2">{t("languageLevel_B2")}</option>
            <option value="C1">{t("languageLevel_C1")}</option>
            <option value="C2">{t("languageLevel_C2")}</option>
          </select>
        </div>
      ))}
    </div>
  </div>
}
