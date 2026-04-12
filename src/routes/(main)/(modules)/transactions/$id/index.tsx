import { buildTransactionLabel, TransactionPage } from '@/features/transactions'
import { createTransactionQueryKey } from '@/features/transactions/lib/query-keys'
import { getTransactionFromServer } from '@/features/transactions/server/transactionServerClient'
import { getTransaction } from '@/features/transactions/services/transactionClient'
import { buildPageHead } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'

export const getTransactionFn = createIsomorphicFn()
  .server((id) => getTransactionFromServer(id))
  .client((id) => getTransaction(id))

export const Route = createFileRoute('/(main)/(modules)/transactions/$id/')({
  loader: async ({ context, params: { id } }) =>
    await context.dataClient.ensureQueryData({
      queryKey: createTransactionQueryKey(+id),
      queryFn: () => getTransactionFn(id),
    }),
  head: ({ loaderData }) => buildPageHead(loaderData, buildTransactionLabel),
  component: RouteComponent,
})

function RouteComponent() {
  const transaction = Route.useLoaderData()

  return <TransactionPage transaction={transaction} />
}
