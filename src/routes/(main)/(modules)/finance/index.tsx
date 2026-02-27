import { FinancesPage } from '@/features/finance'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/finance/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <FinancesPage />
}
