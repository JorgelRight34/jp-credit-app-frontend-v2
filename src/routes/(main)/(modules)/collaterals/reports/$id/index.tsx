import {
  buildReportQueryKey,
  CollateralReportPage,
  getCollateralReport,
} from '@/features/reports'
import { getCollateralReportFromServer } from '@/features/reports/server/reportServerClient'
import { useSuspenseData } from '@/hooks/useData'
import { createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'

export const getCollateralReportFn = createIsomorphicFn()
  .server((id) => getCollateralReportFromServer(id))
  .client((id) => getCollateralReport(id))

export const Route = createFileRoute(
  '/(main)/(modules)/collaterals/reports/$id/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: report } = useSuspenseData({
    key: buildReportQueryKey(+id, 'Collateral'),
    loader: () => getCollateralReportFn(id),
  })

  return <CollateralReportPage report={report} />
}
