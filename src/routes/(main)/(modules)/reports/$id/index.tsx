import { EditReportPage } from '@/features/reports'
import { buildReportQueryKey } from '@/features/reports/lib/query-keys'
import { getReportFromServer } from '@/features/reports/server/reportServerClient'
import { getReport } from '@/features/reports/services/reportsClient'
import { useSuspenseData } from '@/hooks/useData'
import { createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'

const getReportFn = createIsomorphicFn()
  .server((id) => getReportFromServer(id))
  .client((id) => getReport(id))

export const Route = createFileRoute('/(main)/(modules)/reports/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data } = useSuspenseData({
    key: buildReportQueryKey(+id),
    loader: () => getReportFn(id),
  })

  return <EditReportPage report={data} />
}
