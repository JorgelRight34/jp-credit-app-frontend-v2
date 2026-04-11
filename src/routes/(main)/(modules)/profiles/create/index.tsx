import { CreateProfilePage } from '@/features/profiles'
import { createFileRoute } from '@tanstack/react-router'
import { requireModulePermissionToCreate } from '../../route'
import { profilesPermissionProvider } from '@/features/profiles/lib/config/permissionProvider'
import { buildCreatePageTitle } from '@/lib/utils'

export const Route = createFileRoute('/(main)/(modules)/profiles/create/')({
  head: () => ({ meta: [{ title: buildCreatePageTitle('Pérfil') }] }),
  beforeLoad: requireModulePermissionToCreate(profilesPermissionProvider),
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateProfilePage />
}
