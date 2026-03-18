import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useSuspenseCurrentProjectId } from '../route'

export const Route = createFileRoute('/(main)/(modules)/(project-guard)')({
  component: RouteComponent,
  staleTime: Infinity,
  shouldReload: false,
})

function RouteComponent() {
  const projectId = useSuspenseCurrentProjectId()

  if (!projectId) throw redirect({ to: '/projects/guard' })

  return <Outlet />
}
