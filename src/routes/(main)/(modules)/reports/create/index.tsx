import { CreateReportPage } from '@/features/reports'
import { createFileRoute } from '@tanstack/react-router'
import { getModulePermissionsBeforeLoad } from '../../route'
import { reportPermissionProvider } from '@/features/reports/lib/permission-provider'
import { buildPageTitle } from '@/lib/utils'

export const Route = createFileRoute('/(main)/(modules)/reports/create/')({
  head: () => ({ meta: [{ title: buildPageTitle('Crear reporte') }] }),
  beforeLoad: getModulePermissionsBeforeLoad(reportPermissionProvider),
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateReportPage />
}
