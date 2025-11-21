"use client"
import { useRouter } from 'next/navigation'
import { useState } from "react"

import { useUserStore } from "@/stores/user-store"
import { AboutSection } from "@/views/EditView/Components/AboutSection"
import { AchievementsSection } from "@/views/EditView/Components/AchievementsSection"
import { ContactsSection } from "@/views/EditView/Components/ContactsSection"
import { EducationSection } from "@/views/EditView/Components/EducationSection"
import { LanguagesSection } from "@/views/EditView/Components/LanguagesSection"
import { SkillsSections } from "@/views/EditView/Components/SkillsSections"
import { UserInfoSection } from "@/views/EditView/Components/UserInfoSection"
import { WorkSection } from "@/views/EditView/Components/WorkSection"


export default function EditFom() {
  const router = useRouter()
  const { user: storeUser, setUser: setStoreUser } = useUserStore()
  const [savedSections, setSavedSections] = useState<{ [key: string]: boolean }>({})

  const handleSaveSection = (sectionName: string) => {
    localStorage.setItem("registrationData", JSON.stringify(storeUser))
    setSavedSections({ ...savedSections, [sectionName]: true })

    // Show saved indicator for 2 seconds
    setTimeout(() => {
      setSavedSections((prev) => ({ ...prev, [sectionName]: false }))
    }, 2000)
  }


  return (<div className="space-y-6">
    {/* Section 1: Header */}
    <UserInfoSection
      user={storeUser}
      setUser={setStoreUser}
      onSave={handleSaveSection}
      savedSections={savedSections}
    />

    {/* Section 2: Contacts */}
    <ContactsSection
      user={storeUser}
      setUser={setStoreUser}
      onSave={handleSaveSection}
      savedSections={savedSections}
    />

    {/* Section 3: About */}
    <AboutSection
      user={storeUser}
      setUser={setStoreUser}
      onSave={handleSaveSection}
      savedSections={savedSections}
    />

    {/* Section 4: Languages */}
    <LanguagesSection
      user={storeUser}
      setUser={setStoreUser}
      onSave={handleSaveSection}
      savedSections={savedSections}
    />

    {/* Section 5: Skills */}
    <SkillsSections
      user={storeUser}
      setUser={setStoreUser}
      onSave={handleSaveSection}
      savedSections={savedSections}
    />

    {/* Section 6: Education */}
    <EducationSection
      user={storeUser}
      setUser={setStoreUser}
      onSave={handleSaveSection}
      savedSections={savedSections}
    />

    {/* Section 7: Work Experience */}
    <WorkSection
      user={storeUser}
      setUser={setStoreUser}
      onSave={handleSaveSection}
      savedSections={savedSections}
    />

    {/* Section 8: Achievements */}
    <AchievementsSection
      user={storeUser}
      setUser={setStoreUser}
      onSave={handleSaveSection}
      savedSections={savedSections}
    />
  </div>
  )
}
