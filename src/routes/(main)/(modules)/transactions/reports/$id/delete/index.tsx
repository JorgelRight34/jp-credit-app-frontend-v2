import {
  buildReportLabel,
  buildReportQueryKey,
  DeleteTransactionReportPage,
} from '@/features/reports'
import { buildDeleteHead } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import { getTransactionReportFn } from '..'
import { requireModulePermissionToDelete } from '@/routes/(main)/(modules)/route'
import { transactionReportPermissionProvider } from '@/features/transactions'

export const Route = createFileRoute(
  '/(main)/(modules)/transactions/reports/$id/delete/',
)({
  beforeLoad: requireModulePermissionToDelete(
    transactionReportPermissionProvider,
  ),
  loader: async ({ context, params: { id } }) =>
    await context.dataClient.ensureQueryData({
      queryKey: buildReportQueryKey(+id, 'Transaction'),
      queryFn: () => getTransactionReportFn(id),
    }),
  head: ({ loaderData }) => buildDeleteHead(loaderData, buildReportLabel),
  component: RouteComponent,
})

function RouteComponent() {
  const report = Route.useLoaderData()

  return <DeleteTransactionReportPage report={report} />
}
