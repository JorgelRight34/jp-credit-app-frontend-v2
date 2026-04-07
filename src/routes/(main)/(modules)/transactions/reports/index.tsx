import { TransactionsReportPage } from '@/features/reports'
import { buildPageTitle } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/transactions/reports/')(
  {
    head: () => ({
      meta: [{ title: buildPageTitle('Reportes de transacciones') }],
    }),
    component: RouteComponent,
  },
)

function RouteComponent() {
  return <TransactionsReportPage />
}
