import { ExpensesPage } from '@/features/finance'
import { buildPageTitle } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/finance/expenses/')({
  head: () => ({ meta: [{ title: buildPageTitle('Egresos') }] }),
  component: RouteComponent,
})

function RouteComponent() {
  return <ExpensesPage />
}
