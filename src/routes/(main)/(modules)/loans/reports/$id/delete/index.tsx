import {
  buildReportLabel,
  buildReportQueryKey,
  DeleteLoanReportPage,
} from '@/features/reports'
import { createFileRoute } from '@tanstack/react-router'
import { getLoanReportFn } from '..'
import { buildDeleteHead } from '@/lib/utils'
import { requireModulePermissionToDelete } from '@/routes/(main)/(modules)/route'
import { loanReportPermissionProvider } from '@/features/loans'

export const Route = createFileRoute(
  '/(main)/(modules)/loans/reports/$id/delete/',
)({
  beforeLoad: requireModulePermissionToDelete(loanReportPermissionProvider),
  loader: async ({ context, params: { id } }) =>
    await context.dataClient.ensureQueryData({
      queryKey: buildReportQueryKey(+id, 'Loan'),
      queryFn: () => getLoanReportFn(id),
    }),
  head: ({ loaderData }) => buildDeleteHead(loaderData, buildReportLabel),
  component: RouteComponent,
})

function RouteComponent() {
  const report = Route.useLoaderData()

  return <DeleteLoanReportPage report={report} />
}
