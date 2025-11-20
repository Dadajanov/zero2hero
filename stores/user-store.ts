import { UserData } from '@/api/types/user-api';
import { create } from 'zustand';
import 'zustand/middleware'; // <-- REQUIRED FOR TYPES IN ZUSTAND V5
import { createJSONStorage, persist } from 'zustand/middleware';


interface UserState {
  user: UserData | null
  setUser: (user: UserData | null) => void
  clearUser: () => void
  isAuthenticated: () => boolean
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
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
