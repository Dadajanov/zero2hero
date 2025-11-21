import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUniversitiesList } from "@/hooks/use-registration"
import { useState } from "react"
import { useTranslation } from "react-i18next"

export const AboutUniversity = (props: RegisrationFormProps) => {
  const { t } = useTranslation(['registration']);

  const { formData, errors, setFormData, setErrors } = props;

  const [showUniversityDropdown, setShowUniversityDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { universities = [], isLoading: universitiesLoading } = useUniversitiesList();

  const filteredUniversities = universities.filter((uni) =>
    uni.universityName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-800">{t("universityAndCourse")}</h2>
    {!universitiesLoading && universities.length === 0 && (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
        {t("universitiesFetchError")}
      </div>
    )}
    <div className="space-y-4">
      <div>
        <Label className="mb-2 block">
          {t("universitySelection")} <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Input
            placeholder={t("searchUniversity")}
            value={formData.university}
            onChange={(e) => {
              const value = e.target.value
              setFormData({
                ...formData,
                university: value,
                universityId: 0,
              })
              setShowUniversityDropdown(true)
              setErrors({ ...errors, university: false })
            }}
            onFocus={() => setShowUniversityDropdown(true)}
            onBlur={() => {
              setTimeout(() => setShowUniversityDropdown(false), 200)
            }}
            className={errors?.university ? "border-red-500" : ""}
          />
          {showUniversityDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {universitiesLoading ? (
                <div className="p-3 text-sm text-gray-500">Loading...</div>
              ) : filteredUniversities.length > 0 ? (
                filteredUniversities.map((uni) => (
                  <button
                    key={uni.universityId}
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        university: uni.universityName,
                        universityId: uni.universityId,
                      })
                      setShowUniversityDropdown(false)
                      setErrors({ ...errors, university: false })
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-sm"
                  >
                    {uni.universityName}
                  </button>
                ))
              ) : (
                <div className="p-3 text-sm text-gray-500">
                  No universities found. You can type your own university name.
                </div>
              )}
            </div>
          )}
        </div>
        {errors?.university && <p className="text-sm text-red-500 mt-1">{t("universityRequired")}</p>}
      </div>
      <div>
        <Label className="mb-2 block">
          {t("courseSelection")} <span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.course}
          onValueChange={(value) => {
            setFormData({ ...formData, course: value })
            setErrors({ ...errors, course: false })
          }}
        >
          <SelectTrigger className={errors?.course ? "border-red-500" : ""}>
            <SelectValue placeholder={t("selectCourse")} />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5].map((course) => (
              <SelectItem key={course} value={course.toString()}>
                {course} {t("course")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors?.course && <p className="text-sm text-red-500 mt-1">{t("courseRequired")}</p>}
      </div>
    </div>
  </div>
}
