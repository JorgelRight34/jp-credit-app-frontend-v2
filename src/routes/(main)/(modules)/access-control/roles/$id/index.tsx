import { createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'
import { RolePage, createRoleQueryKey } from '@/features/auth'
import { getRoleFromServer } from '@/features/auth/server/authServerService'
import { getRole } from '@/features/auth/services/authService'
import { useSuspenseData } from '@/hooks/useData'

const getRoleFn = createIsomorphicFn()
  .server((id: number) => getRoleFromServer(id))
  .client((id: number) => getRole(id))

export const Route = createFileRoute(
  '/(main)/(modules)/access-control/roles/$id/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  const { data: role } = useSuspenseData({
    key: createRoleQueryKey(id),
    loader: () => getRoleFn(+id),
  })

  return <RolePage role={role} rolePermissions={role.permissions!} />
}
