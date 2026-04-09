import { buildReportQueryKey, EditLoanReportPage } from '@/features/reports'
import { useSuspenseData } from '@/hooks/useData'
import { createFileRoute } from '@tanstack/react-router'
import { getLoanReportFn } from '..'

export const Route = createFileRoute(
  '/(main)/(modules)/loans/reports/$id/edit/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: report } = useSuspenseData({
    key: buildReportQueryKey(+id, 'Loan'),
    loader: () => getLoanReportFn(id),
  })

  return <EditLoanReportPage report={report} />
}
