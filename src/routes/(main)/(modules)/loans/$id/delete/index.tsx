import { createFileRoute } from '@tanstack/react-router'
import { requireModulePermissionToDelete } from '../../../route'
import {
  buildLoanLabel,
  buildLoanQueryKey,
  DeleteLoanPage,
  loanPermissionProvider,
} from '@/features/loans'
import { getLoanFn } from '..'
import { buildDeleteHead } from '@/lib/utils'

export const Route = createFileRoute('/(main)/(modules)/loans/$id/delete/')({
  beforeLoad: requireModulePermissionToDelete(loanPermissionProvider),
  loader: async ({ context, params: { id } }) =>
    await context.dataClient.ensureQueryData({
      queryKey: buildLoanQueryKey(+id),
      queryFn: () => getLoanFn(id),
    }),
  head: ({ loaderData }) => buildDeleteHead(loaderData, buildLoanLabel),
  component: RouteComponent,
})

function RouteComponent() {
  const loan = Route.useLoaderData()

  return <DeleteLoanPage loan={loan} />
}
