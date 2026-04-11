import { createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'
import { UserPage, buildUserQueryKey, getUser } from '@/features/auth'
import { getUserFromServer } from '@/features/auth/server/authServerService'

export const getUserFn = createIsomorphicFn()
  .server((username) => getUserFromServer(username))
  .client((username) => getUser(username))

export const Route = createFileRoute(
  '/(main)/(modules)/access-control/users/$username/',
)({
  loader: async ({ context, params: { username } }) =>
    await context.dataClient.ensureQueryData({
      queryKey: buildUserQueryKey(username),
      queryFn: () => getUserFn(username),
    }),
  head: ({ params }) => ({ meta: [{ title: params.username }] }),
  component: RouteComponent,
})

function RouteComponent() {
  const user = Route.useLoaderData()

  return (
    <UserPage
      user={user}
      userPermissions={{ claims: user.claims, roles: user.roles }}
    />
  )
}
