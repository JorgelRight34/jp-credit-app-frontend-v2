import { CreateAdjustmentNotePage } from '@/features/adjustment-notes'
import { createFileRoute } from '@tanstack/react-router'
import { requireModulePermissionToCreate } from '../../route'
import { adjustmentNotesPermissionProvider } from '@/features/adjustment-notes/lib/config/permission-provider'
import { buildCreatePageTitle } from '@/lib/utils'

export const Route = createFileRoute(
  '/(main)/(modules)/adjustment-notes/create/',
)({
  head: () => ({ meta: [{ title: buildCreatePageTitle('Nota') }] }),
  beforeLoad: requireModulePermissionToCreate(
    adjustmentNotesPermissionProvider,
  ),
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateAdjustmentNotePage />
}
