import { z } from 'zod'
import { createProjectQueryKey } from '@/features/projects/lib/query-keys'
import { CreateTransactionPage } from '@/features/transactions'
import { useSuspenseData } from '@/hooks/useData'
import { createFileRoute } from '@tanstack/react-router'
import { getProjectFn } from '../../../projects/settings'
import { useSuspenseCurrentProjectId } from '../../../route'

const searchSchema = z.object({
  tab: z.number().optional(),
  loanId: z.coerce.number().int().positive().optional(),
  amount: z.coerce.number().positive().optional(),
})

export const Route = createFileRoute(
  '/(main)/(modules)/(project-guard)/transactions/create/',
)({
  component: RouteComponent,
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
