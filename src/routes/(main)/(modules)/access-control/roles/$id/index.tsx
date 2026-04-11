import { createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'
import { RolePage, buildRoleQueryKey } from '@/features/auth'
import { getRoleFromServer } from '@/features/auth/server/authServerService'
import { getRole } from '@/features/auth/services/authService'

export const getRoleFn = createIsomorphicFn()
  .server((id) => getRoleFromServer(id))
  .client((id) => getRole(id))

export const Route = createFileRoute(
  '/(main)/(modules)/access-control/roles/$id/',
)({
  loader: async ({ context, params: { id } }) =>
    await context.dataClient.ensureQueryData({
      queryKey: buildRoleQueryKey(id),
      queryFn: () => getRoleFn(id),
    }),
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData?.name }],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const role = Route.useLoaderData()

  return (
    <RolePage
      role={role}
      rolePermissions={{ claims: role.claims, roles: [] }}
    />
  )
}
