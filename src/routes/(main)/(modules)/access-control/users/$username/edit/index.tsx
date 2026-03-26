import { createFileRoute } from '@tanstack/react-router'
import { getUserFn } from '..'
import { EditUserFormPage, createUserQueryKey } from '@/features/auth'
import { useSuspenseData } from '@/hooks/useData'
import { getModulePermissionsBeforeLoad } from '@/routes/(main)/(modules)/route'
import { accessControlPermissionProvider } from '@/features/auth/lib/config/permissionProvider'

export const Route = createFileRoute(
  '/(main)/(modules)/access-control/users/$username/edit/',
)({
  beforeLoad: getModulePermissionsBeforeLoad(accessControlPermissionProvider),
  component: RouteComponent,
})

function RouteComponent() {
  const { username } = Route.useParams()
  const { data: user } = useSuspenseData({
    key: createUserQueryKey(username),
    loader: () => getUserFn(username),
  })

  return <EditUserFormPage user={user} />
}
