import { z } from 'zod'
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
import { buildPageTitle } from '@/lib/utils'

const searchSchema = z.object({
  tab: z.number().optional(),
  loanId: z.coerce.number().int().positive().optional(),
  amount: z.coerce.number().positive().optional(),
})

type SearchParams = z.infer<typeof searchSchema>

export const Route = createFileRoute('/(main)/(modules)/transactions/create/')({
  head: () => ({ meta: [{ title: buildPageTitle('Crear transacción') }] }),
  component: RouteComponent,
  beforeLoad: requireModulePermissionToCreate(transactionPermissionProvider),
  validateSearch: (search) => search as SearchParams,
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
