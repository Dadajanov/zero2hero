"use client"
import { motion } from "framer-motion"
import { LogOut, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import ScrollSection from "../../components/scroll-section"

export default function HomeView() {
  const { t } = useTranslation(['home', 'about'])
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
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
      {/* <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary cursor-pointer" onClick={() => router.push("/")}>
            ZERO 2 HERO
          </div>

          <nav className="hidden lg:flex gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-semibold text-foreground hover:text-primary transition-colors whitespace-nowrap hover:scale-105"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => router.push("/profile")}
                  className="flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-xl px-5 py-3 transition-all whitespace-nowrap hover:scale-105"
                >
                  <User size={20} />
                  {t("profile")}
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-xl px-5 py-3 transition-all whitespace-nowrap hover:scale-105"
                >
                  <LogOut size={20} />
                  {t("logout")}
                </button>
              </>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className="bg-primary hover:bg-blue-700 text-white rounded-xl px-5 py-3 font-semibold transition-all whitespace-nowrap hover:scale-105"
              >
                {t("login")}
              </button>
            )}
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitcher />
            <MobileMenu navItems={navItems} actionButtons={mobileActionButtons} />
          </div>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 uppercase">
              {t("homeTitle")}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {t("homeSubtitle")}
            </p>

            <div className="space-y-4 mb-8">
              {[t("feature1"), t("feature2"), t("feature3")].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-lg text-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                className="bg-primary hover:bg-blue-700 text-white rounded-xl px-8 py-4 font-semibold transition-all hover:scale-105"
              >
                {t("findJob")}
              </button>
              <button
                onClick={() => router.push("/video")}
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-xl px-8 py-4 font-semibold transition-all hover:scale-105"
              >
                {t("watchVideo")}
              </button>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              key={currentImageIndex}
              className="w-full h-96 rounded-2xl overflow-hidden shadow-2xl relative transition-all duration-500"
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
            </div>
            {/* Image indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${index === currentImageIndex ? "bg-primary w-8" : "bg-gray-300"
                    }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Job Offers Section */}
      <ScrollSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-4xl font-bold text-foreground mb-12 uppercase">{t("currentVacancies")}</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
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
            ].map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg p-6 transition-all"
              >
                <h3 className="text-xl font-bold text-foreground mb-2">{job.title}</h3>
                <p className="text-primary font-semibold mb-2">{job.salary}</p>
                <p className="text-gray-600">{job.vacancies} {t("vacancies")}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollSection>

      {/* Courses Section */}
      <ScrollSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-4xl font-bold text-foreground mb-12 uppercase">{t("skillUp")}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { id: 1, title: "Web Development", image: "/web-development-course.jpg" },
              { id: 2, title: "Data Science", image: "/data-science-course.jpg" },
              { id: 3, title: "Digital Marketing", image: "/digital-marketing-course.jpg" },
              { id: 4, title: "UI/UX Design", image: "/ui-ux-design-course.jpg" },
              { id: 5, title: "Mobile Development", image: "/mobile-development-course.jpg" },
              { id: 6, title: "Business Analytics", image: "/business-analytics-course.jpg" },
            ].map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden transition-all"
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
          </div>
        </div>
      </ScrollSection>

      {/* Partner Companies Section */}
      <ScrollSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-4xl font-bold text-foreground mb-12 uppercase">{t("companies")}</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { id: 1, name: "Google", logo: "/google-logo.jpg" },
              { id: 2, name: "Microsoft", logo: "/microsoft-logo.jpg" },
              { id: 3, name: "Amazon", logo: "/amazon-logo.jpg" },
              { id: 4, name: "Apple", logo: "/apple-logo.jpg" },
              { id: 5, name: "Meta", logo: "/meta-logo.jpg" },
              { id: 6, name: "Tesla", logo: "/tesla-logo.jpg" },
              { id: 7, name: "Netflix", logo: "/netflix-logo.jpg" },
              { id: 8, name: "Samsung", logo: "/samsung-logo.jpg" },
            ].map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg p-6 flex items-center justify-center transition-all"
              >
                <img
                  src={company.logo || "/placeholder.svg"}
                  alt={company.name}
                  className="w-full h-20 object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollSection>

      {/* About Us Section */}
      <ScrollSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-4xl font-bold text-foreground mb-12 uppercase text-center">{t("about", { ns: 'about' })}</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
          >
            <p className="text-lg text-gray-700 leading-relaxed mb-6">{t("aboutText", { ns: 'about' })}</p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-center p-6 bg-blue-50 rounded-xl"
              >
                <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
                <p className="text-gray-600">{t("studentsFoundJobs")}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-center p-6 bg-green-50 rounded-xl"
              >
                <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
                <p className="text-gray-600">{t("partnerCompanies")}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="text-center p-6 bg-purple-50 rounded-xl"
              >
                <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
                <p className="text-gray-600">{t("freeCourses")}</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </ScrollSection>
    </div>
  )
}
