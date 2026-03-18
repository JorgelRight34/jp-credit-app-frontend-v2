import { PROJECT_ID_STORAGE_KEY, ProjectIdProvider } from '@/features/projects'
import { currentProjectIdQueryKey } from '@/features/projects/lib/query-keys'
import { useSuspenseData } from '@/hooks/useData'
import { COOKIES } from '@/lib/constants/cookies'
import { CookieService } from '@/lib/services/cookieService'
import { Outlet, createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'

export const getProjectId = createIsomorphicFn()
  .server(() => Number(CookieService.get(COOKIES.PROJECT_ID)))
  .client(() => Number(localStorage.getItem(PROJECT_ID_STORAGE_KEY)))

export const Route = createFileRoute('/(main)/(modules)')({
  component: RouteComponent,
  pendingComponent: () => null,
  staleTime: Infinity,
  shouldReload: false,
})

export const useSuspenseCurrentProjectId = () => {
  const { data } = useSuspenseData({
    key: currentProjectIdQueryKey,
    loader: getProjectId,
  })

  return data
}

function RouteComponent() {
  const projectId = useSuspenseCurrentProjectId()

  return (
    <ProjectIdProvider initialProjectId={projectId}>
      <Outlet />
    </ProjectIdProvider>
  )
}
