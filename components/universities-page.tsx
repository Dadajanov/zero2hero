"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { GraduationCap, Users, Award, BookOpen, ArrowRight } from "lucide-react"
import { getTranslation, type Language } from "@/lib/translations"
import LanguageSwitcher from "./language-switcher"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function UniversitiesPage() {
  const router = useRouter()
  const [language, setLanguage] = useState<Language>("ru")

  useEffect(() => {
    const savedLang = localStorage.getItem("userLanguage") as Language
    if (savedLang) {
      setLanguage(savedLang)
    }
  }, [])

  const t = (key: string) => getTranslation(language, key as any)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-white shadow-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.a href="/" className="text-2xl font-bold text-primary">
            ZERO 2 HERO
          </motion.a>
          <nav className="hidden md:flex gap-8">
            <motion.a
              href="/job-seekers"
              className="font-semibold text-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              {t("candidates")}
            </motion.a>
            <motion.a
              href="/employers"
              className="font-semibold text-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              {t("employers")}
            </motion.a>
            <motion.a href="/universities" className="font-semibold text-primary" whileHover={{ scale: 1.05 }}>
              {t("universities")}
            </motion.a>
            <motion.a
              href="/about"
              className="font-semibold text-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              {t("aboutUs")}
            </motion.a>
          </nav>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <motion.button
              onClick={() => router.push("/registration")}
              className="bg-primary hover:bg-blue-700 text-white rounded-xl px-5 py-3 font-semibold transition-all"
              whileHover={{ scale: 1.05 }}
            >
              {language === "ru" ? "Стать партнером" : language === "uz" ? "Hamkor bo'lish" : "Become a Partner"}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeInUp} initial="initial" animate="animate">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              {language === "ru"
                ? "Партнерство с университетами"
                : language === "uz"
                  ? "Universitetlar bilan hamkorlik"
                  : "Partnership with Universities"}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {language === "ru"
                ? "Помогите своим студентам найти оплачиваемые стажировки и начать успешную карьеру"
                : language === "uz"
                  ? "Talabalaringizga oplanadigan stajirovka topishda va muvaffaqiyatli karyera boshlashda yordam bering"
                  : "Help your students find paid internships and start successful careers"}
            </p>
            <motion.button
              onClick={() => router.push("/registration")}
              className="bg-primary hover:bg-blue-700 text-white rounded-xl px-8 py-4 font-semibold transition-all flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              {language === "ru" ? "Присоединиться" : language === "uz" ? "Qo'shilish" : "Join Us"}
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="relative h-96 bg-gradient-to-br from-primary-light to-primary rounded-2xl flex items-center justify-center"
          >
            <GraduationCap size={120} className="text-white opacity-50" />
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl font-bold text-foreground mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {language === "ru"
              ? "Преимущества для университетов"
              : language === "uz"
                ? "Universitetlar uchun afzalliklar"
                : "Benefits for Universities"}
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users size={48} />,
                title:
                  language === "ru"
                    ? "Трудоустройство студентов"
                    : language === "uz"
                      ? "Talabalarni ishga joylashtirish"
                      : "Student Employment",
                desc:
                  language === "ru"
                    ? "Повышение процента трудоустройства выпускников"
                    : language === "uz"
                      ? "Bitiruvchilarning ishga joylashtirish foizini oshirish"
                      : "Increase graduate employment rates",
              },
              {
                icon: <Award size={48} />,
                title:
                  language === "ru"
                    ? "Престиж университета"
                    : language === "uz"
                      ? "Universitet obro'si"
                      : "University Prestige",
                desc:
                  language === "ru"
                    ? "Укрепление репутации и привлечение абитуриентов"
                    : language === "uz"
                      ? "Obro'ni mustahkamlash va abituriyentlarni jalb qilish"
                      : "Strengthen reputation and attract applicants",
              },
              {
                icon: <BookOpen size={48} />,
                title:
                  language === "ru"
                    ? "Практическое обучение"
                    : language === "uz"
                      ? "Amaliy ta'lim"
                      : "Practical Training",
                desc:
                  language === "ru"
                    ? "Связь теории с практикой через стажировки"
                    : language === "uz"
                      ? "Stajirovkalar orqali nazariya va amaliyotni bog'lash"
                      : "Connect theory with practice through internships",
              },
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-50 rounded-2xl p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-primary mb-4 flex justify-center">{benefit.icon}</div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl font-bold text-foreground mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {language === "ru" ? "Как это работает?" : language === "uz" ? "Bu qanday ishlaydi?" : "How It Works?"}
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title:
                  language === "ru"
                    ? "Партнерское соглашение"
                    : language === "uz"
                      ? "Hamkorlik shartnomasi"
                      : "Partnership Agreement",
                desc:
                  language === "ru"
                    ? "Подписание соглашения о сотрудничестве"
                    : language === "uz"
                      ? "Hamkorlik shartnomasini imzolash"
                      : "Sign a cooperation agreement",
              },
              {
                step: "2",
                title:
                  language === "ru"
                    ? "Регистрация студентов"
                    : language === "uz"
                      ? "Talabalarni ro'yxatdan o'tkazish"
                      : "Student Registration",
                desc:
                  language === "ru"
                    ? "Студенты создают профили на платформе"
                    : language === "uz"
                      ? "Talabalar platformada profillar yaratadi"
                      : "Students create profiles on the platform",
              },
              {
                step: "3",
                title:
                  language === "ru"
                    ? "Подбор стажировок"
                    : language === "uz"
                      ? "Stajirovkalarni tanlash"
                      : "Internship Matching",
                desc:
                  language === "ru"
                    ? "Автоматический подбор вакансий"
                    : language === "uz"
                      ? "Avtomatik vakansiyalarni tanlash"
                      : "Automatic vacancy matching",
              },
              {
                step: "4",
                title:
                  language === "ru"
                    ? "Мониторинг прогресса"
                    : language === "uz"
                      ? "Taraqqiyotni kuzatish"
                      : "Progress Monitoring",
                desc:
                  language === "ru"
                    ? "Отслеживание трудоустройства студентов"
                    : language === "uz"
                      ? "Talabalarning ishga joylashishini kuzatish"
                      : "Track student employment",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
              >
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              {
                number: "50+",
                label:
                  language === "ru"
                    ? "Университетов-партнеров"
                    : language === "uz"
                      ? "Hamkor universitetlar"
                      : "Partner Universities",
              },
              {
                number: "10,000+",
                label:
                  language === "ru"
                    ? "Трудоустроенных студентов"
                    : language === "uz"
                      ? "Ishga joylashgan talabalar"
                      : "Employed Students",
              },
              {
                number: "500+",
                label:
                  language === "ru"
                    ? "Компаний-работодателей"
                    : language === "uz"
                      ? "Ish beruvchi kompaniyalar"
                      : "Employer Companies",
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <div className="text-5xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-xl text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {language === "ru"
              ? "Готовы стать партнером?"
              : language === "uz"
                ? "Hamkor bo'lishga tayyormisiz?"
                : "Ready to Become a Partner?"}
          </motion.h2>
          <motion.p
            className="text-xl text-blue-100 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {language === "ru"
              ? "Присоединяйтесь к ведущим университетам, которые помогают своим студентам строить успешную карьеру"
              : language === "uz"
                ? "Talabalariga muvaffaqiyatli karyera qurishda yordam beradigan yetakchi universitetlarga qo'shiling"
                : "Join leading universities helping their students build successful careers"}
          </motion.p>
          <motion.button
            onClick={() => router.push("/registration")}
            className="bg-white text-primary hover:bg-gray-100 rounded-xl px-8 py-4 font-semibold transition-all"
            whileHover={{ scale: 1.05 }}
          >
            {language === "ru" ? "Связаться с нами" : language === "uz" ? "Biz bilan bog'lanish" : "Contact Us"}
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 text-sm">{t("footer")}</p>
        </div>
      </footer>
    </div>
  )
}
