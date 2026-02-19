import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface User {
  id: string
  name: string
  email: string
  createdAt: Date
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  checkAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // For demo: accept any email/password with basic validation
        if (email && password.length >= 6) {
          const user: User = {
            id: crypto.randomUUID(),
            name: email.split("@")[0],
            email,
            createdAt: new Date(),
          }
          set({ user, isAuthenticated: true })
          return true
        }
        return false
      },

      register: async (name: string, email: string, password: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        if (name && email && password.length >= 8) {
          const user: User = {
            id: crypto.randomUUID(),
            name,
            email,
            createdAt: new Date(),
          }
          set({ user, isAuthenticated: true })
          return true
        }
        return false
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      checkAuth: () => {
        set({ isLoading: false })
      },
    }),
    {
      name: "phishguard-auth",
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)