import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'
import { BottomNavbar, Navbar } from '@/components'
import { AuthProvider } from '@/contexts/auth-context'
import { CookieService } from '@/lib/services/cookieService'
import { getAuthorizationFromClient, isJwtValid } from '@/lib/utils/auth-utils'
import { getCurrentUser } from '@/features/auth/services/authService'
import { getCurrentUserFromServer } from '@/features/auth/server/authServerService'

const getCurrentUserFn = createIsomorphicFn()
  .server(() => getCurrentUserFromServer())
  .client(() => getCurrentUser())

const getAuthorizationFn = createIsomorphicFn()
  .server(() => CookieService.getAuthorization())
  .client(() => getAuthorizationFromClient())

export const Route = createFileRoute('/(modules)')({
  component: RouteComponent,
  loader: () => getCurrentUserFn(),
  beforeLoad: () => {
    const accessToken = getAuthorizationFn()
    if (!accessToken || !isJwtValid(accessToken)) {
      throw redirect({ to: '/login' })
    }
  },
  staticData: {},
  shouldReload: false,
})

function RouteComponent() {
  const user = Route.useLoaderData()

  return (
    <div className="flex flex-col md:flex-row h-screen relative">
      <AuthProvider user={user}>
        <div className="w-full md:w-2/14 hidden md:block h-full p-0 shadow-sm">
          <Navbar />
        </div>
        <div className="flex-1 p-0 overflow-y-auto">
          <Outlet />
        </div>
        <div className="flex-shrink-0">
          <BottomNavbar />
        </div>
      </AuthProvider>
    </div>
  )
}
