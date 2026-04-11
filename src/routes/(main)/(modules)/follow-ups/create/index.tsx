import { CreateFollowUpPage } from '@/features/follow-ups'
import { createFileRoute } from '@tanstack/react-router'
import { requireModulePermissionToCreate } from '../../route'
import { followUpPermissionProvider } from '@/features/follow-ups/lib/config/permission-provider'
import { buildCreatePageTitle } from '@/lib/utils'

export const Route = createFileRoute('/(main)/(modules)/follow-ups/create/')({
  head: () => ({ meta: [{ title: buildCreatePageTitle('Seguimiento') }] }),
  beforeLoad: requireModulePermissionToCreate(followUpPermissionProvider),
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateFollowUpPage />
}
