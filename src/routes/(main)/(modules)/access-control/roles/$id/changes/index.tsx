import { buildRoleQueryKey, RoleChangeHistoryPage } from '@/features/auth'
import { createFileRoute } from '@tanstack/react-router'
import { getRoleFn } from '..'
import { buildHistoryPageTitle } from '@/lib/utils'

export const Route = createFileRoute(
  '/(main)/(modules)/access-control/roles/$id/changes/',
)({
  loader: async ({ context, params: { id } }) =>
    await context.dataClient.ensureQueryData({
      queryKey: buildRoleQueryKey(id),
      queryFn: () => getRoleFn(id),
    }),
  head: ({ loaderData }) => ({
    meta: [{ title: buildHistoryPageTitle(loaderData?.name) }],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const role = Route.useLoaderData()

  return <RoleChangeHistoryPage role={role} />
}
