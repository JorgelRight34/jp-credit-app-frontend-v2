import { ClosedPeriodsPage } from '@/features/transactions'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/transactions/periods/')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return <ClosedPeriodsPage />
}
