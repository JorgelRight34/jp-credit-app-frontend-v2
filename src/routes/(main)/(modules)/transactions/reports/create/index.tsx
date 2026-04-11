import { CreateTransactionReportPage } from '@/features/reports'
import { createFileRoute } from '@tanstack/react-router'
import { requireModulePermissionToCreate } from '../../../route'
import { transactionReportPermissionProvider } from '@/features/transactions'
import { buildCreatePageTitle } from '@/lib/utils'

export const Route = createFileRoute(
  '/(main)/(modules)/transactions/reports/create/',
)({
  head: () => ({
    meta: [{ title: buildCreatePageTitle('Crear reporte para transacciones') }],
  }),
  beforeLoad: requireModulePermissionToCreate(
    transactionReportPermissionProvider,
  ),
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateTransactionReportPage />
}
