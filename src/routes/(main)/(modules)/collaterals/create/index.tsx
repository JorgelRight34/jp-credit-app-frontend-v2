import { CreateCollateralPage } from '@/features/collaterals'
import { createFileRoute } from '@tanstack/react-router'
import {
  getModulePermissionsBeforeLoad,
  useSuspenseCurrentProjectId,
} from '../../route'
import { collateralsPermissionProvider } from '@/features/collaterals/lib/config/permissionsProvider'

export const Route = createFileRoute('/(main)/(modules)/collaterals/create/')({
  head: () => ({ meta: [{ title: 'Crear garantía' }] }),
  beforeLoad: getModulePermissionsBeforeLoad(collateralsPermissionProvider),
  component: RouteComponent,
})

function RouteComponent() {
  const projectId = useSuspenseCurrentProjectId()

  return <CreateCollateralPage projectId={projectId} />
}
