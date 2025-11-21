import { httpClient } from "@/lib/api"
import { ApiResponse } from "../types/auth-api"
import { CreateEducation, Education, UpdateEducationProps } from "../types/education-api"

export interface University {
  universityId: number
  universityName: string
  [key: string]: any
}

export class EducationApi {
  static async fetchUniversities(): Promise<University[]> {
    const { data } = await httpClient.get<ApiResponse<University[]>>("/universities/get-list")
    return data.data
  }

  static async fetchUserEducationsList(): Promise<Education[]> {
    const { data } = await httpClient.get<ApiResponse<Education[]>>("/students/educations/get-list")
    return data.data
  }

  static async createEducation(education: CreateEducation) {
    const { data } = await httpClient.post('/students/educations/create', education)

    return data.data
  }

  static async updateEducation(props: UpdateEducationProps) {
    const { educationId, education } = props
    const { data } = await httpClient.put(`/students/educations/update/${educationId}`, education)

    return data.data
  }

  static async deleteEducation(educationId: number) {
    const { data } = await httpClient.delete(`/students/educations/delete/${educationId}`)

    return data.data
  }


}
