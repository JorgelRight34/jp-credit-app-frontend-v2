import { createFileRoute } from '@tanstack/react-router'
import { getUserFn } from '..'
import { EditUserFormPage, buildUserQueryKey } from '@/features/auth'
import { requireModulePermissionToEdit } from '@/routes/(main)/(modules)/route'
import { accessControlPermissionProvider } from '@/features/auth/lib/config/permissionProvider'
import { buildEditPageTitle } from '@/lib/utils'

export const Route = createFileRoute(
  '/(main)/(modules)/access-control/users/$username/edit/',
)({
  beforeLoad: requireModulePermissionToEdit(accessControlPermissionProvider),
  loader: async ({ context, params: { username } }) =>
    await context.dataClient.ensureQueryData({
      queryKey: buildUserQueryKey(username),
      queryFn: () => getUserFn(username),
    }),
  head: ({ params }) => ({
    meta: [{ title: buildEditPageTitle(params.username) }],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const user = Route.useLoaderData()

  return <EditUserFormPage user={user} />
}
