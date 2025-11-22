import { ExperienceApi } from "@/api/domains/experiences-api";
import { Experience } from "@/api/types/experiences-api";
import { AutocompleteInput } from "@/components/AutoCompleteInput";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { Check, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type EducationSectionProps = StudentInfoProps & {
  onRefetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<Experience[], Error>>
}

const companies = [{
  value: '',
  label: ''
}]

export const ExperienceSection = (props: EducationSectionProps) => {
  const { t } = useTranslation('profile');
  const { studentInfo, setStudentInfo, onRefetch, savedSections } = props;
  const { toast } = useToast()
  const [isSavingWork, setIsSavingWork] = useState<number | null>(null)
  const [experienceToDelete, setExperienceToDelete] = useState<string | boolean | null>(null)

  const handleAddButtonClick = () => {
    if (studentInfo?.experiences) {
      setStudentInfo({
        ...studentInfo,
        xperiences: [
          ...studentInfo?.experience,
          { period: "", company: "", position: "", achievements: [""] },
        ],
      })
    } else {
      setStudentInfo({
        ...studentInfo,
        experiences: [
          { period: "", company: "", position: "", achievements: [""] },
        ],
      })
    }
  }

  // Save work experience handler
  const saveWorkExperience = async (index: number) => {
    const exp = studentInfo.experiences[index]

    // Basic validation
    if (!exp.customCompanyName || !exp.position || !exp.startDate) {
      toast({
        variant: "destructive",
        title: t("error"),
        description: t("fillRequiredFields"),
      })
      return
    }

    setIsSavingWork(index)

    try {
      if (exp.id) {
        // Update existing
        await ExperienceApi.updateExperience({
          experienceId: exp.id, experience: {
            companyId: exp.companyId,
            customCompanyName: exp.customCompanyName,
            description: exp.description,
            endDate: exp.endDate,
            isCurrent: exp.isCurrent,
            position: exp.position,
            specialization: exp.specialization,
            startDate: exp.startDate,
          }
        })

      } else {
        // Create new
        await ExperienceApi.createExperience({
          companyId: exp.companyId,
          customCompanyName: exp.customCompanyName,
          description: exp.description,
          endDate: exp.endDate,
          isCurrent: exp.isCurrent,
          position: exp.position,
          specialization: exp.specialization,
          startDate: exp.startDate,
        })

        // Update local state with the returned ID
        const updated = [...studentInfo.experiences]
        // updated[index].id = result.id
        setStudentInfo({ ...studentInfo, experiences: updated })
      }

      toast({
        variant: "success",
        title: t("success"),
        description: t("workExperienceSaved") || "Work experience saved",
      })
    } catch (error) {
      console.error("Failed to save work experience:", error)
      toast({
        variant: "destructive",
        title: t("error"),
        description: t("workExperienceSaveError") || "Failed to save work experience",
      })
    } finally {
      setIsSavingWork(null)
    }
  }


  const handleDeleteExperience = async (index: number) => {
    setExperienceToDelete(String(index))
  }

  const confirmDeleteExperience = async () => {
    const edu = studentInfo.educations[experienceToDelete]

    if (edu.educationId) {
      // If it has an ID, delete from server
      try {
        await ExperienceApi.deleteExperience(edu.educationId);
        const { data } = await onRefetch()
        setStudentInfo({ ...studentInfo, experiences: data })
      } catch (error) {
        console.error("Failed to delete education:", error)
        toast({
          variant: "destructive",
          title: t("error"),
          description: "Failed to delete education. Please try again.",
        })
        return
      }
    }

    // Remove from local state
    setStudentInfo({
      ...studentInfo, educations: studentInfo.educations.filter((_: any, i: number) => {
        return i !== Number(experienceToDelete)
      })
    })
  }




  return <div className="bg-white rounded-lg shadow-lg p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">7. {t("workExperience")}</h2>
    </div>
    <div className="space-y-4">
      {studentInfo.experiences && studentInfo.experiences.map((exp: any, idx: number) => (
        <div key={idx} className="border rounded-lg p-4 space-y-3 bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-gray-700">
              {t("workExperience")} #{idx + 1}
            </h3>
            <div className="flex gap-2">


              <button
                onClick={async () => await saveWorkExperience(idx)}
                disabled={isSavingWork === idx}
                className="flex items-center gap-2 bg-green-600 text-white rounded-lg px-3 py-1.5 text-sm hover:bg-green-700 disabled:bg-gray-400"
              >
                {isSavingWork === idx ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    {t("saving")}
                  </>
                ) : exp.id ? (
                  <>
                    <Check size={16} />
                    {t("update")}
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    {t("save")}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Company autocomplete */}
          <div>
            <label className="block text-sm font-medium mb-1">{t("company")}</label>
            <AutocompleteInput
              options={companies}
              value={exp.customCompanyName || ""}
              onValueChange={(value) => {
                const updated = [...studentInfo.experiences]
                updated[idx].customCompanyName = value
                setStudentInfo({ ...studentInfo, workExperience: updated })
              }}
              placeholder={t("companyPlaceholder") || "Search or enter company name..."}
            />
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-medium mb-1">{t("position")}</label>
            <input
              type="text"
              placeholder={t("positionPlaceholder") || "Position"}
              value={exp.position || ""}
              onChange={(e) => {
                const updated = [...studentInfo.experiences]
                updated[idx].position = e.target.value
                setStudentInfo({ ...studentInfo, workExperience: updated })
              }}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Specialization */}
          <div>
            <label className="block text-sm font-medium mb-1">{t("specialization")}</label>
            <input
              type="text"
              placeholder={t("specializationPlaceholder") || "Specialization"}
              value={exp.specialization || ""}
              onChange={(e) => {
                const updated = [...studentInfo.experiences]
                updated[idx].specialization = e.target.value
                setStudentInfo({ ...studentInfo, workExperience: updated })
              }}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Start Date and End Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">{t("startDate")}</label>
              <input
                type="date"
                value={exp.startDate || ""}
                onChange={(e) => {
                  const updated = [...studentInfo.experiences]
                  updated[idx].startDate = e.target.value
                  setStudentInfo({ ...studentInfo, workExperience: updated })
                }}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t("endDate")}</label>
              <input
                type="date"
                value={exp.endDate || ""}
                disabled={exp.isCurrent}
                onChange={(e) => {
                  const updated = [...studentInfo.experiences]
                  updated[idx].endDate = e.target.value
                  setStudentInfo({ ...studentInfo, workExperience: updated })
                }}
                className="w-full px-3 py-2 border rounded-lg disabled:bg-gray-100"
              />
            </div>
          </div>

          {/* Currently working checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`current-work-${idx}`}
              checked={exp.isCurrent}
              onChange={(e) => {
                const updated = [...studentInfo.experiences]
                updated[idx].isCurrent = e.target.checked
                if (e.target.checked) {
                  updated[idx].endDate = "" // Clear end date if currently working
                }
                setStudentInfo({ ...studentInfo, workExperience: updated })
              }}
              className="w-4 h-4"
            />
            <label htmlFor={`current-work-${idx}`} className="text-sm">
              {t("currentlyWorking")}
            </label>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">{t("description")}</label>
            <textarea
              placeholder={
                t("workDescriptionPlaceholder") || "Describe your responsibilities and achievements..."
              }
              value={exp.description || ""}
              onChange={(e) => {
                const updated = [...studentInfo.experiences]
                updated[idx].description = e.target.value
                setStudentInfo({ ...studentInfo, workExperience: updated })
              }}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg resize-none"
            />
          </div>
          <button
            onClick={() => handleDeleteExperience(idx)}
            className="flex items-center gap-2 text-red-600 text-sm hover:text-red-700"
          >
            <Trash2 size={16} />
            {t("remove")}
          </button>
        </div>
      ))}
      <button
        onClick={handleAddButtonClick}
        className="flex items-center gap-2 text-primary mb-4"
      >
        <Plus size={20} />
        {t("addWorkBtn")}
      </button>
    </div>


    <AlertDialog open={Boolean(experienceToDelete)} onOpenChange={setExperienceToDelete}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("confirmDelete")}</AlertDialogTitle>
          <AlertDialogDescription>{t("confirmDeleteExperience")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setExperienceToDelete(null)}>{t("cancel", { ns: 'common' })}</AlertDialogCancel>
          <AlertDialogAction onClick={confirmDeleteExperience} className="bg-red-600 hover:bg-red-700">
            {t("delete", { ns: 'common' })}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
}
