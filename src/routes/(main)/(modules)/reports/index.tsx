import { ReportsPage } from '@/features/reports'
import { buildPageTitle } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/reports/')({
  head: () => ({ meta: [{ title: buildPageTitle('Reportes') }] }),
  component: RouteComponent,
})

function RouteComponent() {
  return <ReportsPage />
}
