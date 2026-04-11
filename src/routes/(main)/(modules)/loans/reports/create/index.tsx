import { buildCreatePageTitle } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import { requireModulePermissionToCreate } from '../../../route'
import { loanReportPermissionProvider } from '@/features/loans'
import { CreateLoanReportPage } from '@/features/reports'

export const Route = createFileRoute('/(main)/(modules)/loans/reports/create/')(
  {
    head: () => ({
      meta: [
        {
          title: buildCreatePageTitle(
            'Crear plantilla de reporte para préstamo',
          ),
        },
      ],
    }),
    beforeLoad: requireModulePermissionToCreate(loanReportPermissionProvider),
    component: RouteComponent,
  },
)

function RouteComponent() {
  return <CreateLoanReportPage />
}
