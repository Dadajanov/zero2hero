import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

export const AboutSection = (props: UserInfoProps) => {
  const { t } = useTranslation('profile');
  const { setUser, user, onSave, savedSections } = props;

  return <div className="bg-white rounded-lg shadow-lg p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">3. {t("aboutMe")}</h2>
      <button
        onClick={() => onSave("about")}
        className="flex items-center gap-2 bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 cursor-pointer"
      >
        {savedSections.about ? <Check size={16} /> : null}
        {savedSections.about ? t("saved") : t("save")}
      </button>
    </div>

    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">{t("age")}</label>
        <input
          type="text"
          value={user?.age || ""}
          onChange={(e) => setUser({ ...user, age: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t("shortDescription")}</label>
        <textarea
          value={user?.aboutDescription || ""}
          onChange={(e) => setUser({ ...user, aboutDescription: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          rows={5}
          placeholder={t("aboutYouPlaceholder")}
        />
      </div>
    </div>
  </div>

}
