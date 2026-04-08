import { buildUserQueryKey, UserChangeHistoryPage } from '@/features/auth'
import { useSuspenseData } from '@/hooks/useData'
import { createFileRoute } from '@tanstack/react-router'
import { getUserFn } from '..'
import { buildPageTitle } from '@/lib/utils'

export const Route = createFileRoute(
  '/(main)/(modules)/access-control/users/$username/changes/',
)({
  head: () => ({ meta: [{ title: buildPageTitle('Historial de cambios') }] }),
  component: RouteComponent,
})

function RouteComponent() {
  const { username } = Route.useParams()
  const { data: user } = useSuspenseData({
    key: buildUserQueryKey(username),
    loader: () => getUserFn(username),
  })

  return <UserChangeHistoryPage user={user} />
}
