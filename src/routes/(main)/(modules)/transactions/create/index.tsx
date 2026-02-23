import { createProjectQueryKey } from '@/features/projects/lib/query-keys'
import { CreateTransactionPage } from '@/features/transactions'
import { useSuspenseData } from '@/hooks/useData'
import { createFileRoute } from '@tanstack/react-router'
import { getProjectFn } from '../../projects/settings'
import { getProjectId } from '@/features/projects/server/utils'

export const Route = createFileRoute('/(main)/(modules)/transactions/create/')({
  component: RouteComponent,
})

function RouteComponent() {
  const projectId = getProjectId()

  const { data: project } = useSuspenseData({
    key: createProjectQueryKey(projectId),
    loader: () => getProjectFn(projectId),
  })

  return <CreateTransactionPage project={project} />
}
