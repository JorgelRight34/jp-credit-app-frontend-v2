import { CollateralReportsPage } from '@/features/reports'
import { buildPageTitle } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/collaterals/reports/')({
  head: () => ({ meta: [{ title: buildPageTitle('Reportes de préstamos') }] }),
  component: RouteComponent,
})

function RouteComponent() {
  return <CollateralReportsPage />
}
