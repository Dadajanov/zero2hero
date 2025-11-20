"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

const bannerImages = [
  {
    id: 1,
    query: "professional office team collaboration modern workspace",
    title: "Начните карьеру мечты",
    subtitle: "Найдите оплачиваемую стажировку в ведущих компаниях",
  },
  {
    id: 2,
    query: "young professionals working on laptops in modern office",
    title: "Развивайте навыки",
    subtitle: "Бесплатные курсы и профессиональное обучение",
  },
  {
    id: 3,
    query: "business meeting handshake partnership success",
    title: "Присоединяйтесь к лучшим",
    subtitle: "500+ компаний ждут именно вас",
  },
]

export default function BannerSlider({ language }: { language: "en" | "ru" | "uz" }) {
  const { t } = useTranslation('home')
  const [currentSlide, setCurrentSlide] = useState(0)

  const bannerImages = [
    {
      id: 1,
      query: "professional office team collaboration modern workspace",
      title: t("banner1Title"),
      subtitle: t("banner1Subtitle"),
    },
    {
      id: 2,
      query: "young professionals working on laptops in modern office",
      title: t("banner2Title"),
      subtitle: t("banner2Subtitle"),
    },
    {
      id: 3,
      query: "business meeting handshake partnership success",
      title: t("banner3Title"),
      subtitle: t("banner3Subtitle"),
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length)
  }

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={`/.jpg?key=eocd2&height=500&width=1200&query=${bannerImages[currentSlide].query}`}
            alt={bannerImages[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-bold mb-4 text-center"
            >
              {bannerImages[currentSlide].title}
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl text-center"
            >
              {bannerImages[currentSlide].subtitle}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all"
      >
        <ChevronLeft size={32} className="text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all"
      >
        <ChevronRight size={32} className="text-gray-800" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-white w-8" : "bg-white bg-opacity-50"
              }`}
          />
        ))}
      </div>
    </div>
  )
}
