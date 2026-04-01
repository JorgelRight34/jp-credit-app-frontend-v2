import { LoanSettingsPage } from '@/features/loans'
import { buildLoanQueryKey } from '@/features/loans/lib/query-keys'
import { useSuspenseData } from '@/hooks/useData'
import { createFileRoute } from '@tanstack/react-router'
import { getLoanFn } from '..'
import { getModulePermissionsBeforeLoad } from '@/routes/(main)/(modules)/route'
import { loanPermissionProvider } from '@/features/loans/lib/config/permission-provider'

export const Route = createFileRoute(
  '/(main)/(modules)/loans/$id/settings/',
)({
  beforeLoad: getModulePermissionsBeforeLoad(loanPermissionProvider),
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  const { data: loan } = useSuspenseData({
    key: buildLoanQueryKey(+id),
    loader: () => getLoanFn(id),
  })

  return <LoanSettingsPage loan={loan} />
}
