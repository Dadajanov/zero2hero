import { UserData } from '@/api/types/user-api';
import { create } from 'zustand';
import 'zustand/middleware'; // <-- REQUIRED FOR TYPES IN ZUSTAND V5
import { createJSONStorage, persist } from 'zustand/middleware';

const UserInitValue = {
  studentId: 1,
  studentName: '',
  phoneNumber: '',
  purpose: '',
  status: 'string',
  dateOfBirth: '',
  gender: '',
  languageSkills: [{ language: "", level: "A1" }],
  technicalSkills: [{ name: "", description: "", proficiency: 0 }],
  education: [{ years: "", institution: "", degree: "", specialty: "" }]
}

interface UserState {
  user: UserData | null
  setUser: (user: UserData | null) => void
  clearUser: () => void
  isAuthenticated: () => boolean
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: UserInitValue,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      isAuthenticated: () => !!get().user,
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
