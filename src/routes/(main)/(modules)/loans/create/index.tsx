import { CreateLoanFormPage } from '@/features/loans'
import { createProjectQueryKey } from '@/features/projects/lib/query-keys'
import { useSuspenseData } from '@/hooks/useData'
import { createFileRoute } from '@tanstack/react-router'
import { getProjectFn } from '../../projects/settings'
import { getProjectId } from '@/features/projects/server/utils'

export const Route = createFileRoute('/(main)/(modules)/loans/create/')({
  component: RouteComponent,
})

function RouteComponent() {
  const projectId = getProjectId()

  const { data: project } = useSuspenseData({
    key: createProjectQueryKey(projectId),
    loader: () => getProjectFn(projectId),
  })

  return <CreateLoanFormPage project={project} />
}
