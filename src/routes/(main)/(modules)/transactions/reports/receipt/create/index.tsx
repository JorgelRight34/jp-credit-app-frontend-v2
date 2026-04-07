import {
  CreateTransactionReceiptTemplatePage,
  TransactionType,
} from '@/features/transactions'
import { buildPageTitle } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(main)/(modules)/transactions/reports/receipt/create/',
)({
  head: () => ({
    meta: [{ title: buildPageTitle('Crear plantilla comprobante') }],
  }),
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => ({
    type: search.type as TransactionType | undefined,
  }),
})

function RouteComponent() {
  const { type } = Route.useSearch({
    select: (search) => ({ type: search.type }),
  })

  return <CreateTransactionReceiptTemplatePage type={type ?? 'pc'} />
}
