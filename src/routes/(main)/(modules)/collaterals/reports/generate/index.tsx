import { buildPageTitle } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import { getModulePermissionsBeforeLoad } from '../../../route'
import { collateralReportsPermissionProvider } from '@/features/collaterals'
import { GenerateCollateralReportPage } from '@/features/reports'

export const Route = createFileRoute(
  '/(main)/(modules)/collaterals/reports/generate/',
)({
  head: () => ({
    meta: [{ title: buildPageTitle('Crear reporte para garantías') }],
  }),
  beforeLoad: getModulePermissionsBeforeLoad(
    collateralReportsPermissionProvider,
  ),
  component: RouteComponent,
})

function RouteComponent() {
  return <GenerateCollateralReportPage />
}
