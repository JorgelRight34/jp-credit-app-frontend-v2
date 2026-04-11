import { CreateRoleFormPage } from '@/features/auth'
import { createFileRoute } from '@tanstack/react-router'
import { requireModulePermissionToCreate } from '../../../route'
import { rolesPermissionProvider } from '@/features/auth/lib/config/permissionProvider'
import { buildPageTitle } from '@/lib/utils'

export const Route = createFileRoute(
  '/(main)/(modules)/access-control/roles/create/',
)({
  head: () => ({ meta: [{ title: buildPageTitle('Crear rol') }] }),
  beforeLoad: requireModulePermissionToCreate(rolesPermissionProvider),
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateRoleFormPage />
}
