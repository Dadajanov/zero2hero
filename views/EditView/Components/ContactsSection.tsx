import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

export const ContactsSection = (props: UserInfoProps) => {
  const { t } = useTranslation('profile');
  const { setUser, user, onSave, savedSections } = props;

  return <div className="bg-white rounded-lg shadow-lg p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">2. {t("contactInformation")}</h2>
      <button
        onClick={() => onSave("contacts")}
        className="flex items-center gap-2 bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 cursor-pointer"
      >
        {savedSections.contacts ? <Check size={16} /> : null}
        {savedSections.contacts ? t("saved") : t("save")}
      </button>
    </div>

    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">{t("phone")} *</label>
        <input
          type="tel"
          value={user?.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t("email")} *</label>
        <input
          type="email"
          value={user?.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t("city")} *</label>
        <input
          type="text"
          value={user?.city}
          onChange={(e) => setUser({ ...user, city: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t("instagram")}</label>
        <input
          type="text"
          value={user?.socialLinks?.instagram || ""}
          onChange={(e) =>
            setUser({ ...user, socialLinks: { ...user?.socialLinks, instagram: e.target.value } })
          }
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="@username"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t("telegram")}</label>
        <input
          type="text"
          value={user?.socialLinks?.telegram || ""}
          onChange={(e) =>
            setUser({ ...user, socialLinks: { ...user?.socialLinks, telegram: e.target.value } })
          }
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="@username"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t("linkedin")}</label>
        <input
          type="text"
          value={user?.socialLinks?.linkedin || ""}
          onChange={(e) =>
            setUser({ ...user, socialLinks: { ...user?.socialLinks, linkedin: e.target.value } })
          }
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
    </div>
  </div>
}
