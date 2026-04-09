import {
  buildReportQueryKey,
  getLoanReport,
  LoanReportPage,
} from '@/features/reports'
import { getLoanReportFromServer } from '@/features/reports/server/reportServerClient'
import { useSuspenseData } from '@/hooks/useData'
import { createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'

export const getLoanReportFn = createIsomorphicFn()
  .server((id) => getLoanReportFromServer(id))
  .client((id) => getLoanReport(id))

export const Route = createFileRoute('/(main)/(modules)/loans/reports/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: report } = useSuspenseData({
    key: buildReportQueryKey(+id, 'Loan'),
    loader: () => getLoanReportFn(id),
  })

  return <LoanReportPage report={report} />
}
