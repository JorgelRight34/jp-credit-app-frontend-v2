import { CreateTransactionReportPage } from '@/features/reports'
import { createFileRoute } from '@tanstack/react-router'
import { getModulePermissionsBeforeLoad } from '../../../route'
import { transactionReportPermissionProvider } from '@/features/transactions'
import { buildPageTitle } from '@/lib/utils'

export const Route = createFileRoute(
  '/(main)/(modules)/transactions/reports/create/',
)({
  head: () => ({
    meta: [{ title: buildPageTitle('Crear reporte para transacciones') }],
  }),
  beforeLoad: getModulePermissionsBeforeLoad(
    transactionReportPermissionProvider,
  ),
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateTransactionReportPage />
}
