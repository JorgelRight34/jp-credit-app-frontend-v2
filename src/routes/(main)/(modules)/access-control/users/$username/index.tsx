import { createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'
import { UserPage, buildUserQueryKey, getUser } from '@/features/auth'
import { useSuspenseData } from '@/hooks/useData'
import { getUserFromServer } from '@/features/auth/server/authServerService'

export const getUserFn = createIsomorphicFn()
  .server((username) => getUserFromServer(username))
  .client((username) => getUser(username))

export const Route = createFileRoute(
  '/(main)/(modules)/access-control/users/$username/',
)({
  head: ({ params }) => ({ meta: [{ title: params.username }] }),
  component: RouteComponent,
})

function RouteComponent() {
  const { username } = Route.useParams()
  const { data: user } = useSuspenseData({
    key: buildUserQueryKey(username),
    loader: () => getUserFn(username),
  })

  return (
    <UserPage
      user={user}
      userPermissions={{ claims: user.claims, roles: user.roles }}
    />
  )
}
