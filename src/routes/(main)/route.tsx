import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'
import { BottomNavbar, Navbar } from '@/components'
import { CookieService } from '@/lib/services/cookieService'
import { getAuthorizationFromClient, isJwtValid } from '@/lib/utils/auth-utils'
import { getCurrentUser } from '@/features/auth/services/authService'
import { getCurrentUserFromServer } from '@/features/auth/server/authServerService'
import { usersQueryKey } from '@/features/auth'
import { useSuspenseData } from '@/hooks/useData'

const getCurrentUserFn = createIsomorphicFn()
  .server(() => getCurrentUserFromServer())
  .client(() => getCurrentUser())

const getAuthorizationFn = createIsomorphicFn()
  .server(() => CookieService.getAuthorization())
  .client(() => getAuthorizationFromClient())

export const Route = createFileRoute('/(main)')({
  component: RouteComponent,
  staleTime: Infinity,
  shouldReload: false,
})

export const useSuspenseCurrentUser = () => {
  const { data } = useSuspenseData({
    key: [usersQueryKey, 0],
    loader: getCurrentUserFn,
  })

  return data
}

function RouteComponentInner() {
  const user = useSuspenseCurrentUser()

  return (
    <div className="relative flex h-[100dvh] flex-col md:flex-row">
      <div className="hidden h-full w-full p-0 shadow-sm md:block md:w-2/14">
        <Navbar user={user!} />
      </div>
      <div className="bg-background flex flex-1 flex-col overflow-y-auto p-0 [scrollbar-gutter:stable]">
        <Outlet />
      </div>
      <div className="flex-shrink-0">
        <BottomNavbar user={user!} />
      </div>
    </div>
  )
}

function RouteComponent() {
  const accessToken = getAuthorizationFn()
  if (!accessToken || !isJwtValid(accessToken)) {
    throw redirect({ to: '/login' })
  }

  return <RouteComponentInner />
}
