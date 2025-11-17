"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { LogOut, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getTranslation, type Language } from "@/lib/translations"
import LanguageSwitcher from "./language-switcher"
import ScrollSection from "./scroll-section" // Import ScrollSection component
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

const scaleHover = {
  whileHover: { scale: 1.05 },
  transition: { duration: 0.3 },
}

export default function HomePage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [language, setLanguage] = useState<Language>("ru")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const heroImages = [
    "/business-team-meeting.png",
    "/modern-office-workspace.png",
    "/career-success.jpg",
    "/professional-development.jpg",
    "/job-interview-scene.png",
    "/team-collaboration.png",
  ]

  const featuredVacancies = [
    { company: "Google", position: "Senior Software Engineer", salary: "15 000 000 UZS" },
    { company: "Microsoft", position: "Product Manager", salary: "14 000 000 UZS" },
    { company: "Amazon", position: "Data Scientist", salary: "13 500 000 UZS" },
    { company: "Apple", position: "UX/UI Designer", salary: "12 000 000 UZS" },
    { company: "Meta", position: "Frontend Developer", salary: "13 000 000 UZS" },
    { company: "Tesla", position: "Marketing Manager", salary: "11 500 000 UZS" },
  ]

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")
    setIsAuthenticated(auth === "true")
    const savedLang = localStorage.getItem("userLanguage") as Language
    if (savedLang) {
      setLanguage(savedLang)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroImages.length])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    setIsAuthenticated(false)
    router.push("/")
  }

  const t = (key: string) => getTranslation(language, key as any)

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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header/Navbar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-white shadow-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.div className="text-2xl font-bold text-primary cursor-pointer" onClick={() => router.push("/")}>
            ZERO 2 HERO
          </motion.div>

          <nav className="hidden lg:flex gap-8">
            {navItems.map((item) => (
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
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeInUp}>
            <motion.h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 uppercase" variants={fadeInUp}>
              {t("homeTitle")}
            </motion.h1>
            <motion.p className="text-xl text-gray-600 mb-8" variants={fadeInUp}>
              {t("homeSubtitle")}
            </motion.p>

            <motion.div className="space-y-4 mb-8" variants={fadeInUp}>
              {[t("feature1"), t("feature2"), t("feature3")].map((feature) => (
                <motion.div key={feature} className="flex items-center gap-3" variants={fadeInUp}>
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-lg text-foreground">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="flex gap-4" variants={fadeInUp}>
              <motion.button
                className="bg-primary hover:bg-blue-700 text-white rounded-xl px-8 py-4 font-semibold transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("findJob")}
              </motion.button>
              <motion.button
                onClick={() => router.push("/video")}
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-xl px-8 py-4 font-semibold transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t("watchVideo")}
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInUp} className="relative">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="w-full h-96 rounded-2xl overflow-hidden shadow-2xl relative"
            >
              <img
                src={heroImages[currentImageIndex] || "/placeholder.svg"}
                alt="Professional platform"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                <div className="p-6 w-full">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white/80 text-sm font-medium uppercase tracking-wide">
                        {t("topVacancies")}
                      </span>
                      <span className="bg-primary/90 text-white text-xs px-3 py-1 rounded-full font-semibold">
                        {t("newBadge")}
                      </span>
                    </div>
                    <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">
                      {featuredVacancies[currentImageIndex].position}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-white/90 text-lg font-semibold">
                        {featuredVacancies[currentImageIndex].company}
                      </p>
                      <p className="text-green-400 text-xl font-bold">{featuredVacancies[currentImageIndex].salary}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            {/* Image indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentImageIndex ? "bg-primary w-8" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Job Offers Section */}
      <ScrollSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.h2 className="text-4xl font-bold text-foreground mb-12 uppercase">{t("currentVacancies")}</motion.h2>
          <motion.div
            className="grid md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { title: t("administrator"), salary: "8 000 000 UZS", vacancies: 500 },
              { title: t("programmer"), salary: "10 000 000 UZS", vacancies: 700 },
              { title: t("designer"), salary: "7 500 000 UZS", vacancies: 300 },
              { title: t("marketer"), salary: "9 000 000 UZS", vacancies: 450 },
              { title: t("manager"), salary: "8 500 000 UZS", vacancies: 600 },
              { title: t("analyst"), salary: "11 000 000 UZS", vacancies: 350 },
              { title: t("hrSpecialist"), salary: "7 000 000 UZS", vacancies: 250 },
              { title: t("accountant"), salary: "6 500 000 UZS", vacancies: 400 },
              { title: t("lawyer"), salary: "9 500 000 UZS", vacancies: 200 },
              { title: t("translator"), salary: "6 000 000 UZS", vacancies: 150 },
              { title: t("engineer"), salary: "12 000 000 UZS", vacancies: 550 },
              { title: t("architect"), salary: "13 000 000 UZS", vacancies: 180 },
            ].map((job) => (
              <motion.div
                key={job.title}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg p-6 transition-all"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-xl font-bold text-foreground mb-2">{job.title}</h3>
                <p className="text-primary font-semibold mb-2">{job.salary}</p>
                <p className="text-gray-600">{job.vacancies} {t("vacancies")}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </ScrollSection>

      {/* Courses Section */}
      <ScrollSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.h2 className="text-4xl font-bold text-foreground mb-12 uppercase">{t("skillUp")}</motion.h2>
          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { id: 1, title: "Web Development", image: "/web-development-course.jpg" },
              { id: 2, title: "Data Science", image: "/data-science-course.jpg" },
              { id: 3, title: "Digital Marketing", image: "/digital-marketing-course.jpg" },
              { id: 4, title: "UI/UX Design", image: "/ui-ux-design-course.jpg" },
              { id: 5, title: "Mobile Development", image: "/mobile-development-course.jpg" },
              { id: 6, title: "Business Analytics", image: "/business-analytics-course.jpg" },
            ].map((course) => (
              <motion.div
                key={course.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
              >
                <div className="h-40 relative overflow-hidden">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2">{course.title}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </ScrollSection>

      {/* Partner Companies Section */}
      <ScrollSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.h2 className="text-4xl font-bold text-foreground mb-12 uppercase">{t("companies")}</motion.h2>
          <motion.div
            className="grid md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { id: 1, name: "Google", logo: "/google-logo.jpg" },
              { id: 2, name: "Microsoft", logo: "/microsoft-logo.jpg" },
              { id: 3, name: "Amazon", logo: "/amazon-logo.jpg" },
              { id: 4, name: "Apple", logo: "/apple-logo.jpg" },
              { id: 5, name: "Meta", logo: "/meta-logo.jpg" },
              { id: 6, name: "Tesla", logo: "/tesla-logo.jpg" },
              { id: 7, name: "Netflix", logo: "/netflix-logo.jpg" },
              { id: 8, name: "Samsung", logo: "/samsung-logo.jpg" },
            ].map((company) => (
              <motion.div
                key={company.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg p-6 flex items-center justify-center"
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={company.logo || "/placeholder.svg"}
                  alt={company.name}
                  className="w-full h-20 object-contain"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </ScrollSection>

      {/* About Us Section */}
      <ScrollSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.h2 className="text-4xl font-bold text-foreground mb-12 uppercase text-center">{t("about")}</motion.h2>
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <p className="text-lg text-gray-700 leading-relaxed mb-6">{t("aboutText")}</p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
                <p className="text-gray-600">{t("studentsFoundJobs")}</p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-xl">
                <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
                <p className="text-gray-600">{t("partnerCompanies")}</p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
                <p className="text-gray-600">{t("freeCourses")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </ScrollSection>

      {/* Footer */}
      <motion.footer
        className="bg-white border-t border-border py-8 mt-auto"
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
