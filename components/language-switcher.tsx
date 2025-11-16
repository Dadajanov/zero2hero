"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import type { Language } from "@/lib/translations"

const languages = [
  { code: "ru" as Language, flag: "🇷🇺", name: "Русский" },
  { code: "uz" as Language, flag: "🇺🇿", name: "O'zbek" },
  { code: "en" as Language, flag: "🇬🇧", name: "English" },
]

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState<Language>("ru")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const savedLang = localStorage.getItem("userLanguage") as Language
    if (savedLang) {
      setCurrentLang(savedLang)
    }
  }, [])

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang)
    localStorage.setItem("userLanguage", lang)
    setIsOpen(false)
    window.location.reload()
  }

  const currentLanguage = languages.find((l) => l.code === currentLang) || languages[0]

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
              className={`w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors flex items-center gap-3 ${
                currentLang === lang.code ? "bg-blue-50 text-primary" : ""
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="font-medium">{lang.name}</span>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  )
}
