import { httpClient } from "@/lib/api"

export interface University {
  universityId: number
  universityName: string
  [key: string]: any
}

export class UniversityApi {
  static async fetchUniversities(): Promise<University[]> {
    console.log("[v0] Calling universities API...")
    const response = await httpClient.get<University[]>("/universities/get-list")
    console.log("[v0] Raw response:", response)
    console.log("[v0] Response data:", response.data)
    return response.data
  }
}
