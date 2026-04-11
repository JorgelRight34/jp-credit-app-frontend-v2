import { buildUserQueryKey, UserChangeHistoryPage } from '@/features/auth'
import { createFileRoute } from '@tanstack/react-router'
import { getUserFn } from '..'
import { buildHistoryPageTitle } from '@/lib/utils'

export const Route = createFileRoute(
  '/(main)/(modules)/access-control/users/$username/changes/',
)({
  loader: async ({ context, params: { username } }) =>
    await context.dataClient.ensureQueryData({
      queryKey: buildUserQueryKey(username),
      queryFn: () => getUserFn(username),
    }),
  head: ({ params }) => ({
    meta: [{ title: buildHistoryPageTitle(params.username) }],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const user = Route.useLoaderData()

  return <UserChangeHistoryPage user={user} />
}
