import { CreateFollowUpPage } from '@/features/follow-ups'
import { createFileRoute } from '@tanstack/react-router'
import { getModulePermissionsBeforeLoad } from '../../route'
import { followUpPermissionProvider } from '@/features/follow-ups/lib/config/permission-provider'
import { buildPageTitle } from '@/lib/utils'

export const Route = createFileRoute('/(main)/(modules)/follow-ups/create/')({
  head: () => ({ meta: [{ title: buildPageTitle('Crear seguimiento') }] }),
  beforeLoad: getModulePermissionsBeforeLoad(followUpPermissionProvider),
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateFollowUpPage />
}
