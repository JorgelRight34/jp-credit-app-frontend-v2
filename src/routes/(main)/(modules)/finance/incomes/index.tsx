import { IncomesPage } from '@/features/finance'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/finance/incomes/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <IncomesPage />
}
