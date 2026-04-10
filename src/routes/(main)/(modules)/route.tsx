import { ModulePermissions, PermissionsProvider } from '@/components'
import { currentProjectIdQueryKey } from '@/features/projects/lib/query-keys'
import { useSuspenseData } from '@/hooks/useData'
import { PROJECT_ID_KEY } from '@/lib/constants'
import { CookieService } from '@/lib/services/cookieService'
import { AppRouteContext } from '@/routes/__root'
import { Outlet, createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'

export const getModulePermissionsBeforeLoad =
  (
    provider: PermissionsProvider,
    isAuthorized: (p: ModulePermissions) => boolean,
  ) =>
  async ({ context }: { context: AppRouteContext }) => {
    const permissions = await context.dataClient.ensureQueryData({
      queryKey: provider.cacheKey,
      queryFn: provider.loader,
    })

    if (!isAuthorized(permissions))
      throw new Response('Unathorized', { status: 401 })
  }

export const requireModulePermissionToCreate = (
  provider: PermissionsProvider,
) => getModulePermissionsBeforeLoad(provider, (p) => p.canCreate)

export const requireModulePermissionToEdit = (provider: PermissionsProvider) =>
  getModulePermissionsBeforeLoad(provider, (p) => p.canEdit)

export const requireModulePermissionToDelete = (
  provider: PermissionsProvider,
) => getModulePermissionsBeforeLoad(provider, (p) => p.canDelete)

export const getProjectIdFn = createIsomorphicFn()
  .server(() => CookieService.get(PROJECT_ID_KEY))
  .client(() => localStorage.getItem(PROJECT_ID_KEY))

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
