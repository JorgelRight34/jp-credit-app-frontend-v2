import {
  buildReportQueryKey,
  getTransactionReport,
  TransactionReportPage,
} from '@/features/reports'
import { getTransactionReportFromServer } from '@/features/reports/server/reportServerClient'
import { useSuspenseData } from '@/hooks/useData'
import { createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'

export const getTransactionReportFn = createIsomorphicFn()
  .server((id) => getTransactionReportFromServer(id))
  .client((id) => getTransactionReport(id))

export const Route = createFileRoute(
  '/(main)/(modules)/transactions/reports/$id/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: report } = useSuspenseData({
    key: buildReportQueryKey(+id, 'Transaction'),
    loader: () => getTransactionReportFn(id),
  })

  return <TransactionReportPage report={report} />
}
