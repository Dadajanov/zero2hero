"use client"

import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"

export default function Footer() {
  const { t } = useTranslation('home')

  return (
    <motion.footer
      className="bg-white border-t border-border py-6 sm:py-8 mt-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-500 text-sm">{t("footer")}</p>
      </div>
    </motion.footer>

  )
}
