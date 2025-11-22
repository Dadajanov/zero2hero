import { StudentInfo, UserData } from '@/api/types/user-api';
import { create } from 'zustand';
import 'zustand/middleware'; // <-- REQUIRED FOR TYPES IN ZUSTAND V5
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserState {
  studentInfo: StudentInfo | null
  user: UserData | null,
  setStudentInfo: (studentInfo: StudentInfo | null) => void
  setUser: (user: UserData | null) => void
  clearUser: () => void
  isAuthenticated: () => boolean
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      studentInfo: null,
      setStudentInfo: (studentInfo) => set({ studentInfo }),
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
