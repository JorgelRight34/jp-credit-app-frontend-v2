import { CreateProfileFormPage } from '@/features/profiles'
import { createFileRoute } from '@tanstack/react-router'
import { getModulePermissionsBeforeLoad } from '../../route'
import { profilesPermissionProvider } from '@/features/profiles/lib/config/permissionProvider'

export const Route = createFileRoute('/(main)/(modules)/profiles/create/')({
  head: () => ({ meta: [{ title: 'Crear pérfil' }] }),
  beforeLoad: getModulePermissionsBeforeLoad(profilesPermissionProvider),
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateProfileFormPage />
}
