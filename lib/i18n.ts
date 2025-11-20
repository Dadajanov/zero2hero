
import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import aboutEn from "@/locales/en/about.json"
import aboutRu from "@/locales/ru/about.json"
import aboutUz from "@/locales/uz/about.json"

import navbarEn from "@/locales/en/navbar.json"
import navbarRu from "@/locales/ru/navbar.json"
import navbarUz from "@/locales/uz/navbar.json"

import commonEn from "@/locales/en/common.json"
import commonRu from "@/locales/ru/common.json"
import commonUz from "@/locales/uz/common.json"

import employersEn from "@/locales/en/employers.json"
import employersRu from "@/locales/ru/employers.json"
import employersUz from "@/locales/uz/employers.json"

import errorsEn from "@/locales/en/errors.json"
import errorsRu from "@/locales/ru/errors.json"
import errorsUz from "@/locales/uz/errors.json"

import homeEn from "@/locales/en/home.json"
import homeRu from "@/locales/ru/home.json"
import homeUz from "@/locales/uz/home.json"

import jobSeekersEn from "@/locales/en/job-seekers.json"
import jobSeekersRu from "@/locales/ru/job-seekers.json"
import jobSeekersUz from "@/locales/uz/job-seekers.json"

import loginEn from "@/locales/en/login.json"
import loginRu from "@/locales/ru/login.json"
import loginUz from "@/locales/uz/login.json"

import profileEn from "@/locales/en/profile.json"
import profileRu from "@/locales/ru/profile.json"
import profileUz from "@/locales/uz/profile.json"

import registrationEn from "@/locales/en/registration.json"
import registrationRu from "@/locales/ru/registration.json"
import registrationUz from "@/locales/uz/registration.json"

import universitiesEn from "@/locales/en/universities.json"
import universitiesRu from "@/locales/ru/universities.json"
import universitiesUz from "@/locales/uz/universities.json"


i18n.use(initReactI18next).init({
  lng: "ru",
  fallbackLng: "en",
  supportedLngs: ["ru", "en", "uz"],
  ns: ["common", "form", "steps", "step1", "step2", "step3", "step4", "step6", "step7", "errors", "predictions"],
  defaultNS: "common",
  resources: {
    en: {
      about: aboutEn,
      common: commonEn,
      navbar: navbarEn,
      employers: employersEn,
      errors: errorsEn,
      home: homeEn,
      jobSeekers: jobSeekersEn,
      login: loginEn,
      profile: profileEn,
      registration: registrationEn,
      universities: universitiesEn
    },
    ru: {
      about: aboutRu,
      navbar: navbarRu,
      common: commonRu,
      employers: employersRu,
      errors: errorsRu,
      home: homeRu,
      jobSeekers: jobSeekersRu,
      login: loginRu,
      profile: profileRu,
      registration: registrationRu,
      universities: universitiesRu
    },
    uz: {
      about: aboutUz,
      navbar: navbarUz,
      common: commonUz,
      employers: employersUz,
      errors: errorsUz,
      home: homeUz,
      jobSeekers: jobSeekersUz,
      login: loginUz,
      profile: profileUz,
      registration: registrationUz,
      universities: universitiesUz
    },
  },
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
