import { EditLoanPurposePage, getLoanPurpose } from '@/features/loans'
import { buildLoanPurposeQueryKey } from '@/features/loans/lib/query-keys'
import { getLoanPurposeFromServer } from '@/features/loans/server/loanServerClient'
import { useSuspenseData } from '@/hooks/useData'
import { createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'

export const getLoanPurposeFn = createIsomorphicFn()
  .server((id) => getLoanPurposeFromServer(id))
  .client((id) => getLoanPurpose(id))

export const Route = createFileRoute(
  '/(main)/(modules)/loans/purposes/$id/edit/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data } = useSuspenseData({
    key: buildLoanPurposeQueryKey(+id),
    loader: () => getLoanPurposeFn(id),
  })

  return <EditLoanPurposePage purpose={data} />
}
