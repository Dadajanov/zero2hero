import { Language } from "@/types/common.type"
import { Dispatch, SetStateAction } from "react"
import { useTranslation } from "react-i18next"

type ChoosingLanguageProps = {
  selectedLanguage: Language
  setSelectedLanguage: Dispatch<SetStateAction<Language>>
}

export const ChoosingLanguage = (props: ChoosingLanguageProps) => {
  const { selectedLanguage, setSelectedLanguage } = props
  const { i18n, t } = useTranslation(['registration', 'common'])

  const handleLanguageSelect = (lang: Language) => {
    setSelectedLanguage(lang)
    i18n.changeLanguage(lang)
    localStorage.setItem("userLanguage", lang)
  }

  return <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-800">{t("languageSelection")}</h2>
    <div className="grid grid-cols-3 gap-4">
      {(["ru", "uz", "en"] as Language[]).map((lang) => (
        <button
          key={lang}
          onClick={() => handleLanguageSelect(lang)}
          className={`py-3 px-4 rounded-lg font-semibold transition-all ${selectedLanguage === lang
            ? "bg-blue-600 text-white shadow-lg scale-105"
            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  </div>
}
