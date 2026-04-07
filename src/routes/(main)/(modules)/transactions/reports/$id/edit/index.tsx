import { createFileRoute } from '@tanstack/react-router'
import { getTransactionReportFn } from '..'
import { useSuspenseData } from '@/hooks/useData'
import {
  buildReportQueryKey,
  EditTransactionReportPage,
} from '@/features/reports'

export const Route = createFileRoute(
  '/(main)/(modules)/transactions/reports/$id/edit/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: report } = useSuspenseData({
    key: buildReportQueryKey(+id, 'Transaction'),
    loader: () => getTransactionReportFn(id),
  })

  return <EditTransactionReportPage report={report} />
}
