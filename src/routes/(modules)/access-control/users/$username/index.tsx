import { createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'
import { UserPage, createUserQueryKey, getUser } from '@/features/auth'
import { useSuspenseData } from '@/hooks/useData'
import { getUserFromServer } from '@/features/auth/server/authServerService'

const getUserFn = createIsomorphicFn()
  .server((username) => getUserFromServer(username))
  .client((username) => getUser(username))

export const Route = createFileRoute('/(modules)/access-control/users/$username/')({
  head: ({ params }) => ({ meta: [{ title: params.username }] }),
  component: RouteComponent,
})

function RouteComponent() {
  const { username } = Route.useParams()

  const { data: user } = useSuspenseData({
    key: createUserQueryKey(username),
    loader: () => getUserFn(username),
  })

  return (
    <UserPage
      user={user}
      userPermissions={{ claims: user.claims, roles: user.roles }}
    />
  )
}
