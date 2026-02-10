import { createFileRoute } from '@tanstack/react-router'
import { getUserFn } from '..'
import { UserFormPage, createUserQueryKey } from '@/features/auth'
import { useSuspenseData } from '@/hooks/useData'

export const Route = createFileRoute(
  '/(main)/(modules)/access-control/users/$username/edit/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { username } = Route.useParams()
  const { data: user } = useSuspenseData({
    key: createUserQueryKey(username),
    loader: () => getUserFn(username),
  })

  return <UserFormPage user={user} />
}
