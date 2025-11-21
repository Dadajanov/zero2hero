import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { Check, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { EducationApi } from "@/api/domains/education-api";
import { Education } from "@/api/types/education-api";
import { AutocompleteInput } from "@/components/AutoCompleteInput";
import { Combobox } from "@/components/Combobox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useUniversitiesList } from "@/hooks/use-registration";
import { useToast } from "@/hooks/use-toast";


type EducationSectionProps = UserInfoProps & {
  onRefetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<Education[], Error>>
}

const degreeOptions = [
  { value: "1", label: "1 year" },
  { value: "2", label: "2 years" },
  { value: "3", label: "3 years" },
  { value: "4", label: "4 years" },
  { value: "5", label: "5 years" },
  { value: "6", label: "6 years" },
]

export const EducationSection = (props: EducationSectionProps) => {
  const { t } = useTranslation(['profile', 'common']);
  const { setUser, user, onRefetch } = props;
  const [savingEducation, setSavingEducation] = useState<{ [key: number]: boolean }>({})
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [educationToDelete, setEducationToDelete] = useState<string | boolean | null>(null)
  const [mappedUniversitiesList, setMappedUniversitiesList] = useState<{ value: string, label: string }[]>([{ value: '', label: '' }])

  const { universities } = useUniversitiesList();
  const { toast } = useToast()

  useEffect(() => {
    if (universities.length > 0) {
      const newData = universities?.map((univer) => {
        return { value: String(univer.universityId), label: univer.universityName }
      })

      setMappedUniversitiesList(newData)
    }

  }, [universities])

  const handleDeleteEducation = async (index: number) => {
    setEducationToDelete(String(index))
  }

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

  const handleSaveEducation = async (index: number) => {
    const edu = user.education[index]

    // Validate required fields
    if (!edu.educationPlace || !edu.faculty || !edu.specialization || !edu.degree || !edu.startYear) {
      toast({
        variant: "destructive",
        title: t("error"),
        description: t("fillRequiredFields"),
      })
      return
    }

    setSavingEducation({ ...savingEducation, [index]: true })

    try {
      if (edu.educationId) {
        // Update existing education
        await EducationApi.updateEducation({
          educationId: edu.educationId,
          education: {
            customName: edu.educationPlace,
            degree: edu.degree,
            endYear: edu.endYear,
            faculty: edu.faculty,
            isCurrent: edu.isCurrent,
            specialization: edu.specialization,
            startYear: edu.startYear,
            universityId: edu.universityId,
          }
        })
      } else {
        // Create new education
        await EducationApi.createEducation({
          customName: edu.educationPlace,
          degree: edu.degree,
          endYear: edu.endYear,
          faculty: edu.faculty,
          isCurrent: edu.isCurrent,
          specialization: edu.specialization,
          startYear: edu.startYear,
          universityId: edu.universityId === null ? null : Number(edu.universityId),
        })

        // Update local state with the returned ID
        const updated = [...user.education]
        // updated[index].id = result.id
        setUser({ ...user, education: updated })
      }
      const { data } = await onRefetch()
      setUser({ ...user, education: data })


      // Show success feedback
      setSavingEducation({ ...savingEducation, [index]: false })

      // Optional: Show success message
      toast({
        variant: 'success',
        title: t("success"),
        description: t("educationSaved"),
      })

    } catch (error) {
      console.error("Failed to save education:", error)
      setSavingEducation({ ...savingEducation, [index]: false })
      toast({
        variant: "destructive",
        title: t("error"),
        description: t("educationSaveError"),
      })
    }
  }

  const confirmDeleteEducation = async () => {
    const edu = user.education[educationToDelete]

    if (edu.educationId) {
      // If it has an ID, delete from server
      try {
        await EducationApi.deleteEducation(edu.educationId)
      } catch (error) {
        console.error("Failed to delete education:", error)
        alert("Failed to delete education. Please try again.")
        return
      }
    }

    // Remove from local state
    setUser({ ...user, education: user.education.filter((_: any, i: number) => i !== Number(educationToDelete)) })
  }

  return <div className="bg-white rounded-lg shadow-lg p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">6. {t("education")}</h2>
    </div>

    <div className="space-y-3">
      {user.education.map((edu: any, idx: number) => (
        <div key={idx} className="border rounded-lg p-4 space-y-3 relative">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-700">
              {t("education")} #{idx + 1}
            </h3>
            <button
              onClick={() => handleSaveEducation(idx)}
              disabled={savingEducation[idx]}
              className="flex items-center gap-2 bg-green-600 text-white rounded-lg px-3 py-1.5 text-sm hover:bg-green-700 disabled:bg-gray-400"
            >
              {savingEducation[idx] ? (
                <>
                  <span className="animate-spin">⏳</span>
                  {t("saving") || "Saving..."}
                </>
              ) : edu.educationId ? (
                <>
                  <Check size={14} />
                  {t("update") || "Update"}
                </>
              ) : (
                <>
                  <Check size={14} />
                  {t("save")}
                </>
              )}
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">{t("university")}</label>
            <div className="space-y-2">
              <AutocompleteInput
                options={mappedUniversitiesList}
                value={edu.educationPlace || ""}
                onValueChange={(value) => {
                  const updated = [...user.education]
                  updated[idx].educationPlace = value
                  setUser({ ...user, education: updated })
                }}
                onSelect={(option) => {
                  const updated = [...user.education]
                  if (option) {
                    // Selected from list
                    updated[idx].universityId = option.value as number
                    updated[idx].educationPlace = option.label.split(" - ")[0]
                  } else {
                    // Custom input
                    updated[idx].universityId = null
                  }
                  setUser({ ...user, education: updated })
                }}
                placeholder={t("searchUniversity") || "Search or enter university name..."}
              />

            </div>
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
            onClick={() => handleDeleteEducation(idx)}
            className="flex items-center gap-2 text-red-600 text-sm hover:text-red-700"
          >
            <Trash2 size={16} />
            {t("remove")}
          </button>
        </div>
      ))}
    </div>

    <button
      onClick={handleAddButtonClick}
      className="flex items-center gap-2 text-primary mt-4 cursor-pointer"
    >
      <Plus size={20} />
      {t("addEducationBtn")}
    </button>

    <AlertDialog open={Boolean(educationToDelete)} onOpenChange={setEducationToDelete}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("confirmDelete")}</AlertDialogTitle>
          <AlertDialogDescription>{t("confirmDeleteEducation")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setEducationToDelete(null)}>{t("cancel", { ns: 'common' })}</AlertDialogCancel>
          <AlertDialogAction onClick={confirmDeleteEducation} className="bg-red-600 hover:bg-red-700">
            {t("delete", { ns: 'common' })}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
}
