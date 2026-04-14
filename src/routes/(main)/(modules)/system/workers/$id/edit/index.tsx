import {
  EditBackgroundServicePage,
  systemPermissionProvider,
} from '@/features/system'
import { buildBackgroundServiceQueryKey } from '@/features/system/lib/config/query-keys'
import { getBackgroundServiceFromServer } from '@/features/system/server/backgroundServiceServerClient'
import { getBackgroundService } from '@/features/system/services/backgroundServiceClient'
import { requireModulePermissionToEdit } from '@/routes/(main)/(modules)/route'
import { createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'

const getBackgroundServiceFn = createIsomorphicFn()
  .server((id) => getBackgroundServiceFromServer(id))
  .client((id) => getBackgroundService(id))

export const Route = createFileRoute(
  '/(main)/(modules)/system/workers/$id/edit/',
)({
  beforeLoad: requireModulePermissionToEdit(systemPermissionProvider),
  loader: async ({ context, params: { id } }) =>
    await context.dataClient.ensureQueryData({
      queryKey: buildBackgroundServiceQueryKey(+id),
      queryFn: () => getBackgroundServiceFn(id),
    }),
  component: RouteComponent,
})

function RouteComponent() {
  const worker = Route.useLoaderData()

  return <EditBackgroundServicePage worker={worker} />
}
