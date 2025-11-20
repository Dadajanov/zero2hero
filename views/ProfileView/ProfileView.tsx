"use client"

import { UserApi } from "@/api/domains/user-api"
import { useUserStore } from "@/stores/user-store"
import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { Award, BookOpen, Briefcase, Download, Edit, TrendingUp, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

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
  experience: "1 год ��пыта в веб-разработке",
  skills: "JavaScript, React, Node.js, TypeScript",
  language: "ru",
}

export default function ProfileView() {
  const { t } = useTranslation('profile')
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const { user: storeUser, setUser: setStoreUser, isAuthenticated, clearUser } = useUserStore()

  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", "me"],
    queryFn: () => UserApi.fetchUserData(),
    enabled: isAuthenticated(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  })

  useEffect(() => {
    if (userData && !storeUser) {
      setStoreUser(userData)
    }
  }, [userData, storeUser, setStoreUser])

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login")
      return
    }
  }, [router, isAuthenticated])

  const handleLogout = () => {
    clearUser()
    localStorage.removeItem("isAuthenticated")
    router.push("/")
  }


  if (isLoading || !isAuthenticated()) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">{t("loadingProfile")}</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{t("errorLoadingProfile") || "Error loading profile"}</p>
          <button
            onClick={() => router.push("/login")}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            {t("backToLogin") || "Back to Login"}
          </button>
        </div>
      </div>
    )
  }


  if (!storeUser) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">{t("noUserData") || "No user data available"}</p>
        </div>
      </div>
    )
  }

  const handleDownloadPDF = () => {
    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    const cvHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${storeUser.firstName} ${storeUser.lastName} - CV</title>
        <style>
          @page { margin: 0; }
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: Arial, sans-serif; 
            padding: 40px;
            font-size: 12px;
            line-height: 1.5;
          }
          .header {
            border-bottom: 4px solid #2563eb;
            padding-bottom: 20px;
            margin-bottom: 20px;
          }
          .name { 
            font-size: 32px; 
            font-weight: bold; 
            text-transform: uppercase;
            margin-bottom: 5px;
          }
          .position { 
            font-size: 14px; 
            font-weight: bold;
            margin-bottom: 10px;
          }
          .logo {
            color: #2563eb;
            font-size: 16px;
            font-weight: bold;
          }
          .container {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 30px;
          }
          .sidebar h3, .main h3 {
            color: #2563eb;
            font-weight: bold;
            margin-bottom: 10px;
            margin-top: 15px;
            font-size: 14px;
          }
          .sidebar h3:first-child, .main h3:first-child {
            margin-top: 0;
          }
          .sidebar p {
            margin-bottom: 5px;
          }
          .skill {
            margin-bottom: 10px;
          }
          .skill-name {
            font-weight: bold;
            margin-bottom: 3px;
          }
          .skill-bar {
            background: #e5e7eb;
            height: 8px;
            border-radius: 4px;
            overflow: hidden;
          }
          .skill-fill {
            background: #2563eb;
            height: 100%;
          }
          .timeline-item {
            border-left: 2px solid #2563eb;
            padding-left: 15px;
            margin-bottom: 15px;
          }
          .timeline-year {
            color: #2563eb;
            font-weight: bold;
            margin-bottom: 3px;
          }
          .timeline-title {
            font-weight: bold;
            margin-bottom: 3px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">ZERO 2 HERO</div>
          <div class="name">${storeUser.firstName} ${storeUser.lastName}</div>
          <div class="position">${storeUser.desiredPosition || ""}</div>
        </div>

        <div class="container">
          <div class="sidebar">
            <h3>КОНТАКТЫ</h3>
            <p>${storeUser.phone}</p>
            <p>${storeUser.email}</p>
            <p>${storeUser.city || ""}</p>
            ${storeUser.socialLinks?.instagram ? `<p>${storeUser.socialLinks.instagram}</p>` : ""}
            ${storeUser.socialLinks?.telegram ? `<p>${storeUser.socialLinks.telegram}</p>` : ""}

            ${storeUser.age ? `<h3>О СЕБЕ</h3><p>Возраст: ${storeUser.age}</p>` : ""}
            ${storeUser.aboutDescription ? `<p>${storeUser.aboutDescription}</p>` : ""}

            ${storeUser.languageSkills?.length
        ? `
              <h3>ЯЗЫКИ</h3>
              ${storeUser.languageSkills
          .map(
            (lang: any) => `
                <div style="margin-bottom: 10px;">
                  <p style="font-weight: bold;">${lang.language}</p>
                  <p style="color: #2563eb; font-weight: bold;">${lang.level}</p>
                </div>
              `,
          )
          .join("")}
            `
        : ""
      }

            ${storeUser.technicalSkills?.length
        ? `
              <h3>НАВЫКИ</h3>
              ${storeUser.technicalSkills
          .map(
            (skill: any) => `
                <div class="skill">
                  <div class="skill-name">${skill.name}</div>
                  ${skill.description ? `<p style="font-size: 10px; color: #666;">${skill.description}</p>` : ""}
                  <div class="skill-bar">
                    <div class="skill-fill" style="width: ${skill.proficiency}%"></div>
                  </div>
                </div>
              `,
          )
          .join("")}
            `
        : ""
      }
          </div>

          <div class="main">
            ${storeUser.education?.length
        ? `
              <h3>📚 ОБРАЗОВАНИЕ</h3>
              ${storeUser.education
          .map(
            (edu: any) => `
                <div class="timeline-item">
                  <div class="timeline-year">${edu.years}</div>
                  <div class="timeline-title">${edu.institution}</div>
                  <p>${edu.degree} - ${edu.specialty}</p>
                </div>
              `,
          )
          .join("")}
            `
        : ""
      }

            ${storeUser.workExperience?.length
        ? `
              <h3>💼 ОПЫТ РАБОТЫ</h3>
              ${storeUser.workExperience
          .map(
            (exp: any) => `
                <div class="timeline-item">
                  <div class="timeline-year">${exp.period}</div>
                  <div class="timeline-title">${exp.company}</div>
                  <p>${exp.position}</p>
                  ${exp.achievements?.length
                ? `
                    <ul style="margin-left: 15px; margin-top: 5px;">
                      ${exp.achievements.map((ach: any) => (ach ? `<li>${ach}</li>` : "")).join("")}
                    </ul>
                  `
                : ""
              }
                </div>
              `,
          )
          .join("")}
            `
        : ""
      }

            ${storeUser.achievements?.length
        ? `
              <h3>🚀 ДОСТИЖЕНИЯ</h3>
              ${storeUser.achievements
          .map(
            (ach: any) => `
                <div class="timeline-item">
                  <div class="timeline-year">${ach.year}</div>
                  <div class="timeline-title">${ach.title}</div>
                  <p>${ach.description}</p>
                </div>
              `,
          )
          .join("")}
            `
        : ""
      }
          </div>
        </div>
      </body>
      </html>
    `

    printWindow.document.write(cvHTML)
    printWindow.document.close()

    setTimeout(() => {
      printWindow.print()
    }, 250)
  }

  // Removed unused state variables: useState(false) for isAuthenticated, useState<any>(demoUserData) for userData, useState(false) for isEditing

  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* Profile Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 flex-1">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6 sm:mb-8">
            <div className="bg-gradient-to-r from-primary to-blue-700 p-4 sm:p-8 text-white">
              <div className="flex flex-col items-center gap-4 sm:gap-6">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                  {storeUser.profilePhoto ? (
                    <img
                      src={storeUser.profilePhoto || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={48} className="text-primary sm:w-16 sm:h-16" />
                  )}
                </div>

                <div className="flex-1 text-center w-full">
                  <h1 className="text-2xl sm:text-4xl font-bold mb-2">
                    {storeUser.studentName} {storeUser.lastName}
                  </h1>
                  <p className="text-blue-100 text-lg sm:text-xl mb-2">
                    {storeUser.desiredPosition || storeUser.status}
                  </p>
                  {storeUser.profileVideo && (
                    <div className="mt-4 max-w-md mx-auto">
                      <video src={storeUser.profileVideo} controls className="w-full rounded-lg" />
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center mt-4">
                    <div className="bg-white/20 rounded-lg px-4 py-2">
                      <p className="text-sm text-blue-100">{t("profileCompleted")}</p>
                      <p className="text-2xl font-bold">85%</p>
                    </div>
                    <div className="bg-white/20 rounded-lg px-4 py-2">
                      <p className="text-sm text-blue-100">{t("views")}</p>
                      <p className="text-2xl font-bold">124</p>
                    </div>
                    <div className="bg-white/20 rounded-lg px-4 py-2">
                      <p className="text-sm text-blue-100">{t("responses")}</p>
                      <p className="text-2xl font-bold">8</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 w-full sm:w-auto">
                  <motion.button
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-xl px-4 sm:px-6 py-2 sm:py-3 transition-all font-semibold text-sm sm:text-base flex-1 sm:flex-initial justify-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Download size={18} className="sm:w-5 sm:h-5" />
                    {t("downloadPDF")}
                  </motion.button>

                  <motion.button
                    onClick={() => router.push("/profile/edit")}
                    className="flex items-center gap-2 bg-white text-primary hover:bg-blue-50 rounded-xl px-4 sm:px-6 py-2 sm:py-3 transition-all font-semibold text-sm sm:text-base flex-1 sm:flex-initial justify-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Edit size={18} className="sm:w-5 sm:h-5" />
                    {t("editProfile")}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Personal Information Card */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User size={20} className="text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground">{t("personalInfo")}</h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t("name")}</p>
                  <p className="font-semibold text-foreground text-sm sm:text-base">
                    {storeUser.studentName} {storeUser.middleName} {storeUser.lastName}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">{t("email")}</p>
                  <p className="font-semibold text-foreground text-sm sm:text-base break-all">
                    {storeUser.email || t("notSpecified")}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">{t("phone")}</p>
                  <p className="font-semibold text-foreground text-sm sm:text-base">{storeUser.phone}</p>
                </div>
              </div>
            </div>

            {/* Education Card */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <BookOpen size={20} className="text-green-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground">{t("education")}</h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t("university")}</p>
                  <p className="font-semibold text-foreground text-sm sm:text-base">
                    {storeUser.university || storeUser.education?.[0]?.institution}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">{t("course")}</p>
                  <p className="font-semibold text-foreground text-sm sm:text-base">
                    {storeUser.course ? `${storeUser.course} ${t("year")}` : t("notSpecified")}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">{t("languages")}</p>
                  <p className="font-semibold text-foreground text-sm sm:text-base">
                    {storeUser.languages?.join(", ") ||
                      storeUser.languageSkills?.map((l: any) => l.language).join(", ") ||
                      t("notSpecifiedPlural")}
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
                <h3 className="text-lg sm:text-xl font-bold text-foreground">{t("career")}</h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t("goal")}</p>
                  <p className="font-semibold text-foreground text-sm sm:text-base">
                    {storeUser.goal || t("notSpecified")}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">{t("experience")}</p>
                  <p className="font-semibold text-foreground text-sm sm:text-base">
                    {storeUser.experience || t("notSpecified")}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">{t("skills")}</p>
                  <p className="font-semibold text-foreground text-sm sm:text-base">
                    {storeUser.skills ||
                      storeUser.technicalSkills?.map((s: any) => s.name).join(", ") ||
                      t("notSpecifiedPlural")}
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
              <h3 className="font-bold text-lg sm:text-xl mb-2">{t("vacancies")}</h3>
              <p className="text-blue-100 text-sm">{t("findDreamJob")}</p>
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
              <h3 className="font-bold text-lg sm:text-xl mb-2">{t("courses")}</h3>
              <p className="text-green-100 text-sm">{t("freeTraining")}</p>
              <p className="text-2xl sm:text-3xl font-bold mt-4">24</p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-4 sm:p-6 text-white hover:shadow-xl transition-all cursor-pointer"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <Award size={24} />
              </div>
              <h3 className="font-bold text-lg sm:text-xl mb-2">{t("achievements")}</h3>
              <p className="text-purple-100 text-sm">{t("yourSuccess")}</p>
              <p className="text-2xl sm:text-3xl font-bold mt-4">12</p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg p-4 sm:p-6 text-white hover:shadow-xl transition-all cursor-pointer"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                <TrendingUp size={24} />
              </div>
              <h3 className="font-bold text-lg sm:text-xl mb-2">{t("progress")}</h3>
              <p className="text-orange-100 text-sm">{t("yourGrowth")}</p>
              <p className="text-2xl sm:text-3xl font-bold mt-4">+45%</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
