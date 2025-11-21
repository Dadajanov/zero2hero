"use client"

import LanguageSwitcher from "@/components/language-switcher"
import { useUserStore } from "@/stores/user-store"
import { motion } from "framer-motion"
import { LogOut, Menu, User, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import MobileMenu from "../mobile-menu"

const navItems = [
  { label: "candidates", href: "/job-seekers" },
  { label: "employers", href: "/employers" },
  { label: "universities", href: "/universities" },
  { label: "aboutUs", href: "/about" },
]


export default function MainHeader() {
  const { t } = useTranslation(['navbar', 'common'])
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isAuthenticated } = useUserStore()
  const { clearUser } = useUserStore()


  const handleLogout = () => {
    clearUser()
    localStorage.removeItem("isAuthenticated")
    router.push("/")
  }


  const mobileActionButtons = (
    <>
      {isAuthenticated() ? (
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
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-50 bg-white shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
        <motion.div
          className="text-xl sm:text-2xl font-bold text-primary cursor-pointer"
          onClick={() => router.push("/")}
          whileHover={{ scale: 1.05 }}
        >
          ZERO 2 HERO
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-8">
          {navItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="font-semibold text-foreground hover:text-primary transition-colors whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
            >
              {t(item.label)}
            </motion.a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher />
          {isAuthenticated() ? (
            <>
              <motion.button
                onClick={() => router.push("/profile")}
                className="flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-xl px-5 py-3 transition-all whitespace-nowrap hover:scale-105"
                whileHover={{ scale: 1.05 }}
              >
                <User size={20} />
                {t("profile")}
              </motion.button>
              <motion.button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white rounded-xl px-5 py-3 transition-all whitespace-nowrap hover:scale-105"
                whileHover={{ scale: 1.05 }}
              >
                <LogOut size={20} />
                {t("logout")}
              </motion.button>
            </>
          ) : (
            <motion.button
              onClick={() => router.push("/login")}
              className="bg-primary hover:bg-blue-700 text-white rounded-xl px-5 py-3 font-semibold transition-all whitespace-nowrap hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              {t("login")}
            </motion.button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          <LanguageSwitcher />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-foreground hover:text-primary transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-white border-t border-gray-200"
        >
          <MobileMenu navItems={navItems} actionButtons={mobileActionButtons} />
        </motion.div>
      )}
    </motion.header>
  )
}
