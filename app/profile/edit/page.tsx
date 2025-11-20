"use client"

import EditView from "@/views/EditView/EditView";

const demostoreUser = {
  firstName: "",
  lastName: "",
  profilePhoto: "",
  profileVideo: "",
  desiredPosition: "",
  email: "",
  phone: "",
  city: "",
  socialLinks: { facebook: "", instagram: "", telegram: "", linkedin: "" },
  age: "",
  aboutDescription: "",
  languageSkills: [] as Array<{ language: string; level: string }>,
  technicalSkills: [] as Array<{ name: string; description: string; proficiency: number }>,
  education: [] as Array<{ years: string; institution: string; degree: string; specialty: string }>,
  workExperience: [] as Array<{ period: string; company: string; position: string; achievements: string[] }>,
  achievements: [] as Array<{ year: string; title: string; description: string }>,
}

export default function ProfileEditPage() {
  return (
    <EditView />
  )
}
