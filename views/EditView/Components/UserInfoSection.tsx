import { Check, Upload, User } from "lucide-react"
import { useTranslation } from "react-i18next"

export const UserInfoSection = (props: UserInfoProps) => {
  const { t } = useTranslation('profile')
  const { user, setUser, onSave, savedSections } = props

  return <div className="bg-white rounded-lg shadow-lg p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">1. {t("mainInfo")}</h2>
      <button
        onClick={() => onSave("header")}
        className="flex items-center gap-2 bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 cursor-pointer"
      >
        {savedSections.header ? <Check size={16} /> : null}
        {savedSections.header ? t("saved") : t("save")}
      </button>
    </div>

    <div className="space-y-4">
      <div className="flex justify-center mb-4">
        <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
          {user?.profilePhoto ? (
            <img src={user?.profilePhoto || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <User size={48} className="text-gray-400" />
          )}
        </div>
      </div>

      <button className="w-full flex items-center justify-center gap-2 bg-primary text-white rounded-lg px-4 py-2 cursor-pointer">
        <Upload size={16} />
        {t("uploadPhoto")}
      </button>

      <div>
        <label className="block text-sm font-medium mb-2">{t("firstName")} *</label>
        <input
          type="text"
          value={user?.firstName}
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t("lastName")} *</label>
        <input
          type="text"
          value={user?.lastName}
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t("desiredPosition")} *</label>
        <input
          type="text"
          value={user?.desiredPosition}
          onChange={(e) => setUser({ ...user, desiredPosition: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t("videoUrl")}</label>
        <input
          type="text"
          value={user?.profileVideo}
          onChange={(e) => setUser({ ...user, profileVideo: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
    </div>
  </div>
}
