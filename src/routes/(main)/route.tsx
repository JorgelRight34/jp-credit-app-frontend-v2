import { Outlet, createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'
import { BottomNavbar, Navbar } from '@/components'
import { getCurrentUser } from '@/features/auth/services/authService'
import { getCurrentUserFromServer } from '@/features/auth/server/authServerService'
import { useSuspenseData } from '@/hooks/useData'
import { currentUserQueryKey } from '@/features/auth'

export const getCurrentUserFn = createIsomorphicFn()
  .server(() => getCurrentUserFromServer())
  .client(() => getCurrentUser())

export const Route = createFileRoute('/(main)')({
  component: RouteComponent,
  shouldReload: false,
})

function RouteComponent() {
  const { data: user } = useSuspenseData({
    key: currentUserQueryKey,
    loader: getCurrentUserFn,
  })

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
