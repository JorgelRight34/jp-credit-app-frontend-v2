import { PermissionsProvider } from '@/components'
import { PROJECT_ID_STORAGE_KEY, ProjectGuard } from '@/features/projects'
import { currentProjectIdQueryKey } from '@/features/projects/lib/query-keys'
import { useSuspenseData } from '@/hooks/useData'
import { CookieClientService } from '@/lib/services/cookieClientService'
import { CookieService } from '@/lib/services/cookieService'
import { AppRouteContext } from '@/routes/__root'
import { Outlet, createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'

export const getModulePermissionsBeforeLoad =
  (provider: PermissionsProvider) =>
  ({ context }: { context: AppRouteContext }) => {
    context.dataClient.ensureQueryData({
      queryKey: provider.cacheKey,
      queryFn: provider.loader,
    })
  }

export const getProjectIdFn = createIsomorphicFn()
  .server(() => CookieService.get(PROJECT_ID_STORAGE_KEY))
  .client(() => CookieClientService.get(PROJECT_ID_STORAGE_KEY))

export const useSuspenseCurrentProjectId = () => {
  const { data } = useSuspenseData({
    key: currentProjectIdQueryKey,
    loader: getProjectIdFn,
  })

  return Number(data)
}

export const Route = createFileRoute('/(main)/(modules)')({
  component: RouteComponent,
  pendingComponent: () => null,
  staleTime: Infinity,
  shouldReload: false,
})

function RouteComponent() {
  return <Outlet />
}
