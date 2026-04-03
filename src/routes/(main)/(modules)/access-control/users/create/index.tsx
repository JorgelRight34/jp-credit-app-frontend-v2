import { createFileRoute } from '@tanstack/react-router'
import { CreateUserFormPage } from '@/features/auth'
import { getModulePermissionsBeforeLoad } from '../../../route'
import { accessControlPermissionProvider } from '@/features/auth/lib/config/permissionProvider'
import { buildPageTitle } from '@/lib/utils'

export const Route = createFileRoute(
  '/(main)/(modules)/access-control/users/create/',
)({
  head: () => ({ meta: [{ title: buildPageTitle('Crear acceso') }] }),
  beforeLoad: getModulePermissionsBeforeLoad(accessControlPermissionProvider),
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateUserFormPage />
}
