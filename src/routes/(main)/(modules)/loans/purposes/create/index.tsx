import { CreateLoanPurposePage, loanPermissionProvider } from '@/features/loans'
import { buildCreatePageTitle } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import { requireModulePermissionToCreate } from '../../../route'

export const Route = createFileRoute(
  '/(main)/(modules)/loans/purposes/create/',
)({
  head: () => ({ meta: [{ title: buildCreatePageTitle('Destino') }] }),
  beforeLoad: requireModulePermissionToCreate(loanPermissionProvider),
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateLoanPurposePage />
}
