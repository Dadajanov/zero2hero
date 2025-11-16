import { ru } from "@/locales/ru"
import { uz } from "@/locales/uz"
import { en } from "@/locales/en"

export const translations = {
  ru,
  uz,
  en,
}

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations.ru

export const getTranslation = (lang: Language, key: TranslationKey): string => {
  return translations[lang]?.[key] || key
}
