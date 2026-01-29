import { createContext, useContext } from 'react'
import type { PropsWithChildren } from 'react'
import type { User } from '@/features/auth'
import { ACCESS_TOKEN } from '@/lib/utils'

type AuthContextType = {
  user?: User | null
  logout: () => Promise<void>
}

type AuthProviderProps = PropsWithChildren & {
  user: User
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ user, children }: AuthProviderProps) => {
  const logout = async () => {
    localStorage.removeItem(ACCESS_TOKEN)
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
