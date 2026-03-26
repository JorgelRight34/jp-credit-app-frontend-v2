import { PermissionsProvider } from '@/components'
import { AppRouteContext } from '@/routes/__root'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const getModulePermissionsBeforeLoad =
  (provider: PermissionsProvider) =>
  ({ context }: { context: AppRouteContext }) => {
    context.dataClient.ensureQueryData({
      queryKey: provider.cacheKey,
      queryFn: provider.loader,
    })
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
