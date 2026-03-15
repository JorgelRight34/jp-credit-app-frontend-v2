import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'
import { BottomNavbar, Navbar } from '@/components'
import { AuthProvider } from '@/contexts/auth-context'
import { CookieService } from '@/lib/services/cookieService'
import { getAuthorizationFromClient, isJwtValid } from '@/lib/utils/auth-utils'
import { getCurrentUser } from '@/features/auth/services/authService'
import { getCurrentUserFromServer } from '@/features/auth/server/authServerService'
import { PROJECT_ID_STORAGE_KEY, ProjectIdProvider } from '@/features/projects'
import { getProjectId } from '@/features/projects/server/utils'

const getCurrentUserFn = createIsomorphicFn()
  .server(() => getCurrentUserFromServer())
  .client(() => getCurrentUser())

const getAuthorizationFn = createIsomorphicFn()
  .server(() => CookieService.getAuthorization())
  .client(() => getAuthorizationFromClient())

const getProjectIdFn = createIsomorphicFn()
  .server(() => Number(CookieService.get(PROJECT_ID_STORAGE_KEY)))
  .client(() => getProjectId())

export const Route = createFileRoute('/(main)')({
  component: RouteComponent,
  beforeLoad: async () => {
    const accessToken = getAuthorizationFn()
    if (!accessToken || !isJwtValid(accessToken)) {
      throw redirect({ to: '/login' })
    }

    const user = await getCurrentUserFn()
    return { user }
  },
  staleTime: Infinity,
  shouldReload: false,
})

function RouteComponent() {
  const { user } = Route.useRouteContext()

  return (
    <div className="flex flex-col md:flex-row h-screen relative">
      <AuthProvider user={user}>
        <ProjectIdProvider initialProjectId={getProjectIdFn()}>
          <div className="w-full md:w-2/14 hidden md:block h-full p-0 shadow-sm">
            <Navbar />
          </div>
          <div className="flex bg-background flex-col flex-1 p-0 [scrollbar-gutter:stable] overflow-y-auto">
            <Outlet />
          </div>
          <div className="flex-shrink-0">
            <BottomNavbar />
          </div>
        </ProjectIdProvider>
      </AuthProvider>
    </div>
  )
}
