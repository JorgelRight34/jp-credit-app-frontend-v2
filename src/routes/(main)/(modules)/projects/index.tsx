import { PROJECT_ID_STORAGE_KEY, ProjectsPage } from '@/features/projects'
import { COOKIES } from '@/lib/constants/cookies'
import { CookieService } from '@/lib/services/cookieService'
import { createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'
import z from 'zod'

const projectSchema = z.object({ projectId: z.number().optional() })

export const getProjectId = createIsomorphicFn()
  .server(() => Number(CookieService.get(COOKIES.PROJECT_ID)))
  .client(() => Number(localStorage.getItem(PROJECT_ID_STORAGE_KEY)))

export const Route = createFileRoute('/(main)/(modules)/projects/')({
  component: RouteComponent,
  validateSearch: (search) => projectSchema.parse(search),
})

function RouteComponent() {
  const { projectId } = Route.useRouteContext()
  const { projectId: queryProjectId } = Route.useSearch()

  return <ProjectsPage projectId={projectId} queryProjectId={queryProjectId} />
}
