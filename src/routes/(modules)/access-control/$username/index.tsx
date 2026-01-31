import { createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'
import { UserFormPage, createUserQueryKey, getUser } from '@/features/auth'
import { getFirstAndLastName } from '@/lib/utils'
import { useSuspenseData } from '@/hooks/useData'
import { getUserFromServer } from '@/features/auth/server/authServerService'

const getUserFn = createIsomorphicFn()
  .server((username) => getUserFromServer(username))
  .client((username) => getUser(username))

export const Route = createFileRoute('/(modules)/access-control/$username/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { username } = Route.useParams()

  const { data: user } = useSuspenseData({
    key: createUserQueryKey(username),
    loader: () => getUserFn(username),
  })

  return <UserFormPage user={user} title={getFirstAndLastName(user)} />
}
