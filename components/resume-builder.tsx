"use client"

import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"

import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { Download, Plus, Trash2, Upload, User } from 'lucide-react'
import { useTranslation } from "react-i18next"

const demoUserData = {
  firstName: "Алексей",
  lastName: "Петров",
  profilePhoto: "",
  profileVideo: "",
  desiredPosition: "Frontend Developer",
  email: "demo@example.com",
  phone: "+998 (90) 123-45-67",
  city: "Ташкент",
  socialLinks: {
    facebook: "",
    instagram: "",
    telegram: "@alexey",
    linkedin: "",
  },
  age: 22,
  aboutDescription: "",
  languageSkills: [
    { language: "Русский", level: 100 },
    { language: "Английский", level: 70 },
  ],
  technicalSkills: [
    { name: "JavaScript", description: "Опыт работы с ES6+, React, Vue", proficiency: 85 },
  ],
  education: [
    {
      years: "2019-2023",
      institution: "Национальный университет Узбекистана",
      degree: "Бакалавр",
      specialty: "Информационные технологии",
    },
  ],
  workExperience: [
    {
      period: "2022-настоящее время",
      company: "Tech Company",
      position: "Junior Developer",
      achievements: ["Разработал 5 веб-приложений"],
    },
  ],
  achievements: [
    {
      year: "2023",
      title: "Хакатон IT-Park",
      description: "1 место в номинации Лучший веб-проект",
    },
  ],
}

