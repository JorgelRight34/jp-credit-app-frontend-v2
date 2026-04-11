import { createProjectQueryKey } from '@/features/projects/lib/query-keys'
import {
  CreateTransactionPage,
  transactionPermissionProvider,
} from '@/features/transactions'
import { useSuspenseData } from '@/hooks/useData'
import { createFileRoute } from '@tanstack/react-router'
import { getProjectFn } from '../../projects/settings'
import {
  requireModulePermissionToCreate,
  useSuspenseCurrentProjectId,
} from '../../route'
import { buildCreatePageTitle } from '@/lib/utils'

export const Route = createFileRoute('/(main)/(modules)/transactions/create/')({
  head: () => ({ meta: [{ title: buildCreatePageTitle('Transacción') }] }),
  component: RouteComponent,
  beforeLoad: requireModulePermissionToCreate(transactionPermissionProvider),
  validateSearch: (search) =>
    search as { tab?: number; loanId?: number; amount?: number },
})

function RouteComponent() {
  const projectId = useSuspenseCurrentProjectId()
  const { loanId, amount } = Route.useSearch({
    select: (search) => ({ loanId: search.loanId, amount: search.amount }),
  })

  const { data: project } = useSuspenseData({
    key: createProjectQueryKey(projectId),
    loader: () => getProjectFn(projectId),
  })

  return (
    <CreateTransactionPage loanId={loanId} project={project} amount={amount} />
  )
}
