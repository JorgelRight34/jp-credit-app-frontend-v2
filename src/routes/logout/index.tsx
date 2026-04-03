import { ACCESS_TOKEN_KEY } from '@/lib/constants'
import { COOKIES } from '@/lib/constants/cookies'
import { CookieService } from '@/lib/services/cookieService'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useEffect } from 'react'

const logout = createServerFn({ method: 'POST' }).handler(() => {
  CookieService.delete(COOKIES.ACCESS_TOKEN)
})

export const Route = createFileRoute('/logout/')({
  component: RouteComponent,
  beforeLoad: async () => {
    await logout()
  },
})

function RouteComponent() {
  const navigate = Route.useNavigate()

  useEffect(() => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    navigate({ to: '/login' })
  }, [])

  return null
}
