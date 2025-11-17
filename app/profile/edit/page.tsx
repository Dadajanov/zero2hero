"use client"

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { getTranslation, type Language } from "@/lib/translations"
import LanguageSwitcher from "@/components/language-switcher"
import { User, Upload, Plus, Trash2, Check, ChevronLeft, LogOut, Menu, X, Download } from 'lucide-react'

const demoUserData = {
  firstName: "",
  lastName: "",
  profilePhoto: "",
  profileVideo: "",
  desiredPosition: "",
  email: "",
  phone: "",
  city: "",
  socialLinks: { facebook: "", instagram: "", telegram: "", linkedin: "" },
  age: 0,
  aboutDescription: "",
  languageSkills: [],
  technicalSkills: [],
  education: [],
  workExperience: [],
  achievements: [],
}

export default function ProfileEditPage() {
  const router = useRouter()
  const [language, setLanguage] = useState<Language>("ru")
  const [userData, setUserData] = useState(demoUserData)
  const [savedSections, setSavedSections] = useState<{ [key: string]: boolean }>({})
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")
    if (auth !== "true") {
      router.push("/login")
      return
    }

    const savedLang = localStorage.getItem("userLanguage") as Language
    const savedUserData = localStorage.getItem("registrationData")

    if (savedLang) setLanguage(savedLang)
    if (savedUserData) {
      try {
        setUserData({ ...demoUserData, ...JSON.parse(savedUserData) })
      } catch (e) {
        console.error("Failed to parse user data")
      }
    }
  }, [router])

  const t = (key: string) => getTranslation(language, key as any)

  const handleSaveSection = (sectionName: string) => {
    localStorage.setItem("registrationData", JSON.stringify(userData))
    setSavedSections({ ...savedSections, [sectionName]: true })
    
    // Show saved indicator for 2 seconds
    setTimeout(() => {
      setSavedSections((prev) => ({ ...prev, [sectionName]: false }))
    }, 2000)
  }

  useEffect(() => {
    localStorage.setItem("registrationData", JSON.stringify(userData))
  }, [userData])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
          <div className="text-xl sm:text-2xl font-bold text-primary cursor-pointer" onClick={() => router.push("/")}>
            ZERO 2 HERO
          </div>

          <nav className="hidden lg:flex gap-8">
            {[
              { label: t("candidates"), href: "/job-seekers" },
              { label: t("employers"), href: "/employers" },
              { label: t("universities"), href: "/universities" },
              { label: t("aboutUs"), href: "/about" },
            ].map((item) => (
              <a key={item.label} href={item.href} className="font-semibold text-foreground hover:text-primary">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-xl px-5 py-3"
            >
              <LogOut size={20} />
              {t("logout")}
            </button>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitcher />
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Back Button */}
        <button
          onClick={() => router.push("/profile")}
          className="flex items-center gap-2 text-gray-600 hover:text-primary mb-6"
        >
          <ChevronLeft size={20} />
          {t("backToProfile")}
        </button>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Edit Form */}
          <div className="space-y-6">
            {/* Section 1: Header */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">1. {t("mainInfo")}</h2>
                <button
                  onClick={() => handleSaveSection("header")}
                  className="flex items-center gap-2 bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700"
                >
                  {savedSections.header ? <Check size={16} /> : null}
                  {savedSections.header ? t("saved") : t("save")}
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-center mb-4">
                  <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    {userData.profilePhoto ? (
                      <img src={userData.profilePhoto || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User size={48} className="text-gray-400" />
                    )}
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 bg-primary text-white rounded-lg px-4 py-2">
                  <Upload size={16} />
                  {t("uploadPhoto")}
                </button>

                <div>
                  <label className="block text-sm font-medium mb-2">{t("firstName")} *</label>
                  <input
                    type="text"
                    value={userData.firstName}
                    onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t("lastName")} *</label>
                  <input
                    type="text"
                    value={userData.lastName}
                    onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t("desiredPosition")} *</label>
                  <input
                    type="text"
                    value={userData.desiredPosition}
                    onChange={(e) => setUserData({ ...userData, desiredPosition: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t("videoUrl")}</label>
                  <input
                    type="text"
                    value={userData.profileVideo}
                    onChange={(e) => setUserData({ ...userData, profileVideo: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Contacts */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">2. {t("contactInformation")}</h2>
                <button
                  onClick={() => handleSaveSection("contacts")}
                  className="flex items-center gap-2 bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700"
                >
                  {savedSections.contacts ? <Check size={16} /> : null}
                  {savedSections.contacts ? t("saved") : t("save")}
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">{t("phone")} *</label>
                  <input
                    type="tel"
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t("email")} *</label>
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t("city")} *</label>
                  <input
                    type="text"
                    value={userData.city}
                    onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t("instagram")}</label>
                  <input
                    type="text"
                    value={userData.socialLinks.instagram}
                    onChange={(e) =>
                      setUserData({ ...userData, socialLinks: { ...userData.socialLinks, instagram: e.target.value } })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="@username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t("telegram")}</label>
                  <input
                    type="text"
                    value={userData.socialLinks.telegram}
                    onChange={(e) =>
                      setUserData({ ...userData, socialLinks: { ...userData.socialLinks, telegram: e.target.value } })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="@username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t("linkedin")}</label>
                  <input
                    type="text"
                    value={userData.socialLinks.linkedin}
                    onChange={(e) =>
                      setUserData({ ...userData, socialLinks: { ...userData.socialLinks, linkedin: e.target.value } })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: About */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">3. {t("aboutMe")}</h2>
                <button
                  onClick={() => handleSaveSection("about")}
                  className="flex items-center gap-2 bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700"
                >
                  {savedSections.about ? <Check size={16} /> : null}
                  {savedSections.about ? t("saved") : t("save")}
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">{t("age")}</label>
                  <input
                    type="number"
                    value={userData.age}
                    onChange={(e) => setUserData({ ...userData, age: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t("shortDescription")}</label>
                  <textarea
                    value={userData.aboutDescription}
                    onChange={(e) => setUserData({ ...userData, aboutDescription: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    rows={5}
                    placeholder={t("aboutYouPlaceholder")}
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Languages */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">4. {t("languages")}</h2>
                <button
                  onClick={() => handleSaveSection("languages")}
                  className="flex items-center gap-2 bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700"
                >
                  {savedSections.languages ? <Check size={16} /> : null}
                  {savedSections.languages ? t("saved") : t("save")}
                </button>
              </div>

              <button
                onClick={() =>
                  setUserData({
                    ...userData,
                    languageSkills: [...userData.languageSkills, { language: "", level: "A1" }],
                  })
                }
                className="flex items-center gap-2 text-primary mb-4"
              >
                <Plus size={20} />
                {t("addLanguageBtn")}
              </button>

              <div className="space-y-4">
                {userData.languageSkills.map((lang, idx) => (
                  <div key={idx} className="border rounded-lg p-4">
                    <div className="flex justify-between mb-3">
                      <input
                        type="text"
                        placeholder={t("languagePlaceholder")}
                        value={lang.language}
                        onChange={(e) => {
                          const updated = [...userData.languageSkills]
                          updated[idx].language = e.target.value
                          setUserData({ ...userData, languageSkills: updated })
                        }}
                        className="flex-1 px-4 py-2 border rounded-lg"
                      />
                      <button
                        onClick={() =>
                          setUserData({ ...userData, languageSkills: userData.languageSkills.filter((_, i) => i !== idx) })
                        }
                        className="ml-2 text-red-600"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <label className="block text-sm text-gray-600 mb-2">{t("proficiencyLevel")}</label>
                    <select
                      value={lang.level}
                      onChange={(e) => {
                        const updated = [...userData.languageSkills]
                        updated[idx].level = e.target.value
                        setUserData({ ...userData, languageSkills: updated })
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

            {/* Section 5: Skills */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">5. {t("skills")}</h2>
                <button
                  onClick={() => handleSaveSection("skills")}
                  className="flex items-center gap-2 bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700"
                >
                  {savedSections.skills ? <Check size={16} /> : null}
                  {savedSections.skills ? t("saved") : t("save")}
                </button>
              </div>

              <button
                onClick={() =>
                  setUserData({
                    ...userData,
                    technicalSkills: [...userData.technicalSkills, { name: "", description: "", proficiency: 0 }],
                  })
                }
                className="flex items-center gap-2 text-primary mb-4"
              >
                <Plus size={20} />
                {t("addSkillBtn")}
              </button>

              <div className="space-y-4">
                {userData.technicalSkills.map((skill, idx) => (
                  <div key={idx} className="border rounded-lg p-4">
                    <div className="flex justify-between mb-3">
                      <div className="flex-1 space-y-3">
                        <input
                          type="text"
                          placeholder={t("skillNamePlaceholder")}
                          value={skill.name}
                          onChange={(e) => {
                            const updated = [...userData.technicalSkills]
                            updated[idx].name = e.target.value
                            setUserData({ ...userData, technicalSkills: updated })
                          }}
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                        <textarea
                          placeholder={t("descriptionPlaceholder")}
                          value={skill.description}
                          onChange={(e) => {
                            const updated = [...userData.technicalSkills]
                            updated[idx].description = e.target.value
                            setUserData({ ...userData, technicalSkills: updated })
                          }}
                          className="w-full px-4 py-2 border rounded-lg"
                          maxLength={140}
                          rows={2}
                        />
                      </div>
                      <button
                        onClick={() =>
                          setUserData({
                            ...userData,
                            technicalSkills: userData.technicalSkills.filter((_, i) => i !== idx),
                          })
                        }
                        className="ml-2 text-red-600"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <label className="block text-sm text-gray-600 mb-2">{t("levelLabel")}: {skill.proficiency}%</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={skill.proficiency}
                      onChange={(e) => {
                        const updated = [...userData.technicalSkills]
                        updated[idx].proficiency = parseInt(e.target.value)
                        setUserData({ ...userData, technicalSkills: updated })
                      }}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Section 6: Education */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">6. {t("education")}</h2>
                <button
                  onClick={() => handleSaveSection("education")}
                  className="flex items-center gap-2 bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700"
                >
                  {savedSections.education ? <Check size={16} /> : null}
                  {savedSections.education ? t("saved") : t("save")}
                </button>
              </div>

              <button
                onClick={() =>
                  setUserData({
                    ...userData,
                    education: [...userData.education, { years: "", institution: "", degree: "", specialty: "" }],
                  })
                }
                className="flex items-center gap-2 text-primary mb-4"
              >
                <Plus size={20} />
                {t("addEducationBtn")}
              </button>

              <div className="space-y-3">
                {userData.education.map((edu, idx) => (
                  <div key={idx} className="border rounded-lg p-4 space-y-3">
                    <input
                      type="text"
                      placeholder={t("yearsPlaceholder")}
                      value={edu.years}
                      onChange={(e) => {
                        const updated = [...userData.education]
                        updated[idx].years = e.target.value
                        setUserData({ ...userData, education: updated })
                      }}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder={t("institutionPlaceholder")}
                      value={edu.institution}
                      onChange={(e) => {
                        const updated = [...userData.education]
                        updated[idx].institution = e.target.value
                        setUserData({ ...userData, education: updated })
                      }}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder={t("degreePlaceholder")}
                      value={edu.degree}
                      onChange={(e) => {
                        const updated = [...userData.education]
                        updated[idx].degree = e.target.value
                        setUserData({ ...userData, education: updated })
                      }}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder={t("specialtyPlaceholder")}
                      value={edu.specialty}
                      onChange={(e) => {
                        const updated = [...userData.education]
                        updated[idx].specialty = e.target.value
                        setUserData({ ...userData, education: updated })
                      }}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                    <button
                      onClick={() => setUserData({ ...userData, education: userData.education.filter((_, i) => i !== idx) })}
                      className="flex items-center gap-2 text-red-600 text-sm hover:text-red-700"
                    >
                      <Trash2 size={16} />
                      {t("remove")}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 7: Work Experience */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">7. {t("workExperience")}</h2>
                <button
                  onClick={() => handleSaveSection("work")}
                  className="flex items-center gap-2 bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700"
                >
                  {savedSections.work ? <Check size={16} /> : null}
                  {savedSections.work ? t("saved") : t("save")}
                </button>
              </div>

              <button
                onClick={() =>
                  setUserData({
                    ...userData,
                    workExperience: [
                      ...userData.workExperience,
                      { period: "", company: "", position: "", achievements: [""] },
                    ],
                  })
                }
                className="flex items-center gap-2 text-primary mb-4"
              >
                <Plus size={20} />
                {t("addWorkBtn")}
              </button>

              <div className="space-y-3">
                {userData.workExperience.map((exp, idx) => (
                  <div key={idx} className="border rounded-lg p-4 space-y-3">
                    <input
                      type="text"
                      placeholder={t("periodPlaceholder")}
                      value={exp.period}
                      onChange={(e) => {
                        const updated = [...userData.workExperience]
                        updated[idx].period = e.target.value
                        setUserData({ ...userData, workExperience: updated })
                      }}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder={t("companyPlaceholder")}
                      value={exp.company}
                      onChange={(e) => {
                        const updated = [...userData.workExperience]
                        updated[idx].company = e.target.value
                        setUserData({ ...userData, workExperience: updated })
                      }}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder={t("positionPlaceholder")}
                      value={exp.position}
                      onChange={(e) => {
                        const updated = [...userData.workExperience]
                        updated[idx].position = e.target.value
                        setUserData({ ...userData, workExperience: updated })
                      }}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                    <button
                      onClick={() =>
                        setUserData({ ...userData, workExperience: userData.workExperience.filter((_, i) => i !== idx) })
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

            {/* Section 8: Achievements */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">8. {t("achievements")}</h2>
                <button
                  onClick={() => handleSaveSection("achievements")}
                  className="flex items-center gap-2 bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700"
                >
                  {savedSections.achievements ? <Check size={16} /> : null}
                  {savedSections.achievements ? t("saved") : t("save")}
                </button>
              </div>

              <button
                onClick={() =>
                  setUserData({
                    ...userData,
                    achievements: [...userData.achievements, { year: "", title: "", description: "" }],
                  })
                }
                className="flex items-center gap-2 text-primary mb-4"
              >
                <Plus size={20} />
                {t("addAchievementBtn")}
              </button>

              <div className="space-y-3">
                {userData.achievements.map((ach, idx) => (
                  <div key={idx} className="border rounded-lg p-4 space-y-3">
                    <input
                      type="text"
                      placeholder={t("yearPlaceholder")}
                      value={ach.year}
                      onChange={(e) => {
                        const updated = [...userData.achievements]
                        updated[idx].year = e.target.value
                        setUserData({ ...userData, achievements: updated })
                      }}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder={t("achievementTitle")}
                      value={ach.title}
                      onChange={(e) => {
                        const updated = [...userData.achievements]
                        updated[idx].title = e.target.value
                        setUserData({ ...userData, achievements: updated })
                      }}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                    <textarea
                      placeholder={t("achievementDescription")}
                      value={ach.description}
                      onChange={(e) => {
                        const updated = [...userData.achievements]
                        updated[idx].description = e.target.value
                        setUserData({ ...userData, achievements: updated })
                      }}
                      className="w-full px-3 py-2 border rounded-lg"
                      rows={3}
                    />
                    <button
                      onClick={() =>
                        setUserData({ ...userData, achievements: userData.achievements.filter((_, i) => i !== idx) })
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
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
                <h3 className="font-bold mb-2">{t("cvPreview")}</h3>
                <p className="text-sm text-gray-600">{t("realTimeChanges")}</p>
              </div>
              
              {/* Mini CV Preview */}
              <div className="bg-white rounded-lg shadow-lg p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                {/* Header */}
                <div className="border-b-4 border-primary pb-4 mb-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-20 h-20 rounded-full border-4 border-primary overflow-hidden flex-shrink-0">
                      {userData.profilePhoto ? (
                        <img src={userData.profilePhoto || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <User size={32} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold uppercase">
                        {userData.firstName || t("firstNamePlaceholder")} {userData.lastName || t("lastNamePlaceholder")}
                      </h1>
                      <p className="text-sm font-bold">{userData.desiredPosition || t("positionPlaceholder")}</p>
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
                        <p>{userData.phone}</p>
                        <p className="break-all">{userData.email}</p>
                        <p>{userData.city}</p>
                        {userData.socialLinks.instagram && <p>{userData.socialLinks.instagram}</p>}
                        {userData.socialLinks.telegram && <p>{userData.socialLinks.telegram}</p>}
                      </div>
                    </div>

                    {userData.age > 0 && (
                      <div>
                        <h3 className="font-bold text-primary mb-2">{t("aboutMe").toUpperCase()}</h3>
                        <p>{t("age")}: {userData.age}</p>
                      </div>
                    )}

                    {userData.languageSkills.length > 0 && (
                      <div>
                        <h3 className="font-bold text-primary mb-2">{t("languages").toUpperCase()}</h3>
                        {userData.languageSkills.map((lang, idx) => (
                          <div key={idx} className="mb-2">
                            <p className="font-semibold">{lang.language || t("languagePlaceholder")}</p>
                            <p className="text-primary font-bold">{lang.level}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {userData.technicalSkills.length > 0 && (
                      <div>
                        <h3 className="font-bold text-primary mb-2">{t("skills").toUpperCase()}</h3>
                        {userData.technicalSkills.map((skill, idx) => (
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
                    {userData.education.length > 0 && (
                      <div>
                        <h3 className="font-bold text-primary mb-2 flex items-center gap-2">
                          <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-lg">📚</span>
                          {t("education").toUpperCase()}
                        </h3>
                        {userData.education.map((edu, idx) => (
                          <div key={idx} className="border-l-2 border-primary pl-4 mb-3">
                            <p className="text-primary font-bold">{edu.years}</p>
                            <p className="font-bold">{edu.institution || t("institutionPlaceholder")}</p>
                            <p>{edu.degree} - {edu.specialty}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {userData.workExperience.length > 0 && (
                      <div>
                        <h3 className="font-bold text-primary mb-2 flex items-center gap-2">
                          <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-lg">💼</span>
                          {t("workExperience").toUpperCase()}
                        </h3>
                        {userData.workExperience.map((exp, idx) => (
                          <div key={idx} className="border-l-2 border-primary pl-4 mb-3">
                            <p className="text-primary font-bold">{exp.period}</p>
                            <p className="font-bold">{exp.company || t("companyPlaceholder")}</p>
                            <p>{exp.position || t("positionPlaceholder")}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {userData.achievements.length > 0 && (
                      <div>
                        <h3 className="font-bold text-primary mb-2 flex items-center gap-2">
                          <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-lg">🚀</span>
                          {t("achievements").toUpperCase()}
                        </h3>
                        {userData.achievements.map((ach, idx) => (
                          <div key={idx} className="border-l-2 border-primary pl-4 mb-3">
                            <p className="text-primary font-bold">{ach.year}</p>
                            <p className="font-bold">{ach.title || t("achievementTitlePlaceholder")}</p>
                            <p>{ach.description}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
