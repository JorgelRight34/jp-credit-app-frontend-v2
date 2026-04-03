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
  getModulePermissionsBeforeLoad,
  useSuspenseCurrentProjectId,
} from '../../route'
import { buildPageTitle } from '@/lib/utils'

const searchSchema = z.object({
  tab: z.number().optional(),
  loanId: z.coerce.number().int().positive().optional(),
  amount: z.coerce.number().positive().optional(),
})

export const Route = createFileRoute('/(main)/(modules)/transactions/create/')({
  head: () => ({ meta: [{ title: buildPageTitle('Crear transacción') }] }),
  component: RouteComponent,
  beforeLoad: getModulePermissionsBeforeLoad(transactionPermissionProvider),
  validateSearch: (search) => searchSchema.parse(search),
})

function RouteComponent() {
  const projectId = useSuspenseCurrentProjectId()
  const { loanId, amount } = Route.useSearch()

  const { data: project } = useSuspenseData({
    key: createProjectQueryKey(projectId),
    loader: () => getProjectFn(projectId),
  })

  return (
    <CreateTransactionPage loanId={loanId} project={project} amount={amount} />
  )
}
