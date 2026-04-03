import { ClosedPeriodsPage } from '@/features/transactions'
import { buildPageTitle } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/transactions/periods/')(
  {
    head: () => ({ meta: [{ title: buildPageTitle('Periodos contables') }] }),
    component: RouteComponent,
  },
)

function RouteComponent() {
  return <ClosedPeriodsPage />
}
