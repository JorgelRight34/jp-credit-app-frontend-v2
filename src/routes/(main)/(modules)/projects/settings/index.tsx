import {
  EditProjectFormPage,
  projectsPermissionProvider,
} from '@/features/projects'
import { createProjectQueryKey } from '@/features/projects/lib/query-keys'
import { getProjectFromServer } from '@/features/projects/server/projectServerClient'
import { getProject } from '@/features/projects/services/projectClient'
import { useSuspenseData } from '@/hooks/useData'
import { createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'
import {
  requireModulePermissionToEdit,
  useSuspenseCurrentProjectId,
} from '../../route'
import { buildPageTitle } from '@/lib/utils'

export const getProjectFn = createIsomorphicFn()
  .server((id) => getProjectFromServer(id))
  .client((id) => getProject(id))

export const Route = createFileRoute('/(main)/(modules)/projects/settings/')({
  head: () => ({
    meta: [{ title: buildPageTitle('Configuraciones del proyecto') }],
  }),
  beforeLoad: requireModulePermissionToEdit(projectsPermissionProvider),
  component: RouteComponent,
})

function RouteComponent() {
  const projectId = useSuspenseCurrentProjectId()

  const { data: project } = useSuspenseData({
    key: createProjectQueryKey(projectId),
    loader: () => getProjectFn(projectId),
  })

  return <EditProjectFormPage project={project} />
}
