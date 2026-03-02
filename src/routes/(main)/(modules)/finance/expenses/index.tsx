import { ExpensesPage } from '@/features/finance'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/finance/expenses/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ExpensesPage />
}
