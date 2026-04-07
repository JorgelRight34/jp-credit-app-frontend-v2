import { buildPageTitle } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import { GenerateLoanReportPage } from '@/features/reports'

export const Route = createFileRoute(
  '/(main)/(modules)/loans/reports/generate/',
)({
  head: () => ({ meta: [{ title: buildPageTitle('Generar reporte') }] }),
  component: RouteComponent,
})

function RouteComponent() {
  return <GenerateLoanReportPage />
}
