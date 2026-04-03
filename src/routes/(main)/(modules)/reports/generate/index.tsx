import { GenerateReportPage } from '@/features/reports'
import { buildPageTitle } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/reports/generate/')({
  head: () => ({ meta: [{ title: buildPageTitle('Generar reporte') }] }),
  component: RouteComponent,
})

function RouteComponent() {
  return <GenerateReportPage />
}
