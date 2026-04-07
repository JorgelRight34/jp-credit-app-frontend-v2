import { GenerateTransactionReportPage } from '@/features/reports'
import { buildPageTitle } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(main)/(modules)/transactions/reports/generate/',
)({
  head: () => ({
    meta: [{ title: buildPageTitle('Generar reporte para transacciones') }],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <GenerateTransactionReportPage />
}
