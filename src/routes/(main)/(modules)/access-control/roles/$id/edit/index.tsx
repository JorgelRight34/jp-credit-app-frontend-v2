import { createFileRoute } from '@tanstack/react-router'
import { getRoleFn } from '..'
import { EditRoleFormPage, buildRoleQueryKey } from '@/features/auth'
import { useSuspenseData } from '@/hooks/useData'
import { getModulePermissionsBeforeLoad } from '@/routes/(main)/(modules)/route'
import { accessControlPermissionProvider } from '@/features/auth/lib/config/permissionProvider'

export const Route = createFileRoute(
  '/(main)/(modules)/access-control/roles/$id/edit/',
)({
  beforeLoad: getModulePermissionsBeforeLoad(accessControlPermissionProvider),
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: role } = useSuspenseData({
    key: buildRoleQueryKey(id),
    loader: () => getRoleFn(+id),
  })

  return <EditRoleFormPage role={role} />
}
