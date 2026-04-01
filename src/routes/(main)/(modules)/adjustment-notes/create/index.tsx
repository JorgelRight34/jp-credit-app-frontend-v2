import { CreateAdjustmentNotePage } from '@/features/adjustment-notes'
import { createFileRoute } from '@tanstack/react-router'
import { getModulePermissionsBeforeLoad } from '../../route'
import { adjustmentNotesPermissionProvider } from '@/features/adjustment-notes/lib/config/permission-provider'

export const Route = createFileRoute(
  '/(main)/(modules)/adjustment-notes/create/',
)({
  beforeLoad: getModulePermissionsBeforeLoad(adjustmentNotesPermissionProvider),
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateAdjustmentNotePage />
}
