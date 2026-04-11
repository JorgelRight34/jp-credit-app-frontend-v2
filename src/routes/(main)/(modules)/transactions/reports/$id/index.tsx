import {
  buildReportLabel,
  buildReportQueryKey,
  getTransactionReport,
  TransactionReportPage,
} from '@/features/reports'
import { getTransactionReportFromServer } from '@/features/reports/server/reportServerClient'
import { buildPageTitle } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'

export const getTransactionReportFn = createIsomorphicFn()
  .server((id) => getTransactionReportFromServer(id))
  .client((id) => getTransactionReport(id))

export const Route = createFileRoute(
  '/(main)/(modules)/transactions/reports/$id/',
)({
  loader: async ({ context, params: { id } }) =>
    await context.dataClient.ensureQueryData({
      queryKey: buildReportQueryKey(+id, 'Transaction'),
      queryFn: () => getTransactionReportFn(id),
    }),
  head: ({ loaderData }) => ({
    meta: [{ title: buildPageTitle(buildReportLabel(loaderData!)) }],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const report = Route.useLoaderData()

  return <TransactionReportPage report={report} />
}
