"use client"
import { User } from 'lucide-react'
import { useTranslation } from "react-i18next"

import { useUserStore } from "@/stores/user-store"


export const MiniCVPreview = () => {
  const { t } = useTranslation('profile')
  const { user } = useUserStore()

  return <div className="hidden lg:block">
    <div className="sticky top-24">
      <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
        <h3 className="font-bold mb-2">{t("cvPreview")}</h3>
        <p className="text-sm text-gray-600">{t("realTimeChanges")}</p>
      </div>

      {/* Mini CV Preview */}
      {user &&
        <div className="bg-white rounded-lg shadow-lg p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Header */}
          <div className="border-b-4 border-primary pb-4 mb-4">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-20 h-20 rounded-full border-4 border-primary overflow-hidden shrink-0">
                {user.profilePhoto ? (
                  <img src={user.profilePhoto || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <User size={32} className="text-gray-400" />
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold uppercase">
                  {user.firstName || t("firstNamePlaceholder")} {user.lastName || t("lastNamePlaceholder")}
                </h1>
                <p className="text-sm font-bold">{user.desiredPosition || t("positionPlaceholder")}</p>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-3 gap-4 text-xs">
            {/* Left Sidebar */}
            <div className="col-span-1 space-y-4">
              <div>
                <h3 className="font-bold text-primary mb-2">{t("contactInformation").toUpperCase()}</h3>
                <div className="space-y-1">
                  <p>{user.phone}</p>
                  <p className="break-all">{user.email}</p>
                  <p>{user.city}</p>
                  {user.socialLinks?.instagram && <p>{user.socialLinks?.instagram}</p>}
                  {user.socialLinks?.telegram && <p>{user.socialLinks?.telegram}</p>}
                </div>
              </div>

              {user.age > 0 && (
                <div>
                  <h3 className="font-bold text-primary mb-2">{t("aboutMe").toUpperCase()}</h3>
                  <p>{t("age")}: {user.age}</p>
                </div>
              )}

              {user.languageSkills?.length > 0 && (
                <div>
                  <h3 className="font-bold text-primary mb-2">{t("languages").toUpperCase()}</h3>
                  {user.languageSkills?.map((lang: any, idx: number) => (
                    <div key={idx} className="mb-2">
                      <p className="font-semibold">{lang.language || t("languagePlaceholder")}</p>
                      <p className="text-primary font-bold">{lang.level}</p>
                    </div>
                  ))}
                </div>
              )}

              {user.technicalSkills?.length > 0 && (
                <div>
                  <h3 className="font-bold text-primary mb-2">{t("skills").toUpperCase()}</h3>
                  {user.technicalSkills?.map((skill: any, idx: number) => (
                    <div key={idx} className="mb-2">
                      <p className="font-semibold">{skill.name || t("skillPlaceholder")}</p>
                      {skill.description && <p className="text-xs text-gray-600">{skill.description}</p>}
                      <div className="w-full bg-gray-200 h-2 rounded mt-1">
                        <div
                          className="bg-primary h-2 rounded"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Content */}
            <div className="col-span-2 space-y-4">
              {user.education?.length > 0 && (
                <div>
                  <h3 className="font-bold text-primary mb-2 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-lg">📚</span>
                    {t("education").toUpperCase()}
                  </h3>
                  {user.education?.map((edu: any, idx: number) => (
                    <div key={idx} className="border-l-2 border-primary pl-4 mb-3">
                      <p className="text-primary font-bold">{edu.years}</p>
                      <p className="font-bold">{edu.institution || t("institutionPlaceholder")}</p>
                      <p>{edu.degree} - {edu.specialty}</p>
                    </div>
                  ))}
                </div>
              )}

              {user.workExperience?.length > 0 && (
                <div>
                  <h3 className="font-bold text-primary mb-2 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-lg">💼</span>
                    {t("workExperience").toUpperCase()}
                  </h3>
                  {user.workExperience?.map((exp: any, idx: number) => (
                    <div key={idx} className="border-l-2 border-primary pl-4 mb-3">
                      <p className="text-primary font-bold">{exp.period}</p>
                      <p className="font-bold">{exp.company || t("companyPlaceholder")}</p>
                      <p>{exp.position || t("positionPlaceholder")}</p>
                      {exp.achievements.length > 0 && (
                        <ul className="list-disc pl-6">
                          {exp.achievements?.map((achievement: any, achIdx: number) => (
                            <li key={achIdx}>{achievement}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {user.achievements?.length > 0 && (
                <div>
                  <h3 className="font-bold text-primary mb-2 flex items-center gap-2">
                    <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-lg">🏆</span>
                    {t("achievements").toUpperCase()}
                  </h3>
                  {user.achievements?.map((ach: any, idx: number) => (
                    <div key={idx} className="border-l-2 border-primary pl-4 mb-3">
                      <p className="text-primary font-bold">{ach.year}</p>
                      <p className="font-bold">{ach.title || t("achievementTitle")}</p>
                      <p>{ach.description || t("achievementDescription")}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      }
    </div>
  </div>

}
