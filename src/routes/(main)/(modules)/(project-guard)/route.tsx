import { PROJECT_ID_STORAGE_KEY, ProjectGuard } from '@/features/projects'
import { CookieClientService } from '@/lib/services/cookieClientService'
import { CookieService } from '@/lib/services/cookieService'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'

const getProjectIdFn = createIsomorphicFn()
  .server(() => CookieService.get(PROJECT_ID_STORAGE_KEY))
  .client(() => CookieClientService.get(PROJECT_ID_STORAGE_KEY))

let hasValidated = false

export const Route = createFileRoute('/(main)/(modules)/(project-guard)')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (hasValidated) return

    context.projectId = Number(getProjectIdFn())
    hasValidated = true
  },
  staleTime: Infinity,
  shouldReload: false,
})

function RouteComponent() {
  const { projectId } = Route.useRouteContext()

  return (
    <ProjectGuard projectId={projectId}>
      <Outlet />
    </ProjectGuard>
  )
}
