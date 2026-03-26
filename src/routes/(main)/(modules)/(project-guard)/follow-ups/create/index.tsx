import { CreateFollowUpPage } from '@/features/follow-ups'
import { createFileRoute } from '@tanstack/react-router'
import { getModulePermissionsBeforeLoad } from '../../../route'
import { followUpPermissionProvider } from '@/features/follow-ups/lib/config/permission-provider'

export const Route = createFileRoute(
  '/(main)/(modules)/(project-guard)/follow-ups/create/',
)({
  beforeLoad: getModulePermissionsBeforeLoad(followUpPermissionProvider),
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateFollowUpPage />
}
