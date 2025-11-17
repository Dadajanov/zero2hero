"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Users, Target, Award, Heart, Briefcase, BookOpen, TrendingUp, LogOut, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getTranslation, type Language } from "@/lib/translations"
import LanguageSwitcher from "./language-switcher"
import MobileMenu from "./mobile-menu"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export default function AboutPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [language, setLanguage] = useState<Language>("ru")

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")
    const savedLang = localStorage.getItem("selectedLanguage") as Language
    setIsAuthenticated(auth === "true")
    if (savedLang) setLanguage(savedLang)
  }, [])

  const t = (key: string) => getTranslation(language, key as any)

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    setIsAuthenticated(false)
    router.push("/")
  }

  const values = [
    {
      icon: Target,
      title: t("ourMission"),
      description: t("missionDescription"),
    },
    {
      icon: Award,
      title: t("ourVision"),
      description: t("visionDescription"),
    },
    {
      icon: Heart,
      title: t("ourValues"),
      description: t("valuesDescription"),
    },
  ]

  const stats = [
    {
      number: "10,000+",
      label: t("students"),
    },
    {
      number: "500+",
      label: t("companies"),
    },
    {
      number: "50+",
      label: t("universities"),
    },
    {
      number: "95%",
      label: t("successfulEmployments"),
    },
  ]

  const team = [
    {
      name: language === "ru" ? "Алишер Каримов" : language === "uz" ? "Alisher Karimov" : "Alisher Karimov",
      role: t("founderCEO"),
      description: t("tenYearsExperience"),
    },
    {
      name: language === "ru" ? "Нигора Рахимова" : language === "uz" ? "Nigora Rahimova" : "Nigora Rakhimova",
      role: t("developmentDirector"),
      description: t("expertInEducation"),
    },
    {
      name: language === "ru" ? "Тимур Усманов" : language === "uz" ? "Timur Usmanov" : "Timur Usmanov",
      role: t("technicalDirector"),
      description: t("specialistInPlatforms"),
    },
  ]

  const navItems = [
    { label: t("candidates"), href: "/job-seekers" },
    { label: t("employers"), href: "/employers" },
    { label: t("universities"), href: "/universities" },
    { label: t("aboutUs"), href: "/about" },
  ]

  const mobileActionButtons = (
    <>
      {isAuthenticated ? (
        <>
          <button
            onClick={() => router.push("/profile")}
            className="flex items-center justify-center gap-2 w-full border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-xl px-5 py-3 transition-all font-semibold"
          >
            <User size={20} />
            {t("profile")}
          </button>
          <button
            onClick={() => {
              handleLogout()
            }}
            className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white rounded-xl px-5 py-3 transition-all font-semibold"
          >
            <LogOut size={20} />
            {t("logout")}
          </button>
        </>
      ) : (
        <button
          onClick={() => router.push("/login")}
          className="w-full bg-primary hover:bg-blue-700 text-white rounded-xl px-5 py-3 font-semibold transition-all"
        >
          {t("login")}
        </button>
      )}
    </>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navbar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-white shadow-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.div
            className="text-2xl font-bold text-primary cursor-pointer"
            onClick={() => router.push("/")}
            whileHover={{ scale: 1.05 }}
          >
            ZERO 2 HERO
          </motion.div>

          <nav className="hidden lg:flex gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className={`font-semibold transition-colors whitespace-nowrap ${
                  item.href === "/about" ? "text-primary" : "text-foreground hover:text-primary"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            {isAuthenticated ? (
              <>
                <motion.button
                  onClick={() => router.push("/profile")}
                  className="flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-xl px-5 py-3 transition-all whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                >
                  <User size={20} />
                  {t("profile")}
                </motion.button>
                <motion.button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-xl px-5 py-3 transition-all whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                >
                  <LogOut size={20} />
                  {t("logout")}
                </motion.button>
              </>
            ) : (
              <motion.button
                onClick={() => router.push("/login")}
                className="bg-primary hover:bg-blue-700 text-white rounded-xl px-5 py-3 font-semibold transition-all whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
              >
                {t("login")}
              </motion.button>
            )}
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitcher />
            <MobileMenu navItems={navItems} actionButtons={mobileActionButtons} />
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <motion.div className="text-center" variants={fadeInUp}>
          <motion.h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 uppercase" variants={fadeInUp}>
            {t("aboutUs")}
          </motion.h1>
          <motion.p className="text-xl text-gray-600 max-w-3xl mx-auto" variants={fadeInUp}>
            {t("aboutUsDescription")}
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <ScrollSection>
        <div className="bg-primary py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid md:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {stats.map((stat, index) => (
                <motion.div key={index} className="text-center" variants={fadeInUp}>
                  <div className="text-5xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-lg text-blue-100">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </ScrollSection>

      {/* Mission, Vision, Values */}
      <ScrollSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg p-8 transition-all"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                  <value.icon size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </ScrollSection>

      {/* What We Offer */}
      <ScrollSection>
        <div className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              className="text-4xl font-bold text-foreground mb-12 text-center uppercase"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t("whatWeOffer")}
            </motion.h2>
            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                {
                  icon: Briefcase,
                  title: t("paidInternshipsTitle"),
                  description: t("paidInternshipsDesc"),
                },
                {
                  icon: BookOpen,
                  title: t("freeCoursesTitle"),
                  description: t("freeCoursesDesc"),
                },
                {
                  icon: TrendingUp,
                  title: t("careerSupportTitle"),
                  description: t("careerSupportDesc"),
                },
              ].map((offer, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg p-8 transition-all"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    <offer.icon size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">{offer.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{offer.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </ScrollSection>

      {/* Team Section */}
      <ScrollSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.h2
            className="text-4xl font-bold text-foreground mb-12 text-center uppercase"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {t("ourTeam")}
          </motion.h2>
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
              >
                <div className="h-64 bg-gradient-to-br from-primary-light to-primary flex items-center justify-center">
                  <Users size={80} className="text-white opacity-50" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">{member.name}</h3>
                  <p className="text-primary font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </ScrollSection>

      {/* CTA Section */}
      <ScrollSection>
        <div className="bg-primary py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              className="text-4xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {t("readyToStartCareer")}
            </motion.h2>
            <motion.p
              className="text-xl text-blue-100 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              {t("joinThousandsOfStudents")}
            </motion.p>
            <motion.button
              onClick={() => router.push("/registration")}
              className="bg-white text-primary hover:bg-gray-100 rounded-xl px-8 py-4 font-semibold transition-all text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("registerNow")}
            </motion.button>
          </div>
        </div>
      </ScrollSection>

      {/* Footer */}
      <motion.footer
        className="bg-white border-t border-border py-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 text-sm">{t("footer")}</p>
        </div>
      </motion.footer>
    </div>
  )
}

function ScrollSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  )
}
