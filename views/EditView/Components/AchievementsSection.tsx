import { Check, Plus, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export const AchievementsSection = (props: UserInfoProps) => {
  const { t } = useTranslation('profile');
  const { setUser, user, onSave, savedSections } = props;

  return <div className="bg-white rounded-lg shadow-lg p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">8. {t("achievements")}</h2>
      <button
        onClick={() => onSave("achievements")}
        className="flex items-center gap-2 bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700"
      >
        {savedSections.achievements ? <Check size={16} /> : null}
        {savedSections.achievements ? t("saved") : t("save")}
      </button>
    </div>

    <button
      onClick={() =>
        setUser({
          ...user,
          achievements: [...user.achievements, { year: "", title: "", description: "" }],
        })
      }
      className="flex items-center gap-2 text-primary mb-4"
    >
      <Plus size={20} />
      {t("addAchievementBtn")}
    </button>

    <div className="space-y-3">
      {user.achievements?.map((ach: any, idx: number) => (
        <div key={idx} className="border rounded-lg p-4 space-y-3">
          <input
            type="text"
            placeholder={t("yearPlaceholder")}
            value={ach.year || ""}
            onChange={(e) => {
              const updated = [...user.achievements]
              updated[idx].year = e.target.value
              setUser({ ...user, achievements: updated })
            }}
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder={t("achievementTitle")}
            value={ach.title || ""}
            onChange={(e) => {
              const updated = [...user.achievements]
              updated[idx].title = e.target.value
              setUser({ ...user, achievements: updated })
            }}
            className="w-full px-3 py-2 border rounded-lg"
          />
          <textarea
            placeholder={t("achievementDescription")}
            value={ach.description || ""}
            onChange={(e) => {
              const updated = [...user.achievements]
              updated[idx].description = e.target.value
              setUser({ ...user, achievements: updated })
            }}
            className="w-full px-3 py-2 border rounded-lg"
            rows={3}
          />
          <button
            onClick={() =>
              setUser({ ...user, achievements: user.achievements.filter((_: any, i: number) => i !== idx) })
            }
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
