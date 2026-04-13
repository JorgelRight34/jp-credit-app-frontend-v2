import {
  buildReportLabel,
  buildReportQueryKey,
  DeleteCollateralReportPage,
} from '@/features/reports'
import { createFileRoute } from '@tanstack/react-router'
import { getCollateralReportFn } from '..'
import { buildDeleteHead } from '@/lib/utils'
import { requireModulePermissionToDelete } from '@/routes/(main)/(modules)/route'
import { loanReportPermissionProvider } from '@/features/loans'

export const Route = createFileRoute(
  '/(main)/(modules)/collaterals/reports/$id/delete/',
)({
  beforeLoad: requireModulePermissionToDelete(loanReportPermissionProvider),
  loader: async ({ context, params: { id } }) =>
    await context.dataClient.ensureQueryData({
      queryKey: buildReportQueryKey(+id, 'Collateral'),
      queryFn: () => getCollateralReportFn(id),
    }),
  head: ({ loaderData }) => buildDeleteHead(loaderData, buildReportLabel),
  component: RouteComponent,
})

function RouteComponent() {
  const report = Route.useLoaderData()

  return <DeleteCollateralReportPage report={report} />
}