export default function ResumeBuilder() {
  const router = useRouter()
  const { t } = useTranslation('home')
  const [userData, setUserData] = useState(demoUserData)
  const [currentSection, setCurrentSection] = useState(1)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const savedUserData = localStorage.getItem("registrationData")

    if (savedUserData) {
      try {
        const parsedData = JSON.parse(savedUserData)
        setUserData({ ...demoUserData, ...parsedData })
      } catch (e) {
        console.error("Failed to parse user data")
      }
    }
  }, [])


  const handleSave = () => {
    localStorage.setItem("registrationData", JSON.stringify(userData))
    alert("Резюме сохранено!")
  }

  const handleExportPDF = async () => {
    const cvPreview = document.getElementById("cv-preview")
    if (!cvPreview) return

    try {
      const canvas = await html2canvas(cvPreview, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
      pdf.save(`CV_${userData.firstName}_${userData.lastName}.pdf`)
    } catch (error) {
      console.error("PDF generation failed:", error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      {/* Main Content - Split Screen */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Form (40%) */}
          <div className="lg:w-2/5 space-y-4">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h1 className="text-2xl font-bold mb-4">Моё резюме</h1>
              <div className="flex gap-2 mb-6">
                {[1, 2, 3, 4, 5, 6].map((section) => (
                  <button
                    key={section}
                    onClick={() => setCurrentSection(section)}
                    className={`flex-1 h-2 rounded-full ${currentSection >= section ? "bg-primary" : "bg-gray-200"
                      }`}
                  />
                ))}
              </div>

              {/* Section 1: Header */}
              {currentSection === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold">1. Хедер</h2>
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
                    Загрузить фото
                  </button>
                  <input
                    type="text"
                    placeholder="Имя *"
                    value={userData.firstName}
                    onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Фамилия *"
                    value={userData.lastName}
                    onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Желаемая должность *"
                    value={userData.desiredPosition}
                    onChange={(e) => setUserData({ ...userData, desiredPosition: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="URL видео (необязательно)"
                    value={userData.profileVideo}
                    onChange={(e) => setUserData({ ...userData, profileVideo: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              )}

              {/* Section 2: Contacts */}
              {currentSection === 2 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold">2. Контактная информация</h2>
                  <input
                    type="tel"
                    placeholder="Телефон *"
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="email"
                    placeholder="Email *"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Город *"
                    value={userData.city}
                    onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Instagram"
                    value={userData.socialLinks.instagram}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        socialLinks: { ...userData.socialLinks, instagram: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Telegram"
                    value={userData.socialLinks.telegram}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        socialLinks: { ...userData.socialLinks, telegram: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              )}

              {/* Section 3: About */}
              {currentSection === 3 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold">3. О себе</h2>
                  <input
                    type="number"
                    placeholder="Возраст"
                    value={userData.age}
                    onChange={(e) => setUserData({ ...userData, age: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <textarea
                    placeholder="Краткое описание (необязательно)"
                    value={userData.aboutDescription}
                    onChange={(e) => setUserData({ ...userData, aboutDescription: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    rows={4}
                  />
                </div>
              )}

              {/* Section 4: Languages */}
              {currentSection === 4 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">4. Языки</h2>
                    <button
                      onClick={() =>
                        setUserData({
                          ...userData,
                          languageSkills: [...userData.languageSkills, { language: "", level: 0 }],
                        })
                      }
                      className="text-primary"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  {userData.languageSkills.map((lang, idx) => (
                    <div key={idx} className="border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <input
                          type="text"
                          placeholder="Язык"
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
                            setUserData({
                              ...userData,
                              languageSkills: userData.languageSkills.filter((_, i) => i !== idx),
                            })
                          }
                          className="ml-2 text-red-600"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                      <label className="text-sm text-gray-600">Уровень: {lang.level}%</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={lang.level}
                        onChange={(e) => {
                          const updated = [...userData.languageSkills]
                          updated[idx].level = parseInt(e.target.value)
                          setUserData({ ...userData, languageSkills: updated })
                        }}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Section 5: Skills */}
              {currentSection === 5 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">5. Навыки</h2>
                    <button
                      onClick={() =>
                        setUserData({
                          ...userData,
                          technicalSkills: [...userData.technicalSkills, { name: "", description: "", proficiency: 0 }],
                        })
                      }
                      className="text-primary"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  {userData.technicalSkills.map((skill, idx) => (
                    <div key={idx} className="border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <input
                          type="text"
                          placeholder="Навык"
                          value={skill.name}
                          onChange={(e) => {
                            const updated = [...userData.technicalSkills]
                            updated[idx].name = e.target.value
                            setUserData({ ...userData, technicalSkills: updated })
                          }}
                          className="flex-1 px-4 py-2 border rounded-lg"
                        />
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
                      <textarea
                        placeholder="Описание (140 символов)"
                        value={skill.description}
                        onChange={(e) => {
                          const updated = [...userData.technicalSkills]
                          updated[idx].description = e.target.value
                          setUserData({ ...userData, technicalSkills: updated })
                        }}
                        className="w-full px-4 py-2 border rounded-lg mb-2"
                        maxLength={140}
                        rows={2}
                      />
                      <label className="text-sm text-gray-600">Уровень: {skill.proficiency}%</label>
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
              )}

              {/* Section 6: Main Sections (Education, Experience, Achievements) */}
              {currentSection === 6 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold">6. Основные разделы</h2>

                  {/* Education */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-bold">Образование</h3>
                      <button
                        onClick={() =>
                          setUserData({
                            ...userData,
                            education: [...userData.education, { years: "", institution: "", degree: "", specialty: "" }],
                          })
                        }
                        className="text-primary"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    {userData.education.map((edu, idx) => (
                      <div key={idx} className="border rounded-lg p-3 mb-2 text-sm">
                        <input
                          type="text"
                          placeholder="Годы"
                          value={edu.years}
                          onChange={(e) => {
                            const updated = [...userData.education]
                            updated[idx].years = e.target.value
                            setUserData({ ...userData, education: updated })
                          }}
                          className="w-full px-3 py-1 border rounded mb-2"
                        />
                        <input
                          type="text"
                          placeholder="Учреждение"
                          value={edu.institution}
                          onChange={(e) => {
                            const updated = [...userData.education]
                            updated[idx].institution = e.target.value
                            setUserData({ ...userData, education: updated })
                          }}
                          className="w-full px-3 py-1 border rounded mb-2"
                        />
                        <button
                          onClick={() =>
                            setUserData({
                              ...userData,
                              education: userData.education.filter((_, i) => i !== idx),
                            })
                          }
                          className="text-red-600 text-xs"
                        >
                          Удалить
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Work Experience */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-bold">Опыт работы</h3>
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
                        className="text-primary"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    {userData.workExperience.map((exp, idx) => (
                      <div key={idx} className="border rounded-lg p-3 mb-2 text-sm">
                        <input
                          type="text"
                          placeholder="Период"
                          value={exp.period}
                          onChange={(e) => {
                            const updated = [...userData.workExperience]
                            updated[idx].period = e.target.value
                            setUserData({ ...userData, workExperience: updated })
                          }}
                          className="w-full px-3 py-1 border rounded mb-2"
                        />
                        <input
                          type="text"
                          placeholder="Компания"
                          value={exp.company}
                          onChange={(e) => {
                            const updated = [...userData.workExperience]
                            updated[idx].company = e.target.value
                            setUserData({ ...userData, workExperience: updated })
                          }}
                          className="w-full px-3 py-1 border rounded mb-2"
                        />
                        <button
                          onClick={() =>
                            setUserData({
                              ...userData,
                              workExperience: userData.workExperience.filter((_, i) => i !== idx),
                            })
                          }
                          className="text-red-600 text-xs"
                        >
                          Удалить
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setCurrentSection(Math.max(1, currentSection - 1))}
                  disabled={currentSection === 1}
                  className="px-6 py-2 border rounded-lg disabled:opacity-50"
                >
                  Назад
                </button>
                {currentSection < 6 ? (
                  <button
                    onClick={() => setCurrentSection(Math.min(6, currentSection + 1))}
                    className="px-6 py-2 bg-primary text-white rounded-lg"
                  >
                    Далее
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={handleSave} className="px-6 py-2 bg-green-600 text-white rounded-lg">
                      Сохранить
                    </button>
                    <button onClick={handleExportPDF} className="px-6 py-2 bg-primary text-white rounded-lg flex items-center gap-2">
                      <Download size={16} />
                      PDF
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Live Preview (60%) */}
          <div className="lg:w-3/5">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-4">Предпросмотр</h2>
              <div
                id="cv-preview"
                className="w-full aspect-[210/297] bg-white border border-gray-200 overflow-hidden"
                style={{ fontSize: "8px" }}
              >
                {/* CV Preview matching the professional design */}
                <div className="h-full flex flex-col">
                  {/* Primary blue header bar with logo */}
                  <div className="bg-primary h-[8mm] flex items-center px-[20mm]">
                    <div className="text-white font-bold text-[12px] tracking-wider">ZERO 2 HERO</div>
                  </div>

                  <div className="flex flex-1 p-[15mm]">
                    {/* Left Sidebar */}
                    <div className="w-1/3 pr-[15mm]">
                      {/* Profile Photo */}
                      <div className="mb-[15mm]">
                        <div className="w-[70px] h-[70px] border-4 border-primary rounded-full mx-auto bg-gray-100 overflow-hidden">
                          {userData.profilePhoto ? (
                            <img src={userData.profilePhoto || "/placeholder.svg"} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <User size={24} className="text-gray-400" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Contacts */}
                      <div className="mb-[20px]">
                        <h3 className="font-bold text-[11px] mb-[10px]">КОНТАКТЫ</h3>
                        {userData.phone && <p className="text-[9px] text-primary mb-[6px]">📞 {userData.phone}</p>}
                        {userData.email && <p className="text-[9px] mb-[6px] break-all">✉ {userData.email}</p>}
                        {userData.city && <p className="text-[9px] mb-[6px]">📍 {userData.city}</p>}
                      </div>

                      {/* Languages */}
                      {userData.languageSkills.length > 0 && (
                        <div className="mb-[20px]">
                          <h3 className="font-bold text-[11px] mb-[10px]">ЯЗЫКИ</h3>
                          {userData.languageSkills.map((lang, idx) => (
                            <div key={idx} className="mb-[10px]">
                              <p className="text-[9px] font-bold mb-[3px]">/ {lang.language.toUpperCase()}</p>
                              <div className="bg-gray-200 h-[6px] rounded">
                                <div className="bg-primary h-full rounded" style={{ width: `${lang.level}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Skills */}
                      {userData.technicalSkills.length > 0 && (
                        <div>
                          <h3 className="font-bold text-[11px] mb-[10px]">НАВЫКИ</h3>
                          {userData.technicalSkills.map((skill, idx) => (
                            <div key={idx} className="mb-[12px]">
                              <p className="text-[9px] font-bold mb-[2px]">/ {skill.name.toUpperCase()}</p>
                              {skill.description && <p className="text-[7px] text-gray-600 mb-[4px]">{skill.description}</p>}
                              <div className="bg-gray-200 h-[6px] rounded">
                                <div className="bg-primary h-full rounded" style={{ width: `${skill.proficiency}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right Content */}
                    <div className="flex-1 pl-[30px] border-l-2 border-black relative">
                      {/* Name and Title */}
                      <div className="mb-[20px]">
                        <h1 className="font-bold text-[24px] tracking-wider mb-[6px]">
                          {userData.firstName.toUpperCase()} {userData.lastName.toUpperCase()}
                        </h1>
                        <p className="text-[10px]">
                          <span className="font-bold">ЖЕЛАЕМАЯ ДОЛЖНОСТЬ:</span> {userData.desiredPosition}
                        </p>
                      </div>
                      <hr className="border-gray-300 mb-[20px]" />

                      {/* Education */}
                      {userData.education.length > 0 && (
                        <div className="mb-[20px] relative">
                          <div className="absolute -left-[42px] top-[4px] w-[26px] h-[26px] bg-black rounded-full flex items-center justify-center text-white text-[14px]">
                            📚
                          </div>
                          <h2 className="font-bold text-[12px] mb-[12px]">ОБРАЗОВАНИЕ</h2>
                          {userData.education.map((edu, idx) => (
                            <div key={idx} className="mb-[12px] pl-[12px] border-l-2 border-primary">
                              <p className="text-[8px] text-primary font-bold mb-[3px]">{edu.years}</p>
                              <p className="text-[10px] font-bold mb-[2px]">{edu.institution}</p>
                              <p className="text-[8px] text-gray-600">
                                {edu.degree}. {edu.specialty}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Work Experience */}
                      {userData.workExperience.length > 0 && (
                        <div className="relative">
                          <div className="absolute -left-[42px] top-[4px] w-[26px] h-[26px] bg-black rounded-full flex items-center justify-center text-white text-[14px]">
                            💼
                          </div>
                          <h2 className="font-bold text-[12px] mb-[12px]">ОПЫТ РАБОТЫ</h2>
                          {userData.workExperience.map((exp, idx) => (
                            <div key={idx} className="mb-[12px] pl-[12px] border-l-2 border-primary">
                              <p className="text-[8px] text-primary font-bold mb-[3px]">{exp.period}</p>
                              <p className="text-[10px] font-bold mb-[2px]">{exp.company}</p>
                              <p className="text-[9px] italic mb-[5px]">{exp.position}</p>
                              {exp.achievements.map(
                                (ach, i) =>
                                  ach && (
                                    <p key={i} className="text-[8px] mb-[2px]">
                                      - {ach}
                                    </p>
                                  )
                              )}
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
    </div>
  )
}
