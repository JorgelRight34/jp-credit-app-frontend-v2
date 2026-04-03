import { TransactionsPage } from '@/features/transactions'
import { buildPageTitle } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/transactions/')({
  head: () => ({
    meta: [{ title: buildPageTitle('Transacciones') }],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <TransactionsPage />
}
