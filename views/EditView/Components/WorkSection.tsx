import { Check, Plus, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export const WorkSection = (props: UserInfoProps) => {
  const { t } = useTranslation('profile');
  const { setUser, user, onSave, savedSections } = props;

  const handleAddButtonClick = () => {
    if (user?.workExperience) {
      setUser({
        ...user,
        workExperience: [
          ...user?.workExperience,
          { period: "", company: "", position: "", achievements: [""] },
        ],
      })
    } else {
      setUser({
        ...user,
        workExperience: [
          { period: "", company: "", position: "", achievements: [""] },
        ],
      })
    }
  }

  return <div className="bg-white rounded-lg shadow-lg p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">7. {t("workExperience")}</h2>
      <button
        onClick={() => onSave("work")}
        className="flex items-center gap-2 bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 cursor-pointer"
      >
        {savedSections.work ? <Check size={16} /> : null}
        {savedSections.work ? t("saved") : t("save")}
      </button>
    </div>

    <button
      onClick={handleAddButtonClick}
      className="flex items-center gap-2 text-primary mb-4 cursor-pointer"
    >
      <Plus size={20} />
      {t("addWorkBtn")}
    </button>

    <div className="space-y-3">
      {user?.workExperience?.map((exp: any, idx: number) => (
        <div key={idx} className="border rounded-lg p-4 space-y-3">
          <input
            type="text"
            placeholder={t("periodPlaceholder")}
            value={exp.period || ""}
            onChange={(e) => {
              const updated = [...user?.workExperience]
              updated[idx].period = e.target.value
              setUser({ ...user, workExperience: updated })
            }}
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder={t("companyPlaceholder")}
            value={exp.company || ""}
            onChange={(e) => {
              const updated = [...user?.workExperience]
              updated[idx].company = e.target.value
              setUser({ ...user, workExperience: updated })
            }}
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder={t("positionPlaceholder")}
            value={exp.position || ""}
            onChange={(e) => {
              const updated = [...user?.workExperience]
              updated[idx].position = e.target.value
              setUser({ ...user, workExperience: updated })
            }}
            className="w-full px-3 py-2 border rounded-lg"
          />
          <button
            onClick={() =>
              setUser({ ...user, workExperience: user?.workExperience.filter((_: any, i: number) => i !== idx) })
            }
            className="flex items-center gap-2 text-red-600 text-sm hover:text-red-700 cursor-pointer"
          >
            <Trash2 size={16} />
            {t("remove")}
          </button>
        </div>
      ))}
    </div>
  </div>
}
