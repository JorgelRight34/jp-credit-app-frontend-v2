import { buildLoanLabel, LoanPage } from '@/features/loans'
import { buildLoanQueryKey } from '@/features/loans/lib/query-keys'
import { getLoanFromServer } from '@/features/loans/server/loanServerClient'
import { getLoan } from '@/features/loans/services/loanClient'
import { buildHead } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'

export const getLoanFn = createIsomorphicFn()
  .server((id) => getLoanFromServer(id))
  .client((id) => getLoan(id))

export const Route = createFileRoute('/(main)/(modules)/loans/$id/')({
  loader: async ({ context, params: { id } }) =>
    await context.dataClient.fetchQuery({
      queryKey: buildLoanQueryKey(+id),
      queryFn: () => getLoanFn(id),
    }),
  head: ({ loaderData }) => buildHead(loaderData, buildLoanLabel),
  component: RouteComponent,
})

function RouteComponent() {
  const loan = Route.useLoaderData()

  return <LoanPage loan={loan} />
}
