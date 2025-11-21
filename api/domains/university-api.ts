import { httpClient } from "@/lib/api"
import { ApiResponse } from "../types/auth-api"

export interface University {
  universityId: number
  universityName: string
  [key: string]: any
}

export class UniversityApi {
  static async fetchUniversities(): Promise<University[]> {
    const { data } = await httpClient.get<ApiResponse<University[]>>("/universities/get-list")
    return data.data
  }
}
