"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { useTranslation } from "react-i18next"

export type Language = 'ru' | 'uz' | 'en'
const languages = [
  { code: "ru" as Language, flag: "🇷🇺", name: "russian" },
  { code: "uz" as Language, flag: "🇺🇿", name: "uzbek" },
  { code: "en" as Language, flag: "🇬🇧", name: "english" },
]

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation('navbar')
  const [isOpen, setIsOpen] = useState(false)


  const handleLanguageChange = (lang: Language) => {
    i18n.changeLanguage(lang)
    localStorage.setItem("userLanguage", lang)
    setIsOpen(false)
  }

  const currentLanguage = languages.find((l) => l.code === i18n.language) || languages[0]

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        whileHover={{ scale: 1.05 }}
      >
        <span className="text-2xl">{currentLanguage.flag}</span>
        <span className="hidden sm:inline font-medium">{currentLanguage.code.toUpperCase()}</span>
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[150px] z-50"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors flex items-center gap-3 ${i18n.language === lang.code ? "bg-blue-50 text-primary" : ""
                }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="font-medium">{t(lang.name)}</span>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  )
}
