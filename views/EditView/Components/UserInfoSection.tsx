import { UserApi } from "@/api/domains/user-api"
import { Check, Upload, User } from "lucide-react"
import { useTranslation } from "react-i18next"

export const UserInfoSection = (props: UserInfoProps) => {
  const { t } = useTranslation('profile')
  const { user, setUser, savedSections } = props

  const hadanleSave = async () => {
    try {
      const data = await UserApi.updateUserData({
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        purpose: user.purpose,
        status: user.status,
        studentName: `${user.firstName} ${user.lastName}`
      })

      setUser({ ...user })
    } catch (error) {
      console.log(error);

    }
  }

  return <div className="bg-white rounded-lg shadow-lg p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">1. {t("mainInfo")}</h2>
      <button
        onClick={() => hadanleSave()}
        className="flex items-center gap-2 bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700"
      >
        {savedSections.header ? <Check size={16} /> : null}
        {savedSections.header ? t("saved") : t("save")}
      </button>
    </div>

    <div className="space-y-4">
      <div className="flex justify-center mb-4">
        <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
          {user.profilePhoto ? (
            <img
              src={user.profilePhoto || "/placeholder.svg"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={48} className="text-gray-400" />
          )}
        </div>
      </div>

      <button className="w-full flex items-center justify-center gap-2 bg-primary text-white rounded-lg px-4 py-2">
        <Upload size={16} />
        {t("uploadPhoto")}
      </button>

      <div>
        <label className="block text-sm font-medium mb-2">{t("firstName")} *</label>
        <input
          type="text"
          value={user.firstName}
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t("lastName")} *</label>
        <input
          type="text"
          value={user.lastName}
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t("desiredPosition")} *</label>
        <input
          type="text"
          value={user.desiredPosition}
          onChange={(e) => setUser({ ...user, desiredPosition: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t("purpose")} *</label>
        <select
          value={user.purpose}
          onChange={(e) => setUser({ ...user, purpose: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">{t("selectPurpose")}</option>
          <option value="internship">{t("purposeInternship")}</option>
          <option value="job">{t("purposeJob")}</option>
          <option value="internship_and_job">{t("purposeInternshipAndJob")}</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t("status")} *</label>
        <select
          value={user.status}
          onChange={(e) => setUser({ ...user, status: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">{t("selectStatus")}</option>
          <option value="applicant">{t("statusApplicant")}</option>
          <option value="student">{t("statusStudent")}</option>
          <option value="graduate">{t("statusGraduate")}</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t("dateOfBirth")}</label>
        <input
          type="date"
          value={user.dateOfBirth}
          onChange={(e) => setUser({ ...user, dateOfBirth: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t("gender")}</label>
        <select
          value={user.gender}
          onChange={(e) => setUser({ ...user, gender: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">{t("selectGender")}</option>
          <option value="male">{t("genderMale")}</option>
          <option value="female">{t("genderFemale")}</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t("videoUrl")}</label>
        <input
          type="text"
          value={user.profileVideo}
          onChange={(e) => setUser({ ...user, profileVideo: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
    </div>
  </div>
}
