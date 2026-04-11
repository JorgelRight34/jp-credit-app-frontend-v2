import { createFileRoute } from '@tanstack/react-router'
import { getTransactionReportFn } from '..'
import {
  buildReportLabel,
  buildReportQueryKey,
  EditTransactionReportPage,
} from '@/features/reports'
import { buildEditPageTitle } from '@/lib/utils'
import { requireModulePermissionToEdit } from '@/routes/(main)/(modules)/route'
import { transactionReportPermissionProvider } from '@/features/transactions'

export const Route = createFileRoute(
  '/(main)/(modules)/transactions/reports/$id/edit/',
)({
  beforeLoad: requireModulePermissionToEdit(
    transactionReportPermissionProvider,
  ),
  loader: async ({ context, params: { id } }) =>
    await context.dataClient.ensureQueryData({
      queryKey: buildReportQueryKey(+id, 'Transaction'),
      queryFn: () => getTransactionReportFn(id),
    }),
  head: ({ loaderData }) => ({
    meta: [{ title: buildEditPageTitle(buildReportLabel(loaderData!)) }],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const report = Route.useLoaderData()

  return <EditTransactionReportPage report={report} />
}
