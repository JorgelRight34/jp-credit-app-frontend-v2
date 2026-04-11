import { CreateCollateralPage } from '@/features/collaterals'
import { createFileRoute } from '@tanstack/react-router'
import {
  requireModulePermissionToCreate,
  useSuspenseCurrentProjectId,
} from '../../route'
import { collateralsPermissionProvider } from '@/features/collaterals/lib/config/permissionsProvider'
import { buildCreatePageTitle } from '@/lib/utils'

export const Route = createFileRoute('/(main)/(modules)/collaterals/create/')({
  head: () => ({ meta: [{ title: buildCreatePageTitle('Garantía') }] }),
  beforeLoad: requireModulePermissionToCreate(collateralsPermissionProvider),
  component: RouteComponent,
})

function RouteComponent() {
  const projectId = useSuspenseCurrentProjectId()

  return <CreateCollateralPage projectId={projectId} />
}
