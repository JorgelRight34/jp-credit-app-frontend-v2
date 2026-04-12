import { buildLoanLabel, LoanSettingsPage } from '@/features/loans'
import { buildLoanQueryKey } from '@/features/loans/lib/query-keys'
import { createFileRoute } from '@tanstack/react-router'
import { getLoanFn } from '..'
import { requireModulePermissionToEdit } from '@/routes/(main)/(modules)/route'
import { loanPermissionProvider } from '@/features/loans/lib/config/permission-provider'
import { buildSettingsHead } from '@/lib/utils'

export const Route = createFileRoute('/(main)/(modules)/loans/$id/settings/')({
  beforeLoad: requireModulePermissionToEdit(loanPermissionProvider),
  loader: async ({ context, params: { id } }) =>
    await context.dataClient.ensureQueryData({
      queryKey: buildLoanQueryKey(+id),
      queryFn: () => getLoanFn(id),
    }),
  head: ({ loaderData }) => buildSettingsHead(loaderData, buildLoanLabel),
  component: RouteComponent,
})

function RouteComponent() {
  const loan = Route.useLoaderData()

  return <LoanSettingsPage loan={loan} />
}
