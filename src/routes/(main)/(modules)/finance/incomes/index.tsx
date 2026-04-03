import { IncomesPage } from '@/features/finance'
import { buildPageTitle } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/finance/incomes/')({
  head: () => ({ meta: [{ title: buildPageTitle('Ingresos') }] }),
  component: RouteComponent,
})

function RouteComponent() {
  return <IncomesPage />
}
