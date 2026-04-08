import { buildRoleQueryKey, RoleChangeHistoryPage } from '@/features/auth'
import { useSuspenseData } from '@/hooks/useData'
import { createFileRoute } from '@tanstack/react-router'
import { getRoleFn } from '..'
import { buildPageTitle } from '@/lib/utils'

export const Route = createFileRoute(
  '/(main)/(modules)/access-control/roles/$id/changes/',
)({
  head: () => ({ meta: [{ title: buildPageTitle('Historial de cambios') }] }),
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: role } = useSuspenseData({
    key: buildRoleQueryKey(id),
    loader: () => getRoleFn(+id),
  })

  return <RoleChangeHistoryPage role={role} />
}
