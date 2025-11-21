import { Check, Plus, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export const SkillsSections = (props: UserInfoProps) => {
  const { t } = useTranslation('profile');
  const { setUser, user, onSave, savedSections } = props;

  const handleAddButtonClick = () => {
    if (user?.technicalSkills) {
      setUser({
        ...user,
        technicalSkills: [...user?.technicalSkills, { name: "", description: "", proficiency: 0 }],
      })
    } else {
      setUser({
        ...user,
        technicalSkills: [{ name: "", description: "", proficiency: 0 }],
      })
    }
  }

  return <div className="bg-white rounded-lg shadow-lg p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">5. {t("skills")}</h2>
      <button
        onClick={() => onSave("skills")}
        className="flex items-center gap-2 bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 cursor-pointer"
      >
        {savedSections.skills ? <Check size={16} /> : null}
        {savedSections.skills ? t("saved") : t("save")}
      </button>
    </div>

    <button
      onClick={handleAddButtonClick}
      className="flex items-center gap-2 text-primary mb-4 cursor-pointer"
    >
      <Plus size={20} />
      {t("addSkillBtn")}
    </button>

    <div className="space-y-4">
      {user?.technicalSkills?.map((skill: any, idx: number) => (
        <div key={idx} className="border rounded-lg p-4">
          <div className="flex justify-between mb-3">
            <div className="flex-1 space-y-3">
              <input
                type="text"
                placeholder={t("skillNamePlaceholder")}
                value={skill.name || ""}
                onChange={(e) => {
                  const updated = [...user?.technicalSkills]
                  updated[idx].name = e.target.value
                  setUser({ ...user, technicalSkills: updated })
                }}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <textarea
                placeholder={t("descriptionPlaceholder")}
                value={skill.description || ""}
                onChange={(e) => {
                  const updated = [...user?.technicalSkills]
                  updated[idx].description = e.target.value
                  setUser({ ...user, technicalSkills: updated })
                }}
                className="w-full px-4 py-2 border rounded-lg"
                maxLength={140}
                rows={2}
              />
            </div>
            <button
              onClick={() =>
                setUser({
                  ...user,
                  technicalSkills: user?.technicalSkills.filter((_: any, i: number) => i !== idx),
                })
              }
              className="ml-2 text-red-600 cursor-pointer"
            >
              <Trash2 size={20} />
            </button>
          </div>
          <label className="block text-sm text-gray-600 mb-2">{t("levelLabel")}: {skill.proficiency || 0}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={skill.proficiency || 0}
            onChange={(e) => {
              const updated = [...user?.technicalSkills]
              updated[idx].proficiency = parseInt(e.target.value)
              setUser({ ...user, technicalSkills: updated })
            }}
            className="w-full"
          />
        </div>
      ))}
    </div>
  </div>

}
