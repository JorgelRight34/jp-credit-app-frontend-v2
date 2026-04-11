import { createFileRoute } from '@tanstack/react-router'
import { getCollateralReportFn } from '..'
import {
  buildReportQueryKey,
  EditCollateralReportPage,
} from '@/features/reports'
import { buildEditPageTitle } from '@/lib/utils'
import { requireModulePermissionToEdit } from '@/routes/(main)/(modules)/route'
import { collateralReportsPermissionProvider } from '@/features/collaterals'

export const Route = createFileRoute(
  '/(main)/(modules)/collaterals/reports/$id/edit/',
)({
  beforeLoad: requireModulePermissionToEdit(
    collateralReportsPermissionProvider,
  ),
  loader: async ({ context, params: { id } }) =>
    await context.dataClient.ensureQueryData({
      queryKey: buildReportQueryKey(+id, 'Collateral'),
      queryFn: () => getCollateralReportFn(id),
    }),
  head: ({ loaderData }) => ({
    meta: [{ title: buildEditPageTitle(loaderData!.title, 'Reporte') }],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const report = Route.useLoaderData()

  return <EditCollateralReportPage report={report} />
}
