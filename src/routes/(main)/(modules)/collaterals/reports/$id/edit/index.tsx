import { createFileRoute } from '@tanstack/react-router'
import { getCollateralReportFn } from '..'
import { useSuspenseData } from '@/hooks/useData'
import {
  buildReportQueryKey,
  EditCollateralReportPage,
} from '@/features/reports'

export const Route = createFileRoute(
  '/(main)/(modules)/collaterals/reports/$id/edit/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: report } = useSuspenseData({
    key: buildReportQueryKey(+id, 'Collateral'),
    loader: () => getCollateralReportFn(id),
  })

  return <EditCollateralReportPage report={report} />
}
