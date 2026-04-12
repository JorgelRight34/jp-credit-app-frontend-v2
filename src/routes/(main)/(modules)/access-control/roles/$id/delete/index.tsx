import { buildRoleQueryKey, DeleteRolePage } from '@/features/auth'
import { createFileRoute } from '@tanstack/react-router'
import { getRoleFn } from '..'
import { buildDeleteHead } from '@/lib/utils'
import { requireModulePermissionToDelete } from '@/routes/(main)/(modules)/route'
import { accessControlPermissionProvider } from '@/features/auth/lib/config/permissionProvider'

export const Route = createFileRoute(
  '/(main)/(modules)/access-control/roles/$id/delete/',
)({
  beforeLoad: requireModulePermissionToDelete(accessControlPermissionProvider),
  loader: async ({ context, params: { id } }) =>
    await context.dataClient.ensureQueryData({
      queryKey: buildRoleQueryKey(id),
      queryFn: () => getRoleFn(id),
    }),
  head: ({ loaderData }) => buildDeleteHead(loaderData, (l) => l.name),
  component: RouteComponent,
})

function RouteComponent() {
  const role = Route.useLoaderData()

  return <DeleteRolePage role={role} />
}
