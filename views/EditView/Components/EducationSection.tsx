import { Combobox } from "@/components/Combobox";
import { useUniversitiesList } from "@/hooks/use-registration";
import { Check, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const degreeOptions = [
  { value: "1", label: "1 year" },
  { value: "2", label: "2 years" },
  { value: "3", label: "3 years" },
  { value: "4", label: "4 years" },
  { value: "5", label: "5 years" },
  { value: "6", label: "6 years" },
]

export const EducationSection = (props: UserInfoProps) => {
  const { t } = useTranslation('profile');
  const { setUser, user, onSave, savedSections } = props;
  const { universities } = useUniversitiesList();
  const [mappedUniversitiesList, setMappedUniversitiesList] = useState<{ value: string, label: string }[]>([{ value: '', label: '' }])

  useEffect(() => {
    if (universities.length > 0) {
      const newData = universities?.map((univer) => {
        return { value: String(univer.universityId), label: univer.universityName }
      })

      setMappedUniversitiesList(newData)
    }

  }, [universities])

  const handleAddButtonClick = () => {
    if (user?.education) {
      setUser({
        ...user,
        education: [
          ...user.education,
          {
            universityId: null,
            customName: "",
            faculty: "",
            specialization: "",
            degree: "",
            startYear: null,
            endYear: null,
            isCurrent: false,
          },
        ],
      })
    } else {
      setUser({
        ...user,
        education: [
          {
            universityId: null,
            customName: "",
            faculty: "",
            specialization: "",
            degree: "",
            startYear: null,
            endYear: null,
            isCurrent: false,
          },
        ],
      })
    }
  }

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
      onClick={handleAddButtonClick}
      className="flex items-center gap-2 text-primary mb-4 cursor-pointer"
    >
      <Plus size={20} />
      {t("addEducationBtn")}
    </button>

    <div className="space-y-3">
      {user.education.map((edu: any, idx: number) => (
        <div key={idx} className="border rounded-lg p-4 space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">{t("university")}</label>
            <Combobox
              options={mappedUniversitiesList}
              value={edu.universityId || ""}
              onValueChange={(value) => {
                const updated = [...user.education]
                updated[idx].universityId = value as number
                const selectedUni = universities.find((u) => u.value === value)
                updated[idx].customName = selectedUni?.label.split(" - ")[0] || ""
                setUser({ ...user, education: updated })
              }}
              placeholder={t("selectUniversity") || "Select university..."}
              searchPlaceholder={t("searchUniversity") || "Search university..."}
              emptyText={t("noUniversityFound") || "No university found."}
            />
          </div>

          <input
            type="text"
            placeholder={t("facultyPlaceholder") || "Faculty (e.g., Computer Science)"}
            value={edu.faculty || ""}
            onChange={(e) => {
              const updated = [...user.education]
              updated[idx].faculty = e.target.value
              setUser({ ...user, education: updated })
            }}
            className="w-full px-3 py-2 border rounded-lg"
          />

          <input
            type="text"
            placeholder={t("specializationPlaceholder") || "Specialization (e.g., Software Engineering)"}
            value={edu.specialization || ""}
            onChange={(e) => {
              const updated = [...user.education]
              updated[idx].specialization = e.target.value
              setUser({ ...user, education: updated })
            }}
            className="w-full px-3 py-2 border rounded-lg"
          />

          <div>
            <label className="block text-sm font-medium mb-1">{t("degree") || "Degree Duration"}</label>
            <Combobox
              isSearchable={false}
              options={degreeOptions}
              value={edu.degree || ""}
              onValueChange={(value) => {
                const updated = [...user.education]
                updated[idx].degree = value as string
                setUser({ ...user, education: updated })
              }}
              placeholder={t("selectDegree") || "Select degree duration..."}
              searchPlaceholder={t("searchDegree") || "Search..."}
              emptyText={t("noDegreeFound") || "No option found."}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              placeholder={t("startYear") || "Start Year"}
              value={edu.startYear || ""}
              onChange={(e) => {
                const updated = [...user.education]
                updated[idx].startYear = e.target.value ? Number.parseInt(e.target.value) : null
                setUser({ ...user, education: updated })
              }}
              className="w-full px-3 py-2 border rounded-lg"
              min="1900"
              max="2100"
            />
            <input
              type="number"
              placeholder={t("endYear") || "End Year"}
              value={edu.endYear || ""}
              onChange={(e) => {
                const updated = [...user.education]
                updated[idx].endYear = e.target.value ? Number.parseInt(e.target.value) : null
                setUser({ ...user, education: updated })
              }}
              className="w-full px-3 py-2 border rounded-lg"
              min="1900"
              max="2100"
              disabled={edu.isCurrent}
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={edu.isCurrent}
              onChange={(e) => {
                const updated = [...user.education]
                updated[idx].isCurrent = e.target.checked
                if (e.target.checked) {
                  updated[idx].endYear = null
                }
                setUser({ ...user, education: updated })
              }}
              className="w-4 h-4"
            />
            <span className="text-sm">{t("currentlyStudying") || "Currently studying here"}</span>
          </label>

          <button
            onClick={() =>
              setUser({ ...user, education: user.education.filter((_: any, i: number) => i !== idx) })
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
