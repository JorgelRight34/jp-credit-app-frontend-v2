import {
  CreateTransactionReceiptTemplatePage,
  TransactionType,
} from '@/features/transactions'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(main)/(modules)/transactions/receipt-report-template/create/',
)({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => ({
    type: search.type as TransactionType | undefined,
  }),
})

function RouteComponent() {
  const { type } = Route.useSearch()

  return <CreateTransactionReceiptTemplatePage type={type ?? 'pc'} />
}
