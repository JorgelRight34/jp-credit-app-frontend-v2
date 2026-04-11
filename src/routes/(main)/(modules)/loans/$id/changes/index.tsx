import {
  buildLoanLabel,
  buildLoanQueryKey,
  LoanChangeHistoryPage,
} from '@/features/loans'
import { createFileRoute } from '@tanstack/react-router'
import { getLoanFn } from '..'
import { buildHistoryPageTitle } from '@/lib/utils'

export const Route = createFileRoute('/(main)/(modules)/loans/$id/changes/')({
  loader: async ({ context, params: { id } }) =>
    await context.dataClient.ensureQueryData({
      queryKey: buildLoanQueryKey(+id),
      queryFn: () => getLoanFn(id),
    }),
  head: ({ loaderData }) => ({
    meta: [
      {
        title: buildHistoryPageTitle(buildLoanLabel(loaderData!)),
      },
    ],
  }),
  component: RouteComponent,
})

function RouteComponent() {
  const loan = Route.useLoaderData()

  return <LoanChangeHistoryPage loan={loan} />
}
