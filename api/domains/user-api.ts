import { axiosInstance } from "@/lib/api"
import { ApiResponse } from "../types/auth-api"
import { UpdateUserDataProps, UserData } from "../types/user-api"

export class UserApi {
  static async fetchUserData(): Promise<UserData> {
    const { data } = await axiosInstance.get<ApiResponse<UserData>>("/students/get-me")
    return data.data
  }

  static async updateUserData(userData: UpdateUserDataProps) {
    const { data } = await axiosInstance.post("/students/update-me", userData)
    return data.data
  }

}
