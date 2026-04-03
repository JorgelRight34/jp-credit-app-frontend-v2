import { CreateAdjustmentNotePage } from '@/features/adjustment-notes'
import { createFileRoute } from '@tanstack/react-router'
import { getModulePermissionsBeforeLoad } from '../../route'
import { adjustmentNotesPermissionProvider } from '@/features/adjustment-notes/lib/config/permission-provider'
import { buildPageTitle } from '@/lib/utils'

export const Route = createFileRoute(
  '/(main)/(modules)/adjustment-notes/create/',
)({
  head: () => ({ meta: [{ title: buildPageTitle('Crear nota') }] }),
  beforeLoad: getModulePermissionsBeforeLoad(adjustmentNotesPermissionProvider),
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateAdjustmentNotePage />
}
