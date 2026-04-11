import { createFileRoute } from '@tanstack/react-router'
import { getRoleFn } from '..'
import { EditRoleFormPage, buildRoleQueryKey } from '@/features/auth'
import { requireModulePermissionToEdit } from '@/routes/(main)/(modules)/route'
import { accessControlPermissionProvider } from '@/features/auth/lib/config/permissionProvider'
import { buildEditPageTitle } from '@/lib/utils'

export const Route = createFileRoute(
  '/(main)/(modules)/access-control/roles/$id/edit/',
)({
  beforeLoad: requireModulePermissionToEdit(accessControlPermissionProvider),
  loader: async ({ context, params: { id } }) =>
    await context.dataClient.ensureQueryData({
      queryKey: buildRoleQueryKey(id),
      queryFn: () => getRoleFn(id),
    }),
  head: ({ loaderData }) => ({
    meta: [{ title: buildEditPageTitle(loaderData?.name, 'Rol') }],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const role = Route.useLoaderData()

  return <EditRoleFormPage role={role} />
}
