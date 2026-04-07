import { buildPageTitle } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import { getModulePermissionsBeforeLoad } from '../../../route'
import { loanReportPermissionProvider } from '@/features/loans'
import { CreateLoanReportPage } from '@/features/reports'

export const Route = createFileRoute('/(main)/(modules)/loans/reports/create/')(
  {
    head: () => ({
      meta: [
        { title: buildPageTitle('Crear plantilla de reporte para préstamo') },
      ],
    }),
    beforeLoad: getModulePermissionsBeforeLoad(loanReportPermissionProvider),
    component: RouteComponent,
  },
)

function RouteComponent() {
  return <CreateLoanReportPage />
}
