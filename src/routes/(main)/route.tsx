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
    <div className="relative flex h-[100dvh] flex-col md:flex-row">
      <AuthProvider user={user}>
        <ProjectIdProvider initialProjectId={getProjectIdFn()}>
          <div className="hidden h-full w-full p-0 shadow-sm md:block md:w-2/14">
            <Navbar user={user} />
          </div>
          <div className="bg-background flex flex-1 flex-col overflow-y-auto p-0 [scrollbar-gutter:stable]">
            <Outlet />
          </div>
          <div className="flex-shrink-0">
            <BottomNavbar user={user} />
          </div>
        </ProjectIdProvider>
      </AuthProvider>
    </div>
  )
}
