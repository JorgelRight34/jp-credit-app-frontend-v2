import { buildReportQueryKey } from '@/features/reports/lib/query-keys'
import { useSuspenseData } from '@/hooks/useData'
import { createFileRoute } from '@tanstack/react-router'
import { getReportFn } from '..'
import { EditReportPage } from '@/features/reports'

export const Route = createFileRoute('/(main)/(modules)/reports/$id/edit/')({
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
