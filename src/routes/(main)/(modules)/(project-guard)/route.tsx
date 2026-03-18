import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(main)/(modules)/(project-guard)')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.projectId) {
      throw redirect({ to: '/projects/guard' })
    }
  },
  staleTime: Infinity,
  shouldReload: false,
})

function RouteComponent() {
  return <Outlet />
}
