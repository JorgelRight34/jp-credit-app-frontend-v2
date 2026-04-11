import {
  buildReportLabel,
  buildReportQueryKey,
  EditLoanReportPage,
} from '@/features/reports'
import { useSuspenseData } from '@/hooks/useData'
import { createFileRoute } from '@tanstack/react-router'
import { getLoanReportFn } from '..'
import { buildPageTitle } from '@/lib/utils'

export const Route = createFileRoute(
  '/(main)/(modules)/loans/reports/$id/edit/',
)({
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
  const { id } = Route.useParams()
  const { data: report } = useSuspenseData({
    key: buildReportQueryKey(+id, 'Loan'),
    loader: () => getLoanReportFn(id),
  })

  return <EditLoanReportPage report={report} />
}
