"use client"
import { useEffect, useState } from "react"

import { useUserStore } from "@/stores/user-store"
import { AboutSection } from "@/views/EditView/Components/AboutSection"
import { AchievementsSection } from "@/views/EditView/Components/AchievementsSection"
import { ContactsSection } from "@/views/EditView/Components/ContactsSection"
import { EducationSection } from "@/views/EditView/Components/EducationSection"
import { ExperienceSection } from '@/views/EditView/Components/ExperienceSection'
import { LanguagesSection } from "@/views/EditView/Components/LanguagesSection"
import { SkillsSections } from "@/views/EditView/Components/SkillsSections"
import { UserInfoSection } from "@/views/EditView/Components/UserInfoSection"
import { useEducationList } from '@/views/EditView/hooks/useEducationList'
import { useExperiencesList } from '../hooks/useExperiencesList'


export default function EditFom() {
  const { user, setUser, setStudentInfo, studentInfo } = useUserStore()
  const { educationsList, educationsListLoading, refetchEducationList } = useEducationList()
  const { experiencesList, experiencesListLoading, refetchExperiencesList } = useExperiencesList()
  const [savedSections, setSavedSections] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    if (educationsList && user) {
      setStudentInfo({
        ...studentInfo,
        educations: educationsList
      })
    }
  }, [educationsListLoading])

  useEffect(() => {
    if (experiencesList && user) {
      setStudentInfo({
        ...studentInfo,
        experiences: educationsList
      })
    }
  }, [experiencesListLoading])

  const handleSaveSection = (sectionName: string) => {
    localStorage.setItem("registrationData", JSON.stringify(user))
    setSavedSections({ ...savedSections, [sectionName]: true })

    // Show saved indicator for 2 seconds
    setTimeout(() => {
      setSavedSections((prev) => ({ ...prev, [sectionName]: false }))
    }, 2000)
  }


  return (<div className="space-y-6">
    {/* Section 1: Header */}
    <UserInfoSection
      user={user}
      setUser={setUser}
      onSave={handleSaveSection}
      savedSections={savedSections}
    />

    {/* Section 2: Contacts */}
    <ContactsSection
      user={user}
      setUser={setUser}
      onSave={handleSaveSection}
      savedSections={savedSections}
    />

    {/* Section 3: About */}
    <AboutSection
      user={user}
      setUser={setUser}
      onSave={handleSaveSection}
      savedSections={savedSections}
    />

    {/* Section 4: Languages */}
    <LanguagesSection
      user={user}
      setUser={setUser}
      onSave={handleSaveSection}
      savedSections={savedSections}
    />

    {/* Section 5: Skills */}
    <SkillsSections
      user={user}
      setUser={setUser}
      onSave={handleSaveSection}
      savedSections={savedSections}
    />

    {/* Section 6: Education */}
    <EducationSection
      onRefetch={refetchEducationList}
      studentInfo={studentInfo}
      setStudentInfo={setStudentInfo}
      savedSections={savedSections}
    />

    {/* Section 7: Work Experience */}
    <ExperienceSection
      onRefetch={refetchExperiencesList}
      studentInfo={studentInfo}
      setStudentInfo={setStudentInfo}
      savedSections={savedSections}
    />

    {/* Section 8: Achievements */}
    <AchievementsSection
      user={user}
      setUser={setUser}
      onSave={handleSaveSection}
      savedSections={savedSections}
    />
  </div>
  )
}
