import {
  buildReportQueryKey,
  CollateralReportPage,
  getCollateralReport,
} from '@/features/reports'
import { getCollateralReportFromServer } from '@/features/reports/server/reportServerClient'
import { createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'

export const getCollateralReportFn = createIsomorphicFn()
  .server((id) => getCollateralReportFromServer(id))
  .client((id) => getCollateralReport(id))

export const Route = createFileRoute(
  '/(main)/(modules)/collaterals/reports/$id/',
)({
  loader: async ({ context, params: { id } }) =>
    await context.dataClient.ensureQueryData({
      queryKey: buildReportQueryKey(+id, 'Collateral'),
      queryFn: () => getCollateralReportFn(id),
    }),
  head: ({ loaderData }) => ({ meta: [{ title: loaderData?.title }] }),
  component: RouteComponent,
})

function RouteComponent() {
  const report = Route.useLoaderData()

  return <CollateralReportPage report={report} />
}
