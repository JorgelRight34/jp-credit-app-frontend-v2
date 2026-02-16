import { EditProjectFormPage } from '@/features/projects'
import { createProjectQueryKey } from '@/features/projects/lib/query-keys'
import { getProjectId } from '@/features/projects/lib/utils'
import { getProjectFromServer } from '@/features/projects/server/projectServerClient'
import { getProject } from '@/features/projects/services/projectClient'
import { useSuspenseData } from '@/hooks/useData'
import { createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'

export const getProjectFn = createIsomorphicFn()
  .server((id) => getProjectFromServer(id))
  .client((id) => getProject(id))

export const Route = createFileRoute('/(main)/(modules)/projects/settings/')({
  component: RouteComponent,
})

function RouteComponent() {
  const projectId = getProjectId()

  const { data: project } = useSuspenseData({
    key: createProjectQueryKey(projectId),
    loader: () => getProjectFn(projectId),
  })

  return <EditProjectFormPage project={project} />
}
