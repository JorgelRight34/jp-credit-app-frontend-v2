import {
  buildReportLabel,
  buildReportQueryKey,
  getLoanReport,
  LoanReportPage,
} from '@/features/reports'
import { getLoanReportFromServer } from '@/features/reports/server/reportServerClient'
import { buildPageTitle } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'

export const getLoanReportFn = createIsomorphicFn()
  .server((id) => getLoanReportFromServer(id))
  .client((id) => getLoanReport(id))

export const Route = createFileRoute('/(main)/(modules)/loans/reports/$id/')({
  loader: async ({ context, params: { id } }) =>
    await context.dataClient.ensureQueryData({
      queryKey: buildReportQueryKey(+id, 'Loan'),
      queryFn: () => getLoanReportFn(id),
    }),
  head: ({ loaderData }) => ({
    meta: [{ title: buildPageTitle(buildReportLabel(loaderData!)) }],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const report = Route.useLoaderData()

  return <LoanReportPage report={report} />
}
