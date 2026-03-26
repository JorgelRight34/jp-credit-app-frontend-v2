import { createFileRoute } from '@tanstack/react-router'
import { CreateUserFormPage } from '@/features/auth'
import { getModulePermissionsBeforeLoad } from '../../../route'
import { accessControlPermissionProvider } from '@/features/auth/lib/config/permissionProvider'

export const Route = createFileRoute(
  '/(main)/(modules)/access-control/users/create/',
)({
  head: () => ({ meta: [{ title: 'Crear acceso' }] }),
  beforeLoad: getModulePermissionsBeforeLoad(accessControlPermissionProvider),
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateUserFormPage />
}
