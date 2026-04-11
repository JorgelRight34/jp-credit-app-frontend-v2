import { createFileRoute } from '@tanstack/react-router'
import { requireModulePermissionToCreate } from '../../../route'
import { collateralReportsPermissionProvider } from '@/features/collaterals'
import { buildPageTitle } from '@/lib/utils'
import { CreateCollateralReportPage } from '@/features/reports'

export const Route = createFileRoute(
  '/(main)/(modules)/collaterals/reports/create/',
)({
  head: () => ({
    meta: [{ title: buildPageTitle('Crear reporte para garantías') }],
  }),
  beforeLoad: requireModulePermissionToCreate(
    collateralReportsPermissionProvider,
  ),
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateCollateralReportPage />
}
