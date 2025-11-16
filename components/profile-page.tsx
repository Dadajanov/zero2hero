"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation'
import { getTranslation, type Language } from "@/lib/translations"
import LanguageSwitcher from "./language-switcher"
import { User, Briefcase, BookOpen, LogOut, Edit, Award, TrendingUp, Menu, X, Upload, Plus, Trash2, Video, Download } from 'lucide-react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const demoUserData = {
  // Header section
  firstName: "Алексей",
  middleName: "Иванович",
  lastName: "Петров",
  profilePhoto: "",
  profileVideo: "",
  desiredPosition: "Frontend Developer",
  
  // Contact information
  email: "demo@example.com",
  phone: "+998 (90) 123-45-67",
  city: "Ташкент",
  socialLinks: {
    facebook: "",
    instagram: "", // Changed from vk to instagram
    telegram: "@alexey",
    linkedin: "",
  },
  
  // About section
  age: 22,
  aboutDescription: "",
  
  // Languages
  languageSkills: [
    { language: "Русский", level: 100 },
    { language: "Английский", level: 70 },
    { language: "Узбекский", level: 85 },
  ],
  
  // Skills
  technicalSkills: [
    { name: "JavaScript", description: "Опыт работы с ES6+, React, Vue", proficiency: 85 },
    { name: "React", description: "Разработка SPA приложений", proficiency: 90 },
  ],
  
  // Education
  education: [
    {
      years: "2019-2023",
      institution: "Национальный университет Узбекистана",
      degree: "Бакалавр",
      specialty: "Информационные технологии",
    },
  ],
  
  // Work experience
  workExperience: [
    {
      period: "2022-настоящее время",
      company: "Tech Company",
      position: "Junior Developer",
      achievements: [
        "Разработал 5 веб-приложений",
        "Оптимизировал производительность на 30%",
        "Внедрил CI/CD процессы",
      ],
    },
  ],
  
  // Achievements
  achievements: [
    {
      year: "2023",
      title: "Хакатон IT-Park",
      description: "1 место в номинации Лучший веб-проект",
    },
  ],
  
  // Legacy fields (keeping for backward compatibility if needed, but new fields are preferred)
  university: "Национальный университет Узбекистана",
  course: "3",
  languages: ["Русский", "Английский", "Узбекский"],
  goal: "Стажировка + Работа",
  status: "Студент",
  experience: "1 год опыта в веб-разработке",
  skills: "JavaScript, React, Node.js, TypeScript",
  language: "ru",
}

