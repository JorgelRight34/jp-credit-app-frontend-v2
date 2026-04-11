import { createFileRoute } from '@tanstack/react-router'
import { CreateUserFormPage } from '@/features/auth'
import { requireModulePermissionToCreate } from '../../../route'
import { accessControlPermissionProvider } from '@/features/auth/lib/config/permissionProvider'
import { buildCreatePageTitle } from '@/lib/utils'

export const Route = createFileRoute(
  '/(main)/(modules)/access-control/users/create/',
)({
  head: () => ({ meta: [{ title: buildCreatePageTitle('Acceso') }] }),
  beforeLoad: requireModulePermissionToCreate(accessControlPermissionProvider),
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateUserFormPage />
}
