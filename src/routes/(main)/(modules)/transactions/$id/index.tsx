import { TransactionPage } from '@/features/transactions'
import { createTransactionQueryKey } from '@/features/transactions/lib/query-keys'
import { getTransactionFromServer } from '@/features/transactions/server/transactionServerClient'
import { getTransaction } from '@/features/transactions/services/transactionClient'
import { useSuspenseData } from '@/hooks/useData'
import { createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'

const getTransactionFn = createIsomorphicFn()
  .server((id) => getTransactionFromServer(id))
  .client((id) => getTransaction(id))

export const Route = createFileRoute('/(main)/(modules)/transactions/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: transaction } = useSuspenseData({
    key: createTransactionQueryKey(+id),
    loader: () => getTransactionFn(id),
  })

  return <TransactionPage transaction={transaction} />
}