export default function ProfilePage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [language, setLanguage] = useState<Language>("ru")
  const [userData, setUserData] = useState<any>(demoUserData)
  const [isEditing, setIsEditing] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")
    const savedLang = localStorage.getItem("userLanguage") as Language
    const savedUserData = localStorage.getItem("registrationData")

    if (auth !== "true") {
      router.push("/login")
      return
    }

    setIsAuthenticated(true)
    if (savedLang) setLanguage(savedLang)

    if (savedUserData) {
      try {
        const parsedData = JSON.parse(savedUserData)
        // Merge demo data with saved data to ensure all fields are present
        setUserData({ ...demoUserData, ...parsedData })
      } catch (e) {
        console.error("Failed to parse user data, using demo data")
        setUserData(demoUserData)
      }
    } else {
      setUserData(demoUserData) // Ensure demo data is set if nothing is saved
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    setIsAuthenticated(false)
    router.push("/")
  }

  const t = (key: string) => getTranslation(language, key as any)

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка профиля...</p>
        </div>
      </div>
    )
  }

  const handleSave = () => {
    localStorage.setItem("registrationData", JSON.stringify(userData))
    setIsEditing(false)
  }

  const addLanguageSkill = () => {
    setUserData({
      ...userData,
      languageSkills: [...userData.languageSkills, { language: "", level: 0 }],
    })
  }

  const removeLanguageSkill = (index: number) => {
    setUserData({
      ...userData,
      languageSkills: userData.languageSkills.filter((_: any, i: number) => i !== index),
    })
  }

  const addTechnicalSkill = () => {
    setUserData({
      ...userData,
      technicalSkills: [...userData.technicalSkills, { name: "", description: "", proficiency: 0 }],
    })
  }

  const removeTechnicalSkill = (index: number) => {
    setUserData({
      ...userData,
      technicalSkills: userData.technicalSkills.filter((_: any, i: number) => i !== index),
    })
  }

  const addEducation = () => {
    setUserData({
      ...userData,
      education: [...userData.education, { years: "", institution: "", degree: "", specialty: "" }],
    })
  }

  const removeEducation = (index: number) => {
    setUserData({
      ...userData,
      education: userData.education.filter((_: any, i: number) => i !== index),
    })
  }

  const addWorkExperience = () => {
    setUserData({
      ...userData,
      workExperience: [...userData.workExperience, { period: "", company: "", position: "", achievements: [""] }],
    })
  }

  const removeWorkExperience = (index: number) => {
    setUserData({
      ...userData,
      workExperience: userData.workExperience.filter((_: any, i: number) => i !== index),
    })
  }

  const addAchievement = () => {
    setUserData({
      ...userData,
      achievements: [...userData.achievements, { year: "", title: "", description: "" }],
    })
  }

  const removeAchievement = (index: number) => {
    setUserData({
      ...userData,
      achievements: userData.achievements.filter((_: any, i: number) => i !== index),
    })
  }

  const addAchievementPoint = (expIndex: number) => {
    const updated = [...userData.workExperience]
    updated[expIndex].achievements.push("")
    setUserData({ ...userData, workExperience: updated })
  }

  const removeAchievementPoint = (expIndex: number, pointIndex: number) => {
    const updated = [...userData.workExperience]
    updated[expIndex].achievements = updated[expIndex].achievements.filter((_: any, i: number) => i !== pointIndex)
    setUserData({ ...userData, workExperience: updated })
  }

  const handleExportPDF = async () => {
    const cvContent = document.createElement('div')
    cvContent.style.cssText = `
      width: 210mm;
      height: 297mm;
      background: white;
      font-family: 'Arial', sans-serif;
      position: absolute;
      left: -9999px;
      top: 0;
      box-sizing: border-box;
    `
    
    cvContent.innerHTML = `
      <div style="font-family: Arial, sans-serif; color: #1a1a1a; height: 100%; display: flex; flex-direction: column;">
        <!-- Primary blue header bar with logo -->
        <div style="background: #2563eb; height: 8mm; width: 100%; display: flex; align-items: center; padding: 0 20mm;">
          <div style="color: white; font-weight: bold; font-size: 16px; letter-spacing: 1px;">ZERO 2 HERO</div>
        </div>
        
        <div style="display: flex; padding: 15mm 20mm; flex: 1;">
          <!-- Left Sidebar (1/3 width) -->
          <div style="width: 33%; padding-right: 15mm;">
            <!-- Profile Photo with primary blue border -->
            <div style="margin-bottom: 20mm;">
              <div style="width: 90px; height: 90px; border: 4px solid #2563eb; border-radius: 50%; overflow: hidden; margin: 0 auto; background: #f0f0f0;">
                ${userData.profilePhoto ? `<img src="${userData.profilePhoto}" style="width: 100%; height: 100%; object-fit: cover;" />` : ''}
              </div>
            </div>
            
            <!-- Contacts Section -->
            <div style="margin-bottom: 25px;">
              <h3 style="font-size: 14px; font-weight: bold; margin-bottom: 12px; letter-spacing: 1px;">КОНТАКТЫ</h3>
              ${userData.phone ? `<p style="margin: 8px 0; font-size: 11px; color: #2563eb;">📞 ${userData.phone}</p>` : ''}
              ${userData.email ? `<p style="margin: 8px 0; font-size: 11px; color: #555; word-break: break-all;">✉ ${userData.email}</p>` : ''}
              ${userData.city ? `<p style="margin: 8px 0; font-size: 11px;">📍 ${userData.city}</p>` : ''}
              ${userData.socialLinks.facebook ? `<p style="margin: 8px 0; font-size: 11px;">f ${userData.socialLinks.facebook}</p>` : ''}
              ${userData.socialLinks.instagram ? `<p style="margin: 8px 0; font-size: 11px; color: #2563eb;">📷 ${userData.socialLinks.instagram}</p>` : ''}
            </div>
            
            <!-- About Section -->
            ${userData.age || userData.aboutDescription ? `
            <div style="margin-bottom: 25px;">
              <h3 style="font-size: 14px; font-weight: bold; margin-bottom: 12px; letter-spacing: 1px;">О СЕБЕ</h3>
              ${userData.age ? `<p style="margin: 8px 0; font-size: 11px;">Возраст: ${userData.age}</p>` : ''}
              ${userData.aboutDescription ? `<p style="margin: 8px 0; font-size: 11px; color: #555;">${userData.aboutDescription}</p>` : ''}
            </div>
            ` : ''}
            
            <!-- Languages -->
            ${userData.languageSkills && userData.languageSkills.length > 0 ? `
            <div style="margin-bottom: 25px;">
              <h3 style="font-size: 14px; font-weight: bold; margin-bottom: 12px; letter-spacing: 1px;">ЯЗЫКИ</h3>
              ${userData.languageSkills.map((lang: any) => `
                <div style="margin-bottom: 12px;">
                  <p style="font-size: 11px; font-weight: bold; margin-bottom: 4px;">/ ${lang.language.toUpperCase()}</p>
                  <div style="background: #e0e0e0; height: 8px; border-radius: 4px; overflow: hidden;">
                    <div style="background: #2563eb; width: ${lang.level}%; height: 100%;"></div>
                  </div>
                </div>
              `).join('')}
            </div>
            ` : ''}
            
            <!-- Skills -->
            ${userData.technicalSkills && userData.technicalSkills.length > 0 ? `
            <div style="margin-bottom: 25px;">
              <h3 style="font-size: 14px; font-weight: bold; margin-bottom: 12px; letter-spacing: 1px;">НАВЫКИ</h3>
              ${userData.technicalSkills.map((skill: any) => `
                <div style="margin-bottom: 15px;">
                  <p style="font-size: 11px; font-weight: bold; margin-bottom: 2px;">/ ${skill.name.toUpperCase()}</p>
                  ${skill.description ? `<p style="font-size: 9px; color: #555; margin-bottom: 6px; line-height: 1.3;">${skill.description}</p>` : ''}
                  <div style="background: #e0e0e0; height: 8px; border-radius: 4px; overflow: hidden;">
                    <div style="background: #2563eb; width: ${skill.proficiency}%; height: 100%;"></div>
                  </div>
                </div>
              `).join('')}
            </div>
            ` : ''}
          </div>
          
          <!-- Right Content (2/3 width) with Timeline -->
          <div style="flex: 1; position: relative; padding-left: 40px; border-left: 3px solid #333;">
            <!-- Name and Title at Top -->
            <div style="margin-bottom: 25px; margin-top: -5mm;">
              <h1 style="font-size: 32px; font-weight: bold; margin: 0; letter-spacing: 2px;">${userData.firstName ? userData.firstName.toUpperCase() : ''} ${userData.lastName ? userData.lastName.toUpperCase() : ''}</h1>
              <p style="font-size: 12px; margin: 8px 0 0 0; letter-spacing: 1px;"><span style="font-weight: bold;">ЖЕЛАЕМАЯ ДОЛЖНОСТЬ:</span> ${userData.desiredPosition || 'Не указано'}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0 25px 0;" />
            
            <!-- Education Section with Icon -->
            ${userData.education && userData.education.length > 0 ? `
            <div style="position: relative; margin-bottom: 30px;">
              <div style="position: absolute; left: -55px; top: 5px; width: 35px; height: 35px; background: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px;">📚</div>
              <h2 style="font-size: 16px; font-weight: bold; margin-bottom: 15px; letter-spacing: 1px;">ОБРАЗОВАНИЕ</h2>
              ${userData.education.map((edu: any) => `
                <div style="margin-bottom: 18px; padding-left: 15px; border-left: 3px solid #2563eb;">
                  <p style="font-size: 10px; color: #2563eb; font-weight: bold; margin: 0 0 5px 0;">${edu.years}</p>
                  <p style="font-size: 13px; font-weight: bold; margin: 0 0 3px 0;">${edu.institution}</p>
                  <p style="font-size: 10px; color: #555; margin: 0;">${edu.degree}. ${edu.specialty}</p>
                </div>
              `).join('')}
            </div>
            ` : ''}
            
            <!-- Work Experience Section with Icon -->
            ${userData.workExperience && userData.workExperience.length > 0 ? `
            <div style="position: relative; margin-bottom: 30px;">
              <div style="position: absolute; left: -55px; top: 5px; width: 35px; height: 35px; background: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px;">💼</div>
              <h2 style="font-size: 16px; font-weight: bold; margin-bottom: 15px; letter-spacing: 1px;">ОПЫТ РАБОТЫ</h2>
              ${userData.workExperience.map((exp: any) => `
                <div style="margin-bottom: 20px; padding-left: 15px; border-left: 3px solid #2563eb;">
                  <p style="font-size: 10px; color: #2563eb; font-weight: bold; margin: 0 0 5px 0;">${exp.period}</p>
                  <p style="font-size: 13px; font-weight: bold; margin: 0 0 3px 0;">${exp.company}</p>
                  <p style="font-size: 11px; font-style: italic; margin: 0 0 8px 0;">${exp.position}</p>
                  ${exp.achievements.filter((a: string) => a).map((achievement: string) => `
                    <p style="font-size: 10px; margin: 3px 0; padding-left: 10px; color: #333; line-height: 1.4;">- ${achievement}</p>
                  `).join('')}
                </div>
              `).join('')}
            </div>
            ` : ''}
            
            <!-- Achievements Section with Icon -->
            ${userData.achievements && userData.achievements.length > 0 ? `
            <div style="position: relative;">
              <div style="position: absolute; left: -55px; top: 5px; width: 35px; height: 35px; background: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px;">🚀</div>
              <h2 style="font-size: 16px; font-weight: bold; margin-bottom: 15px; letter-spacing: 1px;">ДОСТИЖЕНИЯ</h2>
              ${userData.achievements.map((achievement: any) => `
                <div style="margin-bottom: 15px; padding-left: 15px; border-left: 3px solid #2563eb;">
                  <p style="font-size: 10px; color: #2563eb; font-weight: bold; margin: 0 0 5px 0;">${achievement.year}</p>
                  <p style="font-size: 12px; font-weight: bold; margin: 0 0 5px 0;">${achievement.title}</p>
                  ${achievement.description ? `<p style="font-size: 10px; color: #555; margin: 0; line-height: 1.4;">${achievement.description}</p>` : ''}
                </div>
              `).join('')}
            </div>
            ` : ''}
          </div>
        </div>
      </div>
    `
    
    document.body.appendChild(cvContent)
    
    try {
      const canvas = await html2canvas(cvContent, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      })
      
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })
      
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save(`CV_${userData.firstName}_${userData.lastName}.pdf`)
    } finally {
      document.body.removeChild(cvContent)
    }
  }


  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header/Navbar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-white shadow-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
          <motion.div
            className="text-xl sm:text-2xl font-bold text-primary cursor-pointer"
            onClick={() => router.push("/")}
            whileHover={{ scale: 1.05 }}
          >
            ZERO 2 HERO
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-8">
            {[
              { label: t("candidates"), href: "/job-seekers" },
              { label: t("employers"), href: "/employers" },
              { label: t("universities"), href: "/universities" },
              { label: t("aboutUs"), href: "/about" },
            ].map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="font-semibold text-foreground hover:text-primary transition-colors whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <motion.button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-xl px-5 py-3 transition-all whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
            >
              <LogOut size={20} />
              {t("logout")}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground hover:text-primary transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <nav className="flex flex-col px-4 py-3 space-y-2">
              {[
                { label: t("candidates"), href: "/job-seekers" },
                { label: t("employers"), href: "/employers" },
                { label: t("universities"), href: "/universities" },
                { label: t("aboutUs"), href: "/about" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-semibold text-foreground hover:text-primary transition-colors py-2 whitespace-nowrap"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => {
                  handleLogout()
                  setIsMobileMenuOpen(false)
                }}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-xl px-5 py-3 transition-all justify-center mt-2 whitespace-nowrap"
              >
                <LogOut size={20} />
                {t("logout")}
              </button>
            </nav>
          </motion.div>
        )}
      </motion.header>

      {/* Profile Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 flex-1">
        <motion.div initial="initial" animate="animate" variants={fadeInUp}>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6 sm:mb-8">
            <div className="bg-gradient-to-r from-primary to-blue-700 p-4 sm:p-8 text-white">
              <div className="flex flex-col items-center gap-4 sm:gap-6">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                  {userData.profilePhoto ? (
                    <img src={userData.profilePhoto || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={48} className="text-primary sm:w-16 sm:h-16" />
                  )}
                </div>
                {isEditing && (
                  <button className="flex items-center gap-2 bg-white text-primary hover:bg-blue-50 rounded-xl px-4 py-2 transition-all text-sm">
                    <Upload size={16} />
                    Загрузить фото
                  </button>
                )}
                
                <div className="flex-1 text-center w-full">
                  {isEditing ? (
                    <div className="space-y-3 max-w-md mx-auto">
                      <input
                        type="text"
                        value={userData.firstName}
                        onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg text-white text-xl font-bold bg-white/20 placeholder-white/70"
                        placeholder="Имя"
                      />
                      <input
                        type="text"
                        value={userData.lastName}
                        onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg text-white text-xl font-bold bg-white/20 placeholder-white/70"
                        placeholder="Фамилия"
                      />
                      <input
                        type="text"
                        value={userData.desiredPosition}
                        onChange={(e) => setUserData({ ...userData, desiredPosition: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg text-white bg-white/20 placeholder-white/70"
                        placeholder="Желаемая должность"
                      />
                      <input
                        type="text"
                        value={userData.profileVideo}
                        onChange={(e) => setUserData({ ...userData, profileVideo: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg text-white text-sm bg-white/20 placeholder-white/70"
                        placeholder="URL видео (необязательно)"
                      />
                    </div>
                  ) : (
                    <>
                      <h1 className="text-2xl sm:text-4xl font-bold mb-2">
                        {userData.desiredPosition}
                      </h1>
                      <p className="text-blue-100 text-lg sm:text-xl mb-2">{userData.status}</p>
                      {userData.profileVideo && (
                        <div className="mt-4 max-w-md mx-auto">
                          <video src={userData.profileVideo} controls className="w-full rounded-lg" />
                        </div>
                      )}
                    </>
                  )}
                  
                  {!isEditing && (
                    <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center mt-4">
                      <div className="bg-white/20 rounded-lg px-4 py-2">
                        <p className="text-sm text-blue-100">Профиль заполнен</p>
                        <p className="text-2xl font-bold">85%</p>
                      </div>
                      <div className="bg-white/20 rounded-lg px-4 py-2">
                        <p className="text-sm text-blue-100">Просмотров</p>
                        <p className="text-2xl font-bold">124</p>
                      </div>
                      <div className="bg-white/20 rounded-lg px-4 py-2">
                        <p className="text-sm text-blue-100">Откликов</p>
                        <p className="text-2xl font-bold">8</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-3 w-full sm:w-auto">
                  {!isEditing && (
                    <motion.button
                      onClick={handleExportPDF}
                      className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700 rounded-xl px-4 sm:px-6 py-2 sm:py-3 transition-all font-semibold text-sm sm:text-base flex-1 sm:flex-initial justify-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Download size={18} className="sm:w-5 sm:h-5" />
                      Скачать PDF
                    </motion.button>
                  )}
                  <motion.button
                    onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                    className="flex items-center gap-2 bg-white text-primary hover:bg-blue-50 rounded-xl px-4 sm:px-6 py-2 sm:py-3 transition-all font-semibold text-sm sm:text-base flex-1 sm:flex-initial justify-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Edit size={18} className="sm:w-5 sm:h-5" />
                    {isEditing ? "Сохранить" : "Редактировать"}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">Контактная информация</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                  <input
                    type="tel"
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Город</label>
                  <input
                    type="text"
                    value={userData.city}
                    onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Facebook (необязательно)</label>
                  <input
                    type="text"
                    value={userData.socialLinks.facebook}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        socialLinks: { ...userData.socialLinks, facebook: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instagram (необязательно)</label>
                  <input
                    type="text"
                    value={userData.socialLinks.instagram}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        socialLinks: { ...userData.socialLinks, instagram: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="@username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telegram (необязательно)</label>
                  <input
                    type="text"
                    value={userData.socialLinks.telegram}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        socialLinks: { ...userData.socialLinks, telegram: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn (необязательно)</label>
                  <input
                    type="text"
                    value={userData.socialLinks.linkedin}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        socialLinks: { ...userData.socialLinks, linkedin: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {isEditing && (
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">О себе</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Возраст</label>
                  <input
                    type="number"
                    value={userData.age}
                    onChange={(e) => setUserData({ ...userData, age: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Краткое описание (необязательно)
                  </label>
                  <textarea
                    value={userData.aboutDescription}
                    onChange={(e) => setUserData({ ...userData, aboutDescription: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    rows={3}
                    placeholder="Расскажите о себе..."
                  />
                </div>
              </div>
            </div>
          )}

          {isEditing && (
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-foreground">Языки</h2>
                <button
                  onClick={addLanguageSkill}
                  className="flex items-center gap-2 bg-primary text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-all"
                >
                  <Plus size={16} />
                  Добавить
                </button>
              </div>
              <div className="space-y-4">
                {userData.languageSkills.map((lang: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <input
                        type="text"
                        value={lang.language}
                        onChange={(e) => {
                          const updated = [...userData.languageSkills]
                          updated[index].language = e.target.value
                          setUserData({ ...userData, languageSkills: updated })
                        }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="Название языка"
                      />
                      <button
                        onClick={() => removeLanguageSkill(index)}
                        className="ml-2 text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Уровень владения: {lang.level}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={lang.level}
                        onChange={(e) => {
                          const updated = [...userData.languageSkills]
                          updated[index].level = parseInt(e.target.value)
                          setUserData({ ...userData, languageSkills: updated })
                        }}
                        className="w-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isEditing && (
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-foreground">Навыки</h2>
                <button
                  onClick={addTechnicalSkill}
                  className="flex items-center gap-2 bg-primary text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-all"
                >
                  <Plus size={16} />
                  Добавить
                </button>
              </div>
              <div className="space-y-4">
                {userData.technicalSkills.map((skill: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 space-y-3">
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => {
                            const updated = [...userData.technicalSkills]
                            updated[index].name = e.target.value
                            setUserData({ ...userData, technicalSkills: updated })
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="Название навыка"
                        />
                        <textarea
                          value={skill.description}
                          onChange={(e) => {
                            const updated = [...userData.technicalSkills]
                            updated[index].description = e.target.value
                            setUserData({ ...userData, technicalSkills: updated })
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="Краткое описание (140 символов)"
                          maxLength={140}
                          rows={2}
                        />
                      </div>
                      <button onClick={() => removeTechnicalSkill(index)} className="ml-2 text-red-600 hover:text-red-800">
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Уровень владения: {skill.proficiency}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={skill.proficiency}
                        onChange={(e) => {
                          const updated = [...userData.technicalSkills]
                          updated[index].proficiency = parseInt(e.target.value)
                          setUserData({ ...userData, technicalSkills: updated })
                        }}
                        className="w-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isEditing && (
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-foreground">Образование</h2>
                <button
                  onClick={addEducation}
                  className="flex items-center gap-2 bg-primary text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-all"
                >
                  <Plus size={16} />
                  Добавить
                </button>
              </div>
              <div className="space-y-4">
                {userData.education.map((edu: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 space-y-3">
                        <input
                          type="text"
                          value={edu.years}
                          onChange={(e) => {
                            const updated = [...userData.education]
                            updated[index].years = e.target.value
                            setUserData({ ...userData, education: updated })
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="Годы обучения (например, 2019-2023)"
                        />
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => {
                            const updated = [...userData.education]
                            updated[index].institution = e.target.value
                            setUserData({ ...userData, education: updated })
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="Учебное заведение"
                        />
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => {
                            const updated = [...userData.education]
                            updated[index].degree = e.target.value
                            setUserData({ ...userData, education: updated })
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="Степень (Бакалавр, Магистр и т.д.)"
                        />
                        <input
                          type="text"
                          value={edu.specialty}
                          onChange={(e) => {
                            const updated = [...userData.education]
                            updated[index].specialty = e.target.value
                            setUserData({ ...userData, education: updated })
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="Специальность"
                        />
                      </div>
                      <button onClick={() => removeEducation(index)} className="ml-2 text-red-600 hover:text-red-800">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isEditing && (
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-foreground">Опыт работы</h2>
                <button
                  onClick={addWorkExperience}
                  className="flex items-center gap-2 bg-primary text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-all"
                >
                  <Plus size={16} />
                  Добавить
                </button>
              </div>
              <div className="space-y-4">
                {userData.workExperience.map((exp: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 space-y-3">
                        <input
                          type="text"
                          value={exp.period}
                          onChange={(e) => {
                            const updated = [...userData.workExperience]
                            updated[index].period = e.target.value
                            setUserData({ ...userData, workExperience: updated })
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="Период (например, 2022-настоящее время)"
                        />
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => {
                            const updated = [...userData.workExperience]
                            updated[index].company = e.target.value
                            setUserData({ ...userData, workExperience: updated })
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="Компания"
                        />
                        <input
                          type="text"
                          value={exp.position}
                          onChange={(e) => {
                            const updated = [...userData.workExperience]
                            updated[index].position = e.target.value
                            setUserData({ ...userData, workExperience: updated })
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="Должность"
                        />
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Список достижений (3-5 пунктов)
                          </label>
                          {exp.achievements.map((achievement: string, achIndex: number) => (
                            <div key={achIndex} className="flex gap-2 mb-2">
                              <input
                                type="text"
                                value={achievement}
                                onChange={(e) => {
                                  const updated = [...userData.workExperience]
                                  updated[index].achievements[achIndex] = e.target.value
                                  setUserData({ ...userData, workExperience: updated })
                                }}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                                placeholder="Достижение"
                              />
                              <button
                                onClick={() => removeAchievementPoint(index, achIndex)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 size={20} />
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => addAchievementPoint(index)}
                            className="text-primary hover:text-blue-700 text-sm flex items-center gap-1"
                          >
                            <Plus size={16} />
                            Добавить достижение
                          </button>
                        </div>
                      </div>
                      <button onClick={() => removeWorkExperience(index)} className="ml-2 text-red-600 hover:text-red-800">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isEditing && (
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-foreground">Достижения</h2>
                <button
                  onClick={addAchievement}
                  className="flex items-center gap-2 bg-primary text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-all"
                >
                  <Plus size={16} />
                  Добавить
                </button>
              </div>
              <div className="space-y-4">
                {userData.achievements.map((achievement: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 space-y-3">
                        <input
                          type="text"
                          value={achievement.year}
                          onChange={(e) => {
                            const updated = [...userData.achievements]
                            updated[index].year = e.target.value
                            setUserData({ ...userData, achievements: updated })
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="Год"
                        />
                        <input
                          type="text"
                          value={achievement.title}
                          onChange={(e) => {
                            const updated = [...userData.achievements]
                            updated[index].title = e.target.value
                            setUserData({ ...userData, achievements: updated })
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="Название конкурса/проекта"
                        />
                        <textarea
                          value={achievement.description}
                          onChange={(e) => {
                            const updated = [...userData.achievements]
                            updated[index].description = e.target.value
                            setUserData({ ...userData, achievements: updated })
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                          placeholder="Краткое описание"
                          rows={2}
                        />
                      </div>
                      <button onClick={() => removeAchievement(index)} className="ml-2 text-red-600 hover:text-red-800">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isEditing && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                {/* Personal Information Card */}
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User size={20} className="text-primary" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">Личная информация</h3>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t("name")}</p>
                      <p className="font-semibold text-foreground text-sm sm:text-base">
                        {userData.firstName} {userData.middleName} {userData.lastName}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t("email")}</p>
                      <p className="font-semibold text-foreground text-sm sm:text-base break-all">
                        {userData.email || "Не указан"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t("phone")}</p>
                      <p className="font-semibold text-foreground text-sm sm:text-base">{userData.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Education Card */}
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <BookOpen size={20} className="text-green-600" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">Образование</h3>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t("university")}</p>
                      <p className="font-semibold text-foreground text-sm sm:text-base">{userData.university}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t("course")}</p>
                      <p className="font-semibold text-foreground text-sm sm:text-base">{userData.course} курс</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t("languages")}</p>
                      <p className="font-semibold text-foreground text-sm sm:text-base">
                        {userData.languages?.join(", ") || "Не указаны"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Career Card */}
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Briefcase size={20} className="text-purple-600" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">Карьера</h3>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t("goal")}</p>
                      <p className="font-semibold text-foreground text-sm sm:text-base">{userData.goal}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t("experience")}</p>
                      <p className="font-semibold text-foreground text-sm sm:text-base">
                        {userData.experience || "Не указан"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t("skills")}</p>
                      <p className="font-semibold text-foreground text-sm sm:text-base">
                        {userData.skills || "Не указаны"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <motion.div
                  onClick={() => router.push("/job-seekers")}
                  className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-4 sm:p-6 text-white hover:shadow-xl transition-all cursor-pointer"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <Briefcase size={24} />
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl mb-2">Вакансии</h3>
                  <p className="text-blue-100 text-sm">Найдите работу мечты</p>
                  <p className="text-2xl sm:text-3xl font-bold mt-4">156</p>
                </motion.div>

                <motion.div
                  onClick={() => router.push("/")}
                  className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-4 sm:p-6 text-white hover:shadow-xl transition-all cursor-pointer"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <BookOpen size={24} />
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl mb-2">Курсы</h3>
                  <p className="text-green-100 text-sm">Бесплатное обучение</p>
                  <p className="text-2xl sm:text-3xl font-bold mt-4">24</p>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-4 sm:p-6 text-white hover:shadow-xl transition-all cursor-pointer"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <Award size={24} />
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl mb-2">Достижения</h3>
                  <p className="text-purple-100 text-sm">Ваши успехи</p>
                  <p className="text-2xl sm:text-3xl font-bold mt-4">12</p>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg p-4 sm:p-6 text-white hover:shadow-xl transition-all cursor-pointer"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <TrendingUp size={24} />
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl mb-2">Прогресс</h3>
                  <p className="text-orange-100 text-sm">Ваш рост</p>
                  <p className="text-2xl sm:text-3xl font-bold mt-4">+45%</p>
                </motion.div>
              </div>
            </>
          )}
        </motion.div>
      </div>

      <motion.footer
        className="bg-white border-t border-border py-6 sm:py-8 mt-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 text-sm">{t("footer")}</p>
        </div>
      </motion.footer>
    </div>
  )
}
