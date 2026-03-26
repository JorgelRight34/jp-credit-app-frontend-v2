import { CreateReportPage } from '@/features/reports'
import { createFileRoute } from '@tanstack/react-router'
import { getModulePermissionsBeforeLoad } from '../../route'
import { reportPermissionProvider } from '@/features/reports/lib/permission-provider'

export const Route = createFileRoute('/(main)/(modules)/reports/create/')({
  beforeLoad: getModulePermissionsBeforeLoad(reportPermissionProvider),
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateReportPage />
}
