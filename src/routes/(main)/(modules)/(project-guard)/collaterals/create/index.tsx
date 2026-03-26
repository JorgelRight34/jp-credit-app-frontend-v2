import { CreateCollateralFormPage } from '@/features/collaterals'
import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseCurrentProjectId } from '../../route'
import { getModulePermissionsBeforeLoad } from '../../../route'
import { collateralsPermissionProvider } from '@/features/collaterals/lib/config/permissionsProvider'

export const Route = createFileRoute(
  '/(main)/(modules)/(project-guard)/collaterals/create/',
)({
  head: () => ({ meta: [{ title: 'Crear garantía' }] }),
  beforeLoad: getModulePermissionsBeforeLoad(collateralsPermissionProvider),
  component: RouteComponent,
})

function RouteComponent() {
  const projectId = useSuspenseCurrentProjectId()

  return <CreateCollateralFormPage projectId={projectId} />
}
