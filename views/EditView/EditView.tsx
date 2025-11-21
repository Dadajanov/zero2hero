"use client"
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from "react"
import { useTranslation } from "react-i18next"

import { useUserStore } from '@/stores/user-store'
import EditFom from '@/views/EditView/Components/EditFom'
import { MiniCVPreview } from '@/views/EditView/Components/MiniCVPreview'


export default function EditView() {
  const { t } = useTranslation('profile')
  const router = useRouter();
  const { isAuthenticated, user } = useUserStore()

  useEffect(() => {
    if (!isAuthenticated()) {
      console.log(user);
      router.push("/login")
      return
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Back Button */}
        <button
          onClick={() => router.push("/profile")}
          className="flex items-center gap-2 text-gray-600 hover:text-primary mb-6"
        >
          <ChevronLeft size={20} />
          {t("backToProfile")}
        </button>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Edit Form */}
          {isAuthenticated() && <EditFom />}

          {isAuthenticated() && <MiniCVPreview />}
        </div>
      </div>
    </div>
  )
}
