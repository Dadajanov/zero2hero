"use client"

import type React from "react"

import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"

interface MobileMenuProps {
  navItems: Array<{ label: string; href: string }>
  actionButtons?: React.ReactNode
  isOpen: boolean,
  onClose: () => void
}

export default function MobileMenu(props: MobileMenuProps) {
  const { navItems, actionButtons, isOpen, onClose } = props
  const { t } = useTranslation(['navbar', 'common'])
  const router = useRouter()


  return (
    <div className="lg:hidden">

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <a
                    href="/"
                    onClick={onClose}
                    className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    ZERO 2 HERO
                  </a>
                  <button
                    onClick={onClose}
                    className="p-2 text-foreground hover:text-primary transition-colors cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Navigation items */}
                <nav className="flex flex-col space-y-4 mb-8">
                  {navItems.map((item) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={onClose}
                      className="text-lg font-semibold text-foreground hover:text-primary transition-colors py-3 border-b border-gray-100 whitespace-nowrap"
                      whileHover={{ x: 10 }}
                    >
                      {(t(item.label))}
                    </motion.a>
                  ))}
                </nav>

                {/* Action buttons */}
                {actionButtons && <div className="space-y-3">{actionButtons}</div>}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
