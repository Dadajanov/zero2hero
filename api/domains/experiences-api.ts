import { httpClient } from "@/lib/api"
import { ApiResponse } from "../types/auth-api"
import { Experience } from "../types/experiences-api"

export interface ExperienceProps {
  experienceId: number
  experience: Experience
  [key: string]: any
}

export class ExperienceApi {
  static async fetchExperiences(): Promise<Experience[]> {
    const { data } = await httpClient.get<ApiResponse<Experience[]>>("/students/experiences/get-list")
    return data.data
  }

  static async createExperience(experience: Experience) {
    const { data } = await httpClient.post('/students/experiences/create', experience)

    return data.data
  }

  static async updateExperience(props: ExperienceProps) {
    const { experienceId, experience } = props
    const { data } = await httpClient.put(`/students/experiences/update/${experienceId}`, experience)

    return data.data
  }

  static async deleteExperience(experienceId: number) {
    const { data } = await httpClient.delete(`/students/experiences/delete/${experienceId}`)

    return data.data
  }


}
