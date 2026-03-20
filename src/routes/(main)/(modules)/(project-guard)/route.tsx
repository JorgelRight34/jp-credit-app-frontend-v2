import { PROJECT_ID_STORAGE_KEY, ProjectGuard } from '@/features/projects'
import { currentProjectIdQueryKey } from '@/features/projects/lib/query-keys'
import { useSuspenseData } from '@/hooks/useData'
import { CookieClientService } from '@/lib/services/cookieClientService'
import { CookieService } from '@/lib/services/cookieService'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'

const getProjectIdFn = createIsomorphicFn()
  .server(() => CookieService.get(PROJECT_ID_STORAGE_KEY))
  .client(() => CookieClientService.get(PROJECT_ID_STORAGE_KEY))

export const Route = createFileRoute('/(main)/(modules)/(project-guard)')({
  component: RouteComponent,
  staleTime: Infinity,
  shouldReload: false,
})

export const useSuspenseCurrentProjectId = () => {
  const { data } = useSuspenseData({
    key: currentProjectIdQueryKey,
    loader: getProjectIdFn,
  })

  return Number(data)
}

function RouteComponent() {
  const projectId = useSuspenseCurrentProjectId()

  return (
    <ProjectGuard projectId={projectId}>
      <Outlet />
    </ProjectGuard>
  )
}
