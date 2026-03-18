import { LoanPage } from '@/features/loans'
import { createLoanQueryKey } from '@/features/loans/lib/query-keys'
import { getLoanFromServer } from '@/features/loans/server/loanServerClient'
import { getLoan } from '@/features/loans/services/loanClient'
import { useSuspenseData } from '@/hooks/useData'
import { createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'

export const getLoanFn = createIsomorphicFn()
  .server((id) => getLoanFromServer(id))
  .client((id) => getLoan(id))

export const Route = createFileRoute('/(main)/(modules)/(project-guard)/loans/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: loan } = useSuspenseData({
    key: createLoanQueryKey(+id),
    loader: () => getLoanFn(id),
  })

  return <LoanPage loan={loan} />
}
